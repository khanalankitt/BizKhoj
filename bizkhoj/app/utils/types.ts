export interface Business {
  id: string;
  name: string;
  images: string[];
  rating: number;
  reviewCount: number;
  address: string;
  distance: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  phone: string;
  category: string;
}

export interface LocationResult {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
  };
}

export interface LocationContextType {
  selectedLocation: string | null;
  setSelectedLocation: (location: string) => void;
}

export interface LocationHours {
  openTime: string;
  closeTime: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface BusinessDetails extends Business {
  description: string;
  amenities: string[];
  priceRange: string;
  website?: string;
  reviews: Review[];
}
