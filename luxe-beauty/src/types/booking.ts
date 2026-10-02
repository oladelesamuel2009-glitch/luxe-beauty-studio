import type { ServiceAddOn, ServiceItem } from '../data/servicesData';
import type { TeamMember } from '../data/teamData';

export interface BookingFormData {
  // Step 1: Service
  category: string;
  serviceId: string;
  selectedService: ServiceItem | null;
  selectedAddOns: ServiceAddOn[];
  
  // Step 2: Stylist & Schedule
  stylistId: string;
  selectedStylist: TeamMember | null;
  selectedDate: string;
  selectedTimeSlot: string;

  // Step 3: Client Info
  fullName: string;
  phone: string;
  email: string;
  hairTextureOrLaceNotes: string;
  specialRequests: string;
  beveragePreference: string;
  sendWhatsAppConfirmation: boolean;
}

export interface ConfirmedBooking {
  bookingId: string;
  createdAt: string;
  service: {
    id: string;
    name: string;
    category: string;
    price: number;
    duration: string;
  };
  addOns: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  totalEstimatedAmount: number;
  depositAmount: number;
  stylist: {
    id: string;
    name: string;
    role: string;
  };
  schedule: {
    date: string;
    dateFormatted: string;
    timeSlot: string;
  };
  client: {
    fullName: string;
    phone: string;
    email: string;
    hairTextureOrLaceNotes?: string;
    specialRequests?: string;
    beveragePreference?: string;
  };
  status: 'confirmed' | 'pending_deposit';
  location: string;
}
