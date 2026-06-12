"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Loader2, Pause, Volume2, Volume1, VolumeX, Maximize } from "lucide-react";
import { PROJECTS, CATEGORIES, Project } from "@/constants/portfolio";

interface PortfolioGridProps {
  limit?: number;
  showFilters?: boolean;
}

/* Custom Premium HTML5 Video Player Component */
interface VideoPlayerProps {
  videoUrl: string;
  posterUrl: string;
}

function VideoPlayer({ videoUrl, posterUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isWaiting, setIsWaiting] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct playback attempt on mount
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsWaiting(false);
        })
        .catch(() => {
          // Fallback to muted autoplay if browser blocks standard audio playback
          video.muted = true;
          setIsMuted(true);
          video.play()
            .then(() => {
              setIsPlaying(true);
              setIsWaiting(false);
            })
            .catch((err) => {
              console.log("Autoplay blocked:", err);
              setIsPlaying(false);
              setIsWaiting(false);
            });
        });
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [videoUrl]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(err => console.log(err));
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const vol = parseFloat(e.target.value);
    videoRef.current.volume = vol;
    setVolume(vol);
    const nextMuted = vol === 0;
    setIsMuted(nextMuted);
    videoRef.current.muted = nextMuted;
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (nextMuted) {
      videoRef.current.volume = 0;
    } else {
      const targetVol = volume > 0 ? volume : 0.8;
      videoRef.current.volume = targetVol;
      if (volume === 0) setVolume(0.8);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(err => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => console.log(err));
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2500);
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div 
      ref={playerContainerRef}
      className="relative w-full aspect-video bg-brand-pure-black flex items-center justify-center overflow-hidden group/player"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        playsInline
        className="w-full h-full object-contain cursor-pointer"
        onClick={() => togglePlay()}
        onWaiting={() => setIsWaiting(true)}
        onPlaying={() => {
          setIsWaiting(false);
          setIsPlaying(true);
        }}
        onCanPlay={() => setIsWaiting(false)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
      />

      {/* Play Overlay Button */}
      {!isPlaying && !isWaiting && (
        <button
          onClick={togglePlay}
          className="absolute w-16 h-16 rounded-full bg-brand-red/90 hover:bg-brand-red text-brand-white flex items-center justify-center shadow-lg shadow-brand-red/30 transition-transform duration-200 transform hover:scale-105 z-20 cursor-pointer"
        >
          <Play className="fill-brand-white translate-x-0.5" size={24} />
        </button>
      )}

      {/* Buffering Spinner */}
      {isWaiting && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-pure-black/60 backdrop-blur-xs z-20">
          <Loader2 className="animate-spin text-brand-red" size={36} />
          <span className="text-[11px] text-brand-white/80 mt-2 font-medium tracking-wide">Buffering...</span>
        </div>
      )}

      {/* Controls Overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-brand-pure-black/90 via-brand-pure-black/60 to-transparent flex flex-col gap-3 transition-opacity duration-300 z-30 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Progress Bar (Scrubber) */}
        <div className="flex items-center w-full group/scrub px-1">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-brand-white/20 rounded-lg appearance-none cursor-pointer accent-brand-red hover:h-1.5 transition-all duration-150 outline-none"
            style={{
              background: `linear-gradient(to right, #E52427 0%, #E52427 ${
                duration ? (currentTime / duration) * 100 : 0
              }%, rgba(255, 255, 255, 0.2) ${
                duration ? (currentTime / duration) * 100 : 0
              }%, rgba(255, 255, 255, 0.2) 100%)`
            }}
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between text-brand-white px-1">
          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <button 
              onClick={togglePlay}
              className="hover:text-brand-red transition-colors duration-200 cursor-pointer outline-none"
            >
              {isPlaying ? (
                <Pause className="fill-brand-white stroke-none" size={18} />
              ) : (
                <Play className="fill-brand-white translate-x-0.5" size={18} />
              )}
            </button>

            {/* Volume Toggle & Slider */}
            <div className="flex items-center gap-2 group/volume">
              <button 
                onClick={toggleMute}
                className="hover:text-brand-red transition-colors duration-200 cursor-pointer outline-none"
              >
                {isMuted ? (
                  <VolumeX size={18} />
                ) : volume < 0.4 ? (
                  <Volume1 size={18} />
                ) : (
                  <Volume2 size={18} />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 group-hover/volume:w-16 h-1 bg-brand-white/20 rounded-lg appearance-none cursor-pointer accent-brand-white transition-all duration-200 opacity-0 group-hover/volume:opacity-100 outline-none"
                style={{
                  background: `linear-gradient(to right, #ffffff 0%, #ffffff ${
                    isMuted ? 0 : volume * 100
                  }%, rgba(255, 255, 255, 0.2) ${
                    isMuted ? 0 : volume * 100
                  }%, rgba(255, 255, 255, 0.2) 100%)`
                }}
              />
            </div>

            {/* Time Stats */}
            <span className="text-[11px] font-medium font-mono text-brand-white/80 select-none">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Fullscreen Button */}
          <button 
            onClick={toggleFullscreen}
            className="hover:text-brand-red transition-colors duration-200 cursor-pointer outline-none"
            aria-label="Toggle Fullscreen"
          >
            <Maximize size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioGrid({ limit, showFilters = true }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const filteredProjects = selectedCategory === "all"
    ? PROJECTS
    : PROJECTS.filter(project => project.category === selectedCategory);

  const displayProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return PROJECTS.length;
    return PROJECTS.filter(project => project.category === categoryId).length;
  };

  return (
    <div className="space-y-12">
      {/* Category Filters */}
      {showFilters && (
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            const count = getCategoryCount(category.id);
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isSelected 
                    ? "text-brand-white bg-brand-red shadow-lg shadow-brand-red/10 scale-[1.02]" 
                    : "text-brand-black bg-brand-soft-white border border-brand-light-gray hover:border-brand-black/30"
                }`}
              >
                <span>{category.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-colors ${
                  isSelected 
                    ? "bg-brand-white/20 text-brand-white" 
                    : "bg-brand-light-gray text-brand-medium-gray"
                }`}>
                  {count}
                </span>
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
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
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

                {/* Looping video preview on hover */}
                <AnimatePresence>
                  {hoveredProjectId === project.id && (
                    <motion.video
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      src={project.previewVideoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover z-10"
                    />
                  )}
                </AnimatePresence>

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-brand-pure-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
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
                <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest bg-brand-black/80 text-brand-white px-3 py-1.5 rounded-full border border-brand-white/10 premium-dark-panel z-20">
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
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl bg-brand-black border border-brand-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-brand-pure-black/60 hover:bg-brand-red text-brand-white flex items-center justify-center transition-colors duration-200 cursor-pointer border border-brand-white/10"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Left Column: Custom Video Player */}
              <div className="relative md:w-3/5 bg-brand-pure-black flex items-center justify-center overflow-hidden">
                <VideoPlayer 
                  videoUrl={activeProject.videoUrl} 
                  posterUrl={activeProject.imageUrl} 
                />
              </div>

              {/* Right Column: Case Info */}
              <div className="p-8 md:w-2/5 flex flex-col justify-between space-y-6 bg-brand-black text-brand-white relative">
                <div className="space-y-4">
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

                  {/* Specifications and Metrics */}
                  <div className="pt-4 space-y-3 border-t border-brand-white/10">
                    <p className="text-[10px] text-brand-medium-gray font-bold uppercase tracking-wider">Campaign Metrics & Specs</p>
                    <ul className="text-xs text-brand-white/80 space-y-2.5 font-medium">
                      <li className="flex items-center justify-between py-1 border-b border-brand-white/5">
                        <span className="text-brand-medium-gray">Results:</span>
                        <span className="text-brand-red font-bold">{activeProject.results}</span>
                      </li>
                      <li className="flex items-center justify-between py-1 border-b border-brand-white/5">
                        <span className="text-brand-medium-gray">Production Gear:</span>
                        <span className="text-brand-white">{activeProject.gear}</span>
                      </li>
                      <li className="flex items-center justify-between py-1 border-b border-brand-white/5">
                        <span className="text-brand-medium-gray">Video Duration:</span>
                        <span className="text-brand-white">{activeProject.duration}s</span>
                      </li>
                    </ul>

                    <div className="pt-2">
                      <p className="text-[10px] text-brand-medium-gray font-bold uppercase tracking-wider mb-2">Deliverable Focus</p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProject.specifications.map((spec, i) => (
                          <span 
                            key={i} 
                            className="text-[10px] bg-brand-white/5 text-brand-white/90 px-2.5 py-1 rounded-md border border-brand-white/5 font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
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
