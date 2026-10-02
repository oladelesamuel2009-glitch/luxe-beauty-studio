export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  tag: string;
}

export const instagramPosts: InstagramPost[] = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=85',
    likes: 1420,
    comments: 84,
    caption: 'The art of the featherweight silk press. No tension, zero heat damage, 100% natural movement ✨ #LuxeLagos #SilkPressLagos #HairSanctuary',
    tag: '@luxebeautystudio',
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=600&q=85',
    likes: 2190,
    comments: 132,
    caption: 'Boho Knotless perfection for our muse @folashade. Blended with Raw Burmese curls that never tangle 🤎 #BohoBraidsLagos #ProtectiveStyle',
    tag: '@luxebeautystudio',
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85',
    likes: 1845,
    comments: 96,
    caption: 'What lace? Microscopic knot bleaching & custom scalp tint for a seamless front-row melt ✨ #HDLaceLagos #WigInstallLekki',
    tag: '@luxebeautystudio',
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=85',
    likes: 2430,
    comments: 158,
    caption: 'Soft glam that feels like a whisper on skin and lasts all night. Velvet cocoa tones for the weekend ✨ #LagosGlam #SoftGlamMakeup',
    tag: '@luxebeautystudio',
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=85',
    likes: 980,
    comments: 47,
    caption: 'Russian e-file dry manicure with milky glazed chrome finish. 4+ weeks of immaculate growth ✨ #BIABLagos #RussianManicure',
    tag: '@luxebeautystudio',
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=85',
    likes: 1670,
    comments: 110,
    caption: 'Your sanctuary in Lekki Phase 1. Calm energy, iced champagne, and bespoke care. Step inside ✨ #LuxeSanctuary #LagosSpa',
    tag: '@luxebeautystudio',
  },
];
