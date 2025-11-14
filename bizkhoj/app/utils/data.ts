import { Business, BusinessDetails, Review } from "./types";

// Single source of truth - all business data with full details
export const businessesData: BusinessDetails[] = [
  {
    id: "1",
    name: "Elegant Hair Studio",
    images: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800",
      "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800",
    ],
    rating: 4.8,
    reviewCount: 234,
    address: "Damak, Jhapa",
    distance: "0.8 km",
    isOpen: true,
    openTime: "10:00 AM",
    closeTime: "8:00 PM",
    phone: "+977 9841234567",
    category: "Salons",
    description:
      "Experience luxury hair care and styling at Elegant Hair Studio. Our expert stylists provide premium services including haircuts, coloring, styling, and treatments in a relaxing atmosphere.",
    amenities: ["WiFi", "AC", "Parking", "Card Payment", "Wheelchair Access"],
    priceRange: "₹₹₹",
    website: "https://eleganthair.com",
    reviews: [
      {
        id: "1",
        author: "Ankit Khanal",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 5,
        date: "2024-07-20",
        comment:
          "Absolutely fantastic service! The stylists are true professionals. I got the best haircut of my life here. Highly recommend!",
      },
      {
        id: "2",
        author: "Jane Doe",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 4,
        date: "2024-07-18",
        comment:
          "Great atmosphere and friendly staff. My hair color came out perfect. A bit pricey, but worth it for the quality.",
      },
    ],
  },
  {
    id: "2",
    name: "Style Icon Salon",
    images: [
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
    ],
    rating: 4.6,
    reviewCount: 189,
    address: "Birtamode, Jhapa",
    distance: "1.2 km",
    isOpen: true,
    openTime: "9:00 AM",
    closeTime: "7:00 PM",
    phone: "+977 9841234568",
    category: "Salons",
    description:
      "Premium styling services with experienced professionals. Specializing in modern haircuts, coloring, and hair treatments.",
    amenities: ["WiFi", "AC", "Card Payment"],
    priceRange: "₹₹",
    website: "https://styleiconnepal.com",
    reviews: [
      {
        id: "1",
        author: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        rating: 5,
        date: "2024-07-15",
        comment:
          "Amazing experience! The staff is very professional and friendly.",
      },
    ],
  },
  {
    id: "3",
    name: "The Grooming Lounge",
    images: [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800",
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
    ],
    rating: 4.9,
    reviewCount: 312,
    address: "Bhadrapur, Jhapa",
    distance: "2.1 km",
    isOpen: false,
    openTime: "10:00 AM",
    closeTime: "8:00 PM",
    phone: "+977 9841234569",
    category: "Salons",
    description:
      "Your destination for grooming excellence. Offering premium haircuts, beard styling, and grooming services.",
    amenities: ["WiFi", "Parking", "Card Payment"],
    priceRange: "₹₹₹",
    reviews: [
      {
        id: "1",
        author: "Mike Smith",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        rating: 5,
        date: "2024-07-12",
        comment: "Best grooming service in town! Very professional and clean.",
      },
      {
        id: "2",
        author: "Emily Chen",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        rating: 4,
        date: "2024-07-10",
        comment: "Great service, highly recommended!",
      },
    ],
  },
  {
    id: "4",
    name: "Bella Hair & Spa",
    images: [
      "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800",
    ],
    rating: 4.7,
    reviewCount: 156,
    address: "Kathmandu, Nepal",
    distance: "3.4 km",
    isOpen: true,
    openTime: "10:00 AM",
    closeTime: "9:00 PM",
    phone: "+977 9841234570",
    category: "Salons",
    description:
      "Luxury spa and salon experience with premium hair services, spa treatments, and beauty services.",
    amenities: ["WiFi", "AC", "Parking", "Card Payment"],
    priceRange: "₹₹₹₹",
    website: "https://bellahairstudio.com",
    reviews: [
      {
        id: "1",
        author: "David Brown",
        avatar: "https://randomuser.me/api/portraits/men/6.jpg",
        rating: 5,
        date: "2024-07-08",
        comment: "Wonderful spa experience. Very relaxing and professional.",
      },
    ],
  },
  {
    id: "5",
    name: "Premium Cuts",
    images: [
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800",
    ],
    rating: 4.5,
    reviewCount: 98,
    address: "Bhadrapur, Nepal",
    distance: "4.2 km",
    isOpen: true,
    openTime: "9:30 AM",
    closeTime: "7:30 PM",
    phone: "+977 9841234571",
    category: "Salons",
    description:
      "High-end barbershop offering premium cuts and grooming services for the modern gentleman.",
    amenities: ["WiFi", "AC", "Card Payment", "Parking"],
    priceRange: "₹₹₹",
    website: "https://premiumcuts.np",
    reviews: [
      {
        id: "1",
        author: "Lisa Wang",
        avatar: "https://randomuser.me/api/portraits/women/7.jpg",
        rating: 4,
        date: "2024-07-05",
        comment: "Premium quality cuts. A bit expensive but worth it.",
      },
      {
        id: "2",
        author: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/8.jpg",
        rating: 5,
        date: "2024-07-03",
        comment: "Excellent service and very skilled barbers!",
      },
    ],
  },
];

// Helper: Get all businesses as simple Business objects (for list views)
export const getBusinessList = (): Business[] => {
  return businessesData.map(
    ({ description, amenities, priceRange, website, reviews, ...business }) =>
      business
  );
};

// Helper: Get businesses by category
export const getBusinessesByCategory = (category: string): Business[] => {
  return businessesData
    .filter(
      (business) => business.category.toLowerCase() === category.toLowerCase()
    )
    .map(
      ({ description, amenities, priceRange, website, reviews, ...business }) =>
        business
    );
};

// Helper: Get full business details by ID
export const getBusinessDetailsById = (id: string): BusinessDetails => {
  return (
    businessesData.find((business) => business.id === id) || businessesData[0]
  );
};
