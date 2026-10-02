export interface TestimonialItem {
  id: string;
  clientName: string;
  clientTitle: string;
  service: string;
  rating: number;
  review: string;
  date: string;
  avatar: string;
  verified: boolean;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: 't-1',
    clientName: 'Folashade A.',
    clientTitle: 'Brand Strategist, Victoria Island',
    service: 'Luxury Boho Knotless Box Braids',
    rating: 5,
    review: 'The best braid experience I have ever had in Lagos. Not a single pull on my edges, no headaches, and the human hair curls they used did not tangle once during my 3-week trip to Zanzibar. The salon ambience is so quiet and peaceful—I was even able to take client meetings on their high-speed Wi-Fi.',
    date: 'September 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    verified: true,
  },
  {
    id: 't-2',
    clientName: 'Chioma N.',
    clientTitle: 'Creative Director, Lekki',
    service: 'HD Lace Frontal Melt & Custom Styling',
    rating: 5,
    review: 'Kehinde worked pure magic on my 30-inch wig. The lace is literally invisible—even under natural daylight. She took the time to color match my exact forehead undertone and taught me how to tie it down properly at night. Luxe is now my permanent beauty home.',
    date: 'August 2026',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    verified: true,
  },
  {
    id: 't-3',
    clientName: 'Zainab O.',
    clientTitle: 'Fintech Executive, Ikoyi',
    service: 'Precision Silk Press & Steam Infusion',
    rating: 5,
    review: 'I have dense 4C hair and have had traumatic heat damage in the past. The trichology scalp consultation here put me completely at ease. My silk press had so much featherlight movement and body, and when I washed it 3 weeks later, my natural curl pattern bounced right back without any heat damage.',
    date: 'September 2026',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    verified: true,
  },
  {
    id: 't-4',
    clientName: 'Adanna E.',
    clientTitle: 'Architect & Interior Designer, Oniru',
    service: 'The Sovereign Glam Experience',
    rating: 5,
    review: 'Booked the Sovereign Glam Session for my 30th birthday gala. Having hair, makeup, and nails synchronized in a private VIP suite with chilled champagne felt like a 5-star European resort right here on Admiralty Way. The makeup lasted through 8 hours of dancing in high humidity!',
    date: 'August 2026',
    avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=200&q=80',
    verified: true,
  },
  {
    id: 't-5',
    clientName: 'Temi B.',
    clientTitle: 'Venture Partner, Eko Atlantic',
    service: 'Luxe Russian Manicure & Hard Gel',
    rating: 5,
    review: 'Their Russian dry manicure is on another level. My cuticles have never looked this clean, and the builder gel lasted a full 5 weeks without lifting or chipping. Plus, the studio respects appointment times down to the minute—no sitting around for hours.',
    date: 'July 2026',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80',
    verified: true,
  },
  {
    id: 't-6',
    clientName: 'Somto K.',
    clientTitle: 'Film Producer, Lekki Phase 1',
    service: 'HydraGlow Oxygenating Facial',
    rating: 5,
    review: 'After weeks on film sets with heavy lighting and Lagos traffic, my skin was terribly congested. The HydraGlow facial unclogged every pore and left my skin with a genuine glass-skin glow. The esthetician was gentle and deeply knowledgeable about melanin-rich skin.',
    date: 'September 2026',
    avatar: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=200&q=80',
    verified: true,
  },
];
