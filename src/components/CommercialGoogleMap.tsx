import React, { useState, useEffect } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  useMap,
} from '@vis.gl/react-google-maps';
import { CommercialListing } from '../types';
import { MapPin, Navigation, Building2, UtensilsCrossed, Footprints, ExternalLink, Key, CheckCircle, Flame } from 'lucide-react';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  'AIzaSyDSvCA75svPSNBHZhrxucNsFHvcBzj-tMk';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

interface CommercialGoogleMapProps {
  listings: CommercialListing[];
  selectedListing: CommercialListing | null;
  onSelectListing: (listing: CommercialListing) => void;
  onOpenDetailModal: (listing: CommercialListing) => void;
  height?: string;
  zoomLevel?: number;
  center?: { lat: number; lng: number };
}

// Helper component to smoothly center map when selectedListing changes
function MapPanController({ targetListing, center }: { targetListing: CommercialListing | null; center?: { lat: number; lng: number } }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (targetListing && targetListing.lat && targetListing.lng) {
      map.panTo({ lat: targetListing.lat, lng: targetListing.lng });
      map.setZoom(15);
    } else if (center) {
      map.panTo(center);
    }
  }, [map, targetListing, center]);

  return null;
}

export const CommercialGoogleMap: React.FC<CommercialGoogleMapProps> = ({
  listings,
  selectedListing,
  onSelectListing,
  onOpenDetailModal,
  height = '580px',
  zoomLevel = 12,
  center = { lat: 1.312, lng: 103.838 }, // Central Singapore default
}) => {
  const [activeMarkerListing, setActiveMarkerListing] = useState<CommercialListing | null>(selectedListing);
  const [filterOverlay, setFilterOverlay] = useState<'all' | 'highTraffic' | 'cbd' | 'heartland'>('all');

  useEffect(() => {
    if (selectedListing) {
      setActiveMarkerListing(selectedListing);
    }
  }, [selectedListing]);

  // If no valid key is provided yet, render the informative Google Maps Setup guide card
  if (!hasValidKey) {
    return (
      <div
        id="google-map-setup-splash"
        className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col items-center justify-center text-slate-800"
        style={{ minHeight: height }}
      >
        <div className="max-w-xl text-center">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-red-100 text-red-600 shadow-inner">
            <MapPin className="w-8 h-8 animate-bounce" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Key className="w-3.5 h-3.5" /> Google Maps Platform API
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            Commercial F&B Interactive Map Ready
          </h3>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            Connect your Google Maps Platform API key to render real-time Singapore commercial shophouse &amp; mall locations, street coordinates, transit routes, and catchment footfall data on Google Maps.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left text-xs mb-6 space-y-3">
            <div className="font-semibold text-slate-900 flex items-center gap-2 text-sm border-b border-slate-200 pb-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Quick 3-Step Setup Instructions:
            </div>
            <div className="space-y-2 text-slate-600">
              <p>
                <strong className="text-slate-800">1.</strong> Get an API key from{' '}
                <a
                  href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700 underline font-medium"
                >
                  Google Cloud Console
                </a>
              </p>
              <p>
                <strong className="text-slate-800">2.</strong> Open <strong>Settings (⚙️ gear icon)</strong> at top-right &rarr; <strong>Secrets</strong>
              </p>
              <p>
                <strong className="text-slate-800">3.</strong> Add secret name <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-mono">GOOGLE_MAPS_PLATFORM_KEY</code> and paste your key. The app rebuilds automatically!
              </p>
            </div>
          </div>

          {/* Interactive Interactive Demo Location Preview (Simulated Map Canvas with live Singapore points) */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-900 p-4 text-left relative">
            <div className="text-xs font-semibold text-slate-300 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-white">
                <Building2 className="w-3.5 h-3.5 text-red-400" /> Active Singapore F&B Listings ({listings.length} Pins)
              </span>
              <span className="text-slate-400 font-mono text-[11px]">Singapore Core / Fringe</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {listings.slice(0, 4).map((listing) => (
                <button
                  key={listing.id}
                  onClick={() => onOpenDetailModal(listing)}
                  className="p-2.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-left transition flex items-start gap-2.5 group"
                >
                  <div className="p-1.5 rounded bg-red-500/20 text-red-400 mt-0.5 group-hover:bg-red-500 group-hover:text-white transition">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-xs font-medium truncate">{listing.name}</p>
                    <p className="text-slate-400 text-[11px] truncate">{listing.district}</p>
                    <div className="flex items-center justify-between mt-1 text-[10px]">
                      <span className="text-emerald-400 font-bold">S$ {listing.monthlyRent.toLocaleString()}/mo</span>
                      <span className="text-slate-400">{listing.rentPerSqft} psf</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter listings based on overlay filter
  const displayedListings = listings.filter((listing) => {
    if (filterOverlay === 'highTraffic') return listing.footTrafficScore >= 95;
    if (filterOverlay === 'cbd') return ['D01', 'D02'].includes(listing.districtCode);
    if (filterOverlay === 'heartland') return ['D12', 'D14', 'D22', 'D15'].includes(listing.districtCode);
    return true;
  });

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
      {/* Top Map Action Bar (CommercialGuru Style) */}
      <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-200 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-bold text-slate-800 flex items-center gap-1.5 mr-1">
          <MapPin className="w-4 h-4 text-red-600" />
          <span>F&B Map ({displayedListings.length} units)</span>
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setFilterOverlay('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition ${
              filterOverlay === 'all'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Areas
          </button>
          <button
            onClick={() => setFilterOverlay('cbd')}
            className={`px-2.5 py-1 rounded-lg font-medium transition ${
              filterOverlay === 'cbd'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            CBD Core
          </button>
          <button
            onClick={() => setFilterOverlay('heartland')}
            className={`px-2.5 py-1 rounded-lg font-medium transition ${
              filterOverlay === 'heartland'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Heartlands
          </button>
          <button
            onClick={() => setFilterOverlay('highTraffic')}
            className={`px-2.5 py-1 rounded-lg font-medium transition flex items-center gap-1 ${
              filterOverlay === 'highTraffic'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Flame className="w-3 h-3 text-amber-500" /> High Footfall
          </button>
        </div>
      </div>

      <APIProvider apiKey={API_KEY} version="weekly">
        <div style={{ width: '100%', height }}>
          <Map
            defaultCenter={center}
            defaultZoom={zoomLevel}
            mapId="FNB_HUAT_AH_COMMERCIAL_MAP"
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: '100%', height: '100%' }}
            gestureHandling="greedy"
            disableDefaultUI={false}
          >
            <MapPanController targetListing={selectedListing} center={center} />

            {/* Render Custom Price & Area Markers for each Singapore F&B listing */}
            {displayedListings.map((listing) => {
              const isSelected = activeMarkerListing?.id === listing.id;

              return (
                <AdvancedMarker
                  key={listing.id}
                  position={{ lat: listing.lat, lng: listing.lng }}
                  title={`${listing.name} - S$ ${listing.monthlyRent.toLocaleString()}/mo`}
                  onClick={() => {
                    setActiveMarkerListing(listing);
                    onSelectListing(listing);
                  }}
                >
                  <div
                    className={`cursor-pointer transition-all duration-200 transform ${
                      isSelected ? 'scale-110 z-30' : 'hover:scale-105 z-10'
                    }`}
                  >
                    <div
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 border transition-all ${
                        isSelected
                          ? 'bg-red-600 text-white border-white ring-2 ring-red-400'
                          : 'bg-white text-slate-900 border-slate-300 hover:border-red-500 hover:text-red-600'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>S${(listing.monthlyRent / 1000).toFixed(1)}k</span>
                      <span className="text-[10px] font-medium opacity-80">({listing.districtCode})</span>
                    </div>
                  </div>
                </AdvancedMarker>
              );
            })}

            {/* Active Listing InfoWindow */}
            {activeMarkerListing && (
              <InfoWindow
                position={{ lat: activeMarkerListing.lat, lng: activeMarkerListing.lng }}
                onCloseClick={() => setActiveMarkerListing(null)}
              >
                <div className="max-w-xs text-slate-900 p-1 font-sans">
                  <div className="relative h-28 w-full rounded-lg overflow-hidden mb-2.5">
                    <img
                      src={activeMarkerListing.imageUrl}
                      alt={activeMarkerListing.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      {activeMarkerListing.propertyType}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-mono">
                      {activeMarkerListing.floorAreaSqft} sqft
                    </div>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 line-clamp-1 leading-snug">
                    {activeMarkerListing.name}
                  </h4>
                  <p className="text-slate-500 text-xs line-clamp-1 mb-2">
                    {activeMarkerListing.address}
                  </p>

                  <div className="flex items-baseline justify-between border-t border-b border-slate-100 py-1.5 mb-2.5">
                    <div>
                      <span className="text-xs text-slate-500">Asking Rent:</span>
                      <div className="text-sm font-extrabold text-red-600">
                        S$ {activeMarkerListing.monthlyRent.toLocaleString()}
                        <span className="text-xs font-normal text-slate-500">/mo</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-500">Rent psf:</span>
                      <div className="text-xs font-bold text-slate-800">
                        S$ {activeMarkerListing.rentPerSqft}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-[11px] text-slate-600 bg-slate-50 p-1.5 rounded">
                    <Navigation className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{activeMarkerListing.nearestMRT} ({activeMarkerListing.transitDistanceMins}m walk)</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onOpenDetailModal(activeMarkerListing)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded-lg text-xs font-semibold transition text-center shadow-xs flex items-center justify-center gap-1.5"
                    >
                      View Details <ExternalLink className="w-3 h-3" />
                    </button>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        activeMarkerListing.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
                      title="Open in Google Maps"
                    >
                      <MapPin className="w-4 h-4 text-red-600" />
                    </a>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};
