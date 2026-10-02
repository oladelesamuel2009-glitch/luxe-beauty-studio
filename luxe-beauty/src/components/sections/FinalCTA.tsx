import React from 'react';
import { Sparkles, Calendar, MessageCircle, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { getWhatsAppLink } from '../../data/salonConfig';

interface FinalCTAProps {
  onBookClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onBookClick }) => {
  return (
    <section className="py-20 lg:py-28 bg-charcoal-950 text-ivory-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bronze-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bronze-500/20 text-bronze-300 border border-bronze-500/30 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-bronze-400" />
          The Ultimate Sanctuary Experience
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.08]">
            Ready for your <br />
            <span className="italic font-light text-bronze-400">next look?</span>
          </h2>

          <p className="text-base sm:text-lg text-ivory-300 max-w-xl mx-auto leading-relaxed">
            Book your appointment and let our master stylists take care of the rest. Step into a world of unhurried artistry, scalp wellness, and warm champagne.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-2">
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-charcoal-950 hover:bg-ivory-100 active:scale-[0.98] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl group"
          >
            <Calendar className="w-4 h-4 text-bronze-600" />
            <span>Book an Appointment</span>
            <ArrowRight className="w-4 h-4 text-charcoal-950 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={getWhatsAppLink('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white active:scale-[0.98] text-xs sm:text-sm font-medium tracking-wide transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="pt-8 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-ivory-400">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-bronze-400" />
            Admiralty Way, Lekki Phase 1 · Lagos, Nigeria
          </span>
          <span className="hidden sm:inline text-charcoal-700">·</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-bronze-400" />
            100% Scalp & Texture Preservation Guarantee
          </span>
        </div>
      </div>
    </section>
  );
};
