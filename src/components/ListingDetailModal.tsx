import React, { useState } from 'react';
import {
  X,
  MapPin,
  Train,
  Footprints,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Award,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Scale,
  Sparkles,
  Phone,
  MessageSquare,
  Building,
  Heart,
  Share2,
  Calendar,
  Check,
  Database,
  Copy,
} from 'lucide-react';
import { CommercialListing } from '../types';
import { SingleListingMap } from './SingleListingMap';
import { URA_PLANNING_DECISIONS_DATA } from '../data/mockData';

interface ListingDetailModalProps {
  listing: CommercialListing | null;
  onClose: () => void;
  onToggleShortlist: (listing: CommercialListing) => void;
  isShortlisted: boolean;
  onAskAdvisor: (listing: CommercialListing) => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
  listing,
  onClose,
  onToggleShortlist,
  isShortlisted,
  onAskAdvisor,
}) => {
  if (!listing) return null;

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'STRONG GO':
        return 'bg-emerald-50 text-emerald-700 border-emerald-300';
      case 'GO WITH CAUTION':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'REVIEW PRICING':
        return 'bg-blue-50 text-blue-800 border-blue-300';
      default:
        return 'bg-rose-50 text-rose-700 border-rose-300';
    }
  };

  const depositMonths = 3;
  const estimatedDeposit = listing.monthlyRent * depositMonths;
  const estimatedStampDuty = Math.round(listing.monthlyRent * 12 * 3 * 0.004); // standard 3-year SG lease stamp duty

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col text-slate-800">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-xs font-bold font-mono shadow-xs">
              {listing.districtCode}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                  Commercial F&amp;B for Lease
                </span>
                {listing.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200">
                    {listing.badge}
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                {listing.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleShortlist(listing)}
              className={`p-2 rounded-xl border transition ${
                isShortlisted
                  ? 'bg-red-50 text-red-600 border-red-300'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
              title="Shortlist Property"
            >
              <Heart className={`w-5 h-5 ${isShortlisted ? 'fill-red-600' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* Main Showcase: Image Banner & Asking Price Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Property Photo */}
            <div className="lg:col-span-7">
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={listing.imageUrl}
                  alt={listing.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow">
                  {listing.propertyType}
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-xs text-white p-2.5 rounded-xl flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span className="truncate">{listing.address}</span>
                  </span>
                  <span className="font-mono font-bold shrink-0">{listing.postalCode}</span>
                </div>
              </div>
            </div>

            {/* Right: Commercial Financials & Quick Terms */}
            <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Asking Rental Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-red-600 font-mono">
                    S$ {listing.monthlyRent.toLocaleString()}
                  </span>
                  <span className="text-xs font-medium text-slate-600">/ month</span>
                </div>
                <p className="text-xs font-bold text-slate-700 mt-1">
                  S$ {listing.rentPerSqft.toFixed(2)} psf (per square foot)
                </p>
              </div>

              {/* Singapore Standard Commercial Lease Terms */}
              <div className="space-y-2 text-xs border-t border-b border-slate-200 py-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Floor Area:</span>
                  <span className="font-bold text-slate-900">{listing.floorAreaSqft} sqft (Usable F&amp;B)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Est. Security Deposit (3 mo):</span>
                  <span className="font-semibold text-slate-900">S$ {estimatedDeposit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">IRAS Lease Stamp Duty (3 yr):</span>
                  <span className="font-semibold text-slate-900">~S$ {estimatedStampDuty.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Standard Lease Term:</span>
                  <span className="font-semibold text-slate-900">3 Years + 3 Years Option</span>
                </div>
              </div>

              {/* Verified Agent Contact Action */}
              {listing.agentContact ? (
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={listing.agentContact.photoUrl}
                      alt={listing.agentContact.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{listing.agentContact.name}</h4>
                      <p className="text-[11px] text-slate-500">{listing.agentContact.agency} • CEA: {listing.agentContact.ceaReg}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`https://wa.me/${listing.agentContact.whatsapp}?text=${encodeURIComponent(
                        `Hi ${listing.agentContact.name.split('(')[0].trim()}, I am interested in scheduling a viewing for ${listing.name} (${listing.address}) found on FNB Huat Ah.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                    <a
                      href={`tel:${listing.agentContact.phone}`}
                      className="py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Agent
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Google Maps Location & Catchment Visualizer */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-600" />
                Google Maps Location &amp; Transit Walk
              </h3>
              <span className="text-xs text-slate-500">
                Postal Code: <strong className="text-slate-800 font-mono">{listing.postalCode}</strong>
              </span>
            </div>

            <SingleListingMap listing={listing} height="320px" />
          </div>

          {/* AI Advisor Feasibility & Location Intelligence Card */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                  AI Location Intelligence &amp; Unit Economics Verdict
                </h3>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${getVerdictBadge(
                  listing.advisorVerdict.goNoGo
                )}`}
              >
                {listing.advisorVerdict.goNoGo}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {listing.advisorVerdict.summary}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-slate-400 block text-[10px] uppercase">Target Ticket Band</span>
                <span className="font-bold text-amber-400 text-sm">{listing.advisorVerdict.targetTicketBand}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-slate-400 block text-[10px] uppercase">Breakeven Daily Covers</span>
                <span className="font-bold text-emerald-400 text-sm">{listing.advisorVerdict.projectedDailyCovers} covers</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-slate-400 block text-[10px] uppercase">Est. Monthly Revenue</span>
                <span className="font-bold text-blue-400 text-sm">S$ {listing.advisorVerdict.projectedMonthlyRevenue.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-slate-400 block text-[10px] uppercase">Days to Breakeven</span>
                <span className="font-bold text-purple-400 text-sm">{listing.advisorVerdict.breakevenDays} days / mo</span>
              </div>
            </div>
          </div>

          {/* Demographics & Nearby POI Anchors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Catchment Demographics */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Catchment Demographics (1km Radius)
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500">Primary Audience:</span>
                  <span className="font-bold text-slate-900">{listing.demographics.primarySegment}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500">Median Catchment Income:</span>
                  <span className="font-bold text-emerald-700">{listing.demographics.medianIncome}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500">Dominant Age Bracket:</span>
                  <span className="font-semibold text-slate-800">{listing.demographics.ageGroupDominant}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Daypart Split (Lunch : Dinner):</span>
                  <span className="font-bold text-blue-700">{listing.demographics.lunchEveningRatio}</span>
                </div>
              </div>
            </div>

            {/* Transit & Key Anchors */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Transit Accessibility &amp; Major Footfall Anchors
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-50 text-blue-900 font-medium">
                  <Train className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    <strong>{listing.nearestMRT}</strong> • {listing.transitDistanceMins} mins sheltered walk
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] mb-1.5 font-medium">Nearby Commercial Anchors:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {listing.nearbyPOIs.anchors.map((anc, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                      >
                        {anc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Developments & URA Masterplan Feed */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-red-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Upcoming Developments &amp; URA Masterplan ({listing.districtCode})
                </h4>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                <span className="text-emerald-600 font-bold">GET</span>
                <span>service=Planning_Decision</span>
              </div>
            </div>

            {/* List matching URA Planning Decisions for this district */}
            {(() => {
              const matchedDecisions = URA_PLANNING_DECISIONS_DATA.filter(
                (d) => d.districtCode === listing.districtCode || listing.address.toLowerCase().includes(d.planningArea.toLowerCase())
              );
              const decisionsToShow = matchedDecisions.length > 0 ? matchedDecisions : URA_PLANNING_DECISIONS_DATA.slice(0, 2);

              return (
                <div className="space-y-2.5">
                  {decisionsToShow.map((dec) => (
                    <div key={dec.id} className="p-3 rounded-lg bg-white border border-slate-200 text-xs space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                            {dec.submissionNo}
                          </span>
                          <span className="font-bold text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                            {dec.decisionType}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{dec.decisionDate}</span>
                      </div>
                      <p className="text-slate-800 font-medium text-[11px] leading-snug">{dec.projectDescription}</p>
                      <div className="text-[10px] text-red-700 bg-red-50 p-1.5 rounded font-semibold border border-red-100 flex items-start gap-1">
                        <span>Growth Impact:</span>
                        <span className="text-slate-700 font-normal">{dec.commercialFnbImpact}</span>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Data Source: URA DataService (Planning Decision API)</span>
                    <a
                      href="#key-factors"
                      onClick={onClose}
                      className="text-red-600 font-bold hover:underline"
                    >
                      Explore 7-Pillar Scoring &rarr;
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Turnkey Features & Licensing Checklist */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              URA &amp; SFA Food Shop Compliance &amp; Kitchen Specifications
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                {listing.features.exhaustFitted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className={listing.features.exhaustFitted ? 'font-bold text-slate-900' : 'text-slate-500'}>
                  Kitchen Exhaust Fitted
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                {listing.features.greaseTrap ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className={listing.features.greaseTrap ? 'font-bold text-slate-900' : 'text-slate-500'}>
                  Grease Trap Installed
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                {listing.features.threePhasePower ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className={listing.features.threePhasePower ? 'font-bold text-slate-900' : 'text-slate-500'}>
                  3-Phase Power Ready
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                {listing.features.gasSupply ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className={listing.features.gasSupply ? 'font-bold text-slate-900' : 'text-slate-500'}>
                  City Gas / LPG Line
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                {listing.features.outdoorSeating ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className={listing.features.outdoorSeating ? 'font-bold text-slate-900' : 'text-slate-500'}>
                  Outdoor ORA Seating
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                {listing.features.liquorLicenseEligible ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className={listing.features.liquorLicenseEligible ? 'font-bold text-slate-900' : 'text-slate-500'}>
                  Liquor License Eligible
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onToggleShortlist(listing)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              isShortlisted
                ? 'bg-red-50 text-red-700 border border-red-300'
                : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{isShortlisted ? 'In Shortlist & Compare' : 'Add to Shortlist'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onAskAdvisor(listing);
              }}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simulate AI Lease Advice</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
