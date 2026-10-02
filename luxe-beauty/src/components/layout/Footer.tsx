import React, { useState } from 'react';
import {
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Code
} from 'lucide-react';
import { InstagramIcon } from '../common/SocialIcons';
import { salonConfig, getWhatsAppLink } from '../../data/salonConfig';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() && emailInput.includes('@')) {
      setIsSubscribed(true);
      setEmailInput('');
    }
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Featured Glam', href: '#featured' },
    { label: 'About Studio', href: '#about' },
    { label: 'Why Luxe', href: '#why-us' },
    { label: 'Gallery Portfolio', href: '#gallery' },
    { label: 'Client Reviews', href: '#testimonials' },
    { label: 'Book Appointment', href: '#booking' },
    { label: 'Studio Location', href: '#location' },
    { label: 'FAQ', href: '#faq' },
  ];

  const serviceCategories = [
    'Precision Silk Press & Steam',
    'Boho Knotless Box Braids',
    'HD Frontal Lace Melts',
    'Russian Hard Gel Manicures',
    'The Sovereign Glam Session',
    'HydraGlow Oxygenating Facials',
  ];

  return (
    <footer className="bg-charcoal-900 text-ivory-100 pt-16 sm:pt-20 pb-12 border-t border-charcoal-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-charcoal-800">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-serif text-3xl font-semibold tracking-[0.18em] text-white">
                  LUXE
                </span>
                <span className="w-2 h-2 rounded-full bg-bronze-500"></span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-bronze-400 font-medium">
                Beauty Studio · Lagos
              </p>
            </div>

            <p className="text-xs sm:text-sm text-ivory-300 max-w-md leading-relaxed">
              A modern luxury hair and beauty studio in Lagos, Nigeria. Dedicated to personalized artistry, scalp health preservation, and an unhurried sanctuary experience for discerning women.
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-medium text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-bronze-400" />
                Join the Luxe VIP Club
              </span>
              <p className="text-[11px] text-ivory-400">
                Receive priority weekend slot notifications and private seasonal invitations.
              </p>

              {isSubscribed ? (
                <div className="p-3 rounded-xl bg-bronze-900/40 border border-bronze-500/40 text-xs text-bronze-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-bronze-400 shrink-0" />
                  <span>Thank you! You are on the Luxe VIP priority list.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-xs text-white placeholder-charcoal-500 focus:outline-none focus:border-bronze-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-white text-charcoal-900 hover:bg-ivory-100 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href={salonConfig.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-charcoal-800 hover:bg-rose-900/40 hover:text-rose-300 text-ivory-300 flex items-center justify-center transition-colors border border-charcoal-700"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href={getWhatsAppLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-charcoal-800 hover:bg-emerald-900/40 hover:text-emerald-300 text-ivory-300 flex items-center justify-center transition-colors border border-charcoal-700"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={salonConfig.socials.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-charcoal-800 hover:bg-charcoal-700 text-ivory-300 flex items-center justify-center transition-colors border border-charcoal-700 text-xs font-bold"
                aria-label="TikTok"
              >
                TK
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-semibold text-bronze-300 tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.slice(0, 6).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-ivory-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-semibold text-bronze-300 tracking-wider">
              Signature Craft
            </h4>
            <ul className="space-y-2 text-xs text-ivory-300">
              {serviceCategories.map((srv, idx) => (
                <li key={idx} className="hover:text-white transition-colors">
                  <a href="#services">{srv}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-semibold text-bronze-300 tracking-wider">
              Studio Location
            </h4>
            <div className="space-y-3 text-xs text-ivory-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-bronze-400 shrink-0 mt-0.5" />
                <span>
                  {salonConfig.address.primary}, {salonConfig.address.city}, {salonConfig.country}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-bronze-400 shrink-0" />
                <a href={`tel:${salonConfig.contact.phoneRaw}`} className="hover:text-white transition-colors">
                  {salonConfig.contact.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={getWhatsAppLink('general')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp: {salonConfig.contact.whatsappDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-bronze-400 shrink-0" />
                <span>Mon–Sat 9AM–7PM · Sun By Appt</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-400 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} LUXE BEAUTY STUDIO LAGOS. All rights reserved.
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal-800 border border-charcoal-700 text-[11px] text-ivory-300">
            <Code className="w-3.5 h-3.5 text-bronze-400" />
            <span>Commercial Portfolio Project · React · TypeScript · Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
