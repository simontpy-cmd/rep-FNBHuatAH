import React, { useState } from 'react';
import {
  Users,
  Footprints,
  Store,
  Train,
  MapPin,
  Receipt,
  TrendingUp,
  Sliders,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { PLATFORM_KEY_FACTORS } from '../data/mockData';

export const KeyFactorsSection: React.FC = () => {
  const [selectedFactorIndex, setSelectedFactorIndex] = useState(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return Users;
      case 'Footprints':
        return Footprints;
      case 'Store':
        return Store;
      case 'Train':
        return Train;
      case 'MapPin':
        return MapPin;
      case 'Receipt':
        return Receipt;
      case 'TrendingUp':
        return TrendingUp;
      default:
        return MapPin;
    }
  };

  const selectedFactor = PLATFORM_KEY_FACTORS[selectedFactorIndex];
  const MainIcon = getIcon(selectedFactor.iconName);

  return (
    <section id="key-factors" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs tracking-wider uppercase mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>Attractiveness Scoring • 7 Pillars</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Key Factors for Commercial F&amp;B Site Evaluation
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mt-2 md:mt-0">
            To derive an objective attractiveness score of all available Commercial Listings across Singapore.
          </p>
        </div>

        {/* Factors Explorer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Factor List */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1 pb-1">
              Select an Evaluation Pillar
            </div>

            {PLATFORM_KEY_FACTORS.map((factor, index) => {
              const Icon = getIcon(factor.iconName);
              const isSelected = selectedFactorIndex === index;
              return (
                <button
                  key={factor.id}
                  onClick={() => setSelectedFactorIndex(index)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-red-50/60 border-red-500 shadow-xs ring-1 ring-red-200'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-red-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span>{factor.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{factor.description}</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                      isSelected ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {factor.weight}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Card */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                    <MainIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-red-600 uppercase">
                        Factor 0{selectedFactorIndex + 1}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 font-bold">
                        Algorithm Weight: {selectedFactor.weight}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">{selectedFactor.title}</h3>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Factor Definition &amp; Commercial Impact
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {selectedFactor.description}
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Granular Singapore Spatial Signals Captured:
                </h4>
                <div className="space-y-2">
                  {selectedFactor.dataPoints.map((dp, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{dp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formula & Practical Rule */}
              <div className="p-4 rounded-xl bg-red-50/80 border border-red-200 text-xs text-red-900 leading-relaxed flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-red-700 block mb-0.5">Commercial Advisor Rule of Thumb:</strong>
                  High {selectedFactor.title} scores insulate your F&amp;B concept against weekday downturns and shorten your rent-to-profit breakeven timeline.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
