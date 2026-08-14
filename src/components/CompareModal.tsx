import React from 'react';
import {
  X,
  Scale,
  Trash2,
  Award,
  CheckCircle2,
  XCircle,
  Building,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { CommercialListing } from '../types';

interface CompareModalProps {
  shortlist: CommercialListing[];
  onClose: () => void;
  onRemoveFromShortlist: (id: string) => void;
  onClearShortlist: () => void;
  onSelectForDetail: (listing: CommercialListing) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  shortlist,
  onClose,
  onRemoveFromShortlist,
  onClearShortlist,
  onSelectForDetail,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col text-slate-800">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-red-600 uppercase">
                  FNB Huat Ah • Side-by-Side Comparison
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                  {shortlist.length} Listings Selected
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Singapore Commercial F&amp;B Property Evaluation Matrix
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {shortlist.length > 0 && (
              <button
                onClick={onClearShortlist}
                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-bold px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 transition border border-red-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Comparison Table */}
        <div className="p-6 overflow-x-auto flex-1 text-slate-800 text-xs sm:text-sm">
          {shortlist.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Scale className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">Your Comparison Shortlist is Empty</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Browse our Commercial F&amp;B Listings and click "Shortlist" on candidate properties to compare them side-by-side.
              </p>
            </div>
          ) : (
            <table className="w-full border-collapse text-left min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-48 bg-slate-50 sticky left-0 z-10">
                    Evaluation Metric
                  </th>
                  {shortlist.map((l) => (
                    <th key={l.id} className="py-3 px-4 min-w-[240px] bg-slate-50">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                            {l.districtCode}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mt-1">{l.name}</h4>
                        </div>
                        <button
                          onClick={() => onRemoveFromShortlist(l.id)}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Asking Rent */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/90 sticky left-0 z-10">
                    Monthly Asking Rent
                  </td>
                  {shortlist.map((l) => (
                    <td key={l.id} className="py-3 px-4">
                      <span className="text-base font-black text-red-600 font-mono">
                        S$ {l.monthlyRent.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-500 block font-medium">
                        S$ {l.rentPerSqft.toFixed(2)} psf
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Floor Area */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/90 sticky left-0 z-10">
                    Floor Area &amp; Type
                  </td>
                  {shortlist.map((l) => (
                    <td key={l.id} className="py-3 px-4">
                      <span className="font-bold text-slate-800">{l.floorAreaSqft} sqft</span>
                      <span className="text-[11px] text-slate-500 block">{l.propertyType}</span>
                    </td>
                  ))}
                </tr>

                {/* Hourly Foot Traffic */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/90 sticky left-0 z-10">
                    Foot Traffic Volume
                  </td>
                  {shortlist.map((l) => (
                    <td key={l.id} className="py-3 px-4">
                      <span className="font-bold text-emerald-700 font-mono">
                        {l.footTrafficHourlyAvg.toLocaleString()} / hr
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        Score: {l.footTrafficScore}/100
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Transit Access */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/90 sticky left-0 z-10">
                    Transit &amp; MRT Walk
                  </td>
                  {shortlist.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-xs">
                      <span className="font-bold text-slate-900">{l.nearestMRT}</span>
                      <span className="text-[11px] text-blue-600 block font-medium">
                        {l.transitDistanceMins} mins sheltered walk
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Primary Demographics */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/90 sticky left-0 z-10">
                    Target Catchment
                  </td>
                  {shortlist.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-xs">
                      <span className="font-bold text-slate-800">{l.demographics.primarySegment}</span>
                      <span className="text-[11px] text-slate-500 block">
                        Income: {l.demographics.medianIncome}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Breakeven Timeline */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/90 sticky left-0 z-10">
                    Breakeven Feasibility
                  </td>
                  {shortlist.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-xs">
                      <span className="font-bold text-slate-900 font-mono">
                        {l.advisorVerdict.breakevenDays} days / month
                      </span>
                      <span className="text-[11px] text-emerald-700 block font-semibold">
                        Target: {l.advisorVerdict.projectedDailyCovers} covers/day
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Kitchen Amenities */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/90 sticky left-0 z-10">
                    Exhaust &amp; Grease Trap
                  </td>
                  {shortlist.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-xs">
                      <div className="flex items-center gap-2">
                        {l.features.exhaustFitted ? (
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Exhaust
                          </span>
                        ) : (
                          <span className="text-slate-400 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> No Exhaust
                          </span>
                        )}
                        {l.features.greaseTrap ? (
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Grease Trap
                          </span>
                        ) : (
                          <span className="text-slate-400 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> No Trap
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Actions */}
                <tr>
                  <td className="py-4 px-4 bg-slate-50/90 sticky left-0 z-10">
                    <span className="text-xs font-bold text-slate-700">Actions</span>
                  </td>
                  {shortlist.map((l) => (
                    <td key={l.id} className="py-4 px-4">
                      <button
                        onClick={() => onSelectForDetail(l)}
                        className="w-full py-2 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition"
                      >
                        View Full Details &amp; Map
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-xs text-slate-500">
          <p>
            CommercialGuru FNB Huat Ah Real Estate Intelligence • Singapore
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
