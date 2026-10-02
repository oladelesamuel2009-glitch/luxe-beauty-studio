import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      title: 'Trichology & Scalp Health First',
      desc: 'We never sacrifice the integrity of your hair follicles for aesthetics. Every treatment starts with moisture & elasticity diagnostics.',
    },
    {
      title: 'Dedicated One-on-One Artistry',
      desc: 'No double-booking or rushed appointments. Your dedicated master specialist gives your crown their full, undivided attention.',
    },
    {
      title: 'Hospital-Grade Sanitization',
      desc: 'All metal manicure and hair tools undergo autoclave dry-heat sterilization. Disposables used whenever applicable.',
    },
    {
      title: 'A Calm Acoustic Sanctuary',
      desc: 'Designed without loud salon chaos. Soft jazz, artisanal beverages, high-speed Wi-Fi, and plush private workstations.',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-ivory-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-3xl overflow-hidden shadow-xl aspect-[3/4] bg-sand-100 border-2 border-white">
                <img
                  src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=85"
                  alt="Luxe Beauty Studio Interior in Lekki Lagos"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-48 sm:w-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-square bg-sand-200">
                <img
                  src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=85"
                  alt="Texture Care Specialist"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="absolute top-6 -left-4 sm:-left-6 bg-charcoal-900 text-ivory-50 p-3.5 rounded-2xl shadow-lg border border-charcoal-700 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-bronze-500/20 text-bronze-300 flex items-center justify-center font-serif text-sm font-bold">
                  06
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Years of Excellence</div>
                  <div className="text-[10px] text-ivory-300">Lekki Phase 1 · Lagos</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand-200/80 text-charcoal-800 text-xs font-semibold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-bronze-600" />
                The Luxe Philosophy
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-950 tracking-tight leading-[1.12]">
                More than a beauty appointment. <br />
                <span className="italic font-light text-bronze-600">A sanctuary</span> for self-expression.
              </h2>

              <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
                Founded in Lagos, Luxe Beauty Studio was born out of a desire for an elevated salon experience that respects your time, values your individuality, and fiercely protects the health of your natural hair and skin.
              </p>

              <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
                We believe beauty appointments shouldn't be chaotic, noisy, or stressful. From the moment you step through our doors on Admiralty Way, our master artisans ensure every detail—from the precision of your partings to the warmth of your herbal tea—is crafted around your comfort.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-sand-200 shadow-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-charcoal-900 font-semibold text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-bronze-500 shrink-0" />
                    <span>{pillar.title}</span>
                  </div>
                  <p className="text-xs text-charcoal-500 leading-relaxed pl-6">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-sand-100/80 border border-sand-300/80 flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                alt="Amaka Okonjo"
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
              />
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm text-charcoal-800 italic">
                  "When hair is treated with tenderness, proper hydration, and scientific precision, it thrives in its most radiant state."
                </p>
                <div className="text-[11px] text-charcoal-500 font-medium">
                  — Amaka Okonjo, Creative Director & Master Texture Specialist
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
