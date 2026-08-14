import React from 'react';
import { Target, Users, Footprints, ShieldAlert, Zap, CheckCircle2, ArrowRight, Building, Sparkles } from 'lucide-react';

export const VisionSection: React.FC = () => {
  const pillars = [
    {
      title: 'Target Demographics',
      subtitle: 'Income & Catchment Fit',
      desc: 'Deep catchment profile: age distribution, resident vs office worker ratios, and daytime dining budgets.',
      icon: Users,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-100',
    },
    {
      title: 'Real Foot Traffic',
      subtitle: 'Hourly Volume Dynamics',
      desc: 'Granular pedestrian volume across 7-day cycles to gauge walk-in surge and daypart demand curves.',
      icon: Footprints,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
    },
    {
      title: 'Competition Density',
      subtitle: 'Catchment Gap Analysis',
      desc: 'Identify overcrowded food genres vs high-margin unmet dining niches within 500m to 1km radius.',
      icon: ShieldAlert,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
    {
      title: 'Unit Economics & Rent',
      subtitle: 'Lease Breakeven Modeling',
      desc: 'Ensure your menu pricing, food cost (COGS), and ticket size comfortably support the rent per sqft.',
      icon: Zap,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
  ];

  return (
    <section id="vision" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs tracking-wider uppercase mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>Core Vision • FNB Huat Ah Location Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              The What and the Why
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mt-2 md:mt-0">
            Eliminating guesswork from Singapore F&amp;B commercial leasing through spatial data and algorithmic demand validation.
          </p>
        </div>

        {/* Platform Purpose Core Box */}
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm relative overflow-hidden mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-50 text-red-700 text-xs font-bold border border-red-200">
                <Target className="w-3.5 h-3.5" />
                <span>Commercial Location Intelligence</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-slate-900 leading-snug">
                An AI-powered platform to discover optimal commercial locations for F&amp;B businesses and analyze market potential with data-driven confidence.
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We combine <strong className="text-slate-800">demographics</strong>,{' '}
                <strong className="text-slate-800">pedestrian foot traffic</strong>,{' '}
                <strong className="text-slate-800">competitor density</strong>, and{' '}
                <strong className="text-slate-800">unit economics</strong> to give F&amp;B entrepreneurs total clarity to sign the right commercial lease.
              </p>

              <div className="pt-2 flex flex-wrap gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero blind lease commitments</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Transparent rent-to-revenue ratios</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>URA &amp; SFA Food Shop compliant</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
                The 4-Pillar Decision Framework
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs font-semibold text-slate-800">1. Find the best place</span>
                  <span className="text-[11px] font-bold text-red-600">Target Match</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs font-semibold text-slate-800">2. Validate the opportunity</span>
                  <span className="text-[11px] font-bold text-emerald-600">Data-Backed</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs font-semibold text-slate-800">3. Make confident decisions</span>
                  <span className="text-[11px] font-bold text-blue-600">AI Advisor</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs font-semibold text-slate-800">4. Sign the right lease</span>
                  <span className="text-[11px] font-bold text-amber-600">Huat Ah!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className={`p-6 rounded-2xl bg-white border ${p.border} hover:border-red-300 hover:shadow-md transition-all hover:-translate-y-0.5`}
              >
                <div className={`w-11 h-11 rounded-xl ${p.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${p.color}`} />
                </div>
                <h4 className="text-base font-bold text-slate-900">{p.title}</h4>
                <p className={`text-xs font-semibold ${p.color} mt-0.5 mb-2`}>{p.subtitle}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
