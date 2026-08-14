import React, { useState } from 'react';
import {
  Sliders,
  Sparkles,
  MapPin,
  Utensils,
  DollarSign,
  Maximize2,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  Building,
} from 'lucide-react';
import { UserBusinessProfile, CommercialListing } from '../types';
import { COMMERCIAL_LISTINGS, SINGAPORE_DISTRICTS } from '../data/mockData';

interface LocationStudioProps {
  profile: UserBusinessProfile;
  onUpdateProfile: (newProfile: UserBusinessProfile) => void;
  onSelectListingForDetail: (listing: CommercialListing) => void;
}

export const LocationStudio: React.FC<LocationStudioProps> = ({
  profile,
  onUpdateProfile,
  onSelectListingForDetail,
}) => {
  const [concept, setConcept] = useState<string>(profile.businessConcept);
  const [ticketBand, setTicketBand] = useState<string>(profile.ticketSizeBand);
  const [preferredDistrict, setPreferredDistrict] = useState<string>(profile.preferredDistrict);
  const [maxRent, setMaxRent] = useState<number>(profile.budgetedMonthlyRentMax);
  const [minSize, setMinSize] = useState<number>(profile.floorAreaMinSqft);
  const [needsExhaust, setNeedsExhaust] = useState<boolean>(profile.requiresKitchenExhaust);
  const [needsGreaseTrap, setNeedsGreaseTrap] = useState<boolean>(profile.requiresGreaseTrap);

  const handleApplyCriteria = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      businessConcept: concept,
      cuisineType: 'Asian Quick-Serve / Artisan Broths',
      targetCustomer: 'Corporate Workers, Foodies & Residential Diners',
      ticketSizeBand: ticketBand,
      budgetedMonthlyRentMax: maxRent,
      floorAreaMinSqft: minSize,
      requiresKitchenExhaust: needsExhaust,
      requiresGreaseTrap: needsGreaseTrap,
      preferredDistrict: preferredDistrict,
    });
  };

  // Compute live match score against listings
  const matchingListings = COMMERCIAL_LISTINGS.map((listing) => {
    let matchScore = 70; // baseline
    if (listing.monthlyRent <= maxRent) matchScore += 10;
    if (listing.floorAreaSqft >= minSize) matchScore += 5;
    if (!needsExhaust || listing.features.exhaustFitted) matchScore += 5;
    if (!needsGreaseTrap || listing.features.greaseTrap) matchScore += 5;
    if (preferredDistrict === 'ALL' || listing.districtCode === preferredDistrict) matchScore += 10;

    return {
      listing,
      calculatedMatchScore: Math.min(matchScore, 99),
    };
  }).sort((a, b) => b.calculatedMatchScore - a.calculatedMatchScore);

  const topMatch = matchingListings[0];

  return (
    <section id="studio" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs tracking-wider uppercase mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>Location Matcher • FNB Huat Ah Studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Define Your Business &amp; Auto-Match Prime Locations
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mt-2 md:mt-0">
            Tune your concept parameters to run an instant algorithmic match across all Singapore commercial properties.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Concept Configuration */}
          <form
            onSubmit={handleApplyCriteria}
            className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-5 text-slate-800"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-red-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase">F&amp;B Concept Specifications</h3>
              </div>
              <span className="text-xs text-red-600 font-bold">Real-time matching</span>
            </div>

            {/* Concept Type */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-red-600" />
                <span>F&amp;B Concept Model</span>
              </label>
              <select
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                className="w-full bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
              >
                <option value="Instant Noodles & Broth Bar">🍜 Instant Noodles &amp; Broth Bar (Primary)</option>
                <option value="Specialty Artisanal Cafe">☕ Specialty Artisanal Cafe</option>
                <option value="Quick-Service Grab & Go">🥡 Quick-Service Grab &amp; Go (QSR)</option>
                <option value="Casual Asian Dining & Hotpot">🥢 Casual Asian Dining &amp; Hotpot</option>
                <option value="Bakery & Dessert Patisserie">🥐 Bakery &amp; Dessert Patisserie</option>
              </select>
            </div>

            {/* Ticket Band & Preferred District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-red-600" />
                  <span>Target Ticket Band</span>
                </label>
                <select
                  value={ticketBand}
                  onChange={(e) => setTicketBand(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-xs text-slate-900 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                >
                  <option value="S$6.00 - S$9.00 (Budget QSR)">S$6.00 - S$9.00 (Budget QSR)</option>
                  <option value="S$9.80 - S$14.50 (Comfort Casual)">S$9.80 - S$14.50 (Comfort Casual)</option>
                  <option value="S$15.00 - S$24.00 (Premium Fast Casual)">S$15.00 - S$24.00 (Premium Fast Casual)</option>
                  <option value="S$25.00+ (Full Service Dining)">S$25.00+ (Full Service Dining)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>Target Planning Zone</span>
                </label>
                <select
                  value={preferredDistrict}
                  onChange={(e) => setPreferredDistrict(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-xs text-slate-900 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                >
                  <option value="ALL">Any Prime Location (Singapore Wide)</option>
                  {SINGAPORE_DISTRICTS.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.code} - {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Max Budget Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 font-bold">Max Monthly Rent Budget:</span>
                <span className="font-mono font-bold text-red-600">S$ {maxRent.toLocaleString()} / mo</span>
              </div>
              <input
                type="range"
                min="5000"
                max="22000"
                step="500"
                value={maxRent}
                onChange={(e) => setMaxRent(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
            </div>

            {/* Min Floor Area Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 font-bold">Minimum Floor Area:</span>
                <span className="font-mono font-bold text-slate-900">{minSize} sqft</span>
              </div>
              <input
                type="range"
                min="350"
                max="1500"
                step="50"
                value={minSize}
                onChange={(e) => setMinSize(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
            </div>

            {/* Turnkey Requirements Checkboxes */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <span className="text-xs text-slate-700 font-bold block">
                Required Technical Fit-outs:
              </span>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 text-xs text-slate-800 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={needsExhaust}
                    onChange={(e) => setNeedsExhaust(e.target.checked)}
                    className="rounded border-slate-300 text-red-600 focus:ring-0"
                  />
                  <span>Kitchen Heavy Exhaust</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-800 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={needsGreaseTrap}
                    onChange={(e) => setNeedsGreaseTrap(e.target.checked)}
                    className="rounded border-slate-300 text-red-600 focus:ring-0"
                  />
                  <span>Grease Trap Discharge</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition shadow-sm active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Update Matching Algorithm</span>
            </button>
          </form>

          {/* Right Column: Top Matched Candidate Showcase */}
          <div className="lg:col-span-6 space-y-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-red-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase">Algorithm #1 Top Match</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold font-mono">
                  {topMatch.calculatedMatchScore}% Profile Fit
                </span>
              </div>

              {/* Listing Card Preview */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                      {topMatch.listing.districtCode} • {topMatch.listing.propertyType}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1">{topMatch.listing.name}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                      <span>{topMatch.listing.address}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-red-600 font-mono">
                      S$ {topMatch.listing.monthlyRent.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 block">/ month</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                  <div className="p-2 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Foot Traffic</span>
                    <span className="font-bold text-emerald-700 font-mono">
                      {topMatch.listing.footTrafficHourlyAvg.toLocaleString()}/hr
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Floor Area</span>
                    <span className="font-bold text-slate-900 font-mono">
                      {topMatch.listing.floorAreaSqft} sqft
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Fit Score</span>
                    <span className="font-bold text-red-600 font-mono">
                      {topMatch.listing.attractivenessScore}/100
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {topMatch.listing.advisorVerdict.summary}
                </p>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => onSelectListingForDetail(topMatch.listing)}
                    className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>View Property &amp; Map Pin</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="#advisor"
                    className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200"
                  >
                    Ask AI Advisor
                  </a>
                </div>
              </div>

              {/* Runners-up Preview */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Top Alternative Matches:
                </div>
                {matchingListings.slice(1, 3).map((item, i) => (
                  <div
                    key={i}
                    onClick={() => onSelectListingForDetail(item.listing)}
                    className="cursor-pointer p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-300 flex items-center justify-between transition"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-red-600 font-bold">
                        {item.listing.districtCode}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900">{item.listing.name}</h5>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900 font-mono">
                        S$ {item.listing.monthlyRent.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-emerald-700 block font-bold">
                        {item.calculatedMatchScore}% match
                      </span>
                    </div>
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
