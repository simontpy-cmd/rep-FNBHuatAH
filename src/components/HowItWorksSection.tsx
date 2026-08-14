import React, { useState } from 'react';
import { Utensils, Search, LineChart, Award, CheckCircle, ArrowRight, Building, MapPin } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Define Your F&B Business',
      subtitle: 'Concept, cuisine, seating & kitchen parameters',
      desc: 'Input your core concept (Instant Noodle Bar, Specialty Cafe, QSR, Casual Dining), target customer profile, budgeted rent ceiling, kitchen exhaust requirements, and target ticket band.',
      icon: Utensils,
      deliverables: ['Concept profile synthesis', 'Turnkey utility filters (exhaust, grease trap, 3-phase power)', 'Target average ticket band definition'],
      color: 'text-red-600',
      actionLabel: 'Configure in Location Studio',
      targetAnchor: '#studio',
    },
    {
      number: '02',
      title: 'Find Commercial Listings',
      subtitle: 'Filters by Singapore districts & property types',
      desc: 'Analyze candidate planning districts (D01-D28) and identify shophouses, mall units, and HDB commercial spaces that best match your operational footprint and rental budget.',
      icon: Search,
      deliverables: ['Real-time Singapore district mapping', 'Rent per sq ft affordability filters', 'Transit & MRT proximity rankings'],
      color: 'text-blue-600',
      actionLabel: 'Browse Available Listings',
      targetAnchor: '#listings',
    },
    {
      number: '03',
      title: 'Market & Demand Analysis',
      subtitle: 'Validate demand, competition & daypart curves',
      desc: 'Deep-dive into 500m catchment demographics, hourly pedestrian traffic curves (lunch vs evening dayparts), competitor density gaps, and anchor POI draws.',
      icon: LineChart,
      deliverables: ['Hourly pedestrian foot traffic distribution', 'Direct vs adjacent competitor count', 'Demographic spending power & daytime worker ratios'],
      color: 'text-emerald-600',
      actionLabel: 'View Worked Case Study',
      targetAnchor: '#worked-example',
    },
    {
      number: '04',
      title: 'Advisor Recommendation',
      subtitle: 'Attractiveness score & Go / No-Go verdict',
      desc: 'Receive an algorithmic Attractiveness Score (0-100), daily covers breakeven simulation, rent-to-revenue safety index, and an instant Go/No-Go decision from the AI Business Advisor.',
      icon: Award,
      deliverables: ['Comprehensive Attractiveness Score (0-100)', 'Daily breakeven bowl count calculator', 'Definitive Go / No-Go lease verdict'],
      color: 'text-purple-600',
      actionLabel: 'Consult Business Advisor',
      targetAnchor: '#advisor',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs tracking-wider uppercase mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>Methodology • FNB Huat Ah Framework</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Four Steps from Concept to Confident Commercial Lease
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mt-2 md:mt-0">
            A structured advisory workflow that guides you from concept sketch to signing the right commercial lease.
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-white border-red-600 shadow-md ring-2 ring-red-100'
                    : 'bg-white/70 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold font-mono ${isSelected ? 'text-red-600' : 'text-slate-400'}`}>
                    STEP {step.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? step.color : 'text-slate-400'}`} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 truncate">{step.title}</h3>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{step.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span>Phase {steps[activeStep].number} of 04</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                {steps[activeStep].title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {steps[activeStep].desc}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Key Output &amp; Deliverables:
                </div>
                {steps[activeStep].deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <a
                  href={steps[activeStep].targetAnchor}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition shadow-sm active:scale-95"
                >
                  <span>{steps[activeStep].actionLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200 pb-2">
                Methodology Quick Summary
              </div>
              <div className="space-y-2">
                {steps.map((s, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`cursor-pointer p-3 rounded-lg flex items-center justify-between border transition-all ${
                      activeStep === idx
                        ? 'bg-white border-red-500 shadow-2xs'
                        : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono font-bold ${activeStep === idx ? 'text-red-600' : 'text-slate-400'}`}>
                        {s.number}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{s.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{s.subtitle.split('&')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
