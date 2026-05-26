"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navBackground = isScrolled 
    ? "bg-brand-black/90 backdrop-blur-md border-b border-brand-white/5 py-4" 
    : "bg-transparent py-6";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative w-40 h-10 flex items-center">
            <Image 
              src="/logo.png" 
              alt="WillShoot Logo" 
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="relative text-sm font-medium tracking-wide text-brand-white/80 hover:text-brand-white transition-colors duration-200"
                >
                  {link.label}
                  {isActive && (
                    <motion.span 
                      layoutId="activeDot"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-red rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link 
              href="/contact?ref=navbar"
              className="bg-brand-red hover:bg-brand-red/90 text-brand-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 transform hover:scale-[1.03] inline-block shadow-lg shadow-brand-red/20"
            >
              Book a Shoot
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-brand-white focus:outline-none p-2 relative z-50"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-brand-black z-40 flex flex-col justify-center items-center md:hidden"
          >
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-red/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-white/5 rounded-full blur-[100px] pointer-events-none" />

            <nav className="flex flex-col items-center space-y-8 relative z-10">
              {NAV_LINKS.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: idx * 0.08,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <Link 
                      href={link.href}
                      className={`text-2xl font-bold tracking-wider relative ${
                        isActive ? "text-brand-red" : "text-brand-white"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span 
                          layoutId="mobileActiveLine"
                          className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-red"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: NAV_LINKS.length * 0.08,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="pt-6"
              >
                <Link 
                  href="/contact?ref=navbar_mobile"
                  className="bg-brand-red hover:bg-brand-red/90 text-brand-white px-8 py-3.5 rounded-full text-base font-bold tracking-wide transition-all duration-200 block shadow-lg shadow-brand-red/20 text-center"
                >
                  Book a Shoot
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
