"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

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

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    ? "premium-dark-panel py-3.5 md:py-4 border-b border-white/8" 
    : "bg-transparent py-5 md:py-6";

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="relative w-32 h-9 sm:w-36 sm:h-10 md:w-40 md:h-10 flex items-center shrink-0">
            <Image 
              src="/logo.png" 
              alt="WillShoot Logo" 
              fill
              sizes="(max-width: 640px) 128px, 160px"
              className="object-contain [filter:invert(1)_hue-rotate(180deg)]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 premium-dark-panel rounded-full px-3 py-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-brand-white"
                      : "text-brand-white/72 hover:text-brand-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-white/8"
                      transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.span 
                      layoutId="activeDot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-red rounded-full"
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
              className="group bg-brand-red hover:bg-brand-red/90 text-brand-white px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 transform hover:scale-[1.03] inline-flex items-center gap-2 shadow-lg shadow-brand-red/20"
            >
              Book a Shoot
              <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-brand-white focus:outline-none w-12 h-12 flex items-center justify-center relative z-50 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-brand-black/92 z-40 flex flex-col justify-center items-center md:hidden backdrop-blur-xl"
          >
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-red/12 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-white/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-x-6 top-24 h-px bg-white/10 overflow-hidden">
              <span className="block w-1/3 h-full bg-brand-red animate-shimmer-line" />
            </div>

            <nav className="flex flex-col items-center space-y-3 relative z-10 w-full max-w-sm px-6">
              {NAV_LINKS.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: idx * 0.08,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="w-full text-center"
                  >
                    <Link 
                      href={link.href}
                      onClick={closeMenu}
                      className={`premium-dark-panel text-xl sm:text-2xl font-bold tracking-[0.22em] relative py-4 px-6 block text-center transition-colors duration-200 rounded-3xl ${
                        isActive ? "text-brand-red" : "text-brand-white hover:text-brand-red/80"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span 
                          layoutId="mobileActiveLine"
                          className="absolute bottom-2 left-1/4 right-1/4 h-[2px] bg-brand-red"
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
                  onClick={closeMenu}
                  className="bg-brand-red hover:bg-brand-red/90 text-brand-white px-8 py-3.5 rounded-full text-base font-bold tracking-wide transition-all duration-200 inline-flex items-center gap-2 shadow-lg shadow-brand-red/20 text-center"
                >
                  Book a Shoot
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
