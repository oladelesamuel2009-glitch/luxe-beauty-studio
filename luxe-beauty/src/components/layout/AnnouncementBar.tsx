import React, { useState } from 'react';
import { Sparkles, X, MapPin } from 'lucide-react';
import { salonConfig } from '../../data/salonConfig';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-charcoal-900 text-ivory-100 text-xs py-2 px-4 border-b border-charcoal-700/60 relative z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 md:gap-3 text-center">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bronze-500/20 text-bronze-300 font-medium text-[11px] uppercase tracking-wider border border-bronze-500/30">
            <Sparkles className="w-3 h-3 text-bronze-400 animate-pulse" />
            Lekki Flagship
          </span>
          <span className="text-ivory-200 text-xs md:text-[13px] font-normal">
            Complimentary Scalp Hydration Analysis & Chilled Champagne with all Signature Services
          </span>
          <span className="hidden lg:inline text-bronze-400 font-medium">·</span>
          <span className="hidden lg:inline-flex items-center gap-1 text-ivory-300">
            <MapPin className="w-3 h-3 text-bronze-400" />
            {salonConfig.address.city}, {salonConfig.city}
          </span>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss announcement"
          className="text-ivory-400 hover:text-ivory-100 p-1 transition-colors rounded hover:bg-charcoal-800"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
