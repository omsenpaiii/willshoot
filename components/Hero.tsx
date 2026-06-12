"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play, Sparkles, Volume2, VolumeX } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasPlaybackStarted, setHasPlaybackStarted] = useState(false);
  const [autoUnmuteAttempted, setAutoUnmuteAttempted] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const [awaitingSoundUnlock, setAwaitingSoundUnlock] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    }
  };

  const floatingPillVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 24 },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    })
  };

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextIsInView = entry?.isIntersecting ?? false;
        setIsInView(nextIsInView);

        if (!nextIsInView && !userHasInteracted) {
          setHasPlaybackStarted(false);
          setAutoUnmuteAttempted(false);
          setAwaitingSoundUnlock(false);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [userHasInteracted]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || shouldReduceMotion) {
      return;
    }

    video.muted = isMuted;

    if (!isInView) {
      video.pause();
      return;
    }

    if (!video.paused) {
      return;
    }

    const playPromise = video.play();

    if (playPromise) {
      playPromise.catch(() => {});
    }
  }, [isInView, isMuted, shouldReduceMotion]);

  useEffect(() => {
    if (
      shouldReduceMotion ||
      !isInView ||
      !isVideoReady ||
      !hasPlaybackStarted ||
      !isMuted ||
      autoUnmuteAttempted ||
      userHasInteracted
    ) {
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      const video = videoRef.current;

      if (!video || userHasInteracted || !isInView) {
        return;
      }

      setAutoUnmuteAttempted(true);
      video.muted = false;
      setIsMuted(false);
      setAwaitingSoundUnlock(false);

      try {
        await video.play();
        await new Promise((resolve) => window.setTimeout(resolve, 150));

        if (video.paused) {
          throw new Error("Auto-unmute was blocked");
        }

        setIsMuted(video.muted);
      } catch {
        video.muted = true;
        setIsMuted(true);
        setAwaitingSoundUnlock(true);

        if (video.paused) {
          try {
            await video.play();
          } catch {}
        }
      }
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [
    autoUnmuteAttempted,
    hasPlaybackStarted,
    isInView,
    isMuted,
    isVideoReady,
    shouldReduceMotion,
    userHasInteracted
  ]);

  useEffect(() => {
    if (
      shouldReduceMotion ||
      !awaitingSoundUnlock ||
      userHasInteracted
    ) {
      return;
    }

    const unlockSound = async () => {
      const video = videoRef.current;

      if (!video) {
        return;
      }

      setUserHasInteracted(true);
      setAwaitingSoundUnlock(false);
      video.muted = false;
      setIsMuted(false);

      try {
        await video.play();
      } catch {
        video.muted = true;
        setIsMuted(true);
      }
    };

    const handleFirstGesture = () => {
      void unlockSound();
    };

    window.addEventListener("pointerdown", handleFirstGesture, { once: true });
    window.addEventListener("keydown", handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };
  }, [awaitingSoundUnlock, shouldReduceMotion, userHasInteracted]);

  const toggleMuted = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setUserHasInteracted(true);
    setAwaitingSoundUnlock(false);
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    video.muted = nextMuted;

    if (video.paused || !nextMuted) {
      try {
        await video.play();
      } catch {}
    }

    if (!nextMuted) {
      await new Promise((resolve) => window.setTimeout(resolve, 150));

      if (video.paused) {
        try {
          await video.play();
        } catch {}
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-brand-pure-black flex flex-col justify-center items-center text-brand-white px-4 sm:px-6 overflow-hidden isolate pt-24 pb-16 sm:pt-28 sm:pb-24 md:pt-32 md:pb-28"
    >
      {!shouldReduceMotion ? (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-poster.jpg')" }}
            aria-hidden="true"
          />
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isVideoReady ? "opacity-100" : "opacity-0"}`}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
            aria-hidden="true"
            onCanPlay={() => setIsVideoReady(true)}
            onPlaying={() => setHasPlaybackStarted(true)}
            onPause={() => setHasPlaybackStarted(false)}
          >
            <source src="/hero-bg.webm" type="video/webm" />
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,36,39,0.16),transparent_40%),linear-gradient(180deg,rgba(0,0,0,0.32),rgba(0,0,0,0.76))]" />
        </div>
      ) : (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-poster.jpg')" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45),rgba(0,0,0,0.72))]" />
        </>
      )}

      {/* Decorative Viewfinder Corners */}
      <div className="absolute top-8 left-4 sm:left-8 md:top-20 md:left-20 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 border-brand-red/30 pointer-events-none" />
      <div className="absolute top-8 right-4 sm:right-8 md:top-20 md:right-20 w-8 h-8 md:w-12 md:h-12 border-t-2 border-r-2 border-brand-red/30 pointer-events-none" />
      <div className="absolute bottom-6 left-4 sm:left-8 md:bottom-20 md:left-20 w-8 h-8 md:w-12 md:h-12 border-b-2 border-l-2 border-brand-red/30 pointer-events-none" />
      <div className="absolute bottom-6 right-4 sm:right-8 md:bottom-20 md:right-20 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 border-brand-red/30 pointer-events-none" />

      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute inset-x-0 top-28 h-px bg-white/8 overflow-hidden pointer-events-none">
        <span className="block w-1/4 h-full bg-brand-red/70 animate-shimmer-line" />
      </div>

      <motion.div
        custom={0.35}
        variants={floatingPillVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex absolute left-12 xl:left-24 top-1/3 premium-dark-panel rounded-3xl px-5 py-4 z-10 items-center gap-4 animate-float-soft"
      >
        <div className="w-10 h-10 rounded-2xl bg-brand-red/18 text-brand-red flex items-center justify-center">
          <Sparkles size={18} />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/55">Direction</p>
          <p className="text-sm font-semibold text-white">Films that sell the feeling</p>
        </div>
      </motion.div>

      <motion.div
        custom={0.45}
        variants={floatingPillVariants}
        initial="hidden"
        animate="visible"
        className="hidden xl:flex absolute right-12 xl:right-24 bottom-40 premium-dark-panel rounded-3xl px-5 py-4 z-10 items-center gap-4 animate-drift-x"
      >
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/55">Delivery</p>
          <p className="text-sm font-semibold text-white">Reels, ads, launch cuts</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-brand-red">48h</p>
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">Fast turnaround</p>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl text-center space-y-4 sm:space-y-6 md:space-y-8 z-10 relative"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.24em] sm:tracking-[0.28em] text-white/72 premium-dark-panel"
        >
          <span className="inline-flex h-2 w-2 rounded-full bg-brand-red" />
          Melbourne video direction for modern brands
        </motion.div>

        {/* Play Icon Pulse Animation */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center mb-1 md:mb-4"
        >
          <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border border-brand-red/30 bg-brand-red/10">
            <span className="absolute inset-0 rounded-full bg-brand-red/20 animate-ping opacity-75" />
            <Play className="text-brand-red fill-brand-red" size={20} />
          </div>
        </motion.div>

        {/* Hero Tagline */}
        <motion.h1 
          variants={itemVariants}
          className="mx-auto max-w-4xl text-[3.15rem] sm:text-[4.8rem] md:text-[6.8rem] lg:text-[7.8rem] font-black tracking-[-0.05em] leading-[0.92]"
        >
          We Sho
          <span className="inline-flex relative align-[0.02em]">
            <span className="text-brand-red">o</span>
            <span className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="w-[0.34em] h-[0.34em] translate-x-[0.02em] translate-y-[0.02em]"
              >
                <polygon points="4,3 12.5,8 4,13" className="fill-brand-white" />
              </svg>
            </span>
          </span>
          t.<br />
          You Grow.
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          variants={itemVariants}
          className="text-[0.98rem] sm:text-lg md:text-xl text-white/66 max-w-3xl mx-auto font-medium leading-relaxed"
        >
          WillShoot creates premium videos, photos, reels, and marketing campaigns that help businesses stand out online and attract the right audience.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="hidden sm:flex flex-wrap items-center justify-center gap-3 text-[11px] sm:text-xs uppercase tracking-[0.24em] text-white/52"
        >
          <span className="premium-dark-panel rounded-full px-3 py-2">Cinematic reels</span>
          <span className="premium-dark-panel rounded-full px-3 py-2">Paid ad creatives</span>
          <span className="premium-dark-panel rounded-full px-3 py-2">Mobile-first delivery</span>
        </motion.div>

        {/* Call to Actions */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4"
        >
          <Link 
            href="/contact"
            className="group w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-brand-red hover:bg-brand-red/90 text-brand-white rounded-full text-base font-bold tracking-wide transition-all duration-200 transform hover:scale-[1.03] shadow-lg shadow-brand-red/30 text-center inline-flex items-center justify-center gap-2"
          >
            Book a Shoot
            <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link 
            href="/services"
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 border border-brand-white/20 hover:border-brand-red hover:text-brand-red text-brand-white rounded-full text-base font-bold tracking-wide transition-all duration-200 text-center bg-brand-white/5 backdrop-blur-sm"
          >
            View Services
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="hidden md:grid grid-cols-3 gap-3 sm:gap-4 pt-4 md:pt-6 max-w-2xl mx-auto"
        >
          {[
            { value: "4K", label: "Delivery-ready edits" },
            { value: "24/7", label: "Platform-first support" },
            { value: "ROI", label: "Creative with strategy" }
          ].map((stat) => (
            <div key={stat.value} className="premium-dark-panel rounded-2xl px-3 py-4 sm:px-4 text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-brand-white">{stat.value}</div>
              <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/46">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {!shouldReduceMotion ? (
        <button
          type="button"
          onClick={toggleMuted}
          aria-label={
            isMuted
              ? awaitingSoundUnlock
                ? "Enable hero video sound"
                : "Unmute hero video"
              : "Mute hero video"
          }
          aria-pressed={!isMuted}
          className="absolute right-4 bottom-12 sm:right-6 sm:bottom-8 md:right-10 md:bottom-10 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-4 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-brand-white backdrop-blur-md transition hover:border-brand-red hover:text-brand-red"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <span>
            {isMuted ? (awaitingSoundUnlock ? "Tap for Sound" : "Sound Off") : "Sound On"}
          </span>
        </button>
      ) : null}

      {/* Smooth Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span className="text-xs uppercase tracking-widest text-brand-medium-gray">Scroll Down</span>
        <div className="w-6 h-10 border border-brand-medium-gray rounded-full flex justify-center p-1.5">
          <motion.div 
            animate={{ 
              y: [0, 12, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-1.5 h-1.5 bg-brand-red rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
