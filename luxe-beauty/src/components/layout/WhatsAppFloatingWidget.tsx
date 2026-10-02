import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Sparkles, Calendar, HeartHandshake, Scissors, Send } from 'lucide-react';
import { salonConfig, getWhatsAppLink } from '../../data/salonConfig';

export const WhatsAppFloatingWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Auto show subtle teaser after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowNotificationBadge(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    setHasInteracted(true);
    setShowNotificationBadge(false);
  };

  const options = [
    {
      title: 'Book an Appointment',
      subtitle: 'Fast reservation with our Lekki concierge',
      icon: Calendar,
      type: 'booking' as const,
      color: 'text-amber-700 bg-amber-50',
    },
    {
      title: 'Bridal & VIP Group Packages',
      subtitle: 'Weddings, bridal parties & on-location glam',
      icon: Sparkles,
      type: 'bridal' as const,
      color: 'text-rose-700 bg-rose-50',
    },
    {
      title: 'Wig Customization & Drop-off',
      subtitle: 'Lace knot bleaching, revamp & timing info',
      icon: Scissors,
      type: 'consultation' as const,
      color: 'text-bronze-700 bg-sand-100',
    },
    {
      title: 'General Inquiries & Directions',
      subtitle: 'Ask any question or get live directions',
      icon: HeartHandshake,
      type: 'general' as const,
      color: 'text-emerald-700 bg-emerald-50',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" ref={popoverRef}>
      {/* Concierge Popover Window */}
      {isOpen && (
        <div className="mb-3 w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-sand-200 overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-charcoal-900 to-charcoal-800 text-ivory-50 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-bronze-500/20 border border-bronze-400/40 flex items-center justify-center font-serif text-lg font-bold text-bronze-300">
                  LX
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-charcoal-900 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-medium text-sm text-ivory-50 flex items-center gap-1.5">
                  Luxe Studio Concierge
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-normal">
                    Online
                  </span>
                </h4>
                <p className="text-[11px] text-ivory-300">
                  Admiralty Way, Lekki Phase 1 · Lagos
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-ivory-300 hover:text-white p-1 rounded-full hover:bg-charcoal-700 transition-colors"
              aria-label="Close concierge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Welcome Message Bubble */}
          <div className="p-4 bg-sand-50 border-b border-sand-200/60">
            <div className="p-3 bg-white rounded-xl shadow-xs border border-sand-200/60 text-xs text-charcoal-700 space-y-1">
              <p className="font-medium text-charcoal-900">Hello beautiful! 👋</p>
              <p>
                Welcome to Luxe Beauty Studio Lagos. How can our concierge team assist you today?
              </p>
              <p className="text-[10px] text-charcoal-400 pt-1">
                Typical response time: Under 5 minutes
              </p>
            </div>
          </div>

          {/* Quick Action Choices */}
          <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
            {options.map((opt) => {
              const Icon = opt.icon;
              return (
                <a
                  key={opt.title}
                  href={getWhatsAppLink(opt.type)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl border border-sand-200/80 hover:border-bronze-400 hover:bg-sand-50 transition-all text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${opt.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-charcoal-900 group-hover:text-bronze-600 transition-colors">
                        {opt.title}
                      </div>
                      <div className="text-[11px] text-charcoal-500">
                        {opt.subtitle}
                      </div>
                    </div>
                  </div>
                  <Send className="w-3.5 h-3.5 text-charcoal-400 group-hover:text-bronze-500 transition-colors" />
                </a>
              );
            })}
          </div>

          {/* Direct WhatsApp Action Footer */}
          <div className="p-3 bg-ivory-50 border-t border-sand-200 flex items-center justify-between">
            <span className="text-[11px] text-charcoal-500">
              WhatsApp: {salonConfig.contact.whatsappDisplay}
            </span>
            <a
              href={getWhatsAppLink('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Open Chat</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Trigger Floating Button */}
      <button
        onClick={toggleWidget}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
        aria-label="Open WhatsApp Salon Concierge"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-200" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7 transition-transform duration-200 group-hover:scale-110" />
            {/* Pulsing ring */}
            <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-20 animate-ping pointer-events-none"></span>
          </>
        )}

        {/* Floating Tooltip Label (Visible when closed) */}
        {!isOpen && (
          <span className="absolute right-16 px-3 py-1.5 bg-charcoal-900 text-ivory-50 text-xs font-medium rounded-full shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block border border-charcoal-700">
            Chat with Concierge · Lagos
          </span>
        )}

        {/* Small Red/Green Notification Bubble */}
        {showNotificationBadge && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 border-2 border-white rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          </span>
        )}
      </button>
    </div>
  );
};
