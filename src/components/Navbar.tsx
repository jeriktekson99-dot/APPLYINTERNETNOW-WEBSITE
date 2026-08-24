import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X
} from 'lucide-react';

const BRAND_LOGO_URL = 'https://lh3.googleusercontent.com/d/16lxsmy7lYeNfBEqh7-lhHvtPM6gbdeBz';

interface NavbarProps {
  onOpenSubscribe?: (planId?: string) => void;
  onOpenCoverage?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCoverage,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Plans & Pricing', href: '#packages' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'FAQs', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isLocation?: boolean) => {
    e.preventDefault();
    if (isLocation) {
      if (onOpenCoverage) onOpenCoverage();
      setMobileMenuOpen(false);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3.5'
          : 'bg-white py-4 sm:py-5 border-b border-slate-100/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo */}
          <a
            href="#home"
            className="flex items-center group focus:outline-none"
            id="brand-logo-link"
          >
            <img
              src={BRAND_LOGO_URL}
              alt="FiberX"
              referrerPolicy="no-referrer"
              className="h-10 sm:h-12 w-auto max-w-[200px] object-contain transition-transform group-hover:scale-105"
            />
          </a>

          {/* Right Links on desktop */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[15px] font-medium text-slate-600 hover:text-[#180D3D] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2A4BFF] transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            ))}
          </nav>

          {/* Mobile menu hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top duration-200 shadow-xl"
        >
          <div className="flex flex-col space-y-1 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg block"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
