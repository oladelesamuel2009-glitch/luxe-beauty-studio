export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  bio: string;
  image: string;
  rating: number;
}

export const teamData: TeamMember[] = [
  {
    id: 't-amaka',
    name: 'Amaka Okonjo',
    role: 'Creative Texture Director',
    specialty: 'Silk Press, Scalp Health & Precision Cuts',
    experience: '8+ Years',
    bio: 'Trained in London and Lagos, Amaka is dedicated to preserving natural curl integrity while achieving breathtaking glass-hair silk presses.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=85',
    rating: 4.98,
  },
  {
    id: 't-kehinde',
    name: 'Kehinde Taiwo',
    role: 'Lead Wig & HD Lace Artisan',
    specialty: 'Invisible HD Frontal Melts & Custom Units',
    experience: '7+ Years',
    bio: 'Renowned for undetectable lace melt artistry, Kehinde crafts realistic hairlines trusted by Nigerian celebrities and corporate leaders.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85',
    rating: 5.0,
  },
  {
    id: 't-blessing',
    name: 'Blessing Eze',
    role: 'Master Protective Stylist',
    specialty: 'Boho Knotless, French Curls & Stitch Cornrows',
    experience: '6+ Years',
    bio: 'Champion of tension-free protective styling that nurtures edges while delivering Instagram-viral braid symmetry.',
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=85',
    rating: 4.95,
  },
  {
    id: 't-zainab',
    name: 'Zainab Mohammed',
    role: 'Senior Editorial & Bridal MUA',
    specialty: 'Radiant Soft Glam & Bridal Perfection',
    experience: '6+ Years',
    bio: 'Specialist in sweat-resistant, luminous complexion finishes tailored for tropical photography and Nigerian celebrations.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=85',
    rating: 4.97,
  },
  {
    id: 't-ngozi',
    name: 'Ngozi Duru',
    role: 'Senior Nail & Pedicure Specialist',
    specialty: 'Russian Dry Manicure & BIAB Gel Extensions',
    experience: '5+ Years',
    bio: 'Master of e-file cuticle care and structured gel sculpting with an eye for clean minimalist elegance.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=85',
    rating: 4.94,
  },
];
