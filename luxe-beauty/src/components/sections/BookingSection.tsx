import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Download,
  MessageCircle,
  Check,
  Code2,
  ChevronDown,
  ChevronUp,
  Wine,
  Phone,
  Mail,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { servicesData, serviceCategories } from '../../data/servicesData';
import type { ServiceItem, ServiceAddOn } from '../../data/servicesData';
import { teamData } from '../../data/teamData';
import { salonConfig } from '../../data/salonConfig';
import type {
  BookingFormData,
  ConfirmedBooking,
} from '../../types/booking';
import {
  TIME_SLOTS,
  BEVERAGE_OPTIONS,
  formatDatePretty,
  submitBookingAPI,
  downloadICSFile,
  getBookingWhatsAppLink,
} from '../../services/bookingService';
import { formatNaira } from '../../lib/utils';

interface BookingSectionProps {
  preselectedService?: ServiceItem | null;
  onClearPreselectedService?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  preselectedService,
  onClearPreselectedService,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);
  const [showDeveloperPayload, setShowDeveloperPayload] = useState<boolean>(false);
  const [errorNotice, setErrorNotice] = useState<string>('');

  const [formData, setFormData] = useState<BookingFormData>({
    category: 'all',
    serviceId: servicesData[0].id,
    selectedService: servicesData[0],
    selectedAddOns: [],
    stylistId: 'any',
    selectedStylist: null,
    selectedDate: getNextAvailableDateString(),
    selectedTimeSlot: '11:00 AM',
    fullName: '',
    phone: '',
    email: '',
    hairTextureOrLaceNotes: '',
    specialRequests: '',
    beveragePreference: BEVERAGE_OPTIONS[0],
    sendWhatsAppConfirmation: true,
  });

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        category: preselectedService.category,
        serviceId: preselectedService.id,
        selectedService: preselectedService,
        selectedAddOns: [],
      }));
      setStep(1);
    }
  }, [preselectedService]);

  function getNextAvailableDateString(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  const basePrice = formData.selectedService ? formData.selectedService.price : 0;
  const addOnsTotal = formData.selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const totalAmount = basePrice + addOnsTotal;
  const depositAmount = Math.round(totalAmount * (salonConfig.bookingPolicies.depositPercentage / 100));

  const handleToggleAddOn = (addon: ServiceAddOn) => {
    setFormData((prev) => {
      const exists = prev.selectedAddOns.some((a) => a.id === addon.id);
      if (exists) {
        return {
          ...prev,
          selectedAddOns: prev.selectedAddOns.filter((a) => a.id !== addon.id),
        };
      } else {
        return {
          ...prev,
          selectedAddOns: [...prev.selectedAddOns, addon],
        };
      }
    });
  };

  const validateStep = (currentStep: number): boolean => {
    setErrorNotice('');
    if (currentStep === 1) {
      if (!formData.selectedService) {
        setErrorNotice('Please select a service to proceed.');
        return false;
      }
      return true;
    }
    if (currentStep === 2) {
      if (!formData.selectedDate) {
        setErrorNotice('Please choose a preferred appointment date.');
        return false;
      }
      if (!formData.selectedTimeSlot) {
        setErrorNotice('Please choose a preferred time slot.');
        return false;
      }
      return true;
    }
    if (currentStep === 3) {
      if (!formData.fullName.trim()) {
        setErrorNotice('Please provide your full name.');
        return false;
      }
      if (!formData.phone.trim() || formData.phone.length < 8) {
        setErrorNotice('Please provide a valid contact phone number.');
        return false;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setErrorNotice('Please provide a valid email address.');
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    setErrorNotice('');
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirmBooking = async () => {
    try {
      setIsSubmitting(true);
      setErrorNotice('');
      const result = await submitBookingAPI(formData);
      setConfirmedBooking(result);
      setStep(5);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C29E6F', '#1E1A17', '#E5D6C3', '#10B981'],
        });
      } catch {
        // Fallback
      }
    } catch (err: any) {
      setErrorNotice(err.message || 'Something went wrong while confirming your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetBooking = () => {
    setStep(1);
    setConfirmedBooking(null);
    if (onClearPreselectedService) {
      onClearPreselectedService();
    }
  };

  const upcomingDays = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = d.getDate();
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    const isSunday = d.getDay() === 0;
    return { dateStr, dayName, dayNumber, monthName, isSunday };
  });

  return (
    <section id="booking" className="py-20 lg:py-28 bg-ivory-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand-200 text-charcoal-800 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-bronze-600" />
            Seamless Online Booking
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-950 tracking-tight">
            Reserve Your Luxe Experience.
          </h2>
          
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed max-w-xl mx-auto">
            Select your signature service, preferred master artisan, and schedule. We'll have your private station and chilled refreshments ready.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-sand-200 overflow-hidden">
          
          {step < 5 && (
            <div className="bg-sand-50/80 px-6 sm:px-10 py-5 border-b border-sand-200">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {[
                  { num: 1, label: 'Service' },
                  { num: 2, label: 'Schedule' },
                  { num: 3, label: 'Details' },
                  { num: 4, label: 'Summary' },
                ].map((s, idx) => {
                  const isCurrent = step === s.num;
                  const isCompleted = step > s.num;
                  return (
                    <React.Fragment key={s.num}>
                      <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                            isCompleted
                              ? 'bg-charcoal-900 text-white'
                              : isCurrent
                              ? 'bg-bronze-500 text-white ring-4 ring-bronze-400/20'
                              : 'bg-sand-200 text-charcoal-500'
                          }`}
                        >
                          {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                        </div>
                        <span
                          className={`text-[11px] sm:text-xs uppercase tracking-wider font-medium ${
                            isCurrent
                              ? 'text-charcoal-900 font-bold'
                              : isCompleted
                              ? 'text-charcoal-700'
                              : 'text-charcoal-400'
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>

                      {idx < 3 && (
                        <div
                          className={`flex-1 h-0.5 mx-2 sm:mx-4 transition-all ${
                            step > idx + 1 ? 'bg-charcoal-900' : 'bg-sand-200'
                          }`}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}

          {errorNotice && (
            <div className="m-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-xs text-rose-800 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorNotice}</span>
            </div>
          )}

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="p-6 sm:p-10 space-y-8 animate-fadeIn">
              <div>
                <h3 className="font-serif text-2xl font-medium text-charcoal-900">
                  Select Your Service & Add-ons
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
                  Choose a treatment tailored to your natural crown or beauty goals.
                </p>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {serviceCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.id })}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                      formData.category === cat.id
                        ? 'bg-charcoal-900 text-white'
                        : 'bg-sand-100 text-charcoal-700 hover:bg-sand-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto p-1">
                {servicesData
                  .filter((s) => formData.category === 'all' || s.category === formData.category)
                  .map((service) => {
                    const isSelected = formData.serviceId === service.id;
                    return (
                      <div
                        key={service.id}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            serviceId: service.id,
                            selectedService: service,
                            selectedAddOns: [],
                          })
                        }
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex gap-3.5 items-start ${
                          isSelected
                            ? 'border-bronze-500 bg-sand-50 shadow-md ring-2 ring-bronze-400/20'
                            : 'border-sand-200 hover:border-sand-300 bg-white'
                        }`}
                      >
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] uppercase font-semibold text-bronze-700 tracking-wider">
                              {service.categoryLabel}
                            </span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-bronze-500 text-white flex items-center justify-center">
                                <Check className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          <h4 className="font-serif font-medium text-sm sm:text-base text-charcoal-900 truncate mt-0.5">
                            {service.name}
                          </h4>
                          <div className="flex items-center justify-between mt-2 text-xs">
                            <span className="font-semibold text-charcoal-900">
                              {formatNaira(service.price)}
                            </span>
                            <span className="text-charcoal-500 flex items-center gap-1 text-[11px]">
                              <Clock className="w-3 h-3 text-bronze-500" />
                              {service.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {formData.selectedService?.addOns && formData.selectedService.addOns.length > 0 && (
                <div className="pt-4 border-t border-sand-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-semibold text-charcoal-500 tracking-wider">
                      Enhance Your Session with Add-ons (Optional)
                    </span>
                    <span className="text-[11px] text-bronze-600 font-medium">
                      {formData.selectedAddOns.length} selected
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {formData.selectedService.addOns.map((addon) => {
                      const isChecked = formData.selectedAddOns.some((a) => a.id === addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => handleToggleAddOn(addon)}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                            isChecked
                              ? 'border-bronze-500 bg-sand-100/70 text-charcoal-900'
                              : 'border-sand-200 bg-white text-charcoal-700 hover:bg-sand-50'
                          }`}
                        >
                          <div className="space-y-0.5 pr-2">
                            <div className="text-xs font-semibold text-charcoal-900">{addon.name}</div>
                            <div className="text-[10px] text-charcoal-500">{addon.description}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-xs font-bold text-bronze-700">
                              +{formatNaira(addon.price)}
                            </div>
                            <span
                              className={`inline-block mt-1 w-4 h-4 rounded border text-center leading-none ${
                                isChecked
                                  ? 'bg-bronze-500 border-bronze-500 text-white'
                                  : 'border-sand-300'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 inline" />}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-sand-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-charcoal-400 block tracking-wider">
                    Service Estimated Total
                  </span>
                  <span className="text-xl font-serif font-bold text-charcoal-900">
                    {formatNaira(totalAmount)}
                  </span>
                </div>

                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-charcoal-900 text-ivory-50 hover:bg-charcoal-800 text-xs sm:text-sm font-medium tracking-wide shadow-md transition-all group"
                >
                  <span>Select Schedule</span>
                  <ArrowRight className="w-4 h-4 text-bronze-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Stylist, Date & Time Picker */}
          {step === 2 && (
            <div className="p-6 sm:p-10 space-y-8 animate-fadeIn">
              <div>
                <h3 className="font-serif text-2xl font-medium text-charcoal-900">
                  Select Date, Time & Specialist
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
                  Choose your preferred artist or select first available master stylist.
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs uppercase font-semibold text-charcoal-500 tracking-wider block">
                  Select Preferred Stylist
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, stylistId: 'any', selectedStylist: null })}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                      formData.stylistId === 'any'
                        ? 'border-bronze-500 bg-sand-50 ring-2 ring-bronze-400/20'
                        : 'border-sand-200 bg-white hover:bg-sand-50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-sand-200 flex items-center justify-center font-serif text-sm font-bold text-charcoal-800">
                      ✨
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-charcoal-900">First Available</div>
                      <div className="text-[10px] text-charcoal-500">Master Stylist Team</div>
                    </div>
                  </button>

                  {teamData.map((member) => (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, stylistId: member.id, selectedStylist: member })
                      }
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                        formData.stylistId === member.id
                          ? 'border-bronze-500 bg-sand-50 ring-2 ring-bronze-400/20'
                          : 'border-sand-200 bg-white hover:bg-sand-50'
                      }`}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-charcoal-900 truncate">
                          {member.name.split(' ')[0]}
                        </div>
                        <div className="text-[10px] text-charcoal-500 truncate">
                          {member.role.split(' ')[0]}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase font-semibold text-charcoal-500 tracking-wider flex items-center gap-2">
                    <CalendarIcon className="w-3.5 h-3.5 text-bronze-600" />
                    Available Appointment Dates
                  </label>
                  <span className="text-xs text-charcoal-500 font-medium">
                    {formatDatePretty(formData.selectedDate)}
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {upcomingDays.slice(0, 7).map((d) => {
                    const isSelected = formData.selectedDate === d.dateStr;
                    return (
                      <button
                        key={d.dateStr}
                        type="button"
                        onClick={() => setFormData({ ...formData, selectedDate: d.dateStr })}
                        className={`p-2.5 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? 'border-charcoal-900 bg-charcoal-900 text-white shadow-md'
                            : 'border-sand-200 bg-white hover:bg-sand-100 text-charcoal-800'
                        }`}
                      >
                        <div className="text-[10px] uppercase font-semibold tracking-wider opacity-70">
                          {d.dayName}
                        </div>
                        <div className="font-serif text-lg font-bold my-0.5">
                          {d.dayNumber}
                        </div>
                        <div className="text-[9px] opacity-70">
                          {d.monthName}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <span className="text-xs text-charcoal-500">Or pick custom date:</span>
                  <input
                    type="date"
                    min={getNextAvailableDateString()}
                    value={formData.selectedDate}
                    onChange={(e) => setFormData({ ...formData, selectedDate: e.target.value })}
                    className="px-3 py-1.5 rounded-xl border border-sand-300 text-xs text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-bronze-400"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs uppercase font-semibold text-charcoal-500 tracking-wider flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-bronze-600" />
                  Select Preferred Start Time
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = formData.selectedTimeSlot === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setFormData({ ...formData, selectedTimeSlot: slot.time })}
                        className={`py-3 px-4 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? 'border-bronze-500 bg-sand-50 font-bold text-charcoal-950 ring-2 ring-bronze-400/20'
                            : 'border-sand-200 bg-white hover:bg-sand-50 text-charcoal-700 font-medium'
                        }`}
                      >
                        <div className="text-xs sm:text-sm">{slot.time}</div>
                        <div className="text-[10px] text-charcoal-400 capitalize">{slot.period} slot</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-sand-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-sand-300 text-charcoal-700 hover:bg-sand-100 text-xs font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-charcoal-900 text-ivory-50 hover:bg-charcoal-800 text-xs sm:text-sm font-medium tracking-wide shadow-md transition-all group"
                >
                  <span>Enter Client Details</span>
                  <ArrowRight className="w-4 h-4 text-bronze-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Client Details Form */}
          {step === 3 && (
            <div className="p-6 sm:p-10 space-y-8 animate-fadeIn">
              <div>
                <h3 className="font-serif text-2xl font-medium text-charcoal-900">
                  Client Information & Sanctuary Preferences
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
                  Help us personalize your appointment and prepare your beverage.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs uppercase font-semibold text-charcoal-600 tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-bronze-600" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Folashade Adeyemi"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-sand-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-bronze-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-semibold text-charcoal-600 tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-bronze-600" />
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 814 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-sand-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-bronze-500"
                  />
                  <span className="text-[10px] text-charcoal-400">
                    We send booking updates and reminders via WhatsApp.
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-semibold text-charcoal-600 tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-bronze-600" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="folashade@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-sand-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-bronze-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs uppercase font-semibold text-charcoal-600 tracking-wider block">
                    Hair Texture / Wig Lace / Nail Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4C thick density, bringing 13x4 HD frontal wig, need old hard gel soak-off"
                    value={formData.hairTextureOrLaceNotes}
                    onChange={(e) =>
                      setFormData({ ...formData, hairTextureOrLaceNotes: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-sand-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-bronze-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs uppercase font-semibold text-charcoal-600 tracking-wider flex items-center gap-1.5">
                    <Wine className="w-3.5 h-3.5 text-bronze-600" />
                    Complimentary Welcome Beverage
                  </label>
                  <select
                    value={formData.beveragePreference}
                    onChange={(e) =>
                      setFormData({ ...formData, beveragePreference: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-sand-300 text-sm text-charcoal-900 bg-white focus:outline-none focus:ring-2 focus:ring-bronze-500"
                  >
                    {BEVERAGE_OPTIONS.map((bev) => (
                      <option key={bev} value={bev}>
                        {bev}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs uppercase font-semibold text-charcoal-600 tracking-wider block">
                    Special Requests & Accessibility Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Any allergies, scalp sensitivities, or celebration requests (e.g. birthday glam)? Let us know."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-sand-300 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-bronze-500"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-sand-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-sand-300 text-charcoal-700 hover:bg-sand-100 text-xs font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-charcoal-900 text-ivory-50 hover:bg-charcoal-800 text-xs sm:text-sm font-medium tracking-wide shadow-md transition-all group"
                >
                  <span>Review Summary</span>
                  <ArrowRight className="w-4 h-4 text-bronze-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Summary & Final Review */}
          {step === 4 && (
            <div className="p-6 sm:p-10 space-y-8 animate-fadeIn">
              <div>
                <h3 className="font-serif text-2xl font-medium text-charcoal-900">
                  Appointment Review & Confirmation
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
                  Please review your reservation details below before confirming.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-sand-50 border border-sand-200 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-sand-200 gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-bronze-700 tracking-wider">
                      Selected Treatment
                    </span>
                    <h4 className="font-serif text-xl font-bold text-charcoal-900">
                      {formData.selectedService?.name}
                    </h4>
                    <div className="text-xs text-charcoal-500 mt-0.5">
                      {formData.selectedService?.categoryLabel} · Duration: {formData.selectedService?.duration}
                    </div>
                  </div>
                  <div className="font-serif text-xl font-bold text-charcoal-900">
                    {formatNaira(basePrice)}
                  </div>
                </div>

                {formData.selectedAddOns.length > 0 && (
                  <div className="space-y-2 pb-4 border-b border-sand-200">
                    <span className="text-[10px] uppercase font-semibold text-charcoal-400 tracking-wider">
                      Selected Add-ons
                    </span>
                    {formData.selectedAddOns.map((addon) => (
                      <div key={addon.id} className="flex items-center justify-between text-xs text-charcoal-700">
                        <span>+ {addon.name}</span>
                        <span className="font-medium text-charcoal-900">
                          {formatNaira(addon.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-sand-200 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-charcoal-400 tracking-wider block">
                      Date & Time
                    </span>
                    <span className="font-semibold text-charcoal-900 text-sm block mt-0.5">
                      {formatDatePretty(formData.selectedDate)}
                    </span>
                    <span className="text-bronze-700 font-medium">{formData.selectedTimeSlot}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold text-charcoal-400 tracking-wider block">
                      Master Stylist
                    </span>
                    <span className="font-semibold text-charcoal-900 text-sm block mt-0.5">
                      {formData.selectedStylist ? formData.selectedStylist.name : 'First Available Master Stylist'}
                    </span>
                    <span className="text-charcoal-500">{formData.selectedStylist?.role || 'Senior Artisan Team'}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold text-charcoal-400 tracking-wider block">
                      Client
                    </span>
                    <span className="font-semibold text-charcoal-900 block mt-0.5">
                      {formData.fullName} ({formData.phone})
                    </span>
                    <span className="text-charcoal-500">{formData.email}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold text-charcoal-400 tracking-wider block">
                      Studio Location
                    </span>
                    <span className="font-semibold text-charcoal-900 block mt-0.5">
                      {salonConfig.address.primary}
                    </span>
                    <span className="text-charcoal-500">{salonConfig.address.city}, Lagos</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-sm text-charcoal-700">
                    <span>Total Estimated Service Amount</span>
                    <span className="font-semibold text-charcoal-900">{formatNaira(totalAmount)}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-bronze-700 font-medium">
                    <span>Standard Booking Deposit ({salonConfig.bookingPolicies.depositPercentage}%)</span>
                    <span>{formatNaira(depositAmount)}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-charcoal-500">
                    <span>Balance Due at Studio on Service Day</span>
                    <span>{formatNaira(totalAmount - depositAmount)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-ivory-50 border border-sand-200 flex items-start gap-3 text-xs text-charcoal-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-charcoal-900">Flexible Rescheduling Guarantee:</span>{' '}
                  {salonConfig.bookingPolicies.cancellationPolicy}
                </div>
              </div>

              <div className="pt-6 border-t border-sand-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full border border-sand-300 text-charcoal-700 hover:bg-sand-100 text-xs font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Edit</span>
                </button>

                <button
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-charcoal-900 text-ivory-50 hover:bg-charcoal-800 disabled:opacity-60 text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-lg hover:shadow-xl transition-all group"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Reserving Your Seat...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm & Book Appointment</span>
                      <CheckCircle2 className="w-4 h-4 text-bronze-400 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Confirmed Success Screen */}
          {step === 5 && confirmedBooking && (
            <div className="p-6 sm:p-12 text-center space-y-8 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand-200 text-charcoal-800 text-xs font-semibold tracking-widest uppercase">
                  Appointment Confirmed
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal-950">
                  We Look Forward to Pampering You!
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto">
                  A reservation hold has been created for <span className="font-semibold text-charcoal-900">{confirmedBooking.client.fullName}</span> at our Lekki Phase 1 studio.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-sand-50 border border-sand-300/80 max-w-lg mx-auto text-left space-y-4 shadow-sm relative">
                <div className="flex items-center justify-between pb-4 border-b border-sand-200">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-charcoal-400 tracking-wider">
                      Booking Reference
                    </span>
                    <div className="font-mono text-base sm:text-lg font-bold text-charcoal-900 tracking-wider">
                      {confirmedBooking.bookingId}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-medium uppercase tracking-wider">
                    Confirmed
                  </span>
                </div>

                <div className="space-y-2 text-xs text-charcoal-700">
                  <div className="flex justify-between">
                    <span className="text-charcoal-500">Service:</span>
                    <span className="font-semibold text-charcoal-900">{confirmedBooking.service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-500">Date:</span>
                    <span className="font-semibold text-charcoal-900">{confirmedBooking.schedule.dateFormatted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-500">Time:</span>
                    <span className="font-semibold text-charcoal-900">{confirmedBooking.schedule.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-500">Specialist:</span>
                    <span className="font-semibold text-charcoal-900">{confirmedBooking.stylist.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-500">Estimated Total:</span>
                    <span className="font-semibold text-charcoal-900">{formatNaira(confirmedBooking.totalEstimatedAmount)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-sand-200">
                    <span className="text-charcoal-500">Location:</span>
                    <span className="font-semibold text-charcoal-900 text-right">{salonConfig.address.primary}, Lekki</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-lg mx-auto pt-2">
                <a
                  href={getBookingWhatsAppLink(confirmedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium tracking-wide shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send to WhatsApp Concierge</span>
                </a>

                <button
                  type="button"
                  onClick={() => downloadICSFile(confirmedBooking)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full border border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-white text-xs sm:text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Add to Calendar (.ics)</span>
                </button>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleResetBooking}
                  className="text-xs text-charcoal-500 hover:text-charcoal-900 underline font-medium"
                >
                  Book another appointment or make changes
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Developer Inspection Drawer */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-sand-300/80 bg-white/70 overflow-hidden text-xs">
            <button
              type="button"
              onClick={() => setShowDeveloperPayload(!showDeveloperPayload)}
              className="w-full p-4 flex items-center justify-between text-left text-charcoal-800 hover:bg-sand-100/50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Code2 className="w-4 h-4 text-bronze-600" />
                <span className="font-semibold text-charcoal-900">
                  Full-Stack Developer Architecture Note & Integration Schema
                </span>
                <span className="px-2 py-0.5 rounded-md bg-bronze-500/10 text-bronze-700 text-[10px] font-mono">
                  TypeScript · Supabase / Firebase / REST Ready
                </span>
              </div>
              {showDeveloperPayload ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showDeveloperPayload && (
              <div className="p-5 border-t border-sand-200 bg-charcoal-950 text-sand-100 font-mono text-[11px] space-y-4 overflow-x-auto">
                <p className="text-sand-300 font-sans">
                  💡 <strong className="text-white">Portfolio Design Architecture:</strong> This booking module implements pure unidirectional state flow, dynamic cart-style add-on calculation, RFC 5545 iCalendar serialization, and deep-link WhatsApp payload formatting. It is architected for immediate zero-friction integration into Supabase, Firebase, or a Node/Express backend.
                </p>

                <div>
                  <span className="text-bronze-400 block mb-1">// Active Booking JSON State Payload:</span>
                  <pre className="p-3 rounded-lg bg-charcoal-900 text-emerald-400 border border-charcoal-800">
                    {JSON.stringify(
                      confirmedBooking || {
                        state: 'IN_PROGRESS',
                        service: formData.selectedService?.name,
                        addOns: formData.selectedAddOns.map((a) => a.name),
                        estimatedTotal: totalAmount,
                        depositRequired: depositAmount,
                        date: formData.selectedDate,
                        timeSlot: formData.selectedTimeSlot,
                        stylist: formData.selectedStylist?.name || 'First Available',
                        client: {
                          name: formData.fullName || '[Pending input]',
                          phone: formData.phone || '[Pending input]',
                          email: formData.email || '[Pending input]',
                        },
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
