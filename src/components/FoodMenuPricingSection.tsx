import React, { useState } from 'react';
import {
  Utensils,
  Calculator,
  Tag,
  Clock,
  TrendingUp,
  DollarSign,
  Coffee,
  Sparkles,
  Check,
  Plus,
  Flame,
} from 'lucide-react';
import { FOOD_MENU_ITEMS } from '../data/mockData';
import { MenuItem } from '../types';

export const FoodMenuPricingSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [ticketSize, setTicketSize] = useState<number>(11.50);
  const [dailyCovers, setDailyCovers] = useState<number>(320);
  const [cogsPercent, setCogsPercent] = useState<number>(29.5);
  const [monthlyRent, setMonthlyRent] = useState<number>(9500);

  const categories = [
    'All',
    'Signature Bowls',
    'DIY Noodle Bar',
    'Crispy Bites & Sides',
    'Artisanal Drinks',
    'Value Combos',
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? FOOD_MENU_ITEMS
      : FOOD_MENU_ITEMS.filter((item) => item.category === selectedCategory);

  // Financial Unit Economics calculations
  const monthlyRevenue = dailyCovers * ticketSize * 30;
  const foodCostCogs = monthlyRevenue * (cogsPercent / 100);
  const grossProfit = monthlyRevenue - foodCostCogs;
  const grossMarginPercent = (grossProfit / monthlyRevenue) * 100;
  const rentRatio = (monthlyRent / monthlyRevenue) * 100;
  const estimatedLaborCost = monthlyRevenue * 0.22; // standard 22% F&B labor
  const estimatedUtilitiesAndMisc = 3500; // S$3,500 utilities, POS, POSB merchant fee
  const netMonthlyProfit = grossProfit - monthlyRent - estimatedLaborCost - estimatedUtilitiesAndMisc;
  const netProfitMargin = (netMonthlyProfit / monthlyRevenue) * 100;

  // Daily breakeven covers = (Monthly Fixed Costs) / (Contribution Margin per cover)
  const monthlyFixedCosts = monthlyRent + estimatedLaborCost + estimatedUtilitiesAndMisc;
  const contributionPerCover = ticketSize * (1 - cogsPercent / 100);
  const dailyBreakevenCovers = Math.ceil(monthlyFixedCosts / (contributionPerCover * 30));

  return (
    <section id="menu-pricing" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs tracking-wider uppercase mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>Menu Economics &amp; Pricing • Commercial Feasibility</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Food Menu, Pricing &amp; Lease Breakeven Simulator
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mt-2 md:mt-0">
            Engineered food menu catalogue with exact COGS margins, ticket pricing bands, and dynamic rent-to-profit simulator.
          </p>
        </div>

        {/* Business Types Supported Strip */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 mb-8 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span>Supported F&amp;B Brick-and-Mortar Archetypes:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 font-bold">
              🍜 Instant Noodles &amp; Broth Bar (Primary Concept)
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
              ☕ Cafes &amp; Specialty Coffee Shops
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
              🥡 Quick-Service Restaurants (QSR)
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
              🥢 Asian Casual Dining &amp; Hotpot
            </span>
          </div>
        </div>

        {/* Interactive Unit Economics & Breakeven Simulator */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm mb-10 text-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">Interactive Commercial Lease &amp; Margin Simulator</h3>
                <p className="text-xs text-slate-500">
                  Simulate daily bowl volume against Singapore commercial rent and food cost
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-600 font-medium">Daily Breakeven:</span>
              <span className="text-sm font-black text-red-600 font-mono">
                {dailyBreakevenCovers} bowls / day
              </span>
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6 border-b border-slate-200">
            {/* Avg Ticket Size */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 font-bold">Avg Ticket Size (SGD)</span>
                <span className="font-mono font-bold text-red-600">S$ {ticketSize.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="7.00"
                max="22.00"
                step="0.50"
                value={ticketSize}
                onChange={(e) => setTicketSize(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>S$7.00 (Snack)</span>
                <span>S$22.00 (Premium)</span>
              </div>
            </div>

            {/* Daily Covers */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 font-bold">Daily Bowl Covers</span>
                <span className="font-mono font-bold text-emerald-700">{dailyCovers} bowls</span>
              </div>
              <input
                type="range"
                min="120"
                max="600"
                step="10"
                value={dailyCovers}
                onChange={(e) => setDailyCovers(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>120 (Quiet)</span>
                <span>600 (Prime Mall)</span>
              </div>
            </div>

            {/* Food Cost % */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 font-bold">Food Cost (COGS %)</span>
                <span className="font-mono font-bold text-blue-600">{cogsPercent.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="24.0"
                max="38.0"
                step="0.5"
                value={cogsPercent}
                onChange={(e) => setCogsPercent(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>24% (High Margin)</span>
                <span>38% (Heavy Protein)</span>
              </div>
            </div>

            {/* Monthly Rent */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 font-bold">Monthly Rent (SGD)</span>
                <span className="font-mono font-bold text-slate-900">S$ {monthlyRent.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="4000"
                max="25000"
                step="500"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>S$4k (Heartland)</span>
                <span>S$25k (CBD Prime)</span>
              </div>
            </div>
          </div>

          {/* Computed Output Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Monthly Revenue
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-mono">
                S$ {Math.round(monthlyRevenue).toLocaleString()}
              </p>
              <span className="text-[10px] text-emerald-700 mt-0.5 block font-medium">
                {dailyCovers * 30} total monthly covers
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Gross Profit ({grossMarginPercent.toFixed(1)}%)
              </span>
              <p className="text-xl sm:text-2xl font-black text-emerald-700 mt-1 font-mono">
                S$ {Math.round(grossProfit).toLocaleString()}
              </p>
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                Food Cost: S$ {Math.round(foodCostCogs).toLocaleString()}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Rent-to-Revenue
              </span>
              <p
                className={`text-xl sm:text-2xl font-black mt-1 font-mono ${
                  rentRatio <= 12
                    ? 'text-emerald-700'
                    : rentRatio <= 15
                    ? 'text-amber-600'
                    : 'text-red-600'
                }`}
              >
                {rentRatio.toFixed(1)}%
              </p>
              <span className="text-[10px] text-slate-500 mt-0.5 block font-semibold">
                {rentRatio <= 12 ? '🟢 Super Healthy' : rentRatio <= 15 ? '🟡 Normal Range' : '🔴 High Risk'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Est. Net Profit / Mo
              </span>
              <p
                className={`text-xl sm:text-2xl font-black mt-1 font-mono ${
                  netMonthlyProfit >= 0 ? 'text-red-600' : 'text-red-800'
                }`}
              >
                S$ {Math.round(netMonthlyProfit).toLocaleString()}
              </p>
              <span className="text-[10px] text-slate-500 mt-0.5 block font-medium">
                Net Margin: {netProfitMargin.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Menu Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white border-red-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const marginDollars = item.sellingPrice - item.cogsCost;
            const marginPercent = (marginDollars / item.sellingPrice) * 100;

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-300 transition-all hover:-translate-y-0.5 shadow-2xs hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  {/* Image banner if available */}
                  {item.imageUrl && (
                    <div className="w-full h-40 rounded-xl overflow-hidden mb-4 bg-slate-100 relative">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-800 shadow-xs">
                        {item.category}
                      </div>
                      {item.isBestseller && (
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center gap-1 shadow-xs">
                          <Flame className="w-3 h-3" />
                          <span>BESTSELLER</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                        {item.name}
                      </h4>
                      {item.chineseName && (
                        <p className="text-xs text-slate-400 font-medium">{item.chineseName}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-base font-black text-red-600 font-mono">
                        S$ {item.sellingPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 my-2">
                    {item.description}
                  </p>

                  {/* Ingredients & tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Economics Bar */}
                <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">COGS Cost</span>
                    <span className="font-mono font-bold text-slate-800">S$ {item.cogsCost.toFixed(2)}</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Gross Margin</span>
                    <span className="font-mono font-bold text-emerald-700">{marginPercent.toFixed(0)}%</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-center">
                    <span className="text-slate-400 block text-[10px]">Prep Speed</span>
                    <span className="font-mono font-bold text-slate-700 flex items-center justify-center gap-0.5">
                      <Clock className="w-2.5 h-2.5 text-slate-500" />
                      {item.prepTimeMins}m
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
