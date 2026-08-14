import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VisionSection } from './components/VisionSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { KeyFactorsSection } from './components/KeyFactorsSection';
import { UserSegmentsSection } from './components/UserSegmentsSection';
import { LocationStudio } from './components/LocationStudio';
import { FoodMenuPricingSection } from './components/FoodMenuPricingSection';
import { BusinessAdvisorAI } from './components/BusinessAdvisorAI';
import { MarketAnalysisExample } from './components/MarketAnalysisExample';
import { ListingsExplorer } from './components/ListingsExplorer';
import { ListingDetailModal } from './components/ListingDetailModal';
import { CompareModal } from './components/CompareModal';
import { Footer } from './components/Footer';
import { CommercialListing, UserBusinessProfile } from './types';
import { COMMERCIAL_LISTINGS } from './data/mockData';

export default function App() {
  // Global App State
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [shortlist, setShortlist] = useState<CommercialListing[]>([
    COMMERCIAL_LISTINGS[0], // Pre-populate Tanjong Pagar
    COMMERCIAL_LISTINGS[1], // Pre-populate Bugis Junction
  ]);
  const [activeDetailListing, setActiveDetailListing] = useState<CommercialListing | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  const [userProfile, setUserProfile] = useState<UserBusinessProfile>({
    businessConcept: 'Instant Noodles & Broth Bar',
    cuisineType: 'Asian Quick-Serve / Artisan Broths',
    targetCustomer: 'Corporate Workers, Foodies & Residential Diners',
    ticketSizeBand: 'S$9.80 - S$14.50 (Comfort Casual)',
    budgetedMonthlyRentMax: 12000,
    floorAreaMinSqft: 500,
    requiresKitchenExhaust: true,
    requiresGreaseTrap: true,
    preferredDistrict: 'ALL',
  });

  const [advisorFocusListing, setAdvisorFocusListing] = useState<CommercialListing | null>(
    COMMERCIAL_LISTINGS[0]
  );

  // Shortlist handlers
  const handleToggleShortlist = (listing: CommercialListing) => {
    if (shortlist.some((item) => item.id === listing.id)) {
      setShortlist((prev) => prev.filter((item) => item.id !== listing.id));
    } else {
      setShortlist((prev) => [...prev, listing]);
    }
  };

  const handleRemoveFromShortlist = (id: string) => {
    setShortlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearShortlist = () => {
    setShortlist([]);
  };

  const handleAskAdvisorForListing = (listing: CommercialListing) => {
    setAdvisorFocusListing(listing);
    const advisorElem = document.getElementById('advisor');
    if (advisorElem) {
      advisorElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-600 selection:text-white">
      {/* Top Fixed Header Navbar */}
      <Navbar
        shortlistCount={shortlist.length}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <HeroSection
          selectedDistrict={selectedDistrict}
          onSelectDistrict={setSelectedDistrict}
          onOpenCompare={() => setIsCompareOpen(true)}
          shortlistCount={shortlist.length}
        />

        {/* Frame 01: Vision - What and Why */}
        <VisionSection />

        {/* Frame 02: How It Works (4 Steps) */}
        <HowItWorksSection />

        {/* Frame 03: Key Factors */}
        <KeyFactorsSection />

        {/* Frame 04: Who It Is For */}
        <UserSegmentsSection />

        {/* Interactive Location Studio: Define Business & Auto-Match */}
        <LocationStudio
          profile={userProfile}
          onUpdateProfile={setUserProfile}
          onSelectListingForDetail={(listing) => setActiveDetailListing(listing)}
        />

        {/* Frame 05: Food Menu, Pricing & Unit Economics Simulator */}
        <FoodMenuPricingSection />

        {/* Frame 06: Ask the AI Business Advisor */}
        <BusinessAdvisorAI
          userProfile={userProfile}
          selectedListing={advisorFocusListing}
        />

        {/* Frame 07: Market Analysis Worked Example */}
        <MarketAnalysisExample />

        {/* Frame 08: Commercial Listings Explorer & Shortlist */}
        <ListingsExplorer
          selectedDistrict={selectedDistrict}
          onSelectDistrict={setSelectedDistrict}
          shortlist={shortlist}
          onToggleShortlist={handleToggleShortlist}
          onOpenDetailModal={(listing) => setActiveDetailListing(listing)}
          onOpenCompare={() => setIsCompareOpen(true)}
          onAskAdvisor={handleAskAdvisorForListing}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ListingDetailModal
        listing={activeDetailListing}
        onClose={() => setActiveDetailListing(null)}
        onToggleShortlist={handleToggleShortlist}
        isShortlisted={
          activeDetailListing
            ? shortlist.some((item) => item.id === activeDetailListing.id)
            : false
        }
        onAskAdvisor={handleAskAdvisorForListing}
      />

      {isCompareOpen && (
        <CompareModal
          shortlist={shortlist}
          onClose={() => setIsCompareOpen(false)}
          onRemoveFromShortlist={handleRemoveFromShortlist}
          onClearShortlist={handleClearShortlist}
          onSelectForDetail={(listing) => {
            setIsCompareOpen(false);
            setActiveDetailListing(listing);
          }}
        />
      )}
    </div>
  );
}
