import React from 'react';
import { Sparkles, Clock, Check, ArrowRight, Wine, ShieldCheck } from 'lucide-react';
import { featuredService } from '../../data/servicesData';
import { formatNaira } from '../../lib/utils';
import { getWhatsAppLink } from '../../data/salonConfig';

interface FeaturedServiceProps {
  onBookFeatured: () => void;
}

export const FeaturedService: React.FC<FeaturedServiceProps> = ({ onBookFeatured }) => {
  return (
    <section id="featured" className="py-20 lg:py-28 bg-charcoal-900 text-ivory-50 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-bronze-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bronze-500/20 text-bronze-300 border border-bronze-500/30 text-xs font-medium uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-bronze-400" />
            Signature VIP Offering
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight mt-3">
            The Sovereign Glam Experience.
          </h2>
          <p className="text-sm sm:text-base text-ivory-300 max-w-xl mx-auto mt-2">
            A synchronized beauty ritual curated for red-carpet moments, milestone celebrations, and discerning women.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center bg-charcoal-800/80 rounded-3xl p-6 sm:p-10 lg:p-12 border border-charcoal-700 shadow-2xl">
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8 relative rounded-2xl overflow-hidden aspect-[4/5] bg-charcoal-950 border border-charcoal-700 group">
                <img
                  src={featuredService.image}
                  alt={featuredService.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase font-semibold text-bronze-300 tracking-wider">
                    VIP Suite Experience
                  </span>
                  <div className="font-serif text-lg text-white font-medium">
                    Synchronized 3-Specialist Team
                  </div>
                </div>
              </div>

              <div className="col-span-4 space-y-4 flex flex-col justify-between">
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-charcoal-950 border border-charcoal-700 group">
                  <img
                    src={featuredService.secondaryImage}
                    alt="Soft Glam Details"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-700 text-center space-y-1">
                  <Wine className="w-5 h-5 text-bronze-400 mx-auto" />
                  <div className="text-[11px] font-medium text-ivory-100 uppercase tracking-wider">
                    Moët & Bites
                  </div>
                  <div className="text-[9px] text-ivory-400">
                    Complimentary VIP Bar
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-bronze-900/30 border border-bronze-500/30 flex items-center justify-between text-xs text-bronze-200">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-bronze-400" />
                <span>{featuredService.savings}</span>
              </span>
              <span className="font-semibold text-bronze-300">
                Lekki Studio Only
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  {formatNaira(featuredService.price)}
                </span>
                <span className="px-3 py-1 rounded-full bg-sand-200/20 text-bronze-300 text-xs font-medium border border-bronze-400/30">
                  <Clock className="w-3.5 h-3.5 inline mr-1" />
                  {featuredService.duration}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-ivory-300 leading-relaxed">
                {featuredService.description}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="text-xs uppercase font-semibold text-bronze-300 tracking-wider">
                What's Included in Your Sovereign Session:
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {featuredService.inclusions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-charcoal-900/90 border border-charcoal-700 text-xs text-ivory-100">
                    <div className="p-1 rounded-full bg-bronze-500/20 text-bronze-400 mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{item.title}</div>
                      <div className="text-ivory-400 text-[11px] mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onBookFeatured}
                className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-charcoal-950 hover:bg-ivory-100 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-lg hover:shadow-xl group"
              >
                <span>Reserve Sovereign Session</span>
                <ArrowRight className="w-4 h-4 text-charcoal-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={getWhatsAppLink('booking', { service: featuredService.name })}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-full border border-charcoal-600 hover:border-bronze-400 text-ivory-200 hover:text-white text-xs font-medium text-center transition-colors"
              >
                Inquire via WhatsApp
              </a>
            </div>

            <p className="text-[11px] text-ivory-400 italic text-center sm:text-left">
              * Dedicated VIP private suite guaranteed. Advance reservation required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
