import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle, HelpCircle } from 'lucide-react';
import { faqData } from '../../data/faqData';
import { getWhatsAppLink } from '../../data/salonConfig';

export const FAQSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-6': true,
  });
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'booking', label: 'Bookings & Arrival' },
    { id: 'services', label: 'Services & Hair Prep' },
    { id: 'hair-care', label: 'Scalp & Maintenance' },
    { id: 'payment', label: 'Payment & Deposits' },
  ];

  const filteredFAQs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-ivory-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand-200/80 text-charcoal-800 text-xs font-semibold tracking-widest uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-bronze-600" />
            Client Assistance
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-950 tracking-tight">
            Frequently Asked Questions.
          </h2>
          
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed max-w-xl mx-auto">
            Everything you need to know about our reservation guidelines, hair preparation, deposits, and salon etiquette.
          </p>
        </div>

        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-bronze-400 text-xs sm:text-sm text-charcoal-800 shadow-xs"
            />
          </div>

          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-charcoal-900 text-ivory-50'
                    : 'bg-sand-100 text-charcoal-700 hover:bg-sand-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12 bg-sand-50 rounded-2xl border border-sand-200 p-6">
            <p className="text-xs text-charcoal-500">No matching questions found.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-2 text-xs text-bronze-700 font-semibold underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFAQs.map((faq) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-sand-200 bg-white overflow-hidden transition-all duration-200 shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-sand-50/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base sm:text-lg font-medium text-charcoal-900">
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-charcoal-900 text-white' : 'bg-sand-100 text-charcoal-700'
                      }`}
                    >
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-charcoal-600 leading-relaxed border-t border-sand-100/80 pt-4 animate-fadeIn">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-sand-100/80 border border-sand-300/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-serif text-lg sm:text-xl font-medium text-charcoal-900">
              Have a specific question not listed here?
            </h4>
            <p className="text-xs text-charcoal-600">
              Our Lekki concierge desk is available to assist with custom inquiries, bridal schedules, and consultations.
            </p>
          </div>

          <a
            href={getWhatsAppLink('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-medium tracking-wide shadow-xs shrink-0 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
