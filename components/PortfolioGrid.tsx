"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { PROJECTS, CATEGORIES } from "@/constants/portfolio";

interface PortfolioGridProps {
  limit?: number;
  showFilters?: boolean;
}

export default function PortfolioGrid({ limit, showFilters = true }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = selectedCategory === "all"
    ? PROJECTS
    : PROJECTS.filter(project => project.category === selectedCategory);

  const displayProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <div className="space-y-12">
      {/* Category Filters */}
      {showFilters && (
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isSelected 
                    ? "text-brand-white bg-brand-red shadow-lg shadow-brand-red/10" 
                    : "text-brand-black bg-brand-soft-white border border-brand-light-gray hover:border-brand-black/30"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid Container */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {displayProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              key={project.id}
              className="group relative rounded-2xl overflow-hidden border border-brand-light-gray/60 bg-brand-white flex flex-col justify-between h-full hover:shadow-xl hover:shadow-brand-black/5"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-brand-black">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-brand-pure-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 rounded-full bg-brand-red text-brand-white flex items-center justify-center shadow-lg shadow-brand-red/20"
                  >
                    <Play className="fill-brand-white translate-x-0.5" size={20} />
                  </motion.div>
                </div>

                {/* Category Badge */}
                <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest bg-brand-black/80 text-brand-white px-3 py-1.5 rounded-full border border-brand-white/10">
                  {project.categoryLabel}
                </span>
              </div>

              {/* Text Description */}
              <div className="p-6 space-y-2 flex-grow">
                <h4 className="text-lg font-bold tracking-tight text-brand-black">
                  {project.title}
                </h4>
                <p className="text-brand-medium-gray text-xs md:text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {displayProjects.length === 0 && (
        <div className="text-center py-16 border border-dashed border-brand-light-gray rounded-2xl bg-brand-soft-white space-y-4">
          <p className="text-brand-medium-gray font-medium">No projects found in this category.</p>
          <p className="text-brand-medium-gray/60 text-sm">Our latest shoots and campaigns will be featured here.</p>
        </div>
      )}
    </div>
  );
}
