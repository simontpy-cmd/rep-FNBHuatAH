import React from 'react';
import { Compass, Mail, Phone, MapPin, Globe, ShieldCheck, Building } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold shadow-xs">
                <Building className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                FNB <span className="text-red-500">Huat Ah</span> <span className="text-xs px-2 py-0.5 rounded bg-red-600 text-white font-bold ml-1">SINGAPORE</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Singapore's premier Commercial F&amp;B Property Portal &amp; Location Intelligence Platform. Empowering food entrepreneurs with spatial catchment demographics, pedestrian footfall data, verified shophouse &amp; mall listings, and algorithmic unit economics.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-red-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Singapore Spatial Intelligence Network v2.5 Active</span>
            </div>
          </div>

          {/* Navigation Frames Col 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Commercial Property
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#map-search" className="hover:text-red-400 transition-colors">
                  Commercial F&amp;B Map Search
                </a>
              </li>
              <li>
                <a href="#map-search" className="hover:text-red-400 transition-colors">
                  Shophouses &amp; Mall Units
                </a>
              </li>
              <li>
                <a href="#key-factors" className="hover:text-red-400 transition-colors">
                  7-Pillar Attractiveness Score
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Frames Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              F&amp;B Feasibility
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#advisor" className="hover:text-red-400 transition-colors">
                  Commercial Advisor AI
                </a>
              </li>
              <li>
                <a href="#key-factors" className="hover:text-red-400 transition-colors">
                  7-Pillar Scoring &amp; URA Feed
                </a>
              </li>
              <li>
                <a href="#who-its-for" className="hover:text-red-400 transition-colors">
                  Target Audiences &amp; Operators
                </a>
              </li>
              <li>
                <a href="#vision" className="hover:text-red-400 transition-colors">
                  Vision: What &amp; Why
                </a>
              </li>
            </ul>
          </div>

          {/* Contact / Singapore Presence */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Singapore Office
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
                <span>Paya Lebar Quarter 1, #12-01, Singapore 409051</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>contact@fnbhuatah.sg</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>fnbhuatah.sg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} FNB Huat Ah. Singapore F&amp;B Commercial Real Estate &amp; Location Intelligence. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Commercial Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">URA Master Plan &amp; SLA Data</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
