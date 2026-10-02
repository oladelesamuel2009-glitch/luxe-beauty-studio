import { useState } from 'react';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { ServicesSection } from './components/sections/ServicesSection';
import { FeaturedService } from './components/sections/FeaturedService';
import { AboutSection } from './components/sections/AboutSection';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { GallerySection } from './components/sections/GallerySection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { BookingSection } from './components/sections/BookingSection';
import { InstagramSection } from './components/sections/InstagramSection';
import { LocationSection } from './components/sections/LocationSection';
import { FAQSection } from './components/sections/FAQSection';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloatingWidget } from './components/layout/WhatsAppFloatingWidget';
import { servicesData } from './data/servicesData';
import type { ServiceItem } from './data/servicesData';

export function App() {
  const [preselectedService, setPreselectedService] = useState<ServiceItem | null>(null);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookFromHero = () => {
    scrollToSection('booking');
  };

  const handleExploreServices = () => {
    scrollToSection('services');
  };

  const handleSelectServiceToBook = (service: ServiceItem) => {
    setPreselectedService(service);
    scrollToSection('booking');
  };

  const handleBookFeaturedService = () => {
    const featuredMatch = servicesData.find(s => s.id === 'silk-press-treatment') || servicesData[0];
    setPreselectedService(featuredMatch);
    scrollToSection('booking');
  };

  return (
    <div className="min-h-screen bg-ivory-50 text-charcoal-800 dark:bg-charcoal-950 dark:text-ivory-100 font-sans selection:bg-charcoal-900 selection:text-ivory-50 dark:selection:bg-bronze-500 dark:selection:text-charcoal-950 relative transition-colors duration-300">
      <AnnouncementBar />
      <Navbar onBookClick={handleBookFromHero} />

      <main>
        <Hero
          onBookClick={handleBookFromHero}
          onExploreClick={handleExploreServices}
        />

        <ServicesSection
          onSelectServiceToBook={handleSelectServiceToBook}
        />

        <FeaturedService
          onBookFeatured={handleBookFeaturedService}
        />

        <AboutSection />

        <WhyChooseUs />

        <GallerySection
          onSelectServiceToBook={handleSelectServiceToBook}
        />

        <TestimonialsSection />

        <BookingSection
          preselectedService={preselectedService}
          onClearPreselectedService={() => setPreselectedService(null)}
        />

        <InstagramSection />

        <LocationSection />

        <FAQSection />

        <FinalCTA onBookClick={handleBookFromHero} />
      </main>

      <Footer />
      <WhatsAppFloatingWidget />
    </div>
  );
}

export default App;
