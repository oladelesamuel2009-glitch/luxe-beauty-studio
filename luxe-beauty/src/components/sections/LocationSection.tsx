import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Navigation,
  CheckCircle2
} from 'lucide-react';
import { salonConfig, getWhatsAppLink } from '../../data/salonConfig';

export const LocationSection: React.FC = () => {
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [lagosTime, setLagosTime] = useState('');

  useEffect(() => {
    const updateLagosTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          weekday: 'short',
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        setLagosTime(formatter.format(now));

        const lagosDate = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
        const day = lagosDate.getDay();
        const hour = lagosDate.getHours();

        if (day === 0) {
          setIsOpenNow(hour >= 12 && hour < 18);
        } else {
          setIsOpenNow(hour >= 9 && hour < 19);
        }
      } catch {
        setIsOpenNow(true);
      }
    };

    updateLagosTime();
    const interval = setInterval(updateLagosTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="location" className="py-20 lg:py-28 bg-sand-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand-200 text-charcoal-800 text-xs font-semibold tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5 text-bronze-600" />
            Lekki Flagship & Concierge
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-950 tracking-tight">
            Visit Our Lekki Sanctuary.
          </h2>
          
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed max-w-xl mx-auto">
            Conveniently situated on Admiralty Way, Lekki Phase 1 with dedicated valet parking and private acoustic suites.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div className="p-4 rounded-2xl bg-white border border-sand-200 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isOpenNow ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      isOpenNow ? 'bg-emerald-600' : 'bg-amber-600'
                    }`}
                  ></span>
                </span>
                <div>
                  <div className="text-xs font-semibold text-charcoal-900">
                    {isOpenNow ? 'Studio is Currently Open' : 'Studio is Currently Closed'}
                  </div>
                  <div className="text-[11px] text-charcoal-500">
                    Local Lagos Time: <span className="font-medium text-charcoal-800">{lagosTime || 'West Africa Time'}</span>
                  </div>
                </div>
              </div>

              <span
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  isOpenNow
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {isOpenNow ? 'Walk-in By Appt' : 'Opens 9:00 AM'}
              </span>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-sand-200 shadow-xs space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-sand-100 text-bronze-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold text-charcoal-400 tracking-wider">
                    Studio Address
                  </div>
                  <h4 className="font-serif text-lg font-bold text-charcoal-900 mt-0.5">
                    {salonConfig.address.primary}
                  </h4>
                  <p className="text-xs text-charcoal-600 mt-0.5">
                    {salonConfig.address.city}, {salonConfig.state}, {salonConfig.country}
                  </p>
                  <p className="text-[11px] text-bronze-700 font-medium mt-1">
                    Landmark: {salonConfig.address.landmark}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-sand-100">
                <div className="p-3 rounded-2xl bg-sand-100 text-bronze-600 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <div className="text-xs uppercase font-semibold text-charcoal-400 tracking-wider mb-2">
                    Operating Hours
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-charcoal-600 font-medium">Monday — Friday:</span>
                      <span className="font-semibold text-charcoal-900">{salonConfig.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-600 font-medium">Saturday:</span>
                      <span className="font-semibold text-charcoal-900">{salonConfig.hours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-600 font-medium">Sunday:</span>
                      <span className="font-semibold text-charcoal-900">{salonConfig.hours.sunday}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-sand-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-charcoal-400 tracking-wider block">
                    Phone Inquiries
                  </span>
                  <a
                    href={`tel:${salonConfig.contact.phoneRaw}`}
                    className="font-semibold text-charcoal-900 hover:text-bronze-600 transition-colors flex items-center gap-1.5 mt-0.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-bronze-500" />
                    <span>{salonConfig.contact.phoneDisplay}</span>
                  </a>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-semibold text-charcoal-400 tracking-wider block">
                    Concierge Email
                  </span>
                  <a
                    href={`mailto:${salonConfig.contact.email}`}
                    className="font-semibold text-charcoal-900 hover:text-bronze-600 transition-colors flex items-center gap-1.5 mt-0.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-bronze-500" />
                    <span className="truncate">{salonConfig.contact.email}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={getWhatsAppLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-medium transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Lekki Concierge</span>
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(salonConfig.address.full)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white border border-sand-300 text-charcoal-800 hover:bg-sand-50 text-xs font-medium transition-colors shadow-xs"
              >
                <Navigation className="w-4 h-4 text-bronze-600" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-sand-200 bg-sand-200 aspect-[16/11] group">
              <img
                src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=85"
                alt="Luxe Beauty Studio Location Admiralty Way Lekki"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/40 to-transparent"></div>

              <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-sand-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-charcoal-900 text-ivory-50 flex items-center justify-center font-serif text-sm font-bold">
                    LX
                  </div>
                  <div>
                    <div className="text-xs font-bold text-charcoal-900">
                      Luxe Flagship Studio
                    </div>
                    <div className="text-[11px] text-charcoal-500">
                      Admiralty Way, Lekki Phase 1
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-bronze-500/15 text-bronze-800 text-[10px] font-bold uppercase tracking-wider">
                  Verified Pin
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-ivory-100 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="font-semibold text-white">5 Mins from Lekki-Ikoyi Link Bridge</div>
                  <div className="text-[11px] text-ivory-300">Monitored security & private parking available</div>
                </div>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(salonConfig.address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white text-charcoal-950 text-xs font-semibold uppercase tracking-wider hover:bg-sand-100 transition-colors shadow"
                >
                  Get Route
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {salonConfig.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-sand-200 shadow-xs space-y-1 hover:border-bronze-400 transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-900">
                    <CheckCircle2 className="w-3.5 h-3.5 text-bronze-500 shrink-0" />
                    <span className="truncate">{amenity.title}</span>
                  </div>
                  <p className="text-[10px] text-charcoal-500 line-clamp-2 leading-tight">
                    {amenity.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
