# ✨ LUXE BEAUTY STUDIO LAGOS

A modern, high-converting luxury salon web application for **LUXE BEAUTY STUDIO** (Lekki Phase 1, Lagos, Nigeria). Built with React 19, TypeScript, Tailwind CSS v4, Lucide Icons, and Framer Motion.

---

## 🌟 Key Features

- **Interactive 5-Step Booking Engine**:
  - Live service filtering and subtotal pricing in Nigerian Naira (₦).
  - Add-on customizer with dynamic price recalculation.
  - Senior stylist / artisan selection.
  - 14-day date picker with morning, afternoon, and evening time slots.
  - Client information with complimentary welcome beverage selection (*Chilled Moët & Chandon Champagne*, *Organic Zobo Infusion*, etc.).
  - Instant booking code generation (`LX-XXXXX`).
  - **Direct WhatsApp Concierge Dispatch** prefilled with full appointment details to WhatsApp: `+234 813 774 8237`.
  - **iCalendar Export (`.ics`)**: Download to Apple Calendar, Google Calendar, or Outlook.
- **Luxury Dark & Light Mode**:
  - System-preference detection with persistent `localStorage` memory.
  - Vector Lucide Sun/Moon toggle button in navbar and mobile drawer.
  - Warm Ivory Sanctuary vs. Velvet Obsidian Charcoal themes.
- **Service Detail Modal**:
  - Full ingredient/technique breakdowns, service duration, and inclusions.
- **Interactive Lightbox & Gallery**:
  - Category filters across Hair, Braids, Wigs, Nails, and Makeup.
- **Floating WhatsApp Concierge**:
  - Quick-routing interactive chat card with WhatsApp deep links.
- **Real-Time WAT Studio Status**:
  - Automatic West Africa Time (WAT) open/closed business hours indicator.

---

## 🚀 Quick Start in VS Code

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized production build will be output to the `dist/` directory.

---

## 🌐 Deploy to Production

### Option A: Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **Deploy**!

### Option B: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and click **"Add new site"** > **"Import an existing project"**.
2. Connect your GitHub repository.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. Click **Deploy**.

### Option C: Deploy to Cloudflare Pages
1. In Cloudflare Dashboard, go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Build output directory: `dist`.

---

## ⚙️ Configuration & Customization

All salon data, phone numbers, addresses, and hours are centralized in:
📁 `src/data/salonConfig.ts`

To update your WhatsApp number:
```typescript
contact: {
  phoneDisplay: "+234 813 774 8237",
  phoneRaw: "+2348137748237",
  whatsappDisplay: "+234 813 774 8237",
  whatsappRaw: "2348137748237",
}
```

To update services, prices, or add-ons:
📁 `src/data/servicesData.ts`

---

## 📂 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── common/             # SocialIcons, badges
│   │   ├── layout/             # Navbar, Footer, AnnouncementBar, WhatsAppFloatingWidget
│   │   ├── modals/             # ServiceDetailModal, GalleryLightbox
│   │   └── sections/           # Hero, Services, Featured, About, WhyUs, Gallery, Testimonials, BookingSection, Location, FAQ, FinalCTA
│   ├── context/
│   │   └── ThemeContext.tsx    # Dark/Light mode provider
│   ├── data/
│   │   ├── salonConfig.ts      # Studio address, WhatsApp phone number, hours, amenities
│   │   └── servicesData.ts     # Realistic Nigerian salon menu, prices, add-ons
│   ├── lib/
│   │   └── utils.ts            # formatNaira (₦), date helpers, class utilities
│   ├── services/
│   │   └── bookingService.ts   # Booking payload generator, .ics export, WhatsApp template builder
│   ├── types/
│   │   └── booking.ts          # TypeScript interfaces
│   ├── App.tsx                 # Main application component
│   ├── index.css               # Tailwind CSS v4 styling & dark mode rules
│   └── main.tsx                # Entry point
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite server & build configuration
```

---

© 2026 LUXE BEAUTY STUDIO LAGOS. All rights reserved.
