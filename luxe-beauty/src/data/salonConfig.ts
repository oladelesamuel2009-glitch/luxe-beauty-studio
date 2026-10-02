export interface SalonConfig {
  name: string;
  shortName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  city: string;
  state: string;
  country: string;
  locationLabel: string;
  address: {
    primary: string;
    landmark: string;
    city: string;
    state: string;
    country: string;
    full: string;
  };
  contact: {
    phoneDisplay: string;
    phoneRaw: string;
    whatsappDisplay: string;
    whatsappRaw: string;
    email: string;
    conciergeEmail: string;
  };
  socials: {
    instagram: {
      handle: string;
      url: string;
      followerCount: string;
    };
    tiktok: {
      handle: string;
      url: string;
    };
    pinterest: {
      handle: string;
      url: string;
    };
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    publicHolidays: string;
  };
  amenities: Array<{ title: string; desc: string; icon: string }>;
  bookingPolicies: {
    depositPercentage: number;
    rescheduleWindowHours: number;
    gracePeriodMinutes: number;
    cancellationPolicy: string;
  };
  stats: {
    rating: number;
    reviewCount: number;
    clientsServed: string;
    expertStylists: number;
    yearsInService: number;
  };
}

export const salonConfig: SalonConfig = {
  name: "LUXE BEAUTY STUDIO",
  shortName: "LUXE",
  tagline: "Luxury beauty. Expert care. Your best look.",
  heroHeadline: "Your beauty, elevated.",
  heroSubheadline: "Professional hair and beauty services designed around you in a serene, contemporary sanctuary.",
  city: "Lagos",
  state: "Lagos State",
  country: "Nigeria",
  locationLabel: "Lagos, Nigeria · By Appointment",
  address: {
    primary: "Plot 14B, Admiralty Way",
    landmark: "Beside The Palms Mall Entrance",
    city: "Lekki Phase 1",
    state: "Lagos State",
    country: "Nigeria",
    full: "Plot 14B, Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
  },
  contact: {
    phoneDisplay: "+234 813 774 8237",
    phoneRaw: "+2348137748237",
    whatsappDisplay: "+234 813 774 8237",
    whatsappRaw: "2348137748237",
    email: "concierge@luxebeautystudio.ng",
    conciergeEmail: "appointments@luxebeautystudio.ng",
  },
  socials: {
    instagram: {
      handle: "@luxebeautystudio",
      url: "https://instagram.com/luxebeautystudio",
      followerCount: "48.2k",
    },
    tiktok: {
      handle: "@luxebeautylagos",
      url: "https://tiktok.com/@luxebeautylagos",
    },
    pinterest: {
      handle: "luxebeautylagos",
      url: "https://pinterest.com/luxebeautylagos",
    },
  },
  hours: {
    weekdays: "9:00 AM – 7:00 PM",
    saturday: "9:00 AM – 7:30 PM",
    sunday: "12:00 PM – 6:00 PM (By Appointment Only)",
    publicHolidays: "10:00 AM – 5:00 PM",
  },
  amenities: [
    { title: "Complimentary Champagne & Botanicals", desc: "Chilled bubbly, artisanal mocktails, and organic calming teas.", icon: "Wine" },
    { title: "Private VIP Styling Suites", desc: "Exclusive acoustic-insulated private suites for bridal and high-privacy appointments.", icon: "Sparkles" },
    { title: "Scalp Health First", desc: "Every service begins with a digital trichology moisture & hair health assessment.", icon: "ShieldCheck" },
    { title: "High-Speed Wi-Fi & Workstation", desc: "Ergonomic charging stations if you need to take calls while being pampered.", icon: "Wifi" },
    { title: "Dedicated Valet Parking", desc: "Secure on-premises monitored parking with complimentary valet service.", icon: "Car" },
    { title: "100% Uninterrupted Power", desc: "Zero salon downtime with solar, high-capacity inverter, and backup generators.", icon: "Zap" },
  ],
  bookingPolicies: {
    depositPercentage: 30,
    rescheduleWindowHours: 24,
    gracePeriodMinutes: 15,
    cancellationPolicy: "Deposits are transferable if rescheduled at least 24 hours prior to your scheduled slot.",
  },
  stats: {
    rating: 4.95,
    reviewCount: 1420,
    clientsServed: "8,500+",
    expertStylists: 12,
    yearsInService: 6,
  },
};

/**
 * Generate deep WhatsApp links with encoded message templates
 */
export function getWhatsAppLink(type: 'general' | 'booking' | 'bridal' | 'consultation' = 'general', details?: { service?: string; date?: string; time?: string; name?: string }): string {
  const phone = salonConfig.contact.whatsappRaw;
  let message = "";

  if (type === 'booking' && details) {
    message = `Hello Luxe Beauty Studio! I would like to confirm my appointment:\n\n• Name: ${details.name || 'Client'}\n• Service: ${details.service || 'Selected Service'}\n• Preferred Date: ${details.date || 'TBD'}\n• Preferred Time: ${details.time || 'TBD'}\n\nPlease let me know the next steps for confirmation. Thank you!`;
  } else if (type === 'bridal') {
    message = "Hello Luxe Beauty Studio Concierge, I would like to inquire about your Bridal Glam & Hair Packages for an upcoming wedding in Lagos.";
  } else if (type === 'consultation') {
    message = "Hello Luxe Beauty Studio, I would like to book a 1-on-1 Scalp & Hair Consultation with a senior specialist.";
  } else {
    message = "Hello Luxe Beauty Studio, I am visiting your website and would love to ask a quick question about your services and availability.";
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
