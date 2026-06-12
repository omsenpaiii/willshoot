"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";

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

        if (video.paused) {
          try {
            await video.play();
          } catch {}
        }
      }
    }, 5000);

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

  const toggleMuted = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setUserHasInteracted(true);
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
      className="relative min-h-screen bg-brand-pure-black flex flex-col justify-center items-center text-brand-white px-6 overflow-hidden isolate"
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,36,39,0.14),transparent_40%),linear-gradient(180deg,rgba(0,0,0,0.45),rgba(0,0,0,0.72))]" />
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
      <div className="absolute top-10 left-10 md:top-20 md:left-20 w-12 h-12 border-t-2 border-l-2 border-brand-red/30 pointer-events-none" />
      <div className="absolute top-10 right-10 md:top-20 md:right-20 w-12 h-12 border-t-2 border-r-2 border-brand-red/30 pointer-events-none" />
      <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 w-12 h-12 border-b-2 border-l-2 border-brand-red/30 pointer-events-none" />
      <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-12 h-12 border-b-2 border-r-2 border-brand-red/30 pointer-events-none" />

      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl text-center space-y-8 z-10 relative"
      >
        {/* Play Icon Pulse Animation */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center mb-6"
        >
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full border border-brand-red/30 bg-brand-red/10">
            <span className="absolute inset-0 rounded-full bg-brand-red/20 animate-ping opacity-75" />
            <Play className="text-brand-red fill-brand-red" size={24} />
          </div>
        </motion.div>

        {/* Hero Tagline */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-8xl font-black tracking-tight leading-[1.05]"
        >
          We Sho<span className="inline-block relative">
            <span className="text-brand-red">o</span>
            {/* Small red play icon inside the "o" */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 bg-brand-white rotate-90 clip-triangle translate-y-[2px]" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
            </span>
          </span>t.<br />
          You Grow.
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          variants={itemVariants}
          className="text-base md:text-xl text-brand-medium-gray max-w-2xl mx-auto font-medium leading-relaxed"
        >
          WillShoot creates premium videos, photos, reels, and marketing campaigns that help businesses stand out online and attract the right audience.
        </motion.p>

        {/* Call to Actions */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
        >
          <Link 
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 bg-brand-red hover:bg-brand-red/90 text-brand-white rounded-full text-base font-bold tracking-wide transition-all duration-200 transform hover:scale-[1.03] shadow-lg shadow-brand-red/30 text-center"
          >
            Book a Shoot
          </Link>
          <Link 
            href="/services"
            className="w-full sm:w-auto px-8 py-3.5 border border-brand-white/20 hover:border-brand-red hover:text-brand-red text-brand-white rounded-full text-base font-bold tracking-wide transition-all duration-200 text-center bg-brand-white/5 backdrop-blur-sm"
          >
            View Services
          </Link>
        </motion.div>
      </motion.div>

      {!shouldReduceMotion ? (
        <button
          type="button"
          onClick={toggleMuted}
          aria-label={isMuted ? "Unmute hero video" : "Mute hero video"}
          aria-pressed={!isMuted}
          className="absolute right-6 bottom-6 md:right-10 md:bottom-10 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.24em] text-brand-white backdrop-blur-md transition hover:border-brand-red hover:text-brand-red"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <span>{isMuted ? "Sound Off" : "Sound On"}</span>
        </button>
      ) : null}

      {/* Smooth Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
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
