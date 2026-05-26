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
      whileHover={{ y: -8 }}
      className="group relative bg-brand-soft-white border border-brand-light-gray p-8 rounded-2xl transition-[border-color,box-shadow,background-color] duration-300 hover:border-brand-red/40 hover:shadow-xl hover:shadow-brand-red/5 flex flex-col justify-between h-full overflow-hidden"
    >
      {/* Accent Red Top Border/Line on hover */}
      <span className="absolute top-0 left-0 w-0 h-1 bg-brand-red transition-all duration-300 group-hover:w-full" />

      <div className="space-y-6">
        {/* Icon Container */}
        <div className="w-14 h-14 rounded-2xl bg-brand-black text-brand-white flex items-center justify-center transition-colors duration-300 group-hover:bg-brand-red group-hover:text-brand-white">
          <IconComponent size={24} className="transition-transform duration-300 group-hover:scale-110" />
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight text-brand-black flex items-center gap-2">
            {title}
            <span className="w-1.5 h-1.5 bg-brand-red rounded-full opacity-100 group-hover:scale-125 transition-transform duration-200" />
          </h3>
          <p className="text-brand-medium-gray text-sm leading-relaxed min-h-[44px]">
            {shortDescription}
          </p>
        </div>
      </div>

      {/* Learn More Link */}
      <div className="pt-6 border-t border-brand-light-gray/60 mt-6 flex items-center justify-between">
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
