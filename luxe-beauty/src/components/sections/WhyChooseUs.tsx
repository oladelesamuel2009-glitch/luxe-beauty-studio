import React from 'react';
import { Sparkles, Crown, ShieldCheck, Clock, Gem, CheckCircle } from 'lucide-react';
import { whyChooseUsData } from '../../data/whyChooseUsData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Crown':
        return <Crown className="w-5 h-5 text-bronze-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-bronze-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-bronze-600" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-bronze-600" />;
      case 'Gem':
        return <Gem className="w-5 h-5 text-bronze-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-bronze-600" />;
    }
  };

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-sand-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand-200 text-charcoal-800 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-bronze-600" />
            The Luxe Standard
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-950 tracking-tight">
            Why Lagos Women Choose Luxe.
          </h2>
          
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed max-w-xl mx-auto">
            From our tensionless braiding techniques to punctual appointment starts, we design every touchpoint around your peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whyChooseUsData.map((benefit, idx) => (
            <div
              key={benefit.id}
              className={`bg-white rounded-3xl p-8 border border-sand-200/90 shadow-xs hover:shadow-xl hover:border-bronze-400/50 transition-all duration-300 flex flex-col justify-between group ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-sand-100 flex items-center justify-center group-hover:bg-sand-200 transition-colors">
                    {getIcon(benefit.iconName)}
                  </div>
                  <span className="font-serif text-2xl font-light text-sand-300 group-hover:text-bronze-500 transition-colors">
                    {benefit.number}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal-900 group-hover:text-bronze-700 transition-colors">
                    {benefit.title}
                  </h3>
                  <div className="text-xs font-medium text-bronze-600">
                    {benefit.subtitle}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-sand-100 flex items-center gap-2 text-[11px] font-medium text-charcoal-700">
                <span className="w-1.5 h-1.5 rounded-full bg-bronze-500"></span>
                <span>{benefit.highlight}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
