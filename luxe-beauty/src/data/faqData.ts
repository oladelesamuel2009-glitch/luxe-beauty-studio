export interface FAQItem {
  id: string;
  category: 'booking' | 'services' | 'hair-care' | 'payment';
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'booking',
    question: 'Do I need an advance appointment, or do you accept walk-ins?',
    answer: 'To guarantee dedicated time and our signature unhurried standard of care, Luxe operates strictly by advance appointment. However, we occasionally have same-day cancellations. You can check same-day availability directly via our WhatsApp concierge or by booking online.',
  },
  {
    id: 'faq-2',
    category: 'booking',
    question: 'How early should I arrive for my appointment?',
    answer: 'We kindly request that you arrive 10 to 15 minutes before your scheduled start time. This allows you to settle in, enjoy a complimentary welcome beverage (chilled champagne, herbal infusion, or sparkling water), and complete your personalized scalp or skin consultation.',
  },
  {
    id: 'faq-3',
    category: 'services',
    question: 'Do I need to bring my own hair extensions or wigs?',
    answer: 'For Braids and Protective Styles, you may bring your preferred braiding hair or purchase our premium pre-stretched extensions and 100% Raw Human Curls directly in-studio. For Wig Installations, you may bring your unit, but we request drop-off 24–48 hours prior for custom knot bleaching, toning, and hairline plucking (same-day customization is available with a VIP Rush add-on).',
  },
  {
    id: 'faq-4',
    category: 'hair-care',
    question: 'How do you protect natural hair and edges during braid and wig installs?',
    answer: 'Hair health is our non-negotiable philosophy. Our braiders use a gentle, tension-free feed-in technique that never pulls delicate edge follicles. For wig installations, we use medical-grade, alcohol-free scalp protectors and skin-safe adhesives formulated to peel cleanly without stripping natural hair.',
  },
  {
    id: 'faq-5',
    category: 'services',
    question: 'Do you offer on-location or bridal packages across Lagos?',
    answer: 'Yes. Our Creative Team frequently travels for luxury weddings, private hotel glam suites, and editorial campaigns across Victoria Island, Ikoyi, Lekki, Epe, and Abuja. Bridal inquiries can be coordinated via our dedicated Bridal Concierge on WhatsApp.',
  },
  {
    id: 'faq-6',
    category: 'payment',
    question: 'What payment methods do you accept, and is a deposit required?',
    answer: 'A standard 30% deposit is requested to secure your appointment slot. The balance can be completed in-studio via all major Nigerian debit cards (Mastercard, Visa, Verve), direct instant bank transfer, or contactless POS payments. We operate a secure cashless studio.',
  },
  {
    id: 'faq-7',
    category: 'booking',
    question: 'Can I reschedule or cancel my appointment?',
    answer: 'Yes. You can reschedule your appointment at no penalty up to 24 hours before your scheduled time. Your deposit will automatically transfer to your new date within a 30-day window.',
  },
  {
    id: 'faq-8',
    category: 'hair-care',
    question: 'How long do silk press results last in the Lagos climate?',
    answer: 'With our anti-humidity micro-mist steam sealing and bond protection, clients typically enjoy silky, bounce-filled hair for 2 to 3 weeks. We also provide every silk press client with a complimentary satin silk wrap guide to maintain longevity at home.',
  },
];
