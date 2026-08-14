import React, { useState } from 'react';
import {
  LineChart,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Award,
  Users,
  Store,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const MarketAnalysisExample: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'demand' | 'competition' | 'score'>('demand');

  return (
    <section id="worked-example" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs tracking-wider uppercase mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>Live Case Study • Commercial Feasibility</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Market Analysis Example: Instant Noodles &amp; Broth Bar
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mt-2 md:mt-0">
            A comprehensive, step-by-step worked example analyzing a quick-serve noodle concept in a mixed office and residential catchment.
          </p>
        </div>

        {/* Case Study Header Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm mb-8 text-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-bold">
                  Worked Example • Instant Noodles Concept
                </span>
                <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium">
                  Catchment: Tanjong Pagar / D02
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Quick-Serve Noodle Bar in Mixed Office &amp; Residential Node
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Evaluating a 620 sqft ground-floor commercial unit at S$8,800/mo (S$14.19/sqft) with a 4-minute service time target and S$9.80 – S$14.50 average spend band.
              </p>
            </div>

            <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                  Attractiveness Score
                </span>
                <span className="text-3xl font-black text-red-600 font-mono">94 / 100</span>
                <span className="text-[11px] text-emerald-700 block font-bold mt-0.5">
                  ★ Strong Go Recommendation
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                <Award className="w-7 h-7" />
              </div>
            </div>
          </div>

          {/* Interactive Case Tabs */}
          <div className="flex items-center gap-2 pt-5 mt-5 border-t border-slate-200">
            <button
              onClick={() => setActiveTab('demand')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'demand'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              1. Demand Analysis
            </button>
            <button
              onClick={() => setActiveTab('competition')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'competition'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              2. Competition Analysis
            </button>
            <button
              onClick={() => setActiveTab('score')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'score'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              3. Recommendation Breakdown
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'demand' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Office Lunch Surge</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strong lunch-time demand from nearby Guoco Tower and International Plaza offices. Over 18,000 corporate workers within 5-minute walk.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 text-[11px] text-red-700 font-semibold border border-slate-200">
                Peak Hours: 11:45 AM – 2:15 PM (68% daily revenue)
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Rising Category Search</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Category search interest for elevated instant noodles, Korean Shin ramyeon bars, and artisanal laksa broth is up +42% YoY in Singapore.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 text-[11px] text-emerald-700 font-semibold border border-slate-200">
                Healthy Ticket Band: S$9.80 – S$14.50
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Second Daypart: Evening Residential</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tanjong Pagar Plaza and Cantonment residential blocks provide consistent dinner and takeaway demand, eliminating dead weekday evenings.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 text-[11px] text-blue-700 font-semibold border border-slate-200">
                Dinner / Supper Window: 6:00 PM – 10:30 PM (32% daily revenue)
              </div>
            </div>
          </div>
        )}

        {activeTab === 'competition' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Catchment Competitor Audit</h4>
                  <p className="text-xs text-slate-500">Within 500m radius of Tanjong Pagar Plaza</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span>Traditional Hawker Noodle Stalls (Lau Pa Sat / Amoy)</span>
                  <span className="font-semibold text-slate-600">2 Generalist Stalls</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span>Dedicated Specialty Noodle House</span>
                  <span className="font-semibold text-slate-600">1 Outlet</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span>Fast DIY Custom Noodle Bar</span>
                  <span className="font-bold text-emerald-700">0 (Zero Direct Competitor)</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-600" />
                <span>The Unmet Commercial Gap</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clear structural gap exists for a <strong className="text-slate-900">fast, single-focus concept with modern vibrant branding</strong> that provides air-conditioned seating, high-speed 4-minute service, and customizable viral toppings (Truffle, Mala, Lava Eggs) at an accessible S$10 price point.
              </p>
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900">
                <strong>Defensibility:</strong> Speed and modern digital pre-ordering create a moat against slow dine-in restaurants and hot, crowded hawker centres.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'score' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-6">
            <h4 className="text-base font-bold text-slate-900">
              7-Factor Weighted Attractiveness Breakdown
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-medium">Demographics &amp; Income Match</span>
                  <span className="font-mono font-bold text-red-600">96 / 100</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 rounded-full" style={{ width: '96%' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-medium">Foot Traffic Density &amp; Visibility</span>
                  <span className="font-mono font-bold text-emerald-700">94 / 100</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-medium">Competition &amp; Category Gap</span>
                  <span className="font-mono font-bold text-blue-600">88 / 100</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-medium">Transportation &amp; MRT Access</span>
                  <span className="font-mono font-bold text-purple-600">98 / 100</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '98%' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-medium">Rent Affordability (S$14.19/sqft)</span>
                  <span className="font-mono font-bold text-emerald-700">91 / 100</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '91%' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-medium">Growth Potential &amp; Master Plan</span>
                  <span className="font-mono font-bold text-red-600">95 / 100</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
