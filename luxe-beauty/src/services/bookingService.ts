import { salonConfig } from '../data/salonConfig';
import type { BookingFormData, ConfirmedBooking } from '../types/booking';

const STORAGE_KEY = 'luxe_beauty_bookings_v1';

export const TIME_SLOTS = [
  { time: '09:30 AM', period: 'morning', label: '09:30 AM (Morning Glow)' },
  { time: '11:00 AM', period: 'morning', label: '11:00 AM' },
  { time: '01:00 PM', period: 'afternoon', label: '01:00 PM (Afternoon)' },
  { time: '02:30 PM', period: 'afternoon', label: '02:30 PM' },
  { time: '04:00 PM', period: 'afternoon', label: '04:00 PM' },
  { time: '05:30 PM', period: 'evening', label: '05:30 PM (Evening Sunset)' },
];

export const BEVERAGE_OPTIONS = [
  'Chilled Moët & Chandon Champagne',
  'Organic Hibiscus (Zobo) Berry Infusion',
  'Fresh Coconut Water & Mint',
  'Artisan Cappuccino / Oat Milk Latte',
  'Sparkling Mineral Water with Lime',
  'No beverage needed',
];

export function generateBookingId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let result = 'LX-';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function formatDatePretty(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function saveBookingToStorage(booking: ConfirmedBooking): void {
  try {
    const existing = getStoredBookings();
    const updated = [booking, ...existing.filter(b => b.bookingId !== booking.bookingId)].slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not save booking to localStorage', err);
  }
}

export function getStoredBookings(): ConfirmedBooking[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Generate iCalendar (.ics) content for downloading to Apple / Google / Outlook Calendar
 */
export function generateICSContent(booking: ConfirmedBooking): string {
  const dateParts = booking.schedule.date.split('-');
  if (dateParts.length !== 3) return '';
  
  const [year, month, day] = dateParts;
  const timeStr = booking.schedule.timeSlot;
  const isPM = timeStr.includes('PM');
  const [rawHours, rawMins] = timeStr.replace(/ AM| PM/g, '').split(':');
  let hours = parseInt(rawHours, 10);
  if (isPM && hours !== 12) hours += 12;
  if (!isPM && hours === 12) hours = 0;
  
  const pad = (n: number) => (n < 10 ? '0' + n : '' + n);
  const startHours = pad(hours);
  const startMins = pad(parseInt(rawMins, 10) || 0);
  const endHours = pad((hours + 2) % 24);
  
  const startFormatted = `${year}${month}${day}T${startHours}${startMins}00`;
  const endFormatted = `${year}${month}${day}T${endHours}${startMins}00`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Luxe Beauty Studio Lagos//Appointment Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${booking.bookingId}@luxebeautystudio.ng`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    `SUMMARY:Luxe Beauty Studio: ${booking.service.name}`,
    `DESCRIPTION:Appointment at Luxe Beauty Studio Lagos for ${booking.client.fullName}. Service: ${booking.service.name}. Stylist: ${booking.stylist.name}. Booking ID: ${booking.bookingId}. Contact: ${salonConfig.contact.phoneDisplay}`,
    `LOCATION:${salonConfig.address.full}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadICSFile(booking: ConfirmedBooking): void {
  const icsContent = generateICSContent(booking);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Luxe-Appointment-${booking.bookingId}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generate deep WhatsApp booking confirmation link
 */
export function getBookingWhatsAppLink(booking: ConfirmedBooking): string {
  const phone = salonConfig.contact.whatsappRaw;
  const message = `✨ *LUXE BEAUTY STUDIO — APPOINTMENT CONFIRMATION*\n\n` +
    `Hello Concierge, I just booked an appointment online!\n\n` +
    `• *Booking ID:* ${booking.bookingId}\n` +
    `• *Client Name:* ${booking.client.fullName}\n` +
    `• *Service:* ${booking.service.name}\n` +
    `• *Specialist:* ${booking.stylist.name}\n` +
    `• *Date:* ${booking.schedule.dateFormatted}\n` +
    `• *Time:* ${booking.schedule.timeSlot}\n` +
    `• *Total Estimated:* ₦${booking.totalEstimatedAmount.toLocaleString()}\n` +
    (booking.client.hairTextureOrLaceNotes ? `• *Hair/Lace Notes:* ${booking.client.hairTextureOrLaceNotes}\n` : '') +
    (booking.client.beveragePreference ? `• *Welcome Beverage:* ${booking.client.beveragePreference}\n` : '') +
    `\nPlease confirm the next steps for my deposit payment. Looking forward to my session! 🤎`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Simulate API submission (Ready to swap for Supabase / Firebase / REST endpoint)
 */
export async function submitBookingAPI(formData: BookingFormData): Promise<ConfirmedBooking> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!formData.selectedService) {
    throw new Error('Please select a service to proceed.');
  }

  const basePrice = formData.selectedService.price;
  const addOnsTotal = formData.selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const total = basePrice + addOnsTotal;
  const deposit = Math.round(total * (salonConfig.bookingPolicies.depositPercentage / 100));

  const stylistName = formData.selectedStylist ? formData.selectedStylist.name : 'Master Stylist (First Available)';
  const stylistRole = formData.selectedStylist ? formData.selectedStylist.role : 'Senior Artisan Team';

  const confirmed: ConfirmedBooking = {
    bookingId: generateBookingId(),
    createdAt: new Date().toISOString(),
    service: {
      id: formData.selectedService.id,
      name: formData.selectedService.name,
      category: formData.selectedService.categoryLabel,
      price: formData.selectedService.price,
      duration: formData.selectedService.duration,
    },
    addOns: formData.selectedAddOns.map(a => ({ id: a.id, name: a.name, price: a.price })),
    totalEstimatedAmount: total,
    depositAmount: deposit,
    stylist: {
      id: formData.stylistId,
      name: stylistName,
      role: stylistRole,
    },
    schedule: {
      date: formData.selectedDate,
      dateFormatted: formatDatePretty(formData.selectedDate),
      timeSlot: formData.selectedTimeSlot,
    },
    client: {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      hairTextureOrLaceNotes: formData.hairTextureOrLaceNotes,
      specialRequests: formData.specialRequests,
      beveragePreference: formData.beveragePreference,
    },
    status: 'confirmed',
    location: salonConfig.address.full,
  };

  saveBookingToStorage(confirmed);
  return confirmed;
}
