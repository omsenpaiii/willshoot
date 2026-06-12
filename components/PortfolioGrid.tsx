"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Loader2 } from "lucide-react";
import { PROJECTS, CATEGORIES, Project } from "@/constants/portfolio";

interface PortfolioGridProps {
  limit?: number;
  showFilters?: boolean;
}

export default function PortfolioGrid({ limit, showFilters = true }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-colors duration-300 cursor-pointer ${
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
              onClick={() => setActiveProject(project)}
              whileHover={{ y: -8 }}
              className="group premium-panel relative rounded-[28px] overflow-hidden flex flex-col justify-between h-full hover:shadow-2xl hover:shadow-brand-black/10 cursor-pointer"
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
                <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest bg-brand-black/80 text-brand-white px-3 py-1.5 rounded-full border border-brand-white/10 premium-dark-panel">
                  {project.categoryLabel}
                </span>
              </div>

              {/* Text Description */}
              <div className="p-6 space-y-2 flex-grow">
                <h4 className="text-lg font-bold tracking-tight text-brand-black group-hover:text-brand-red transition-colors duration-200">
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-brand-pure-black/90 p-4 md:p-10 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="relative w-full max-w-4xl bg-brand-black border border-brand-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-brand-pure-black/60 hover:bg-brand-red text-brand-white flex items-center justify-center transition-colors duration-200 cursor-pointer border border-brand-white/10"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Left Column: Mock Player / Image overlay */}
              <div className="relative md:w-3/5 aspect-video md:aspect-auto min-h-[240px] md:min-h-[400px] bg-brand-pure-black flex items-center justify-center overflow-hidden">
                <Image
                  src={activeProject.imageUrl}
                  alt={activeProject.title}
                  fill
                  className="object-cover opacity-50 filter blur-xs scale-105"
                />
                
                {/* Visual player UI overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 bg-gradient-to-t from-brand-pure-black/80 via-transparent to-transparent">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest bg-brand-red text-brand-white px-2.5 py-1 rounded font-bold">
                      Live Preview Stream
                    </span>
                    <span className="text-[10px] text-brand-white/60 font-mono flex items-center gap-1.5 bg-brand-pure-black/50 px-2 py-1 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                      00:00 / 00:30
                    </span>
                  </div>

                  {/* Play Interface Center */}
                  <div className="flex flex-col items-center justify-center space-y-3 my-auto">
                    <div className="w-14 h-14 rounded-full border border-brand-white/20 bg-brand-white/5 flex items-center justify-center">
                      <Loader2 className="animate-spin text-brand-red" size={24} />
                    </div>
                    <p className="text-xs font-semibold tracking-wide text-brand-white/90 animate-pulse">
                      Buffering Video Demo...
                    </p>
                  </div>

                  {/* Player Controls */}
                  <div className="space-y-3 pt-2">
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-brand-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: ["0%", "85%", "85%", "100%", "0%"] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="h-full bg-brand-red"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-brand-white/60 font-medium">
                      <span>Mock Shoot Sample</span>
                      <span>Melbourne Area</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Case Info */}
              <div className="p-8 md:w-2/5 flex flex-col justify-between space-y-8 bg-brand-black text-brand-white relative">
                <div className="space-y-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-red bg-brand-red/10 border border-brand-red/20 px-2.5 py-1 rounded-full">
                    {activeProject.categoryLabel}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                      {activeProject.title}
                    </h3>
                    <p className="text-brand-medium-gray text-xs leading-relaxed">
                      {activeProject.description}
                    </p>
                  </div>
                  <div className="pt-4 space-y-2.5 border-t border-brand-white/5">
                    <p className="text-[10px] text-brand-medium-gray font-bold uppercase tracking-wider">Specifications</p>
                    <ul className="text-xs text-brand-white/80 space-y-2 font-medium">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                        Resolution: 4K UHD Cinematic
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                        Deliverables: Reels, Photos, Ads
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                        Turnaround: ~3 Days
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href={`/contact?interest=${activeProject.category}&project=${activeProject.id}`}
                    onClick={() => setActiveProject(null)}
                    className="w-full py-3.5 bg-brand-red hover:bg-brand-red/90 text-brand-white text-center rounded-full font-bold text-sm tracking-wide block transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-brand-red/20 cursor-pointer"
                  >
                    Inquire About This Style
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
