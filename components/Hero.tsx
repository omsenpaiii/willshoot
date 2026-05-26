"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function Hero() {
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

  return (
    <section className="relative min-h-screen bg-brand-pure-black flex flex-col justify-center items-center text-brand-white px-6 overflow-hidden">
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

      {/* Smooth Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer z-10"
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
