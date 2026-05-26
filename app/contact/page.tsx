import type { Metadata } from "next";
import { Mail, Phone, Instagram, MessageSquare, MapPin } from "lucide-react";
import MotionWrapper from "@/components/MotionWrapper";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | WillShoot",
  description: "Contact WillShoot to book a video shoot, photography session, social media management plan, or Meta Ads campaign.",
};

export default function ContactPage() {
  return (
    <MotionWrapper>
      {/* Page Hero */}
      <section className="bg-brand-pure-black text-brand-white pt-32 pb-20 relative overflow-hidden">
        {/* Viewfinder borders */}
        <div className="absolute top-20 left-10 w-8 h-8 border-t border-l border-brand-red/20 pointer-events-none" />
        <div className="absolute top-20 right-10 w-8 h-8 border-t border-r border-brand-red/20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-6 text-center max-w-3xl">
          <h1 className="text-xs uppercase tracking-widest text-brand-red font-bold">Start Your Project</h1>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Let's Create Content That Converts
          </h2>
          <p className="text-brand-medium-gray text-base md:text-lg leading-relaxed font-medium">
            Ready to book a shoot or discuss a marketing campaign? Fill out the brief below and we will get back to you with a custom strategy within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Form & Details Section */}
      <section className="py-24 bg-brand-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column: Contact Details */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-28">
            <div className="space-y-4">
              <span className="w-1.5 h-6 bg-brand-red rounded-full block" />
              <h3 className="text-2xl font-bold tracking-tight text-brand-black">We Shoot. You Grow.</h3>
              <p className="text-brand-medium-gray text-sm md:text-base leading-relaxed">
                Tell us what you want to shoot. We'll help you turn it into content that works. Whether you need an academy tour, property reel, cafe promotion, or a high-converting ad funnel, we are ready.
              </p>
            </div>

            <div className="border border-brand-light-gray/60 rounded-3xl p-6 md:p-8 space-y-6 bg-brand-soft-white/50">
              <h4 className="text-sm font-bold uppercase tracking-wider text-brand-black">Direct Channels</h4>
              
              <div className="grid grid-cols-1 gap-5">
                {/* Location */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-black text-brand-white flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-brand-medium-gray font-bold">Service Area</p>
                    <p className="text-sm font-semibold tracking-wide text-brand-black mt-0.5">
                      Based in Melbourne. Available for shoots across nearby areas.
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-black text-brand-white flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-brand-medium-gray font-bold">Email Us</p>
                    <a href="mailto:contact@willshoot.au" className="text-sm font-semibold tracking-wide text-brand-black hover:text-brand-red transition-colors duration-200 mt-0.5 block">
                      contact@willshoot.au
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-black text-brand-white flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-brand-medium-gray font-bold">Call Us</p>
                    <a href="tel:+61478635406" className="text-sm font-semibold tracking-wide text-brand-black hover:text-brand-red transition-colors duration-200 mt-0.5 block">
                      +61 478 635 406
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-black text-brand-white flex items-center justify-center shrink-0">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-brand-medium-gray font-bold">Follow Us</p>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold tracking-wide text-brand-black hover:text-brand-red transition-colors duration-200 mt-0.5 block">
                      @willshoot
                    </a>
                  </div>
                </div>

                {/* Direct WhatsApp */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-brand-white flex items-center justify-center shrink-0">
                    <MessageSquare size={20} className="fill-brand-white text-brand-white" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-brand-medium-gray font-bold">Immediate Chat</p>
                    <a href="https://wa.me/61478635406?text=Hi%20WillShoot!%20I'd%20like%20to%20book%20a%20shoot%20for%20my%20business." target="_blank" rel="noopener noreferrer" className="text-sm font-semibold tracking-wide text-brand-black hover:text-brand-red transition-colors duration-200 mt-0.5 block">
                      Message on WhatsApp
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>
    </MotionWrapper>
  );
}
