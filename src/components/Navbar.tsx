import React, { useState, useEffect } from 'react';
import { Building2, MapPin, SlidersHorizontal, Scale, ChevronRight, Menu, X, Bookmark, Sparkles, PhoneCall, PlusCircle, Search } from 'lucide-react';

interface NavbarProps {
  shortlistCount: number;
  onOpenCompare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  shortlistCount,
  onOpenCompare,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#map-search', label: 'Map Search & Units' },
    { href: '#advisor', label: 'Commercial AI Advisor' },
    { href: '#worked-example', label: 'Tanjong Pagar Case' },
    { href: '#key-factors', label: '7-Pillar Scoring' },
    { href: '#how-it-works', label: 'Methodology' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-2.5'
          : 'bg-white border-b border-slate-200 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top utility row on large desktop */}
        <div className="hidden lg:flex items-center justify-between text-xs text-slate-500 pb-1.5 mb-1.5 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              Singapore's #1 Commercial F&B Real Estate &amp; Location Intelligence Portal
            </span>
            <span>|</span>
            <span className="text-slate-500">Median F&B Rent: <strong>S$13.80 psf</strong></span>
            <span>|</span>
            <span className="text-slate-500">URA &amp; SFA Food Shop Approved Database</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#advisor" className="hover:text-red-600 font-medium transition">Ask Commercial Advisor</a>
            <span>|</span>
            <a href="#worked-example" className="hover:text-red-600 font-medium transition">Tanjong Pagar Case Study</a>
            <span>|</span>
            <span className="text-slate-700 font-semibold">SGD ($)</span>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="flex items-center justify-between">
          {/* Brand Logo - FNB Huat Ah */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-md shadow-red-600/20 group-hover:bg-red-700 transition">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900 font-sans">
                  FNB <span className="text-red-600">Huat Ah</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                  SINGAPORE F&amp;B
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-tight">
                Commercial F&amp;B Property &amp; Location Intelligence Platform
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-xs font-semibold rounded-lg text-slate-700 hover:text-red-600 hover:bg-red-50/80 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Compare Shortlist Button */}
            <button
              id="nav-compare-shortlist-btn"
              onClick={onOpenCompare}
              className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 transition-all hover:border-slate-300 shadow-2xs"
            >
              <Scale className="w-4 h-4 text-red-600" />
              <span>Compare</span>
              {shortlistCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full bg-red-600 text-white">
                  {shortlistCount}
                </span>
              )}
            </button>

            {/* Map Search CTA Button */}
            <a
              href="#map-search"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-600/20 transition-all active:scale-95"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Map Search</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenCompare}
              className="relative p-2 rounded-lg bg-slate-100 text-slate-800 border border-slate-200"
              aria-label="Compare Shortlist"
            >
              <Scale className="w-4 h-4 text-red-600" />
              {shortlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[9px] font-bold rounded-full bg-red-600 text-white flex items-center justify-center">
                  {shortlistCount}
                </span>
              )}
            </button>
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-800 border border-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-xs font-semibold rounded-lg bg-slate-50 border border-slate-200 text-slate-800 hover:bg-red-50 hover:text-red-600 transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#map-search"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <MapPin className="w-4 h-4" />
              <span>Explore Units on Map</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
