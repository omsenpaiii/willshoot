"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { INSTAGRAM_REELS } from "@/constants/instagram";

type Reel = (typeof INSTAGRAM_REELS)[number];

export default function FeaturedReels() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeReel, setActiveReel] = useState<Reel | null>(null);

  useEffect(() => {
    if (!activeReel) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [activeReel]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INSTAGRAM_REELS.map((reel) => (
          <button
            key={reel.id}
            type="button"
            aria-label={`Watch ${reel.title}`}
            onClick={() => { setActiveReel(reel); dialogRef.current?.showModal(); }}
            className="group premium-panel relative rounded-[28px] overflow-hidden text-left flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-black/10 transition-transform duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-red focus-visible:outline-offset-4"
          >
            <span className="relative aspect-video w-full overflow-hidden bg-brand-black block">
              <Image src={reel.thumbnail} alt={`WillShoot property shoot at ${reel.title}`} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="w-14 h-14 rounded-full bg-brand-red text-brand-white flex items-center justify-center shadow-lg"><Play className="fill-brand-white translate-x-0.5" size={20} /></span>
              </span>
              <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest bg-brand-black/80 text-brand-white px-3 py-1.5 rounded-full border border-brand-white/10">Property Shoot</span>
            </span>
            <span className="p-6 space-y-2 flex-grow block">
              <span className="block text-lg font-bold tracking-tight text-brand-black group-hover:text-brand-red transition-colors">{reel.title}</span>
              <span className="block text-brand-medium-gray text-sm leading-relaxed">{reel.description}</span>
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        aria-labelledby="featured-reel-title"
        onClose={() => setActiveReel(null)}
        onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}
        className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-lg max-h-[90dvh] overflow-y-auto rounded-3xl bg-brand-white p-0 border border-brand-light-gray shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        {activeReel && (
          <>
            <div className="flex items-center justify-between gap-4 p-5">
              <h2 id="featured-reel-title" className="text-base font-bold">{activeReel.title}</h2>
              <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close video" className="shrink-0 p-2 rounded-full hover:bg-brand-soft-white cursor-pointer"><X size={20} /></button>
            </div>
            <iframe key={activeReel.id} src={`https://www.instagram.com/p/${activeReel.id}/embed/`} title={`WillShoot reel: ${activeReel.title}`} allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="w-full h-[620px] border-0" />
            <p className="p-5 text-sm text-brand-dark-gray">If playback is unavailable, <a href={`https://www.instagram.com/willshootau/reel/${activeReel.id}/`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 text-brand-red font-semibold">watch on Instagram</a>.</p>
          </>
        )}
      </dialog>
    </>
  );
}
