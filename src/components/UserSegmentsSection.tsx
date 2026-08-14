import React, { useState } from 'react';
import { Rocket, Layers, Building2, TrendingUp, Home, Coffee, Check, ArrowRight } from 'lucide-react';
import { USER_SEGMENTS_DATA } from '../data/mockData';

export const UserSegmentsSection: React.FC = () => {
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);

  const getSegmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Rocket':
        return Rocket;
      case 'Layers':
        return Layers;
      case 'Building2':
        return Building2;
      case 'TrendingUp':
        return TrendingUp;
      case 'Home':
        return Home;
      case 'Coffee':
        return Coffee;
      default:
        return Rocket;
    }
  };

  const activeSegment = USER_SEGMENTS_DATA[activeSegmentIndex];
  const CurrentIcon = getSegmentIcon(activeSegment.iconName);

  return (
    <section id="who-its-for" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs tracking-wider uppercase mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>Target Audiences • FNB Huat Ah Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Who FNB Huat Ah is Built For
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mt-2 md:mt-0">
            Tailored location intelligence engineered for every stage of the F&amp;B and commercial real estate lifecycle.
          </p>
        </div>

        {/* 6 User Segments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {USER_SEGMENTS_DATA.map((seg, idx) => {
            const Icon = getSegmentIcon(seg.iconName);
            const isSelected = activeSegmentIndex === idx;
            return (
              <div
                key={seg.id}
                onClick={() => setActiveSegmentIndex(idx)}
                className={`cursor-pointer p-6 rounded-2xl border transition-all hover:-translate-y-0.5 ${
                  isSelected
                    ? 'bg-white border-red-600 shadow-md ring-2 ring-red-100'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-red-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase">
                    Segment 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-0.5">{seg.title}</h3>
                <p className="text-xs text-red-600 font-semibold mb-3">{seg.tagline}</p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {seg.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span className="line-clamp-2">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold shrink-0 shadow-xs">
              <CurrentIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                Ready to evaluate your concept as a {activeSegment.title}?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500">
                Run an algorithmic location match and rent-to-revenue breakeven simulation right now.
              </p>
            </div>
          </div>

          <a
            href="#studio"
            className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-sm transition active:scale-95 flex items-center gap-2"
          >
            <span>Launch Location Studio</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
