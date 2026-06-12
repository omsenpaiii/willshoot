"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-24 bg-brand-pure-black relative overflow-hidden text-brand-white">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-white/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-x-0 top-10 h-px bg-white/8 overflow-hidden">
        <span className="block w-1/4 h-full bg-brand-red animate-shimmer-line" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className="bg-brand-black border border-brand-white/10 rounded-[32px] p-8 md:p-16 text-center space-y-8 relative overflow-hidden shadow-[0_28px_90px_rgba(0,0,0,0.35)]"
        >
          {/* Internal gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(229,36,39,0.16),transparent_36%)] pointer-events-none" />
          <div className="absolute inset-x-10 bottom-0 h-px bg-white/10" />

          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/62 premium-dark-panel">
              Limited monthly client spots
            </span>
            <h2 className="pt-3 text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Ready to make your brand look premium online?
            </h2>
            <p className="text-brand-medium-gray text-sm md:text-base leading-relaxed">
              Whether you need one promotional video or complete monthly content support, WillShoot can help you plan, shoot, edit, and promote your brand.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact?ref=cta_section"
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-red hover:bg-brand-red/90 text-brand-white rounded-full text-base font-bold tracking-wide transition-all duration-200 transform hover:scale-[1.03] shadow-lg shadow-brand-red/30 block text-center"
            >
              Start a Project
            </Link>
            <Link 
              href="/services?ref=cta_section"
              className="w-full sm:w-auto px-8 py-3.5 border border-brand-white/10 hover:border-brand-red hover:text-brand-red text-brand-white rounded-full text-base font-bold tracking-wide transition-all duration-200 block text-center bg-brand-white/5 backdrop-blur-sm"
            >
              Explore Packages
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
