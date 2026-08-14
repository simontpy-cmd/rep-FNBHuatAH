import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { CommercialListing } from '../types';
import { MapPin, Navigation, Train, Footprints, ExternalLink, ShieldCheck, Compass } from 'lucide-react';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  'AIzaSyDSvCA75svPSNBHZhrxucNsFHvcBzj-tMk';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

interface SingleListingMapProps {
  listing: CommercialListing;
  height?: string;
}

export const SingleListingMap: React.FC<SingleListingMapProps> = ({ listing, height = '320px' }) => {
  const position = { lat: listing.lat, lng: listing.lng };
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${listing.name}, ${listing.address}`
  )}`;

  if (!hasValidKey) {
    return (
      <div
        className="w-full rounded-xl border border-slate-200 bg-slate-900 text-white p-5 flex flex-col justify-between relative overflow-hidden"
        style={{ minHeight: height }}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e02424_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-red-600/30 text-red-400 border border-red-500/30">
                <MapPin className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Location &amp; Catchment Map
              </span>
            </div>
            <span className="text-[11px] bg-red-950/80 text-red-400 px-2 py-0.5 rounded-full border border-red-800/60 font-mono">
              {listing.districtCode}
            </span>
          </div>

          <p className="text-sm font-semibold text-white mb-1">{listing.name}</p>
          <p className="text-xs text-slate-400 mb-4">{listing.address}</p>

          <div className="grid grid-cols-2 gap-2 text-xs mb-4">
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                <Train className="w-3.5 h-3.5 text-blue-400" /> Nearest MRT
              </span>
              <p className="font-semibold text-slate-200 text-xs truncate">{listing.nearestMRT}</p>
              <p className="text-[10px] text-emerald-400 font-medium">{listing.transitDistanceMins} mins walk</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                <Footprints className="w-3.5 h-3.5 text-amber-400" /> Foot Traffic
              </span>
              <p className="font-semibold text-slate-200 text-xs">{listing.footTrafficHourlyAvg.toLocaleString()} / hr</p>
              <p className="text-[10px] text-amber-400 font-medium">Score {listing.footTrafficScore}/100</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>URA F&B Approved Commercial Zone</span>
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 transition bg-red-950/60 hover:bg-red-900/60 px-3 py-1.5 rounded-lg border border-red-800/50"
          >
            Open in Google Maps <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm">
      <div className="absolute top-2.5 right-2.5 z-10">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/95 backdrop-blur-xs hover:bg-white text-slate-800 px-2.5 py-1.5 rounded-lg text-xs font-semibold shadow-md border border-slate-200 flex items-center gap-1.5 transition hover:text-red-600"
        >
          <Compass className="w-3.5 h-3.5 text-red-600" />
          <span>Google Maps Direction</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <APIProvider apiKey={API_KEY} version="weekly">
        <div style={{ width: '100%', height }}>
          <Map
            defaultCenter={position}
            defaultZoom={16}
            mapId="FNB_HUAT_AH_SINGLE_LISTING"
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: '100%', height: '100%' }}
            gestureHandling="greedy"
            disableDefaultUI={false}
          >
            <AdvancedMarker position={position} title={listing.name}>
              <Pin background="#d9222a" glyphColor="#ffffff" borderColor="#ffffff" />
            </AdvancedMarker>
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};
