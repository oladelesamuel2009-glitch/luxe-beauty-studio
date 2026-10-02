import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Clock, Calendar } from 'lucide-react';
import type { GalleryItem } from '../../data/galleryData';

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onBookLook: (item: GalleryItem) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
  onBookLook,
}) => {
  const currentItem = currentIndex !== null && items[currentIndex] ? items[currentIndex] : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentItem) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex !== null && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      }
      if (e.key === 'ArrowRight' && currentIndex !== null && currentIndex < items.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };

    if (currentItem) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentItem, currentIndex, items.length, onClose, onNavigate]);

  if (!currentItem || currentIndex === null) return null;

  return (
    <div className="fixed inset-0 z-50 bg-charcoal-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {currentIndex > 0 && (
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110 hidden sm:block"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentIndex < items.length - 1 && (
        <button
          onClick={() => onNavigate(currentIndex + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110 hidden sm:block"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      <div className="relative max-w-4xl w-full max-h-[90vh] bg-charcoal-900 rounded-3xl overflow-hidden shadow-2xl border border-charcoal-700 flex flex-col md:flex-row">
        <div className="relative flex-1 bg-black flex items-center justify-center max-h-[55vh] md:max-h-[80vh] overflow-hidden">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="w-full h-full object-contain md:object-cover"
          />
        </div>

        <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-charcoal-900 text-ivory-50 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-ivory-400">
              <span className="px-3 py-1 rounded-full bg-charcoal-800 text-bronze-300 font-medium uppercase tracking-wider">
                {currentItem.categoryLabel}
              </span>
              <span>
                {currentIndex + 1} / {items.length}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-white">
                {currentItem.title}
              </h3>
              <p className="text-xs text-ivory-300 leading-relaxed">
                {currentItem.description}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-charcoal-800 text-xs text-ivory-300">
              <div className="flex items-center justify-between">
                <span className="text-ivory-500">Stylist:</span>
                <span className="text-white font-medium">{currentItem.stylist}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ivory-500">Service Duration:</span>
                <span className="text-white font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-bronze-400" />
                  {currentItem.duration}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-charcoal-800">
            <button
              onClick={() => {
                onClose();
                onBookLook(currentItem);
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white text-charcoal-950 hover:bg-ivory-100 text-xs font-semibold tracking-wider uppercase transition-all shadow-md"
            >
              <Calendar className="w-4 h-4 text-charcoal-900" />
              <span>Book This Look</span>
            </button>

            <div className="flex sm:hidden items-center justify-between pt-2">
              <button
                disabled={currentIndex === 0}
                onClick={() => onNavigate(currentIndex - 1)}
                className="px-4 py-2 rounded-lg bg-charcoal-800 text-xs text-ivory-200 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={currentIndex === items.length - 1}
                onClick={() => onNavigate(currentIndex + 1)}
                className="px-4 py-2 rounded-lg bg-charcoal-800 text-xs text-ivory-200 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
