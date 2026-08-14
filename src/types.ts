export interface CommercialListing {
  id: string;
  name: string;
  address: string;
  postalCode?: string;
  lat: number;
  lng: number;
  district: string; // e.g. "D01 - Raffles Place / Boat Quay", "D02 - Tanjong Pagar / Chinatown"
  districtCode: string; // "D01", "D02", "D07", etc.
  propertyType: 'Shophouse' | 'Mall Unit' | 'Commercial Complex' | 'HDB Shophouse' | 'Food Hall / Kiosk';
  floorAreaSqft: number;
  monthlyRent: number;
  rentPerSqft: number;
  leaseTermYears: number;
  transitDistanceMins: number;
  nearestMRT: string;
  footTrafficHourlyAvg: number; // e.g. 1850
  footTrafficScore: number; // 0-100
  agentContact?: {
    name: string;
    agency: string;
    phone: string;
    whatsapp: string;
    photoUrl: string;
    license: string;
  };
  demographics: {
    primarySegment: string; // "PMEBs & Corporate Workers (25-45)"
    medianIncome: string; // "S$8,500 - S$12,000/mo"
    ageGroupDominant: string; // "25-39 years (58%)"
    lunchEveningRatio: string; // "70% Lunch / 30% Dinner"
    residentialDensity: 'Low' | 'Moderate' | 'High' | 'Very High';
    officeWorkerDensity: 'Low' | 'Moderate' | 'High' | 'Very High';
  };
  competitorsWithin500m: {
    directCount: number;
    adjacentCount: number;
    names: string[];
    saturationLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  };
  nearbyPOIs: {
    within1km: string[];
    within2km: string[];
    anchors: string[];
  };
  attractivenessScore: number; // 0-100
  attractivenessBreakdown: {
    demographics: number;
    footTraffic: number;
    competitionGap: number;
    transitAccess: number;
    rentAffordability: number;
    growthPotential: number;
  };
  features: {
    exhaustFitted: boolean;
    greaseTrap: boolean;
    gasSupply: boolean;
    threePhasePower: boolean;
    outdoorSeating: boolean;
    liquorLicenseEligible: boolean;
  };
  advisorVerdict: {
    goNoGo: 'STRONG GO' | 'GO WITH CAUTION' | 'REVIEW PRICING' | 'NO-GO';
    summary: string;
    targetTicketBand: string; // e.g. "S$9.00 - S$14.50"
    projectedDailyCovers: number;
    projectedMonthlyRevenue: number;
    breakevenDays: number;
    keyRisks: string[];
    keyOpportunities: string[];
  };
  imageUrl: string;
  badge?: string;
}

export interface MenuItem {
  id: string;
  category: 'Signature Bowls' | 'DIY Noodle Bar' | 'Crispy Bites & Sides' | 'Artisanal Drinks' | 'Value Combos';
  name: string;
  chineseName?: string;
  description: string;
  sellingPrice: number;
  cogsCost: number; // Cost of goods sold
  prepTimeMins: number;
  targetDaypart: 'All Day' | 'Lunch Rush' | 'Tea Break' | 'Dinner & Supper';
  isBestseller?: boolean;
  isHighMargin?: boolean;
  ingredients: string[];
  tags: string[];
  imageUrl?: string;
}

export interface AdvisorQuestionTemplate {
  id: string;
  title: string;
  description: string;
  iconName: string;
  sampleQuery: string;
}

export interface UserBusinessProfile {
  conceptName: string;
  conceptType: string;
  targetCustomer: string;
  preferredDistricts: string[];
  maxMonthlyRent: number;
  minFloorArea: number;
  maxTransitWalkMins: number;
  preferredAnchors: string[];
  competitorTolerance: 'Low' | 'Medium' | 'High';
  minFootTraffic: 'Any' | 'Moderate (5k+)' | 'High (12k+)' | 'Super High (20k+)';
  parkingNeeded: 'Essential' | 'Nice to have' | 'Not needed';
  targetOpeningQuarter: string;
  exhaustRequired: boolean;
  greaseTrapRequired: boolean;
  threePhasePowerRequired: boolean;
  liquorRequired: boolean;
}
