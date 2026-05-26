"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Instagram, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-brand-white border-t border-brand-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 relative z-10">
        {/* Brand Block */}
        <div className="md:col-span-2 space-y-6">
          <Link href="/" className="relative w-40 h-10 flex items-center">
            <Image 
              src="/logo.png" 
              alt="WillShoot Logo" 
              fill
              className="object-contain"
            />
          </Link>
          <p className="text-brand-medium-gray text-sm max-w-sm leading-relaxed">
            WillShoot creates premium videos, photos, reels, and marketing campaigns that help businesses stand out online and attract the right audience.
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-brand-white/5 hover:bg-brand-red transition-colors duration-300 flex items-center justify-center text-brand-white/80 hover:text-brand-white"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="mailto:shoot@willshoot.com" 
              className="w-9 h-9 rounded-full bg-brand-white/5 hover:bg-brand-red transition-colors duration-300 flex items-center justify-center text-brand-white/80 hover:text-brand-white"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold tracking-wider uppercase text-brand-white/90">Navigation</h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/" className="text-brand-medium-gray hover:text-brand-white text-sm transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-brand-medium-gray hover:text-brand-white text-sm transition-colors duration-200">
                Services
              </Link>
            </li>
            <li>
              <Link href="/work" className="text-brand-medium-gray hover:text-brand-white text-sm transition-colors duration-200">
                Work / Portfolio
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-brand-medium-gray hover:text-brand-white text-sm transition-colors duration-200">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-brand-medium-gray hover:text-brand-white text-sm transition-colors duration-200">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold tracking-wider uppercase text-brand-white/90">Get In Touch</h4>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3 text-brand-medium-gray text-sm">
              <MapPin size={18} className="text-brand-red shrink-0 mt-0.5" />
              <span>Based in Melbourne.<br />Available for shoots across nearby areas.</span>
            </li>
            <li className="flex items-center space-x-3 text-brand-medium-gray text-sm">
              <Mail size={18} className="text-brand-red shrink-0" />
              <a href="mailto:shoot@willshoot.com" className="hover:text-brand-white transition-colors duration-200">
                shoot@willshoot.com
              </a>
            </li>
            <li className="flex items-center space-x-3 text-brand-medium-gray text-sm">
              <Phone size={18} className="text-brand-red shrink-0" />
              <a href="tel:+61400000000" className="hover:text-brand-white transition-colors duration-200">
                +61 400 000 000
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-brand-white/5 flex flex-col md:flex-row justify-between items-center relative z-10 text-brand-medium-gray text-xs space-y-4 md:space-y-0">
        <div>
          &copy; {currentYear} WillShoot. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <span className="hover:text-brand-white transition-colors duration-200 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-brand-white transition-colors duration-200 cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
