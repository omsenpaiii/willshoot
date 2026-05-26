import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Video, Camera, Instagram, Megaphone } from "lucide-react";
import MotionWrapper from "@/components/MotionWrapper";
import { SERVICES } from "@/constants/services";

export const metadata: Metadata = {
  title: "Services | WillShoot",
  description: "Explore WillShoot services including videography, photography, social media management, and Meta Ads marketing for growing brands and businesses.",
};

const iconMap: Record<string, any> = {
  Video: Video,
  Camera: Camera,
  Instagram: Instagram,
  Megaphone: Megaphone,
};

const PACKAGES = [
  {
    name: "Visual Starter Pack",
    price: "Custom Quote",
    description: "Perfect for brands looking for a one-off content boost.",
    features: [
      "1x Cinematic Promotional Video (60s)",
      "3x Short-Form Reels / TikToks",
      "15x Edited High-Res Photos",
      "Full editing & color correction",
      "1x Shoot location visit"
    ],
    cta: "Inquire Now",
    interest: "videography"
  },
  {
    name: "Social Growth Monthly",
    price: "Custom Quote",
    description: "Our recommended package for consistent online traction.",
    features: [
      "8x Short-Form Reels / Videos monthly",
      "30x Curated photos for pages",
      "Complete Social Media Calendar",
      "Caption writing & hashtag optimization",
      "Instagram page monthly posting",
      "Performance report review"
    ],
    cta: "Book Package",
    interest: "social-media-management",
    popular: true
  },
  {
    name: "Full Scale Ads & Creative",
    price: "Custom Quote",
    description: "Complete hands-off setup to generate leads and sales.",
    features: [
      "12-15x Reels & Ad Creatives monthly",
      "Facebook & Instagram Ads setup",
      "Lead generation campaigns setup",
      "Custom copy & graphic creative tests",
      "Complete Social Media Management",
      "Weekly performance monitoring & audits"
    ],
    cta: "Start Scaling",
    interest: "meta-ads-marketing"
  }
];

export default function ServicesPage() {
  return (
    <MotionWrapper>
      {/* Page Hero */}
      <section className="bg-brand-pure-black text-brand-white pt-32 pb-20 relative overflow-hidden">
        {/* VIEWPORT CORNERS */}
        <div className="absolute top-20 left-10 w-8 h-8 border-t border-l border-brand-red/20 pointer-events-none" />
        <div className="absolute top-20 right-10 w-8 h-8 border-t border-r border-brand-red/20 pointer-events-none" />
        
        {/* Glow */}
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-6 text-center max-w-3xl">
          <h1 className="text-xs uppercase tracking-widest text-brand-red font-bold">What We Offer</h1>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Services That Help Your Brand Grow Online
          </h2>
          <p className="text-brand-medium-gray text-base md:text-lg leading-relaxed font-medium">
            We provide cinematic media production, structured social media operations, and targeted advertising strategies built to acquire attention and close customers.
          </p>
        </div>
      </section>

      {/* Detailed Service Blocks */}
      <section className="py-24 bg-brand-white space-y-32">
        {SERVICES.map((service, index) => {
          const Icon = iconMap[service.icon] || Video;
          const isEven = index % 2 === 0;

          return (
            <div 
              key={service.id} 
              id={service.id} 
              className="max-w-7xl mx-auto px-6 md:px-12 scroll-mt-24"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                
                {/* Visual Block / Card */}
                <div className={`lg:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2"} bg-brand-soft-white border border-brand-light-gray rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-between aspect-video lg:aspect-auto min-h-[280px] lg:min-h-[380px]`}>
                  {/* Glowing light */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="space-y-6 relative z-10">
                    <div className="w-14 h-14 bg-brand-black text-brand-white rounded-2xl flex items-center justify-center">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-3xl font-black tracking-tight text-brand-black">{service.title}</h3>
                    <p className="text-brand-medium-gray text-sm md:text-base leading-relaxed font-medium">
                      {service.longDescription}
                    </p>
                  </div>

                  <div className="pt-8">
                    <Link 
                      href={`/contact?interest=${service.id}`}
                      className="px-6 py-3 bg-brand-black hover:bg-brand-red text-brand-white font-bold tracking-wide rounded-full text-xs transition-colors duration-300 inline-block shadow-md"
                    >
                      Book a Shoot &rarr;
                    </Link>
                  </div>
                </div>

                {/* Deliverables / Detailed Text Block */}
                <div className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"} space-y-6`}>
                  <h4 className="text-xs uppercase tracking-widest text-brand-red font-bold">Deliverables</h4>
                  <h5 className="text-2xl md:text-3xl font-bold tracking-tight text-brand-black">
                    What you get in the package:
                  </h5>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {service.deliverables.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start space-x-3 bg-brand-soft-white/50 border border-brand-light-gray/40 p-4 rounded-xl hover:border-brand-red/10 transition-colors duration-200"
                      >
                        <div className="w-5 h-5 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={12} className="stroke-[3]" />
                        </div>
                        <span className="text-sm font-semibold tracking-wide text-brand-black/90">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* Packages / pricing Section */}
      <section className="py-24 bg-brand-soft-white border-t border-brand-light-gray relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/[0.02] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-brand-red font-bold">Packages</h2>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-brand-black">
              Select Your Creative Path
            </h3>
            <p className="text-brand-medium-gray text-sm md:text-base font-medium">
              We offer flexible, results-oriented solutions designed for single promotions or ongoing monthly growth support.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg, idx) => (
              <div 
                key={idx}
                className={`bg-brand-white border rounded-3xl p-8 relative flex flex-col justify-between h-full shadow-sm hover:shadow-xl transition-all duration-300 ${
                  pkg.popular 
                    ? "border-brand-red shadow-lg shadow-brand-red/[0.02] lg:scale-[1.03]" 
                    : "border-brand-light-gray/60"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-red text-brand-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                    Most Popular
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-bold tracking-tight text-brand-black">{pkg.name}</h4>
                    <p className="text-brand-medium-gray text-xs mt-2 leading-relaxed">{pkg.description}</p>
                  </div>
                  
                  <div className="py-2 border-y border-brand-light-gray/50">
                    <span className="text-3xl font-black tracking-tight text-brand-black">{pkg.price}</span>
                  </div>

                  <ul className="space-y-3.5">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-3 text-sm">
                        <Check size={16} className="text-brand-red shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="text-brand-black/90 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link 
                    href={`/contact?interest=${pkg.interest}&package=${pkg.name.toLowerCase().replace(/ /g, "_")}`}
                    className={`w-full py-3.5 rounded-full font-bold text-sm tracking-wide text-center block transition-all duration-200 ${
                      pkg.popular 
                        ? "bg-brand-red text-brand-white hover:bg-brand-red/90 shadow-md shadow-brand-red/10 transform hover:scale-[1.02]" 
                        : "bg-brand-black text-brand-white hover:bg-brand-black/90"
                    }`}
                  >
                    {pkg.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MotionWrapper>
  );
}
