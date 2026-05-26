import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import ProcessSection from "@/components/ProcessSection";
import PortfolioGrid from "@/components/PortfolioGrid";
import CTASection from "@/components/CTASection";
import MotionWrapper from "@/components/MotionWrapper";
import { SERVICES } from "@/constants/services";

export default function Home() {
  const whyPoints = [
    "Minimal, modern, and premium content style",
    "Shoot-to-post production support (we plan, shoot, edit, and post)",
    "Reels and videos made specifically for online attention",
    "Local business growth and ROI focus",
    "Strong understanding of property, institute, and service-based marketing",
    "Professional cinematic editing and storytelling",
    "Content optimized and designed for social media algorithms and paid ads"
  ];

  const useCases = [
    {
      title: "For Property Owners",
      description: "We create high-end property videos, walkthrough reels, and photography that attract buyers and make listings look premium."
    },
    {
      title: "For Local Businesses",
      description: "We help cafes, salons, gyms, clinics, stores, and service providers build authentic trust online with strong visual content."
    },
    {
      title: "For Institutes",
      description: "We create engaging promotional videos that highlight courses, classrooms, facilities, trainers, and student success outcomes."
    },
    {
      title: "For Personal Brands",
      description: "We help founders, creators, and professionals create consistent, authority-building reels and photos to scale credibility."
    }
  ];

  return (
    <MotionWrapper>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Services Preview Section */}
      <section className="py-24 bg-brand-white relative" id="services-preview">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-xs uppercase tracking-widest text-brand-red font-bold">Services</h2>
              <h3 className="text-3xl md:text-5xl font-black tracking-tight text-brand-black">
                How We Help Your Brand Grow
              </h3>
            </div>
            <Link 
              href="/services" 
              className="group text-sm font-bold tracking-wide text-brand-black hover:text-brand-red transition-colors duration-200 flex items-center gap-1.5 shrink-0"
            >
              Explore All Services
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, idx) => (
              <ServiceCard 
                key={service.id}
                id={service.id}
                title={service.title}
                shortDescription={service.shortDescription}
                icon={service.icon}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why WillShoot Section */}
      <section className="py-24 bg-brand-soft-white border-y border-brand-light-gray/60 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-red/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-brand-red font-bold">The WillShoot Edge</h2>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-brand-black leading-tight">
              Why Brands Choose WillShoot
            </h3>
            <p className="text-brand-medium-gray text-sm md:text-base leading-relaxed">
              We don't just point a camera and press record. We combine cinematic production with modern marketing strategies to build content that converts views into growth.
            </p>
            <div className="pt-4">
              <Link 
                href="/about"
                className="px-6 py-3 border border-brand-black hover:border-brand-red hover:text-brand-red text-brand-black font-bold tracking-wide rounded-full text-sm transition-all duration-300 inline-block"
              >
                Our Philosophy
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-7 bg-brand-white border border-brand-light-gray/60 rounded-3xl p-8 md:p-12 space-y-6 shadow-sm">
            <div className="grid grid-cols-1 gap-5">
              {whyPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3.5 group">
                  <CheckCircle2 size={20} className="text-brand-red shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-semibold tracking-wide text-brand-black/90 leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Use Cases Section */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-brand-red font-bold">Who We Serve</h2>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-brand-black">
              Tailored Visual Marketing
            </h3>
            <p className="text-brand-medium-gray text-sm md:text-base font-medium">
              Every industry speaks a different language. We translate your offering into a premium online presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div 
                key={index}
                className="bg-brand-soft-white border border-brand-light-gray/40 rounded-2xl p-8 hover:border-brand-red/20 hover:shadow-lg hover:shadow-brand-red/[0.01] transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-brand-red rounded-full" />
                    <h4 className="text-xl font-bold tracking-tight text-brand-black">{useCase.title}</h4>
                  </div>
                  <p className="text-brand-medium-gray text-sm leading-relaxed">{useCase.description}</p>
                </div>
                <div className="pt-4">
                  <Link 
                    href="/contact?interest=all"
                    className="text-xs font-bold uppercase tracking-wider text-brand-red hover:underline flex items-center gap-1"
                  >
                    Discuss your project &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Process Section */}
      <ProcessSection />

      {/* 6. Portfolio Preview Section */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-xs uppercase tracking-widest text-brand-red font-bold">Featured Projects</h2>
              <h3 className="text-3xl md:text-5xl font-black tracking-tight text-brand-black">
                Recent Shoots
              </h3>
            </div>
            <Link 
              href="/work" 
              className="group text-sm font-bold tracking-wide text-brand-black hover:text-brand-red transition-colors duration-200 flex items-center gap-1.5 shrink-0"
            >
              See All Projects
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <PortfolioGrid limit={3} showFilters={false} />
        </div>
      </section>

      {/* 7. CTA Section */}
      <CTASection />
    </MotionWrapper>
  );
}
