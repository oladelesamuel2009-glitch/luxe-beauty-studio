export interface BenefitItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  highlight: string;
}

export const whyChooseUsData: BenefitItem[] = [
  {
    id: 'b-1',
    number: '01',
    title: 'Master Artistry & Certified Specialists',
    subtitle: 'Over 6+ years of specialized luxury expertise',
    description: 'Every stylist, braider, and esthetician at Luxe is rigorously trained in texture-specific haircare, dermatological skin prep, and high-precision techniques. We never rush your craft.',
    iconName: 'Crown',
    highlight: 'Certified Texture & HD Lace Specialists',
  },
  {
    id: 'b-2',
    number: '02',
    title: 'Bespoke Consultation & Scalp Health First',
    subtitle: 'Personalized care tailored to your specific hair and skin profile',
    description: 'We prioritize the long-term health of your natural hair and skin barrier. Every appointment starts with an individualized consultation and digital moisture assessment before any styling begins.',
    iconName: 'Sparkles',
    highlight: 'Trichology-focused scalp preservation',
  },
  {
    id: 'b-3',
    number: '03',
    title: 'Hospital-Grade Sanitization & Clean Beauty',
    subtitle: 'Autoclave-sterilized tools and premium international formulations',
    description: 'We use medical-grade dry heat autoclaves for all metal manicure and hair tools, single-use disposables where applicable, and clean, cruelty-free botanicals designed specifically for melanin-rich skin.',
    iconName: 'ShieldCheck',
    highlight: '100% sterile tools & premium salon lines',
  },
  {
    id: 'b-4',
    number: '04',
    title: 'Punctuality Guarantee & Serene Sanctuary',
    subtitle: 'No salon chaos. Zero waiting hours.',
    description: 'We value your schedule. Your chair is prepped and ready when you arrive. Enjoy a calm, acoustic-insulated sanctuary with complimentary barista coffee, artisan teas, and champagne.',
    iconName: 'Clock',
    highlight: 'On-time appointments & tranquil atmosphere',
  },
  {
    id: 'b-5',
    number: '05',
    title: 'Uncompromising Attention to Detail',
    subtitle: 'From microscopic lace knots to invisible finish lines',
    description: 'Luxury lives in the subtle nuances—the exact tone of your lace tint, the symmetry of your knotless grid, the longevity of your nail apex, and a look that turns heads for weeks.',
    iconName: 'Gem',
    highlight: 'Flawless execution on every look',
  },
];
