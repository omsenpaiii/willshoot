import type { Metadata } from "next";
import Link from "next/link";
import MotionWrapper from "@/components/MotionWrapper";
import PortfolioGrid from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "Work | WillShoot",
  description: "Explore WillShoot's portfolio of recent videography, photography, reels, and Meta Ads marketing campaigns.",
};

export default function WorkPage() {
  return (
    <MotionWrapper>
      {/* Page Hero */}
      <section className="bg-brand-pure-black text-brand-white pt-32 pb-20 relative overflow-hidden">
        {/* Viewfinder borders */}
        <div className="absolute top-20 left-10 w-8 h-8 border-t border-l border-brand-red/20 pointer-events-none" />
        <div className="absolute top-20 right-10 w-8 h-8 border-t border-r border-brand-red/20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-6 text-center max-w-3xl">
          <h1 className="text-xs uppercase tracking-widest text-brand-red font-bold">Our Portfolio</h1>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Recent Work & Campaigns
          </h2>
          <p className="text-brand-medium-gray text-base md:text-lg leading-relaxed font-medium">
            Explore our shoots and campaigns across real estate, academies, cafes, and digital lead acquisition projects.
          </p>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <PortfolioGrid showFilters={true} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-brand-soft-white border-t border-brand-light-gray/60 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 space-y-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-brand-black">
            Want to see your brand featured here?
          </h2>
          <p className="text-brand-medium-gray text-sm md:text-base font-medium">
            Let's discuss how we can plan, capture, and promote cinematic visual campaigns for your business.
          </p>
          <div className="pt-2">
            <Link 
              href="/contact?ref=work_cta"
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
