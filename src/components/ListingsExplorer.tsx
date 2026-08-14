import React, { useState } from 'react';
import {
  Building,
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  Train,
  Footprints,
  Scale,
  Award,
  CheckCircle2,
  XCircle,
  Eye,
  Sparkles,
  ArrowUpDown,
  Phone,
  MessageSquare,
  LayoutGrid,
  Map as MapIcon,
  Columns,
  Heart,
  Flame,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { COMMERCIAL_LISTINGS, SINGAPORE_DISTRICTS } from '../data/mockData';
import { CommercialListing } from '../types';
import { CommercialGoogleMap } from './CommercialGoogleMap';

interface ListingsExplorerProps {
  selectedDistrict: string;
  onSelectDistrict: (districtCode: string) => void;
  shortlist: CommercialListing[];
  onToggleShortlist: (listing: CommercialListing) => void;
  onOpenDetailModal: (listing: CommercialListing) => void;
  onOpenCompare: () => void;
  onAskAdvisor: (listing: CommercialListing) => void;
}

export const ListingsExplorer: React.FC<ListingsExplorerProps> = ({
  selectedDistrict,
  onSelectDistrict,
  shortlist,
  onToggleShortlist,
  onOpenDetailModal,
  onOpenCompare,
  onAskAdvisor,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'split'>('grid');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>('ALL');
  const [maxRentBudget, setMaxRentBudget] = useState<number>(20000);
  const [sortBy, setSortBy] = useState<'score' | 'rentAsc' | 'rentDesc' | 'traffic' | 'area'>('score');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMapListing, setSelectedMapListing] = useState<CommercialListing | null>(COMMERCIAL_LISTINGS[0]);

  // Feature amenity filters
  const [filterExhaust, setFilterExhaust] = useState<boolean>(false);
  const [filterGreaseTrap, setFilterGreaseTrap] = useState<boolean>(false);
  const [filterOutdoorSeating, setFilterOutdoorSeating] = useState<boolean>(false);

  // Filter listings
  const filteredListings = COMMERCIAL_LISTINGS.filter((listing) => {
    const matchesDistrict =
      selectedDistrict === 'ALL' || listing.districtCode === selectedDistrict;
    const matchesPropertyType =
      propertyTypeFilter === 'ALL' || listing.propertyType === propertyTypeFilter;
    const matchesRent = listing.monthlyRent <= maxRentBudget;
    const matchesSearch =
      searchQuery === '' ||
      listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.nearestMRT.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesExhaust = !filterExhaust || listing.features.exhaustFitted;
    const matchesGrease = !filterGreaseTrap || listing.features.greaseTrap;
    const matchesOutdoor = !filterOutdoorSeating || listing.features.outdoorSeating;

    return (
      matchesDistrict &&
      matchesPropertyType &&
      matchesRent &&
      matchesSearch &&
      matchesExhaust &&
      matchesGrease &&
      matchesOutdoor
    );
  });

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'score') {
      return b.attractivenessScore - a.attractivenessScore;
    }
    if (sortBy === 'rentAsc') {
      return a.monthlyRent - b.monthlyRent;
    }
    if (sortBy === 'rentDesc') {
      return b.monthlyRent - a.monthlyRent;
    }
    if (sortBy === 'traffic') {
      return b.footTrafficHourlyAvg - a.footTrafficHourlyAvg;
    }
    if (sortBy === 'area') {
      return b.floorAreaSqft - a.floorAreaSqft;
    }
    return 0;
  });

  const propertyTypes = [
    'ALL',
    'Shophouse',
    'Mall Unit',
    'Commercial Complex',
    'HDB Shophouse',
  ];

  return (
    <section id="listings" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with CommercialGuru Branding */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs tracking-wider uppercase mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>FNB Huat Ah • Verified Singapore Commercial Properties</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Singapore Commercial F&amp;B Properties for Lease
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            {/* View Mode Toggle Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  viewMode === 'grid'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  viewMode === 'split'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Split Map + List"
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Split Map</span>
              </button>
              <button
                id="map-view"
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  viewMode === 'map'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Full Google Map View"
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Map Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Shortlist Floating Banner if items shortlisted */}
        {shortlist.length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-white border-2 border-red-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 font-bold flex items-center justify-center border border-red-100">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {shortlist.length} Candidate {shortlist.length === 1 ? 'Property' : 'Properties'} in Your Shortlist
                </h4>
                <p className="text-xs text-slate-500">
                  Side-by-side rent psf, daily covers, footfall density, and breakeven comparison ready.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenCompare}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center gap-2"
            >
              <Scale className="w-4 h-4" />
              <span>Open Side-by-Side Comparison ({shortlist.length})</span>
            </button>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm mb-8 space-y-4">
          {/* Row 1: Search & Sort */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by property name, street, MRT station, or mall..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
              />
            </div>

            <div className="md:col-span-4 flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-xs text-slate-500 whitespace-nowrap font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
              >
                <option value="score">Highest Attractiveness Score</option>
                <option value="rentAsc">Lowest Asking Rent (S$ / mo)</option>
                <option value="rentDesc">Highest Asking Rent (S$ / mo)</option>
                <option value="traffic">Highest Foot Traffic (Hourly Avg)</option>
                <option value="area">Largest Floor Area (sqft)</option>
              </select>
            </div>
          </div>

          {/* Row 2: Singapore District Filter Chips */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                Singapore District Filter:
              </span>
              <span className="text-[11px] text-slate-500">Showing {sortedListings.length} commercial properties</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => onSelectDistrict('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedDistrict === 'ALL'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                All Singapore ({COMMERCIAL_LISTINGS.length})
              </button>
              {SINGAPORE_DISTRICTS.map((d) => {
                const count = COMMERCIAL_LISTINGS.filter((l) => l.districtCode === d.code).length;
                return (
                  <button
                    key={d.code}
                    onClick={() => onSelectDistrict(d.code)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedDistrict === d.code
                        ? 'bg-red-600 text-white font-bold shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {d.code} {count > 0 && `(${count})`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Category, Amenities Checklist, & Rent Slider */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
            {/* Property Types */}
            <div>
              <span className="text-xs text-slate-600 font-semibold block mb-1.5">
                Property Type:
              </span>
              <div className="flex flex-wrap gap-1">
                {propertyTypes.map((pt) => (
                  <button
                    key={pt}
                    onClick={() => setPropertyTypeFilter(pt)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                      propertyTypeFilter === pt
                        ? 'bg-red-50 text-red-700 border border-red-300 font-bold'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {pt}
                  </button>
                ))}
              </div>
            </div>

            {/* F&B Required Infrastructure Checkboxes */}
            <div>
              <span className="text-xs text-slate-600 font-semibold block mb-1.5">
                Must-Have F&amp;B Amenities:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setFilterExhaust(!filterExhaust)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                    filterExhaust
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Check className={`w-3 h-3 ${filterExhaust ? 'opacity-100' : 'opacity-40'}`} />
                  Exhaust Fitted
                </button>
                <button
                  type="button"
                  onClick={() => setFilterGreaseTrap(!filterGreaseTrap)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                    filterGreaseTrap
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Check className={`w-3 h-3 ${filterGreaseTrap ? 'opacity-100' : 'opacity-40'}`} />
                  Grease Trap
                </button>
                <button
                  type="button"
                  onClick={() => setFilterOutdoorSeating(!filterOutdoorSeating)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                    filterOutdoorSeating
                      ? 'bg-blue-50 text-blue-800 border border-blue-300 font-bold'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Check className={`w-3 h-3 ${filterOutdoorSeating ? 'opacity-100' : 'opacity-40'}`} />
                  Outdoor Seating
                </button>
              </div>
            </div>

            {/* Max Rent Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 font-semibold">Max Monthly Rent:</span>
                <span className="font-mono font-bold text-red-600">
                  S$ {maxRentBudget.toLocaleString()} / mo
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="25000"
                step="500"
                value={maxRentBudget}
                onChange={(e) => setMaxRentBudget(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>S$ 5k</span>
                <span>S$ 15k</span>
                <span>S$ 25k</span>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode 1: Full Google Map View */}
        {viewMode === 'map' && (
          <div className="mb-10">
            <CommercialGoogleMap
              listings={sortedListings}
              selectedListing={selectedMapListing}
              onSelectListing={(listing) => setSelectedMapListing(listing)}
              onOpenDetailModal={onOpenDetailModal}
              height="650px"
            />
          </div>
        )}

        {/* View Mode 2: Split View (Interactive Map + Listings Sidebar) */}
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10 items-start">
            {/* Left side: Interactive Map */}
            <div className="lg:col-span-7 sticky top-20">
              <CommercialGoogleMap
                listings={sortedListings}
                selectedListing={selectedMapListing}
                onSelectListing={(listing) => setSelectedMapListing(listing)}
                onOpenDetailModal={onOpenDetailModal}
                height="620px"
              />
            </div>

            {/* Right side: Listings Cards Column */}
            <div className="lg:col-span-5 space-y-4 max-h-[620px] overflow-y-auto pr-1">
              {sortedListings.map((listing) => {
                const isShortlisted = shortlist.some((item) => item.id === listing.id);
                const isSelected = selectedMapListing?.id === listing.id;

                return (
                  <div
                    key={listing.id}
                    onClick={() => setSelectedMapListing(listing)}
                    className={`p-4 rounded-xl bg-white border transition-all cursor-pointer shadow-2xs hover:shadow-md ${
                      isSelected
                        ? 'border-red-600 ring-2 ring-red-100 bg-red-50/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 relative bg-slate-100">
                        <img
                          src={listing.imageUrl}
                          alt={listing.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1 rounded font-mono">
                          {listing.floorAreaSqft} sqft
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                            {listing.districtCode}
                          </span>
                          <span className="text-sm font-extrabold text-red-600">
                            S$ {listing.monthlyRent.toLocaleString()}
                            <span className="text-[10px] font-normal text-slate-500">/mo</span>
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 truncate">{listing.name}</h4>
                        <p className="text-[11px] text-slate-500 truncate mb-2">{listing.address}</p>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-600">S$ {listing.rentPerSqft} psf</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenDetailModal(listing);
                            }}
                            className="text-xs font-bold text-red-600 hover:underline"
                          >
                            View &rarr;
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* View Mode 3: Default CommercialGuru Grid View */}
        {viewMode === 'grid' && (
          <div>
            {sortedListings.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 space-y-3">
                <Building className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No Commercial Properties Match Filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your district, property type, or maximum rent budget filter to view available candidate units.
                </p>
                <button
                  onClick={() => {
                    onSelectDistrict('ALL');
                    setPropertyTypeFilter('ALL');
                    setMaxRentBudget(20000);
                    setSearchQuery('');
                    setFilterExhaust(false);
                    setFilterGreaseTrap(false);
                    setFilterOutdoorSeating(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white font-bold text-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedListings.map((listing) => {
                  const isShortlisted = shortlist.some((item) => item.id === listing.id);

                  return (
                    <div
                      key={listing.id}
                      className="rounded-2xl bg-white border border-slate-200 hover:border-red-300 hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
                    >
                      <div>
                        {/* High-res Image & Tags */}
                        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                          <img
                            src={listing.imageUrl}
                            alt={listing.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />

                          {/* District Badge */}
                          <div className="absolute top-3 left-3 flex items-center gap-1.5">
                            <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-xs font-bold font-mono text-white shadow">
                              {listing.districtCode}
                            </span>
                            {listing.badge && (
                              <span className="px-2 py-0.5 rounded-md bg-red-600 text-[10px] font-bold text-white shadow">
                                {listing.badge}
                              </span>
                            )}
                          </div>

                          {/* Attractiveness Score */}
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-xs border border-slate-200 text-right shadow">
                            <span className="text-[9px] uppercase tracking-wider block text-slate-500 font-semibold">
                              Fit Score
                            </span>
                            <span className="text-sm font-extrabold text-red-600 font-mono">
                              {listing.attractivenessScore}
                              <span className="text-[10px] text-slate-400">/100</span>
                            </span>
                          </div>

                          {/* Image Footer with MRT */}
                          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white drop-shadow">
                            <span className="flex items-center gap-1">
                              <Train className="w-3.5 h-3.5 text-blue-300" />
                              <span className="font-medium truncate">{listing.nearestMRT.split('(')[0]}</span>
                            </span>
                            <span className="font-bold text-emerald-300">
                              {listing.transitDistanceMins} min walk
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 space-y-3">
                          {/* Price Headline - CommercialGuru Signature Red */}
                          <div>
                            <div className="flex items-baseline justify-between">
                              <div className="text-xl font-black text-red-600">
                                S$ {listing.monthlyRent.toLocaleString()}
                                <span className="text-xs font-medium text-slate-500 ml-1">/ month</span>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-bold text-slate-800">
                                  S$ {listing.rentPerSqft.toFixed(2)} psf
                                </span>
                              </div>
                            </div>
                            <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1 mt-1">
                              {listing.name}
                            </h3>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 line-clamp-1">
                              <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                              <span>{listing.address}</span>
                            </p>
                          </div>

                          {/* Specs Grid */}
                          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                            <div>
                              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Floor Area</span>
                              <span className="font-bold text-slate-800">{listing.floorAreaSqft} sqft</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Property Type</span>
                              <span className="font-bold text-slate-800 truncate block">{listing.propertyType}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Foot Traffic</span>
                              <span className="font-bold text-emerald-700">{listing.footTrafficHourlyAvg.toLocaleString()} / hr</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Advisor Verdict</span>
                              <span className="font-bold text-red-600 truncate block">{listing.advisorVerdict.goNoGo}</span>
                            </div>
                          </div>

                          {/* Amenity Badges */}
                          <div className="flex flex-wrap gap-1">
                            {listing.features.exhaustFitted && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                                ✓ Kitchen Exhaust
                              </span>
                            )}
                            {listing.features.greaseTrap && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                                ✓ Grease Trap
                              </span>
                            )}
                            {listing.features.threePhasePower && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                                ✓ 3-Phase Power
                              </span>
                            )}
                          </div>

                          {/* Agent Contact Strip */}
                          {listing.agentContact && (
                            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <img
                                  src={listing.agentContact.photoUrl}
                                  alt={listing.agentContact.name}
                                  referrerPolicy="no-referrer"
                                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                                />
                                <div>
                                  <p className="text-[11px] font-bold text-slate-800 leading-tight">
                                    {listing.agentContact.name.split('(')[0]}
                                  </p>
                                  <p className="text-[10px] text-slate-400 truncate max-w-[130px]">
                                    {listing.agentContact.agency}
                                  </p>
                                </div>
                              </div>
                              <a
                                href={`https://wa.me/${listing.agentContact.whatsapp}?text=${encodeURIComponent(
                                  `Hi ${listing.agentContact.name.split('(')[0].trim()}, I found ${listing.name} on CommercialGuru and would like to enquire on F&B leasing availability.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold border border-emerald-200 flex items-center gap-1 transition"
                              >
                                <MessageSquare className="w-3 h-3" /> WhatsApp
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Bottom Actions */}
                      <div className="p-4 pt-0 border-t border-slate-100 mt-2 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onOpenDetailModal(listing)}
                          className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View &amp; Map Pin</span>
                        </button>

                        <button
                          onClick={() => onToggleShortlist(listing)}
                          className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                            isShortlisted
                              ? 'bg-red-50 text-red-700 border border-red-300'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isShortlisted ? 'fill-red-600 text-red-600' : ''}`} />
                          <span>{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
