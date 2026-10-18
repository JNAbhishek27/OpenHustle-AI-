export type Marketplace = 'etsy' | 'ebay' | 'shopify' | 'poshmark' | 'depop' | 'facebook';

export type EngineMode = 'gemma-2-9b' | 'gemma-2-27b' | 'local-edge' | 'tabpfn-prior' | 'tinker-lora';

export interface ListingTitles {
  etsy: string;
  ebay: string;
  shopify: string;
  poshmark: string;
  depop: string;
  facebook: string;
}

export interface Specification {
  label: string;
  value: string;
}

export interface MarketplaceFee {
  listingFee: number;
  commissionPercent: number;
  estNetProfit: number;
}

export interface PricingForecast {
  suggestedPrice: number;
  minPrice: number;
  highPrice: number;
  confidenceScore: number;
  projectedVelocityDays: number;
  demandScore: 'Low' | 'Moderate' | 'High' | 'Very High';
}

export interface ListingData {
  titles: ListingTitles;
  storyDescription: string;
  specifications: Specification[];
  disclosedFlaws: string;
  etsyTags: string[];
  ebayItemSpecifics: Record<string, string>;
  hashtags: string[];
  pricing: PricingForecast;
  marketplacesBreakdown: Record<string, MarketplaceFee>;
  buyerPersona: string;
  openWeightInsight: string;
}

export interface TabPFNFeatureImportance {
  feature: string;
  weight: number;
}

export interface TabPFNPrediction {
  predictedClearingPrice: number;
  confidenceInterval: {
    low: number;
    high: number;
  };
  predictedDaysToSell: number;
  sellProbabilityIn7Days: number;
  featureImportance: TabPFNFeatureImportance[];
  elasticityAdvice: string;
}

export interface ReceiptItem {
  name: string;
  price: number;
  qty: number;
}

export interface ParsedReceipt {
  vendor: string;
  date: string;
  total: number;
  subtotal: number;
  tax: number;
  currency: string;
  paymentMethod: string;
  items: ReceiptItem[];
  taxCategory: string;
  isDeductible: boolean;
  deductiblePercentage: number;
  irsScheduleCLine: string;
  auditRisk: string;
  summary: string;
}

export interface PresetItem {
  id: string;
  title: string;
  category: string;
  condition: string;
  brand: string;
  costPrice: number;
  image: string;
  additionalImages?: string[];
  keyFeatures: string;
  notes: string;
}
