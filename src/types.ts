export interface Plan {
  id: string;
  speed: number;
  speedUnit: string;
  speedLabel: string;
  name: string;
  userCount: string;
  price: number;
  currency: string;
  period: string;
  isPopular?: boolean;
  category: 'home' | 'business';
  badgeColor?: string;
  gaugePercentage: number;
  features: {
    text: string;
    included: boolean;
    highlight?: boolean;
  }[];
  devicesRange: string;
  cableTvIncluded: boolean;
  cableTvChannels?: string;
  routerType: string;
  installationFee: string;
}

export interface LeadFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  installationAddress: string;
  selectedPlanId: string;
  serviceType: 'home' | 'business';
  promoCode?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'billing' | 'installation';
}

export interface PartnerBrand {
  name: string;
  category: string;
  accentColor: string;
  logoSvg?: string;
}

export interface CoverageResult {
  address: string;
  status: 'available' | 'limited' | 'planning';
  maxSpeed: number;
  availableTechnologies: string[];
  estimatedInstallDays: number;
}
