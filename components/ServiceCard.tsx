"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  index: number;
}

export default function ServiceCard({ id, title, shortDescription, icon, index }: ServiceCardProps) {
  // Dynamically resolve icon from lucide-react
  const IconComponent = (Icons as any)[icon] || Icons.HelpCircle;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10, scale: 1.01 }}
      className="group premium-panel relative p-7 md:p-8 rounded-[28px] transition-[border-color,box-shadow,background-color] duration-300 hover:border-brand-red/40 hover:shadow-2xl hover:shadow-brand-black/10 flex flex-col justify-between h-full overflow-hidden"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,36,39,0.12),transparent_36%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute top-0 left-0 h-px w-full bg-brand-light-gray/60" />
      <span className="absolute top-0 left-0 w-0 h-1 bg-brand-red transition-all duration-500 group-hover:w-full" />

      <div className="space-y-6 relative z-10">
        {/* Icon Container */}
        <div className="relative w-16 h-16 rounded-[22px] bg-brand-black text-brand-white flex items-center justify-center transition-colors duration-300 group-hover:bg-brand-red group-hover:text-brand-white">
          <span className="absolute inset-1 rounded-[18px] border border-white/8" />
          <IconComponent size={24} className="relative transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <h3 className="text-xl md:text-[1.4rem] font-bold tracking-tight text-brand-black flex items-center gap-2">
            {title}
            <span className="w-1.5 h-1.5 bg-brand-red rounded-full opacity-100 group-hover:scale-125 transition-transform duration-200" />
          </h3>
          <p className="text-brand-medium-gray text-sm leading-relaxed min-h-[56px]">
            {shortDescription}
          </p>
        </div>
      </div>

      {/* Learn More Link */}
      <div className="pt-6 border-t border-brand-light-gray/60 mt-6 flex items-center justify-between relative z-10">
        <Link 
          href={`/services#${id}`} 
          className="text-sm font-semibold tracking-wide text-brand-black group-hover:text-brand-red transition-colors duration-200 flex items-center gap-1.5"
        >
          View Deliverables
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
