export interface ServiceAddOn {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'hair' | 'braids' | 'wigs' | 'nails' | 'makeup' | 'skin';
  categoryLabel: string;
  price: number;
  priceFormatted: string;
  priceType: 'starting_at' | 'fixed';
  duration: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  popular?: boolean;
  featured?: boolean;
  badge?: string;
  whatIncluded: string[];
  prepAdvice: string[];
  addOns?: ServiceAddOn[];
}

export const serviceCategories = [
  { id: 'all', label: 'All Services', count: 18 },
  { id: 'hair', label: 'Hair Styling', count: 4 },
  { id: 'braids', label: 'Braids & Protective', count: 4 },
  { id: 'wigs', label: 'Wig Services', count: 3 },
  { id: 'nails', label: 'Nails & Pedicure', count: 3 },
  { id: 'makeup', label: 'Makeup & Glam', count: 2 },
  { id: 'skin', label: 'Beauty & Facials', count: 2 },
] as const;

export type ServiceCategoryId = typeof serviceCategories[number]['id'];

export const servicesData: ServiceItem[] = [
  // ---------------- HAIR STYLING ----------------
  {
    id: 'silk-press-treatment',
    name: 'Precision Silk Press & Steam Infusion',
    category: 'hair',
    categoryLabel: 'Hair Styling',
    price: 35000,
    priceFormatted: '₦35,000',
    priceType: 'starting_at',
    duration: '2 hours',
    popular: true,
    badge: 'Signature',
    shortDescription: 'Deep clarifying cleanse, ozone micro-mist steam treatment, precision trim, and glass-finish featherweight silk press.',
    fullDescription: 'Our signature silk press delivers extraordinary movement, featherweight body, and mirror-like gloss without heat damage. Includes a digital scalp analysis, sulfate-free detox cleanse, custom moisture infusion under our ozone micro-mist steamer, precision dead-end dusting, and a heat-protected ceramic smoothing finish.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Digital trichology moisture & elasticity scalp analysis',
      'Double clarifying cleanse + peptide repair shampoo',
      '20-min micro-mist ozone deep steam hydration',
      'Split-end health trim & thermal barrier sealing',
      'Silk press styling with feather-light diamond finish',
    ],
    prepAdvice: [
      'Arrive with hair free of heavy glues, braids, or excessive product buildup.',
      'Detangle prior to arrival or select our gentle pre-wash detangle add-on.',
    ],
    addOns: [
      { id: 'scalp-detox', name: 'Peppermint Scalp Exfoliation Scrub', price: 8000, duration: '15 mins', description: 'Deep botanical exfoliation to remove product buildup and invigorate follicles.' },
      { id: 'split-end-mender', name: 'Olaplex No. 1 & 2 Molecular Bond Repair', price: 15000, duration: '20 mins', description: 'Restores broken disulfide bonds in natural or color-treated hair.' },
    ],
  },
  {
    id: 'luxury-blowout-style',
    name: 'The Editorial Blowout & Volumizing Style',
    category: 'hair',
    categoryLabel: 'Hair Styling',
    price: 28000,
    priceFormatted: '₦28,000',
    priceType: 'starting_at',
    duration: '90 mins',
    shortDescription: 'Voluminous, bouncy blowout with high-gloss thermal protection and customized wand or roller setting.',
    fullDescription: 'Designed for effortless red-carpet bounce. Features our nourishing caviar wash, leave-in thermal protection, round-brush tension blowout, and custom Hollywood curtain waves or roller-set volume.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Hydrating aromatic scalp massage & wash',
      'Protein balancing leave-in cocktail',
      'Custom tension round-brush blowout',
      'Velvet roller set for long-lasting memory',
    ],
    prepAdvice: [
      'Please mention if your hair has active relaxers or chemical smoothing treatments.',
    ],
    addOns: [
      { id: 'keratin-seal', name: 'Anti-Humidity Keratin Seal Mist', price: 6000, duration: '10 mins', description: 'Blocks Lagos humidity for up to 72 hours.' },
    ],
  },
  {
    id: 'keratin-smoothing',
    name: 'Keratin Amino Restorative Treatment',
    category: 'hair',
    categoryLabel: 'Hair Styling',
    price: 65000,
    priceFormatted: '₦65,000',
    priceType: 'starting_at',
    duration: '3 hours',
    shortDescription: 'Formaldehyde-free amino acid smoothing system that tames frizz while maintaining your natural curl pattern.',
    fullDescription: 'An ultra-nourishing botanical treatment that infuses natural keratin and silk amino acids directly into the hair cuticle. Dramatically reduces styling time, seals out tropical humidity, and leaves strands supple, resilient, and tangle-free for up to 4 months.',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Deep clarifying treatment wash',
      'Targeted keratin amino infusion application',
      'Thermal micro-bonding seal',
      'Take-home sulfate-free mini shampoo & conditioner set',
    ],
    prepAdvice: [
      'Avoid coloring hair 2 weeks prior to this treatment.',
      'Plan to keep hair dry for 48 hours post-treatment.',
    ],
  },
  {
    id: 'curl-definition-cut',
    name: 'Natural Texture Cut & Hydration Hydradiscs',
    category: 'hair',
    categoryLabel: 'Hair Styling',
    price: 32000,
    priceFormatted: '₦32,000',
    priceType: 'starting_at',
    duration: '2 hours',
    shortDescription: 'Dry curl-by-curl shaping, botanical botanical deep wash, and defined wash-and-go diffuse styling.',
    fullDescription: 'Celebrate your crown in its natural glory. Our certified texture specialists analyze your curl diameter, shrinkage, and density to create a bespoke shape that complements your facial contours.',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Dry anatomical curl assessment & shape framing',
      'Botanical hydration wash & tangle melt',
      'Hand-raked flaxseed & aloe curl definition',
      'Diffused hooded low-velocity drying',
    ],
    prepAdvice: [
      'Arrive with your hair in its natural dry state, completely detangled, with minimal styling product.',
    ],
  },

  // ---------------- BRAIDS & PROTECTIVE STYLES ----------------
  {
    id: 'boho-knotless-braids',
    name: 'Luxury Boho Knotless Box Braids',
    category: 'braids',
    categoryLabel: 'Braids & Protective',
    price: 48000,
    priceFormatted: '₦48,000',
    priceType: 'starting_at',
    duration: '4.5 hours',
    popular: true,
    badge: 'Client Favorite',
    shortDescription: 'Tension-free, featherweight knotless braids seamlessly blended with high-grade human curls for an effortless bohemian aesthetic.',
    fullDescription: 'Our most requested protective style in Lagos. Painless, feather-light knotless parting that protects your delicate hairline and edges. We blend premium pre-stretched braiding fiber with 100% Raw Human Curls throughout the lengths and ends for a soft, goddess-like texture that resists matting.',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Soothing peppermint tension-relief edge prep',
      'Precision square or triangle grid geometric parting',
      '100% human curl inclusions for bohemian effect',
      'Silk mousse hot water dip & scalp oil sealing',
    ],
    prepAdvice: [
      'Hair must be freshly washed, blown out or stretched, and free of heavy oils.',
      'Braiding extensions can be provided in-studio or brought by client.',
    ],
    addOns: [
      { id: 'butt-length', name: 'Extended Waist / Butt Length Upgrade', price: 12000, duration: '45 mins', description: 'Adds extended length beyond mid-back.' },
      { id: 'raw-human-curls', name: '100% Raw Burmese Human Hair Curls Upgrade', price: 25000, duration: '0 mins', description: 'Zero tangling, reusable for up to 6 months.' },
    ],
  },
  {
    id: 'french-curl-braids',
    name: 'Sleek French Curl Braid Ensemble',
    category: 'braids',
    categoryLabel: 'Braids & Protective',
    price: 45000,
    priceFormatted: '₦45,000',
    priceType: 'starting_at',
    duration: '4 hours',
    shortDescription: 'Silky, romantic braids with cascading bouncy French curls that hold their shape in any weather.',
    fullDescription: 'An ultra-feminine silhouette featuring sleek, seamless roots flowing into luscious, bouncy French curls. Ultra-lightweight and perfect for vacations, luxury dinners, and everyday glam.',
    image: 'https://images.unsplash.com/photo-1597225244660-1cd128c64284?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Tensionless feed-in starting technique',
      'Clean parting with organic castor edge control',
      'Pre-curled silky French extensions setting',
      'Nourishing finishing spray',
    ],
    prepAdvice: [
      'Please indicate your desired curl color (1B, #2, Ombre Honey Brown, Burgundy, or Caramel).',
    ],
  },
  {
    id: 'goddess-cornrows',
    name: 'Goddess Stitch Cornrows & Tribal Artistry',
    category: 'braids',
    categoryLabel: 'Braids & Protective',
    price: 32000,
    priceFormatted: '₦32,000',
    priceType: 'starting_at',
    duration: '3 hours',
    shortDescription: 'Laser-sharp stitch lines with feeding hair and soft framing baby hair styling or cowrie shell accents.',
    fullDescription: 'Flawless stitch cornrows with geometric symmetry and clean lines. Tailored to your facial structure, whether you prefer 6 sleek straight-back stitch braids or intricate Fulani crossover patterns.',
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Scalp hydration base application',
      'Stitch comb precision parting',
      'Choice of clean straight-back or Fulani side-swept layout',
      'Gold wire or bead embellishment options upon request',
    ],
    prepAdvice: [
      'Ensure hair is well moisturized and stretched.',
    ],
  },
  {
    id: 'island-passion-twists',
    name: 'Island Passion & Senegalese Twists',
    category: 'braids',
    categoryLabel: 'Braids & Protective',
    price: 40000,
    priceFormatted: '₦40,000',
    priceType: 'starting_at',
    duration: '3.5 hours',
    shortDescription: 'Soft, textured twists with bohemian dimension that feel weightless on your scalp.',
    fullDescription: 'A classic bohemian look combining water wave extensions with gentle two-strand twisting. Protects natural strands while offering endless styling versatility from messy buns to sleek updos.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Gentle scalp parting',
      'Two-strand lock and twist technique',
      'Steam set finishing for longevity',
    ],
    prepAdvice: [
      'Clean, detangled hair required.',
    ],
  },

  // ---------------- WIG SERVICES ----------------
  {
    id: 'hd-lace-melt-install',
    name: 'HD Lace Frontal Melt & Custom Styling',
    category: 'wigs',
    categoryLabel: 'Wig Services',
    price: 40000,
    priceFormatted: '₦40,000',
    priceType: 'starting_at',
    duration: '2.5 hours',
    popular: true,
    badge: 'Red Carpet Ready',
    shortDescription: 'Flawless invisible lace melt, custom bleached knots, graduated natural hairline plucking, and thermal styling.',
    fullDescription: 'Our signature lace melt creates the ultimate illusion of hair growing directly from your scalp. We use medical-grade, sweat-resistant adhesives formulated specifically for the West African climate, ensuring a secure, scalp-safe hold for 2–3 weeks.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Skin-toned lace tint matching your undertone',
      'Precision microscopic knot bleaching & toning',
      'Natural density hairline plucking',
      'Skin-safe medical adhesive or glueless band installation',
      'Thermal wand curls, body waves, or ultra-bone-straight finish',
    ],
    prepAdvice: [
      'Please drop off new wigs 24–48 hours in advance for custom knot bleaching and hairline plucking.',
      'Same-day customization available with our VIP Rush add-on.',
    ],
    addOns: [
      { id: 'same-day-custom', name: 'VIP Same-Day Custom Pluck & Bleach', price: 10000, duration: '45 mins', description: 'Instant on-the-spot lace customization.' },
      { id: 'wig-revamp-addon', name: 'Deep Conditioning & Silicone Bath Revamp', price: 15000, duration: '30 mins', description: 'Restores silky luster and softness to pre-loved bundles.' },
    ],
  },
  {
    id: 'glueless-closure-install',
    name: 'Glueless 5x5 Closure Wig Installation',
    category: 'wigs',
    categoryLabel: 'Wig Services',
    price: 30000,
    priceFormatted: '₦30,000',
    priceType: 'starting_at',
    duration: '90 mins',
    shortDescription: 'Zero-glue application with custom elastic band fitting, flat foundation braids, and bone-straight or curled finish.',
    fullDescription: 'Perfect for the woman on the move who desires complete flexibility without adhesives. We craft a secure, tension-free foundation braid pattern and custom-fit your closure unit with an adjustable band.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Flat cornrow foundation with edge care',
      'Lace melt spray application (glue-free)',
      'Custom styling & styling comb set',
    ],
    prepAdvice: [
      'Bring your wig washed or choose our in-house wig revamp prior to the date.',
    ],
  },
  {
    id: 'wig-revamp-restoration',
    name: 'Total Wig Spa Revamp & Re-Color',
    category: 'wigs',
    categoryLabel: 'Wig Services',
    price: 25000,
    priceFormatted: '₦25,000',
    priceType: 'starting_at',
    duration: '24–48h Turnaround',
    shortDescription: 'Deep silicone hydro-bath, lace residue cleanup, re-plucking, elasticity repair, and professional re-style.',
    fullDescription: 'Bring tired, dry, or knotted hair units back to life. Includes multi-stage clarifying, ultrasonic hydration, shedding treatment, lace cleaning, and fresh editorial styling ready for your next event.',
    image: 'https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Adhesive & glue residue removal from lace',
      'Hydration bath with Brazilian keratin extract',
      'Split end trimming & lace re-knot check',
      'Sleek bone straight or voluminous wand curl finish',
    ],
    prepAdvice: [
      'Drop off at our Lekki studio during normal business hours or arrange dispatch.',
    ],
  },

  // ---------------- NAILS & PEDICURE ----------------
  {
    id: 'russian-manicure-gel',
    name: 'Luxe Russian Manicure & Hard Gel Sculpture',
    category: 'nails',
    categoryLabel: 'Nails & Pedicure',
    price: 26000,
    priceFormatted: '₦26,000',
    priceType: 'starting_at',
    duration: '2 hours',
    popular: true,
    badge: 'Flawless Cuticles',
    shortDescription: 'Waterless precision electronic e-file cuticle care, structured BIAB overlay, and high-shine chrome or French finish.',
    fullDescription: 'The gold standard of manicure longevity. Our specialized dry electronic cuticle work allows the gel polish to be placed beneath the proximal nail fold, providing a clean, growth-resistant finish that lasts 4+ weeks without chipping.',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Dry anatomical e-file diamond bit cuticle clean',
      'Builder Gel in a Bottle (BIAB) apex reinforcement',
      'Custom length & shape sculpting (Almond, Square, Coffin)',
      'Japanese high-shine gel polish & organic cuticle oil infusion',
    ],
    prepAdvice: [
      'Please let us know if you need previous acrylic or hard gel removed.',
    ],
    addOns: [
      { id: 'nail-art-minimal', name: 'Editorial Minimalist French / Chrome Glaze', price: 6000, duration: '20 mins', description: 'Hailey Bieber glazed chrome or micro-french tips.' },
      { id: 'gel-removal', name: 'Gentle Safe Soak-Off Removal', price: 4000, duration: '20 mins', description: 'Non-damaging e-file & foil soak.' },
    ],
  },
  {
    id: 'luxury-spa-pedicure',
    name: 'The Sovereign Foot Ritual & Spa Pedicure',
    category: 'nails',
    categoryLabel: 'Nails & Pedicure',
    price: 24000,
    priceFormatted: '₦24,000',
    priceType: 'starting_at',
    duration: '75 mins',
    shortDescription: 'Rose petal foot soak, volcanic pumice callus smoothing, organic brown sugar scrub, paraffin wax, and gel polish.',
    fullDescription: 'A deeply restorative ritual for tired feet. Sit back in our massage chairs while our nail technicians soothe dry soles with warm aromatic oils, gentle callus reduction, volcanic basalt stone massage, and nourishing warm paraffin wrap.',
    image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Rosewater, Epsom salt & Himalayan mineral foot bath',
      'Callus peel & gentle diamond foot rasping',
      'Brown sugar & shea butter exfoliation',
      'Warm paraffin hydrating bootie treatment',
      '15-min hot basalt stone leg & calf massage',
      'Long-lasting gel toe polish',
    ],
    prepAdvice: [
      'Open-toed sandals recommended if opting for regular lacquer.',
    ],
  },
  {
    id: 'gel-x-extensions',
    name: 'Apres Gel-X Sculpted Extensions & Art',
    category: 'nails',
    categoryLabel: 'Nails & Pedicure',
    price: 30000,
    priceFormatted: '₦30,000',
    priceType: 'starting_at',
    duration: '2 hours',
    shortDescription: '100% soft gel nail extension system with zero damage to the natural nail plate and limitless custom art options.',
    fullDescription: 'No dust, no odor, zero harsh chemicals. Gel-X extensions are crafted from pure soft gel to fit the natural curvature of your nail, giving you lightweight, durable length with superior flexibility.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Nail plate sanitization & PH balancing',
      'Apres Soft Gel tip sizing & LED bonding',
      'Hand lotion massage and organic cuticle nectar',
    ],
    prepAdvice: [
      'Clean bare nails preferred for quickest application.',
    ],
  },

  // ---------------- MAKEUP & GLAM ----------------
  {
    id: 'signature-soft-glam',
    name: 'The Signature Soft Glam & Skin Finish',
    category: 'makeup',
    categoryLabel: 'Makeup & Glam',
    price: 35000,
    priceFormatted: '₦35,000',
    priceType: 'starting_at',
    duration: '75 mins',
    popular: true,
    badge: 'Iconic Glow',
    shortDescription: 'Velvety second-skin complexion, neutral sculpted eyes, bespoke wispy lashes, and the quintessential nude glossy lip.',
    fullDescription: 'Our hallmark look made famous across Lagos high society. It focuses on skin radiance that photographs flawlessly under 4K lenses without looking cakey or overly heavy. Designed to withstand warm humid climates and last all day and night.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Lymphatic drainage skin prep & hydration mist',
      'HD skin match with luxury foundation cocktail (Fenty, NARS, Dior)',
      'Sculpted cream contour & soft blush placement',
      'Custom individual featherweight mink lashes',
      '18-hour sweat-proof setting shield',
    ],
    prepAdvice: [
      'Arrive with clean, bare skin.',
      'Gently exfoliate lips and skin the evening before.',
    ],
    addOns: [
      { id: 'mink-cluster-upgrade', name: 'Custom Bottom & Fox-Eye Lash Upgrade', price: 5000, duration: '15 mins', description: 'Ultra-customized lash mapping for elongated eyes.' },
      { id: 'touch-up-kit', name: 'VIP Luxe On-The-Go Touch Up Kit', price: 8000, duration: '0 mins', description: 'Includes custom blended lip gloss, blotting papers, and setting spray vial.' },
    ],
  },
  {
    id: 'luxury-bridal-glam',
    name: 'Bespoke Bridal Glam & Crown Artistry',
    category: 'makeup',
    categoryLabel: 'Makeup & Glam',
    price: 95000,
    priceFormatted: '₦95,000',
    priceType: 'starting_at',
    duration: '2.5 hours',
    badge: 'Bridal Couture',
    shortDescription: 'High-definition timeless bridal makeup, veil/gele placement, luxury touch-up kit, and dedicated bridal suite experience.',
    fullDescription: 'A VIP bridal experience tailored for traditional Nigerian ceremonies and white weddings. Our Creative Director creates a regal look that highlights your natural features with immaculate camera-ready longevity.',
    image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Pre-wedding consultation & facial undertone mapping',
      '24K gold serum micro-infusion prep',
      'Waterproof, cry-proof, transfer-proof makeup setting',
      'Bridal robe & champagne service in our VIP suite',
      'Deluxe bridal touch-up clutch with full size luxury lipstick',
    ],
    prepAdvice: [
      'We recommend booking a trial run 3–4 weeks prior to the wedding date.',
      'On-location hotel/venue travel packages available upon request.',
    ],
  },

  // ---------------- SKIN & BEAUTY TREATMENTS ----------------
  {
    id: 'hydraglow-deep-facial',
    name: 'HydraGlow Oxygenating Deep Cleansing Facial',
    category: 'skin',
    categoryLabel: 'Beauty & Facials',
    price: 45000,
    priceFormatted: '₦45,000',
    priceType: 'starting_at',
    duration: '80 mins',
    popular: true,
    badge: 'Glass Skin',
    shortDescription: 'Hydro-dermabrasion pore vacuum, fruit enzyme peel, ultrasonic extractions, and cryogenic oxygen infusion.',
    fullDescription: 'The ultimate antidote to Lagos dust and environmental stress. A multi-step medical-grade facial that purges congested pores, exfoliates dead cellular debris, and drenches the skin in hyaluronic acid, niacinamide, and peptides.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Double sonic botanical cleanse',
      'Hydro-vacuum painless vortex extractions',
      'Custom papaya & pomegranate gentle enzyme peel',
      'Hyperbaric pure oxygen serum infusion',
      'LED light therapy (Blue for acne, Red for collagen)',
      'Cryo-globe sculpting facial massage',
    ],
    prepAdvice: [
      'Discontinue retinoids and AHAs 48 hours prior to appointment.',
      'Wear SPF daily post-facial.',
    ],
    addOns: [
      { id: 'dermaplaning-addon', name: 'Clinical Dermaplaning Peach Fuzz Removal', price: 12000, duration: '20 mins', description: 'Removes vellus hair for flawless makeup application.' },
      { id: 'hydrojelly-mask', name: 'Egyptian Rose HydroJelly Mask', price: 7000, duration: '15 mins', description: 'Deeply calms inflammation and seals active serums.' },
    ],
  },
  {
    id: 'brow-lamination-sculpt',
    name: 'Signature Brow Lamination, Tint & Sculpt',
    category: 'skin',
    categoryLabel: 'Beauty & Facials',
    price: 22000,
    priceFormatted: '₦22,000',
    priceType: 'starting_at',
    duration: '60 mins',
    shortDescription: 'Keratin brow lift, custom hybrid stain tinting, and precision tweezing/waxing for full, fluffy arches.',
    fullDescription: 'Transform sparse or unruly brow hairs into defined, feathery arches that stay in place for 6–8 weeks. Includes a custom hybrid stain that tints the brow hairs and subtly stains the skin for a microbladed effect.',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=85',
    whatIncluded: [
      'Keratin brow softening & directional lamination',
      'Custom-blended vegan hybrid stain tinting',
      'Precision map, wax, and micro-tweeze',
      'Keratin peptide conditioning seal',
    ],
    prepAdvice: [
      'Avoid trimming or tweezing brows 2 weeks prior.',
      'Keep brows dry for 24 hours post-lamination.',
    ],
  },
];

export const featuredService = {
  id: 'signature-glam-session',
  name: 'The Sovereign Glam Experience',
  tagline: 'Hair · Makeup · Nails · VIP Sanctuary',
  price: 85000,
  priceFormatted: '₦85,000',
  duration: '3.5 – 4 hours',
  savings: 'Save ₦20,000 compared to individual booking',
  image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
  secondaryImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=85',
  description: 'Our most comprehensive beauty experience created for high-stakes celebrations, birthdays, red carpet galas, and discerning women who value perfection. A synchronized team of three senior specialists caters to you in our private VIP suite.',
  inclusions: [
    { title: 'Signature Silk Press or HD Wig Melt', desc: 'Full steam therapy wash, bond repair treatment, and runway finish.' },
    { title: 'The Signature Soft Glam Makeup', desc: 'Radiant skin finish, bespoke mink lashes, and sweat-proof lock.' },
    { title: 'Classic Gel Manicure or Express Pedicure', desc: 'Russian cuticle care and high-gloss gel polish.' },
    { title: 'VIP Suite Amenities', desc: 'Chilled Moët & Chandon champagne, fresh fruit board, and ring light content check.' },
  ],
  suitableFor: 'Birthdays, red carpet premieres, brand shoots, pre-wedding festivities, or luxury self-care days.',
};
