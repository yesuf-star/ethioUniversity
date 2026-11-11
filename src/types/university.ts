export type StreamType = "natural" | "social";

export type GenerationType =
  "1st Gen" | "2nd Gen" | "3rd Gen" | "4th Gen" | "Specialized" | "ALL";

export interface CutOffScores {
  natural: number;
  social: number;
}

export interface CampusLocation {
  name: string;
  isMain: boolean;
  googleMapsUrl: string;
  contactNumber?: string;
  telegramUrl?: string;
}

export interface CommunityContext {
  primaryLanguages: string[];
  marketAccess: string;
  religiousFacilities: string[];
}

export interface University {
  id: string;
  name: string;
  amharicName: string;
  logoUrl: string;
  website: string;
  city: string;
  distanceFromAddis: number;
  establishedYear: number;
  generation: GenerationType;
  level: string;
  rating: number;
  climate: string;
  minCutOff: CutOffScores;
  departments: string[];
  studentPopulation: string;
  isPopular?: boolean;
  community: CommunityContext;
  campuses: CampusLocation[];
  videoUrl?: string;
}

export interface ExternalApiUniversity {
  name: string;
  country: string;
  web_pages: string[];
  "state-province": string | null;
  alpha_two_code?: string;
  domains?: string[];
}
