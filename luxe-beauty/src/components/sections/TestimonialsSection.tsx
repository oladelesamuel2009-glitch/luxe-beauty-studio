import React from 'react';
import { Sparkles, Star, CheckCircle2, Quote } from 'lucide-react';
import { testimonialsData } from '../../data/testimonialsData';
import { salonConfig } from '../../data/salonConfig';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-sand-100/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand-200 text-charcoal-800 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-bronze-600" />
            Client Impressions
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-950 tracking-tight">
            Loved by Lagos Women.
          </h2>
          
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed max-w-xl mx-auto">
            Real feedback from verified appointments. Here is how our clients describe their time at Luxe Beauty Studio.
          </p>

          <div className="inline-flex items-center gap-3 p-3 px-5 rounded-2xl bg-white border border-sand-200 shadow-xs mt-2">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="font-serif font-bold text-charcoal-900 text-sm">
              {salonConfig.stats.rating} / 5.0
            </span>
            <span className="text-charcoal-400">·</span>
            <span className="text-xs text-charcoal-600 font-medium">
              Based on {salonConfig.stats.reviewCount.toLocaleString()} verified reviews
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-8 border border-sand-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6 relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-sand-300 group-hover:text-bronze-400 transition-colors" />
                </div>

                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed italic">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-sand-100 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.clientName}
                  className="w-11 h-11 rounded-full object-cover border border-sand-200 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 font-medium text-xs sm:text-sm text-charcoal-900">
                    <span className="truncate">{item.clientName}</span>
                    {item.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 shrink-0" />
                    )}
                  </div>
                  <div className="text-[11px] text-charcoal-500 truncate">
                    {item.clientTitle}
                  </div>
                  <div className="text-[10px] text-bronze-600 font-medium truncate mt-0.5">
                    Service: {item.service}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
