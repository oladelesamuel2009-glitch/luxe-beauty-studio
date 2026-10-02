import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, ArrowRight, MessageCircle, Sun, Moon } from 'lucide-react';
import { salonConfig, getWhatsAppLink } from '../../data/salonConfig';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  onBookClick?: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Featured Glam', href: '#featured' },
    { label: 'About', href: '#about' },
    { label: 'Why Luxe', href: '#why-us' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Location', href: '#location' },
    { label: 'FAQ', href: '#faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Simple active section detection
      const sections = ['hero', 'services', 'featured', 'about', 'why-us', 'gallery', 'testimonials', 'booking', 'location', 'faq'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on esc key or resize
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Prevent scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookAppointment = () => {
    setMobileMenuOpen(false);
    if (onBookClick) {
      onBookClick();
    } else {
      const el = document.getElementById('booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory-50/95 dark:bg-charcoal-950/95 backdrop-blur-md shadow-sm border-b border-sand-200/70 dark:border-charcoal-800 py-3.5'
            : 'bg-ivory-50/80 dark:bg-charcoal-950/80 backdrop-blur-sm border-b border-sand-200/40 dark:border-charcoal-800/60 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="group flex flex-col focus:outline-none focus:ring-2 focus:ring-bronze-500 rounded-lg p-1"
            >
              <div className="flex items-center space-x-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.18em] text-charcoal-950 dark:text-ivory-50 transition-colors">
                  LUXE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-bronze-500 group-hover:scale-125 transition-transform" />
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.26em] text-charcoal-500 dark:text-sand-300 -mt-1 font-medium">
                Beauty Studio · Lagos
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 relative ${
                      isActive
                        ? 'text-charcoal-950 dark:text-ivory-50 font-semibold bg-sand-200/70 dark:bg-charcoal-800'
                        : 'text-charcoal-600 dark:text-sand-300 hover:text-charcoal-900 dark:hover:text-white hover:bg-sand-100/60 dark:hover:bg-charcoal-800/50'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden sm:flex items-center space-x-3">
              {/* Dark Mode Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="p-2.5 rounded-full border border-sand-200 dark:border-charcoal-700 bg-sand-50/70 dark:bg-charcoal-900 text-charcoal-700 dark:text-sand-300 hover:bg-sand-100 dark:hover:bg-charcoal-800 transition-colors shadow-sm"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                ) : (
                  <Moon className="w-4 h-4 text-charcoal-700" />
                )}
              </button>

              {/* WhatsApp Quick Link */}
              <a
                href={getWhatsAppLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-charcoal-700 dark:text-sand-300 hover:text-bronze-600 dark:hover:text-bronze-400 hover:bg-sand-100/60 dark:hover:bg-charcoal-800/60 rounded-full border border-sand-200 dark:border-charcoal-700 transition-all duration-200"
                title="Chat with our Lagos Studio on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              {/* Primary Book Appointment Button */}
              <button
                onClick={handleBookAppointment}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-charcoal-900 dark:bg-ivory-50 text-ivory-50 dark:text-charcoal-950 hover:bg-charcoal-800 dark:hover:bg-ivory-200 active:scale-[0.98] text-xs sm:text-sm font-medium tracking-wide shadow-sm hover:shadow transition-all duration-200 border border-charcoal-900 dark:border-ivory-50 focus:outline-none focus:ring-2 focus:ring-bronze-500 focus:ring-offset-2"
              >
                <Calendar className="w-3.5 h-3.5 text-bronze-400 dark:text-bronze-600" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Mobile Hamburger & Dark Toggle */}
            <div className="flex items-center sm:hidden space-x-2">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle Dark Mode"
                className="p-2 rounded-full border border-sand-200 dark:border-charcoal-700 bg-sand-50/70 dark:bg-charcoal-900 text-charcoal-700 dark:text-sand-300"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-charcoal-700" />}
              </button>
              <button
                onClick={handleBookAppointment}
                className="px-3 py-1.5 rounded-full bg-charcoal-900 dark:bg-ivory-50 text-ivory-50 dark:text-charcoal-950 text-xs font-medium"
              >
                Book
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-charcoal-700 dark:text-sand-300 hover:text-charcoal-900 dark:hover:text-white hover:bg-sand-100/80 dark:hover:bg-charcoal-800 focus:outline-none focus:ring-2 focus:ring-bronze-500"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Tablet Menu Button */}
            <div className="hidden sm:flex lg:hidden items-center space-x-2">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle Dark Mode"
                className="p-2 rounded-full border border-sand-200 dark:border-charcoal-700 bg-sand-50/70 dark:bg-charcoal-900 text-charcoal-700 dark:text-sand-300"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-charcoal-700" />}
              </button>
              <button
                onClick={handleBookAppointment}
                className="px-4 py-2 rounded-full bg-charcoal-900 dark:bg-ivory-50 text-ivory-50 dark:text-charcoal-950 text-xs font-medium"
              >
                Book Appointment
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-charcoal-700 dark:text-sand-300 hover:text-charcoal-900 dark:hover:text-white hover:bg-sand-100/80 dark:hover:bg-charcoal-800 focus:outline-none focus:ring-2 focus:ring-bronze-500"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-ivory-50 dark:bg-charcoal-950 animate-fadeIn">
          {/* Top Bar of Mobile Menu */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-sand-200 dark:border-charcoal-800">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-semibold tracking-[0.18em] text-charcoal-900 dark:text-ivory-50">
                LUXE
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-charcoal-500 dark:text-sand-400">
                Beauty Studio · Lagos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-full border border-sand-200 dark:border-charcoal-700 bg-sand-100 dark:bg-charcoal-900 text-charcoal-700 dark:text-sand-300"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-charcoal-700" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-charcoal-600 dark:text-sand-300 hover:text-charcoal-900 dark:hover:text-white rounded-full hover:bg-sand-200/50 dark:hover:bg-charcoal-800"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Nav links list */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="flex items-center justify-between py-3 px-4 rounded-xl text-base font-medium text-charcoal-800 dark:text-sand-200 hover:bg-sand-100 dark:hover:bg-charcoal-900 transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-bronze-500" />
                </a>
              ))}
            </div>

            {/* Mobile CTAs */}
            <div className="pt-4 space-y-3 border-t border-sand-200 dark:border-charcoal-800">
              <button
                onClick={handleBookAppointment}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-charcoal-900 dark:bg-ivory-50 text-ivory-50 dark:text-charcoal-950 text-sm font-medium tracking-wide shadow-md"
              >
                <Calendar className="w-4 h-4 text-bronze-400 dark:text-bronze-600" />
                <span>Book an Appointment</span>
              </button>

              <a
                href={getWhatsAppLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-700 text-white text-sm font-medium tracking-wide shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Us on WhatsApp</span>
              </a>
            </div>

            {/* Studio Info Card in Mobile Menu */}
            <div className="mt-6 p-4 rounded-xl bg-sand-100/70 dark:bg-charcoal-900 border border-sand-200/80 dark:border-charcoal-800 text-xs space-y-2 text-charcoal-700 dark:text-sand-300">
              <div className="font-semibold text-charcoal-900 dark:text-ivory-100 uppercase tracking-wider text-[11px]">
                {salonConfig.name} · Flagship Studio
              </div>
              <p>{salonConfig.address.full}</p>
              <div className="pt-1 flex items-center gap-2 text-bronze-700 dark:text-bronze-400 font-medium">
                <Phone className="w-3.5 h-3.5" />
                <span>{salonConfig.contact.phoneDisplay}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
