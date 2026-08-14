import React, { useState } from 'react';
import { Search, MapPin, Building, Filter, SlidersHorizontal, Sparkles, ArrowRight, ShieldCheck, TrendingUp, CheckCircle, Flame, UtensilsCrossed, Compass } from 'lucide-react';
import { SINGAPORE_DISTRICTS } from '../data/mockData';

interface HeroSectionProps {
  selectedDistrict: string;
  onSelectDistrict: (districtCode: string) => void;
  onOpenCompare: () => void;
  shortlistCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedDistrict,
  onSelectDistrict,
  onOpenCompare,
  shortlistCount,
}) => {
  const [activeTab, setActiveTab] = useState<'rent' | 'buy' | 'takeover'>('rent');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>('ALL');
  const [maxRentFilter, setMaxRentFilter] = useState<number>(20000);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mapSearchSection = document.getElementById('map-search') || document.getElementById('listings');
    if (mapSearchSection) {
      mapSearchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-12 pb-14 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#e02424_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-8">
          {/* CommercialGuru Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-red-300 text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Singapore F&amp;B Commercial Property Portal &amp; Location Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Find the Prime <span className="text-red-500 underline decoration-red-500/40 decoration-4">F&amp;B Location</span> in Singapore.
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Search verified commercial shophouses, mall units &amp; food halls with real-time footfall data, demographics, kitchen fit-outs, and unit economics.
          </p>
        </div>

        {/* CommercialGuru Omni-Search Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-200 text-slate-900">
          {/* Search Category Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
            <button
              onClick={() => setActiveTab('rent')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeTab === 'rent'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Rent Commercial F&amp;B</span>
            </button>
            <button
              onClick={() => setActiveTab('buy')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeTab === 'buy'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>Buy Commercial Shophouse</span>
            </button>
            <button
              onClick={() => setActiveTab('takeover')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeTab === 'takeover'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>F&amp;B Takeover / Fitted</span>
            </button>
          </div>

          {/* Search Inputs Row */}
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Location Search Input */}
              <div className="md:col-span-5 relative">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Location / MRT / Street
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Tanjong Pagar, Bugis, Telok Ayer..."
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* District Dropdown */}
              <div className="md:col-span-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  District
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => onSelectDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
                >
                  <option value="ALL">All Singapore Districts</option>
                  {SINGAPORE_DISTRICTS.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.code} - {d.name.split('-')[1]?.trim()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type Dropdown */}
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Property Type
                </label>
                <select
                  value={propertyTypeFilter}
                  onChange={(e) => setPropertyTypeFilter(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
                >
                  <option value="ALL">All Property Types</option>
                  <option value="Shophouse">Shophouse</option>
                  <option value="Mall Unit">Mall Unit</option>
                  <option value="Commercial Complex">Commercial Complex</option>
                  <option value="HDB Shophouse">HDB Shophouse</option>
                </select>
              </div>

              {/* Search Submit Button */}
              <div className="md:col-span-2 flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md shadow-red-600/30 transition flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>

            {/* Quick Popular Shortcut Chips */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-red-600" /> Hot F&amp;B Nodes:
              </span>
              <button
                type="button"
                onClick={() => onSelectDistrict('D02')}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 font-medium transition"
              >
                D02 Tanjong Pagar CBD
              </button>
              <button
                type="button"
                onClick={() => onSelectDistrict('D07')}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 font-medium transition"
              >
                D07 Bugis / Liang Seah
              </button>
              <button
                type="button"
                onClick={() => onSelectDistrict('D01')}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 font-medium transition"
              >
                D01 Telok Ayer Shophouses
              </button>
              <button
                type="button"
                onClick={() => onSelectDistrict('D22')}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 font-medium transition"
              >
                D22 Jurong Gateway Hub
              </button>
              <a
                href="#map-search"
                className="ml-auto text-red-600 hover:text-red-700 font-bold flex items-center gap-1"
              >
                <MapPin className="w-3.5 h-3.5" /> Interactive Map View &rarr;
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
