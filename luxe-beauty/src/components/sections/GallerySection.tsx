import React, { useState, useMemo } from 'react';
import { Sparkles, Heart, Eye, ArrowUpRight } from 'lucide-react';
import { galleryData, galleryCategories } from '../../data/galleryData';
import type { GalleryItem } from '../../data/galleryData';
import { GalleryLightbox } from '../modals/GalleryLightbox';
import { servicesData } from '../../data/servicesData';
import type { ServiceItem } from '../../data/servicesData';

interface GallerySectionProps {
  onSelectServiceToBook: (service: ServiceItem) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onSelectServiceToBook }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return galleryData;
    return galleryData.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleBookLook = (item: GalleryItem) => {
    const matchingService = servicesData.find((s) => s.id === item.serviceId) || servicesData[0];
    onSelectServiceToBook(matchingService);
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-ivory-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand-200/80 text-charcoal-800 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-bronze-600" />
            Visual Portfolio & Client Looks
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-950 tracking-tight">
            Crafted for the Spotlight.
          </h2>
          
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed max-w-xl mx-auto">
            A curated showcase of real clients, seamless melts, pristine parts, and high-shine finishes created daily at our Lekki studio.
          </p>
        </div>

        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 scrollbar-none gap-2 mb-10 px-1">
          {galleryCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-charcoal-900 text-ivory-50 shadow-sm'
                    : 'bg-white text-charcoal-700 hover:bg-sand-100/80 hover:text-charcoal-900 border border-sand-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => {
            const isLiked = !!likedItems[item.id];
            const likesCount = item.likes + (isLiked ? 1 : 0);

            return (
              <div
                key={item.id}
                onClick={() => setActiveLightboxIndex(idx)}
                className="group relative rounded-3xl overflow-hidden bg-sand-100 border border-sand-200/80 shadow-xs hover:shadow-xl cursor-pointer transition-all duration-300 aspect-[4/5]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-medium text-charcoal-900 uppercase tracking-wider">
                    {item.categoryLabel}
                  </span>

                  <button
                    onClick={(e) => handleLike(e, item.id)}
                    className="p-2 rounded-full bg-charcoal-900/60 backdrop-blur-md text-white hover:bg-charcoal-900 transition-colors flex items-center gap-1 text-xs"
                    aria-label="Like look"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isLiked ? 'fill-rose-500 text-rose-500' : 'text-white'
                      }`}
                    />
                    <span className="text-[10px] font-medium">{likesCount}</span>
                  </button>
                </div>

                <div className="absolute bottom-4 inset-x-4 z-10 text-white space-y-1 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <div className="text-[11px] text-bronze-300 font-medium">
                    {item.stylist}
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-white leading-snug">
                    {item.title}
                  </h3>

                  <div className="pt-2 opacity-90 group-hover:opacity-100 flex items-center justify-between text-xs text-ivory-200">
                    <span className="flex items-center gap-1 text-bronze-300 font-medium">
                      <Eye className="w-3.5 h-3.5" />
                      View Look & Details
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-charcoal-900 transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      <GalleryLightbox
        items={filteredItems}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={(index) => setActiveLightboxIndex(index)}
        onBookLook={handleBookLook}
      />
    </section>
  );
};
