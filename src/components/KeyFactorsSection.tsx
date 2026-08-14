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
  Code2,
  ExternalLink,
  Search,
  Filter,
  Check,
  Copy,
  Building,
  Calendar,
  Sparkles,
  Database,
  ArrowUpRight,
} from 'lucide-react';
import { PLATFORM_KEY_FACTORS, URA_PLANNING_DECISIONS_DATA, URAServiceDecision } from '../data/mockData';

export const KeyFactorsSection: React.FC = () => {
  const [selectedFactorIndex, setSelectedFactorIndex] = useState(6); // Default to Factor 7 (Upcoming Developments & Masterplan)
  const [selectedPlanningArea, setSelectedPlanningArea] = useState<string>('ALL');
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);
  const [showJsonView, setShowJsonView] = useState(false);
  const [activeDecisionDetail, setActiveDecisionDetail] = useState<URAServiceDecision | null>(null);

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

  const isMasterplanFactor = selectedFactor.id === 'factor-7';

  const filteredUraDecisions = URA_PLANNING_DECISIONS_DATA.filter((d) => {
    if (selectedPlanningArea === 'ALL') return true;
    return d.planningArea.toLowerCase().includes(selectedPlanningArea.toLowerCase()) || d.districtCode === selectedPlanningArea;
  });

  const uraEndpointUrl = 'https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?service=Planning_Decision';

  const handleCopyEndpoint = () => {
    navigator.clipboard.writeText(`GET ${uraEndpointUrl}`);
    setCopiedEndpoint(true);
    setTimeout(() => setCopiedEndpoint(false), 2000);
  };

  return (
    <section id="key-factors" className="py-16 bg-white border-t border-slate-200 scroll-mt-14">
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
            Deriving an objective, data-backed attractiveness score for commercial F&amp;B properties across Singapore using URA Master Plan feeds and footfall sensors.
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
                        {factor.id === 'factor-7' && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 border border-blue-200">
                            URA API
                          </span>
                        )}
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
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-6">
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
                      <span className="break-words font-medium">{dp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* URA DATA SERVICE API CONSOLE & LIVE PLANNING DECISION EXPLORER (Factor 7) */}
              {isMasterplanFactor && (
                <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-blue-600" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                          Official Singapore URA DataService Integration
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Live planning decisions, written permissions (WP), and change-of-use approvals.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowJsonView(!showJsonView)}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1 transition"
                      >
                        <Code2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>{showJsonView ? 'Cards View' : 'Raw JSON'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Endpoint Display Box */}
                  <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs shadow-inner space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[11px]">
                          GET
                        </span>
                        <span className="text-[11px] text-slate-400 font-sans">URA Planning Decisions Endpoint:</span>
                      </div>
                      <button
                        onClick={handleCopyEndpoint}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1 transition active:scale-95"
                      >
                        {copiedEndpoint ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Endpoint</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="text-amber-300 text-[11px] sm:text-xs overflow-x-auto py-1 font-semibold">
                      https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?service=Planning_Decision
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400 pt-1 border-t border-slate-800 font-sans">
                      <span>Service: <strong className="text-slate-200">Planning_Decision</strong></span>
                      <span>•</span>
                      <span>Auth: <strong className="text-slate-200">URA DataService Token + AccessKey</strong></span>
                      <span>•</span>
                      <span>Format: <strong className="text-slate-200">JSON</strong></span>
                    </div>
                  </div>

                  {/* Planning Area Filter Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                    <span className="text-[11px] text-slate-500 font-bold uppercase shrink-0 mr-1">
                      Filter Area:
                    </span>
                    {['ALL', 'Downtown Core', 'D07', 'D14', 'D22', 'D01'].map((area) => (
                      <button
                        key={area}
                        onClick={() => setSelectedPlanningArea(area)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                          selectedPlanningArea === area
                            ? 'bg-red-600 text-white shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {area === 'ALL' ? 'All Districts' : area}
                      </button>
                    ))}
                  </div>

                  {/* View Mode: JSON vs Rich Cards */}
                  {showJsonView ? (
                    <div className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs max-h-80 overflow-y-auto border border-slate-800">
                      <pre className="text-[11px] leading-relaxed">
                        {JSON.stringify(
                          {
                            Status: 'Success',
                            Message: 'URA DataService Response OK',
                            Service: 'Planning_Decision',
                            Timestamp: new Date().toISOString(),
                            TotalRecords: filteredUraDecisions.length,
                            Result: filteredUraDecisions.map((d) => ({
                              submissionNumber: d.submissionNo,
                              decisionDate: d.decisionDate,
                              decisionType: d.decisionType,
                              location: d.location,
                              planningArea: d.planningArea,
                              district: d.districtCode,
                              projectDescription: d.projectDescription,
                              proposedUse: d.proposedUse,
                              grossFloorAreaSqm: d.gfaSqm,
                              status: d.status,
                              fnbCommercialImpact: d.commercialFnbImpact,
                              serviceEndpoint: d.apiEndpoint,
                            })),
                          },
                          null,
                          2
                        )}
                      </pre>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                      {filteredUraDecisions.map((decision) => (
                        <div
                          key={decision.id}
                          className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition space-y-2.5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                                {decision.submissionNo}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {decision.decisionType}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              <span>{decision.decisionDate}</span>
                            </div>
                          </div>

                          <div>
                            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                              <Building className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                              <span>{decision.location}</span>
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 ml-auto">
                                {decision.planningArea} ({decision.districtCode})
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              {decision.projectDescription}
                            </p>
                          </div>

                          <div className="p-2.5 rounded-lg bg-red-50/70 border border-red-100 text-xs text-slate-800">
                            <span className="font-bold text-red-700 block text-[10px] uppercase">
                              F&amp;B Commercial Growth Catalyst:
                            </span>
                            <span className="text-[11px] text-red-950 font-medium">
                              {decision.commercialFnbImpact}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Formula & Practical Rule */}
              <div className="p-4 rounded-xl bg-red-50/80 border border-red-200 text-xs text-red-900 leading-relaxed flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-red-700 block mb-0.5">Commercial Advisor Rule of Thumb:</strong>
                  High {selectedFactor.title} scores insulate your F&amp;B concept against weekday downturns and shorten your rent-to-profit breakeven timeline by validating nearby residential tower completions and infrastructure delivery before committing to a 3-year commercial lease.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

