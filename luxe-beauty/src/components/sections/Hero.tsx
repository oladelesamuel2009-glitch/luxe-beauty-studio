import React from 'react';
import { Sparkles, ArrowUpRight, Star, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';
import { salonConfig } from '../../data/salonConfig';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreClick }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 lg:py-24 overflow-hidden bg-ivory-50">
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-sand-200/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-bronze-300/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-200/60 border border-sand-300/80 text-charcoal-800 text-xs sm:text-sm font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-bronze-500 animate-pulse"></span>
              <span className="font-serif italic text-bronze-700">Luxe Beauty Studio</span>
              <span className="text-charcoal-400">·</span>
              <span className="flex items-center gap-1 text-charcoal-700 text-xs">
                <MapPin className="w-3 h-3 text-bronze-600" />
                {salonConfig.locationLabel}
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal text-charcoal-950 tracking-tight leading-[1.08]">
                Your beauty, <br className="hidden sm:inline" />
                <span className="italic font-light text-bronze-600">elevated</span> to an art.
              </h1>
              <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-charcoal-600 font-normal leading-relaxed">
                {salonConfig.heroSubheadline} From tensionless knotless braids and glass-finish silk presses to invisible HD lace melts and bespoke soft glam.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-charcoal-900 text-ivory-50 hover:bg-charcoal-800 active:scale-[0.98] text-sm font-medium tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg group"
              >
                <span>Book an Appointment</span>
                <ArrowUpRight className="w-4 h-4 text-bronze-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-transparent text-charcoal-800 hover:text-charcoal-950 hover:bg-sand-200/50 border border-charcoal-800/25 active:scale-[0.98] text-sm font-medium tracking-wide transition-all duration-200"
              >
                <span>Explore Services</span>
              </button>
            </div>

            <div className="pt-6 border-t border-sand-200/80 grid grid-cols-3 gap-4 sm:gap-6 text-left max-w-lg mx-auto lg:mx-0">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-charcoal-950 font-serif text-xl sm:text-2xl font-semibold">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>4.95</span>
                </div>
                <div className="text-[11px] sm:text-xs text-charcoal-500 uppercase tracking-wider">
                  1,400+ Client Reviews
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-charcoal-950 font-serif text-xl sm:text-2xl font-semibold">
                  8,500+
                </div>
                <div className="text-[11px] sm:text-xs text-charcoal-500 uppercase tracking-wider">
                  Styles Perfected
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-charcoal-950 font-serif text-xl sm:text-2xl font-semibold">
                  100%
                </div>
                <div className="text-[11px] sm:text-xs text-charcoal-500 uppercase tracking-wider">
                  Scalp Health First
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-sand-100 aspect-[4/5] group">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85"
                  alt="Luxe Beauty Studio Signature Hair Styling and Glam"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent opacity-80"></div>

                <div className="absolute bottom-0 inset-x-0 p-6 text-ivory-50">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] text-ivory-100 uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3 text-bronze-300" />
                    Signature Treatment
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                    Precision Silk Press & Scalp Hydration
                  </h3>
                  <p className="text-xs text-ivory-200/90 mt-1 line-clamp-1">
                    Featherlight bounce without thermal damage.
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 sm:-left-10 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-sand-200 max-w-[240px] sm:max-w-[270px] hidden xs:block">
                <div className="flex items-center space-x-2.5 mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Folashade A."
                    className="w-9 h-9 rounded-full object-cover border border-sand-300"
                  />
                  <div>
                    <div className="text-xs font-semibold text-charcoal-900 flex items-center gap-1">
                      Folashade A.
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    </div>
                    <div className="text-[10px] text-charcoal-500">
                      Verified Appointment · Lekki
                    </div>
                  </div>
                </div>
                <div className="flex text-amber-500 text-xs mb-1">
                  ★★★★★
                </div>
                <p className="text-[11px] text-charcoal-700 italic leading-snug">
                  "No edge tension, quiet sanctuary, and the silk press stayed silky for 3 weeks!"
                </p>
              </div>

              <div className="absolute -top-4 -right-4 sm:-right-6 z-20 bg-charcoal-900/95 text-ivory-50 px-4 py-2.5 rounded-2xl shadow-lg border border-charcoal-700 flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-bronze-500/30 flex items-center justify-center text-bronze-300">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-semibold tracking-wide text-ivory-100">
                    Punctuality Assured
                  </div>
                  <div className="text-[9px] text-ivory-400 uppercase tracking-wider">
                    Zero waiting delays
                  </div>
                </div>
              </div>

              <div className="absolute -inset-3 rounded-3xl border border-bronze-400/30 -z-10 translate-x-2 translate-y-2 pointer-events-none hidden sm:block"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
