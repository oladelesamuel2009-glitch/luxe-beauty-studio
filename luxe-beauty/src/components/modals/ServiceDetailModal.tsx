import React, { useEffect } from 'react';
import { X, Clock, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import type { ServiceItem } from '../../data/servicesData';
import { formatNaira } from '../../lib/utils';
import { getWhatsAppLink } from '../../data/salonConfig';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (service: ServiceItem) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-sand-200 animate-slideUp my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-service-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-charcoal-800 shadow-md transition-all hover:scale-105"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-64 sm:h-72 w-full bg-sand-100 overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/30 to-transparent"></div>

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-charcoal-900 text-xs font-medium uppercase tracking-wider">
              {service.categoryLabel}
            </span>
            {service.badge && (
              <span className="px-3 py-1 rounded-full bg-bronze-500 text-white text-xs font-medium uppercase tracking-wider">
                {service.badge}
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 id="modal-service-title" className="font-serif text-2xl sm:text-3xl font-medium text-white">
              {service.name}
            </h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-ivory-200">
              <span className="font-medium text-lg text-bronze-300">
                Starting at {formatNaira(service.price)}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-bronze-400" />
                {service.duration}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-semibold text-charcoal-400 tracking-wider">
              About This Service
            </h4>
            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold text-charcoal-400 tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-bronze-500" />
              What's Included in Your Session
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {service.whatIncluded.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-sand-50 border border-sand-200/60 text-xs sm:text-sm text-charcoal-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold text-charcoal-400 tracking-wider flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Preparation Guide for Clients
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-charcoal-600 pl-1">
              {service.prepAdvice.map((advice, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-bronze-500 font-bold">•</span>
                  <span>{advice}</span>
                </li>
              ))}
            </ul>
          </div>

          {service.addOns && service.addOns.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-semibold text-charcoal-400 tracking-wider">
                Recommended Add-ons
              </h4>
              <div className="space-y-2">
                {service.addOns.map((addon) => (
                  <div key={addon.id} className="flex items-center justify-between p-3 rounded-xl bg-ivory-50 border border-sand-200 text-xs">
                    <div>
                      <div className="font-semibold text-charcoal-900">{addon.name}</div>
                      <div className="text-charcoal-500">{addon.description} ({addon.duration})</div>
                    </div>
                    <span className="font-medium text-bronze-700 whitespace-nowrap ml-3">
                      +{formatNaira(addon.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-3.5 rounded-2xl bg-charcoal-900 text-ivory-100 flex items-center gap-3 text-xs">
            <ShieldCheck className="w-5 h-5 text-bronze-400 shrink-0" />
            <div>
              <span className="font-semibold text-white">Luxe Punctuality & Care Promise:</span> Your appointment begins on time with complimentary refreshments in our calm Lekki sanctuary.
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-sand-50 border-t border-sand-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <span className="text-[11px] text-charcoal-500 uppercase tracking-wider block">
              Estimated Total
            </span>
            <span className="text-xl font-serif font-bold text-charcoal-900">
              {formatNaira(service.price)}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={getWhatsAppLink('booking', { service: service.name })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-3 rounded-full border border-sand-300 text-charcoal-700 hover:text-emerald-700 hover:border-emerald-600 text-xs font-medium text-center transition-colors"
            >
              Ask on WhatsApp
            </a>

            <button
              onClick={() => {
                onClose();
                onBookService(service);
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-charcoal-900 text-ivory-50 hover:bg-charcoal-800 text-xs sm:text-sm font-medium tracking-wide shadow-md transition-all group"
            >
              <span>Book This Service</span>
              <ArrowRight className="w-4 h-4 text-bronze-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
