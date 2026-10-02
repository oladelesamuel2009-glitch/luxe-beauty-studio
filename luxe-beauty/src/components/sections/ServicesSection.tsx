import React, { useState, useMemo } from 'react';
import { Sparkles, Clock, ArrowRight, Eye, Search, Filter } from 'lucide-react';
import { servicesData, serviceCategories } from '../../data/servicesData';
import type { ServiceCategoryId, ServiceItem } from '../../data/servicesData';
import { ServiceDetailModal } from '../modals/ServiceDetailModal';
import { formatNaira } from '../../lib/utils';

interface ServicesSectionProps {
  onSelectServiceToBook: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="services" className="py-20 lg:py-28 bg-sand-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand-200/80 text-charcoal-800 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-bronze-600" />
            Curated Salon Menu
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-950 tracking-tight">
            Artisanal Care for Every Texture & Crown.
          </h2>
          
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed max-w-2xl mx-auto">
            From precision steam-infused silk presses to protective braids, undetectable HD lace melts, and clinical-grade facials. Every service is delivered with unhurried excellence.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-2 px-1">
            {serviceCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-charcoal-900 text-ivory-50 shadow-sm'
                      : 'bg-white/80 text-charcoal-700 hover:bg-white hover:text-charcoal-900 border border-sand-200'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto px-2">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services (e.g. Knotless, Silk Press, Manicure)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-white rounded-full border border-sand-200 focus:outline-none focus:ring-2 focus:ring-bronze-400 text-charcoal-800 placeholder-charcoal-400 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-charcoal-400 hover:text-charcoal-700"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs text-charcoal-500 font-medium">
              Showing <span className="text-charcoal-900 font-semibold">{filteredServices.length}</span> luxury offerings in Lagos
            </div>
          </div>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white/60 rounded-3xl border border-sand-200 max-w-md mx-auto p-8">
            <Filter className="w-8 h-8 text-charcoal-400 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-medium text-charcoal-900">No matching services found</h3>
            <p className="text-xs text-charcoal-500 mt-1 mb-4">
              Try adjusting your search terms or select another category above.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full bg-charcoal-900 text-ivory-50 text-xs font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-3xl overflow-hidden border border-sand-200 hover:border-bronze-400/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand-100">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-60"></div>

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-medium text-charcoal-900 uppercase tracking-wider shadow-xs">
                        {service.categoryLabel}
                      </span>
                      {service.badge && (
                        <span className="px-2.5 py-1 rounded-full bg-charcoal-900/90 text-ivory-100 text-[11px] font-medium tracking-wide">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-charcoal-900/80 backdrop-blur-md text-ivory-100 text-xs font-normal">
                      <Clock className="w-3.5 h-3.5 text-bronze-300" />
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal-900 group-hover:text-bronze-600 transition-colors">
                        {service.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-charcoal-600 line-clamp-2 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="pt-2 border-t border-sand-100 space-y-1">
                      {service.whatIncluded.slice(0, 2).map((inc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] text-charcoal-500">
                          <span className="w-1 h-1 rounded-full bg-bronze-500"></span>
                          <span className="truncate">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 bg-white">
                  <div className="pt-4 border-t border-sand-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-charcoal-400 uppercase tracking-wider block">
                        Starting At
                      </span>
                      <span className="font-serif text-lg sm:text-xl font-bold text-charcoal-900">
                        {formatNaira(service.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveModalService(service)}
                        className="p-2.5 rounded-full border border-sand-200 hover:border-charcoal-400 text-charcoal-700 hover:text-charcoal-950 transition-colors"
                        title="View Details & Prep Guide"
                        aria-label={`View details for ${service.name}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onSelectServiceToBook(service)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-charcoal-900 text-ivory-50 hover:bg-charcoal-800 text-xs font-medium tracking-wide transition-all shadow-xs group/btn"
                      >
                        <span>Book</span>
                        <ArrowRight className="w-3.5 h-3.5 text-bronze-400 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <ServiceDetailModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
        onBookService={(service) => {
          onSelectServiceToBook(service);
        }}
      />
    </section>
  );
};
