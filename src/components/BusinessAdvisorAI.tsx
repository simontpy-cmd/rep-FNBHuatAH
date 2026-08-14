import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Send,
  Loader2,
  HelpCircle,
  CheckCircle2,
  Crosshair,
  Users,
  DollarSign,
  AlertTriangle,
  BarChart2,
  Award,
  RefreshCw,
  Building,
} from 'lucide-react';
import { ADVISOR_QUESTION_TEMPLATES, COMMERCIAL_LISTINGS } from '../data/mockData';
import { CommercialListing, UserBusinessProfile } from '../types';

interface BusinessAdvisorAIProps {
  userProfile: UserBusinessProfile;
  selectedListing?: CommercialListing | null;
}

export const BusinessAdvisorAI: React.FC<BusinessAdvisorAIProps> = ({
  userProfile,
  selectedListing,
}) => {
  const [activeQuestionId, setActiveQuestionId] = useState<string>('ADV-01');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [advisorResponse, setAdvisorResponse] = useState<string>(
    `### **Advisor Go / No-Go Assessment: Tanjong Pagar Plaza (#01-42)**

**Definitive Recommendation: STRONG GO (94/100 Attractiveness Index)**

#### **1. Core Demand & Catchment Fit**
* **Target Customer Alignment:** High concentration of daytime corporate executives and evening gym-goers matching a quick 4-minute average noodle service model.
* **Daypart Split:** 68% Weekday Lunch Surge / 32% Dinner & Takeaway. Capturing peak office hours between 11:45 AM – 2:15 PM will generate over 60% of daily target covers.

#### **2. Financial Viability & Breakeven Modeling**
* **Monthly Base Rent:** S$8,800/mo (S$14.19/sqft).
* **Target Average Ticket Band:** S$9.80 – S$14.50 (Signature Broth + Drink / Side Add-on).
* **Required Daily Covers to Breakeven:** **110 bowls/day** (assuming 71% Gross Margin and 30 operating days).
* **Projected Capacity:** 320 covers/day, yielding a comfortable **2.9x safety multiple over breakeven**.

#### **3. Immediate Action Plan**
* Prioritize high-speed digital ordering kiosks (QR code mobile ordering) to maintain sub-4-minute ticket turnaround during the 12:00 PM – 1:30 PM peak.
* Secure a 3+3 year lease term with a renewal rent cap at ≤8% to protect initial capital investment.`
  );
  const [activeListingId, setActiveListingId] = useState<string>(
    selectedListing ? selectedListing.id : 'LIST-01'
  );

  const currentListing =
    COMMERCIAL_LISTINGS.find((l) => l.id === activeListingId) || COMMERCIAL_LISTINGS[0];

  const getQuestionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return Compass;
      case 'Crosshair':
        return Crosshair;
      case 'Users':
        return Users;
      case 'DollarSign':
        return DollarSign;
      case 'AlertTriangle':
        return AlertTriangle;
      case 'BarChart2':
        return BarChart2;
      case 'Award':
        return Award;
      default:
        return Compass;
    }
  };

  const handleAskTemplate = async (templateId: string) => {
    const template = ADVISOR_QUESTION_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;

    setActiveQuestionId(templateId);
    setLoading(true);

    try {
      const res = await fetch('/api/advisor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: template.sampleQuery,
          listingContext: currentListing,
          userProfile: userProfile,
        }),
      });
      const data = await res.json();
      setAdvisorResponse(data.answer);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim() || loading) return;

    setLoading(true);
    try {
      const res = await fetch('/api/advisor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: customPrompt,
          listingContext: currentListing,
          userProfile: userProfile,
        }),
      });
      const data = await res.json();
      setAdvisorResponse(data.answer);
      setCustomPrompt('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="advisor" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs tracking-wider uppercase mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>Commercial Advisor AI • F&amp;B Decision Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ask the Commercial F&amp;B Advisor
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mt-2 md:mt-0">
            Consult our dedicated Singapore F&amp;B algorithmic advisor on any commercial property, pricing strategy, or risk factor.
          </p>
        </div>

        {/* Selected Context Bar */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600 font-bold">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                Active Listing Context for Advisor
              </span>
              <span className="text-sm font-bold text-slate-900">
                {currentListing.name} ({currentListing.districtCode})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-medium">Change context:</span>
            <select
              value={activeListingId}
              onChange={(e) => setActiveListingId(e.target.value)}
              className="bg-white border border-slate-200 text-xs font-semibold text-slate-800 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {COMMERCIAL_LISTINGS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.districtCode} - {l.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 7 Core Question Templates Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {ADVISOR_QUESTION_TEMPLATES.map((tmpl) => {
            const Icon = getQuestionIcon(tmpl.iconName);
            const isSelected = activeQuestionId === tmpl.id;
            return (
              <button
                key={tmpl.id}
                onClick={() => handleAskTemplate(tmpl.id)}
                disabled={loading}
                className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-red-50/60 border-red-500 shadow-xs ring-1 ring-red-200'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{tmpl.id}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">{tmpl.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{tmpl.description}</p>
                </div>

                <div className="pt-2 text-[10px] text-red-600 font-bold flex items-center gap-1">
                  <span>Ask this question</span>
                  <span>→</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Advisor AI Response Display Terminal */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <span>Commercial Advisory Memo</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                    Live Engine
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Synthesized for {currentListing.name}
                </p>
              </div>
            </div>

            {loading && (
              <div className="flex items-center gap-2 text-xs text-red-600 font-bold animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Computing Spatial Demand...</span>
              </div>
            )}
          </div>

          {/* Render Response Markdown Body */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 max-h-[480px] overflow-y-auto space-y-3 font-sans text-xs sm:text-sm text-slate-800 leading-relaxed">
            {loading ? (
              <div className="py-16 text-center space-y-3">
                <Loader2 className="w-8 h-8 text-red-600 animate-spin mx-auto" />
                <p className="text-xs text-slate-500">
                  Validating catchment demographics, footfall curve, and lease breakeven multiple...
                </p>
              </div>
            ) : (
              <div
                className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: advisorResponse
                    .replace(/^### (.*$)/gim, '<h3 class="text-base font-black text-red-700 mt-3 mb-1.5">$1</h3>')
                    .replace(/^#### (.*$)/gim, '<h4 class="text-sm font-bold text-slate-900 mt-2 mb-1">$1</h4>')
                    .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-slate-950 font-black">$1</strong>')
                    .replace(/^\* (.*$)/gim, '<div class="flex items-start gap-2 my-0.5"><span class="text-red-600 mt-0.5 font-bold">•</span><span>$1</span></div>'),
                }}
              />
            )}
          </div>

          {/* Custom Query Input Bar */}
          <form onSubmit={handleCustomSubmit} className="flex gap-2">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Ask custom question (e.g. What is the expected dinner revenue if we open till 11:30 PM in Bugis?)..."
              disabled={loading}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
            />
            <button
              type="submit"
              disabled={loading || !customPrompt.trim()}
              className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask Advisor</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
