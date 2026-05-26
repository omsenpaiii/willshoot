import type { Metadata } from "next";
import Link from "next/link";
import { Check, Compass, Eye, ShieldCheck, Zap, Sparkles, Scale, RefreshCw } from "lucide-react";
import MotionWrapper from "@/components/MotionWrapper";

export const metadata: Metadata = {
  title: "About | WillShoot",
  description: "Learn about WillShoot, a modern creative agency helping businesses grow online through premium video, photography, and digital marketing.",
};

const VALUES = [
  {
    name: "Simplicity",
    description: "We make the process simple. No complex jargon, just smooth shoot-to-post coordination.",
    icon: Compass
  },
  {
    name: "Quality",
    description: "Cinematic lighting, crisp audio, clear composition. Every detail is calibrated to feel premium.",
    icon: Sparkles
  },
  {
    name: "Consistency",
    description: "Social media and ads demand regularity. We keep your channels active and aligned.",
    icon: RefreshCw
  },
  {
    name: "Creativity",
    description: "We don't copy-paste templates. We find the unique visual hooks that capture attention.",
    icon: Zap
  },
  {
    name: "Trust",
    description: "Open communication, transparent deliverables, and honest advice. We work as partners.",
    icon: ShieldCheck
  },
  {
    name: "Growth Focus",
    description: "Beautiful content is only good if it works. We align all creatives with marketing ROI.",
    icon: Scale
  }
];

export default function AboutPage() {
  return (
    <MotionWrapper>
      {/* Page Hero */}
      <section className="bg-brand-pure-black text-brand-white pt-32 pb-20 relative overflow-hidden">
        {/* Viewfinder borders */}
        <div className="absolute top-20 left-10 w-8 h-8 border-t border-l border-brand-red/20 pointer-events-none" />
        <div className="absolute top-20 right-10 w-8 h-8 border-t border-r border-brand-red/20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-6 text-center max-w-3xl">
          <h1 className="text-xs uppercase tracking-widest text-brand-red font-bold">Our Story</h1>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            We Help Brands Look Better & Sell Faster
          </h2>
          <p className="text-brand-medium-gray text-base md:text-lg leading-relaxed font-medium">
            WillShoot was built to bridge the gap between high-end cinematic visuals and practical, results-driven digital marketing.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="py-24 bg-brand-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Main Story content */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-3xl font-bold tracking-tight text-brand-black">About WillShoot</h3>
            
            <p className="text-brand-medium-gray text-sm md:text-base leading-relaxed font-medium">
              WillShoot was created with a simple belief: <strong>great content should not only look good, it should help businesses grow.</strong>
            </p>
            <p className="text-brand-medium-gray text-sm md:text-base leading-relaxed font-medium">
              We saw that many local businesses, property owners, institutes, and service providers had strong offerings, but their online presence did not reflect their real value. Their spaces, services, teams, and stories were powerful, but they were not being presented in a way that could attract modern customers.
            </p>
            <p className="text-brand-medium-gray text-sm md:text-base leading-relaxed font-medium">
              That is where WillShoot comes in.
            </p>
            <p className="text-brand-medium-gray text-sm md:text-base leading-relaxed font-medium">
              We help businesses go online with confidence through professional videos, photography, reels, social media management, and targeted marketing campaigns. Our goal is to make every business look premium, trustworthy, and ready for growth.
            </p>
            <p className="text-brand-medium-gray text-sm md:text-base leading-relaxed font-medium">
              From property shoots that help owners find buyers, to institute promotional videos that attract students, to social media campaigns that bring local businesses more visibility, WillShoot works as a creative growth partner.
            </p>
          </div>

          {/* Sticky Side visual badge */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 bg-brand-soft-white border border-brand-light-gray rounded-3xl p-8 md:p-10 space-y-8">
            <div className="space-y-4">
              <span className="w-1.5 h-6 bg-brand-red rounded-full block" />
              <h4 className="text-xl font-bold tracking-tight text-brand-black">Our Philosophy</h4>
              <p className="text-brand-medium-gray text-sm leading-relaxed">
                We believe in frictionless production. You run your business, and we take care of the capturing, scripting, editing, publishing, and advertising.
              </p>
            </div>
            
            <div className="pt-4 border-t border-brand-light-gray/60 space-y-3">
              <p className="text-xs uppercase tracking-wider text-brand-medium-gray font-bold">Service Coverage</p>
              <p className="text-sm font-semibold tracking-wide text-brand-black">
                Based in Melbourne. Available for shoots across nearby areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision cards */}
      <section className="py-24 bg-brand-soft-white border-y border-brand-light-gray/60 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {/* Mission */}
          <div className="bg-brand-white border border-brand-light-gray/60 rounded-3xl p-8 md:p-12 space-y-6">
            <div className="w-12 h-12 bg-brand-red/10 text-brand-red rounded-2xl flex items-center justify-center">
              <Compass size={24} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-brand-black">Our Mission</h3>
            <p className="text-brand-medium-gray text-sm md:text-base leading-relaxed">
              To help local businesses, property owners, institutes, and growing brands build a strong online presence through premium content and digital marketing. We exist to make professional media accessible and useful.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-brand-white border border-brand-light-gray/60 rounded-3xl p-8 md:p-12 space-y-6">
            <div className="w-12 h-12 bg-brand-red/10 text-brand-red rounded-2xl flex items-center justify-center">
              <Eye size={24} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-brand-black">Our Vision</h3>
            <p className="text-brand-medium-gray text-sm md:text-base leading-relaxed">
              To become a trusted creative partner for businesses that want to look professional, attract more customers, and grow through modern online platforms. We build relationships that sustain long-term digital growth.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values grid */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-brand-red font-bold">Our DNA</h2>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-brand-black">
              Values That Drive Us
            </h3>
            <p className="text-brand-medium-gray text-sm md:text-base font-medium">
              These simple rules guide how we coordinate shoots, construct creatives, and manage campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((val, idx) => {
              const ValIcon = val.icon;
              return (
                <div 
                  key={idx}
                  className="bg-brand-soft-white border border-brand-light-gray/40 p-8 rounded-2xl hover:border-brand-red/20 transition-all duration-300 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 bg-brand-black text-brand-white rounded-xl flex items-center justify-center">
                      <ValIcon size={20} />
                    </div>
                    <h4 className="text-lg font-bold tracking-tight text-brand-black flex items-center gap-1.5">
                      {val.name}
                      <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                    </h4>
                    <p className="text-brand-medium-gray text-sm leading-relaxed">{val.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-brand-pure-black text-brand-white relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-radial-at-t from-brand-red/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Let's work as a creative growth partner.
          </h2>
          <p className="text-brand-medium-gray text-sm md:text-base max-w-xl mx-auto font-medium">
            We help local brands look better, grow faster, and reach the right audience online.
          </p>
          <div className="pt-4">
            <Link 
              href="/contact?ref=about_cta"
              className="px-8 py-3.5 bg-brand-red hover:bg-brand-red/90 text-brand-white rounded-full text-base font-bold tracking-wide transition-all duration-200 transform hover:scale-[1.03] inline-block shadow-lg shadow-brand-red/30"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </MotionWrapper>
  );
}
