"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Plan",
    description: "We understand your business, goals, target audience, and content needs. We map out a tailored strategy."
  },
  {
    number: "02",
    title: "Shoot",
    description: "We visit your location in Melbourne (or nearby areas) and capture professional, cinematic videos and photos."
  },
  {
    number: "03",
    title: "Edit",
    description: "We craft clean, engaging, and platform-ready content with professional color grading, audio mixing, and pacing."
  },
  {
    number: "04",
    title: "Promote",
    description: "We help publish, schedule, optimize pages, and run targeted Facebook and Instagram ads to convert views into customers."
  }
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-brand-soft-white relative overflow-hidden">
      {/* Background visual element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-brand-red font-bold">Our Workflow</h2>
          <h3 className="text-3xl md:text-5xl font-black tracking-tight text-brand-black">From Shoot to Growth</h3>
          <p className="text-brand-medium-gray text-sm md:text-base font-medium">
            We cover the full production lifecycle, ensuring you get high-quality content without the hassle.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-brand-light-gray/80 ml-4 md:ml-32 space-y-12">
          {STEPS.map((step, idx) => {
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
                className="relative pl-8 md:pl-16 group"
              >
                {/* Timeline Node Bubble */}
                <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full border-2 border-brand-light-gray bg-brand-white text-brand-black flex items-center justify-center font-bold text-xs transition-all duration-300 group-hover:border-brand-red group-hover:bg-brand-red group-hover:text-brand-white">
                  {step.number}
                </div>

                {/* Step Content Card */}
                <div className="bg-brand-white border border-brand-light-gray/60 p-6 md:p-8 rounded-2xl transition-all duration-300 hover:border-brand-red/20 hover:shadow-lg hover:shadow-brand-red/[0.02]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold tracking-tight text-brand-black group-hover:text-brand-red transition-colors duration-200">
                        {step.title}
                      </h4>
                      <p className="text-brand-medium-gray text-sm leading-relaxed max-w-2xl">
                        {step.description}
                      </p>
                    </div>
                    {/* Visual Checkmark */}
                    <div className="hidden md:flex w-10 h-10 rounded-full bg-brand-soft-white border border-brand-light-gray/60 items-center justify-center text-brand-medium-gray group-hover:border-brand-red/30 group-hover:bg-brand-red/5 group-hover:text-brand-red transition-all duration-300">
                      <Check size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
