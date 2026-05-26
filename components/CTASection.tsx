"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-24 bg-brand-pure-black relative overflow-hidden text-brand-white">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-brand-black border border-brand-white/10 rounded-3xl p-8 md:p-16 text-center space-y-8 relative overflow-hidden"
        >
          {/* Internal gradient overlay */}
          <div className="absolute inset-0 bg-radial-at-t from-brand-red/[0.05] via-transparent to-transparent pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
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
