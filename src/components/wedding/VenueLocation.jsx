import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  ExternalLink,
  Home,
  Copy,
  Check,
  Share2,
  Car,
  Clock,
  Sparkles,
  Layers,
  Compass,
  Plane,
  Train,
  ShieldCheck,
  Heart,
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   VENUES DATA ACCORDING TO INVITATION CARD (PDF)
   ═══════════════════════════════════════════════════ */
const VENUES = {
  "lemon-tree": {
    id: "lemon-tree",
    name: "Hotel Lemon Tree",
    subtitle: "Bharatpur, Bhubaneswar",
    locationType: "Hotel & Grand Banquet Halls",
    address: "Hotel Lemon Tree, Bharatpur, Bhubaneswar, Odisha",
    pincode: "751003",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Lemon+Tree+Hotel+Bharatpur+Bhubaneswar",
    embedUrl:
      "https://www.google.com/maps?q=Lemon+Tree+Hotel+Bharatpur+Bhubaneswar&output=embed",
    accent: "#6B0F1A",
    tagline: "Host to Haldi, Sangeet, Reception & Muhurtam",
    zones: [
      {
        name: "Poolside",
        event: "हल्दी (Haldi) — Rango Ka Mela",
        time: "25 November • 10:00 AM onwards",
        badge: "Outdoor Poolside",
        color: "bg-amber-100 text-amber-900 border-amber-300",
      },
      {
        name: "Tangerine Grand Hall 2",
        event: "शाम शानदार — Just Toast On The Coast (Sangeet)",
        time: "25 November • 6:30 PM onwards",
        badge: "Grand Banquet Hall",
        color: "bg-purple-100 text-purple-900 border-purple-300",
      },
      {
        name: "Tangerine Grand Hall 1 & 2 (1st & 5th Floor)",
        event: "विवाह & Reception — The Sacred Union of Souls",
        time: "26 November • 7:30 PM onwards",
        badge: "Reception Gala",
        color: "bg-rose-100 text-rose-900 border-rose-300",
      },
      {
        name: "Tangerine Grand Hall 1 & 2",
        event: "शुभ विवाह मुहूर्त (Wedding Muhurtam)",
        time: "27th November • 5:02 AM",
        badge: "Vedic Muhurtam",
        color: "bg-red-100 text-red-900 border-red-300",
      },
    ],
    features: [
      "Valet Parking & Dedicated Chauffeur Service",
      "Spacious Elevators to 1st & 5th Floor Tangerine Grand Halls",
      "Welcome Concierge & Hospitality Lounge",
    ],
    quote:
      "With prayers and gratitude to the Divine, we look forward to celebrating this joyous occasion with you. Your presence & blessings are our greatest gift.",
  },
  "residence": {
    id: "residence",
    name: "Our Residence",
    subtitle: "Apartment Society Hall",
    locationType: "Family Residence & Society Hall",
    address: "Our Residence Apartment Society Hall, Bhubaneswar, Odisha",
    pincode: "Bhubaneswar",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Apartment+Society+Hall+Bhubaneswar",
    embedUrl:
      "https://www.google.com/maps?q=Bhubaneswar,+Odisha&output=embed",
    accent: "#2D8B4E",
    tagline: "Host to Mehendi & Baraat Procession Departure",
    zones: [
      {
        name: "Our Residence Apartment Society Hall",
        event: "मेहंदी (Mehendi) — Pyar Ka Rang",
        time: "24 November • 6:00 PM onwards",
        badge: "Mehendi Ceremony",
        color: "bg-emerald-100 text-emerald-900 border-emerald-300",
      },
      {
        name: "Our Residence",
        event: "बारात (Baraat) — The Royal Chariot Departure",
        time: "26 November • 4:00 PM",
        badge: "Procession Flag-off",
        color: "bg-amber-100 text-amber-900 border-amber-300",
      },
    ],
    features: [
      "Society Hall for traditional Henna & family sangeet celebration",
      "Baraat assembly area & Dhol player reception",
      "Family Hospitality & Welcoming Lounge",
    ],
    quote: "With the blessings of the Divine and our elders.",
  },
  "baraat-route": {
    id: "baraat-route",
    name: "बारात — The Royal Chariot",
    subtitle: "From Our Residence to Hotel Lemon Tree, Bharatpur, Bhubaneswar",
    locationType: "Royal Baraat Procession Route",
    address: "From Our Residence to Hotel Lemon Tree, Bharatpur, Bhubaneswar",
    pincode: "Bhubaneswar",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Lemon+Tree+Hotel+Bharatpur+Bhubaneswar",
    embedUrl:
      "https://www.google.com/maps?q=Lemon+Tree+Hotel+Bharatpur+Bhubaneswar&output=embed",
    accent: "#C9A84C",
    tagline: "26 November • 4:00 PM Procession to Hotel Lemon Tree",
    zones: [
      {
        name: "Starting Point: Our Residence",
        event: "बारात Assembly & Sehra Bandi",
        time: "26 November • 4:00 PM",
        badge: "Assembly",
        color: "bg-blue-100 text-blue-900 border-blue-300",
      },
      {
        name: "Bhubaneswar Royal Procession Route",
        event: "The Royal Chariot with Dhol, Music & Celebration",
        time: "26 November • 4:30 PM onwards",
        badge: "Procession",
        color: "bg-amber-100 text-amber-900 border-amber-300",
      },
      {
        name: "Destination: Hotel Lemon Tree, Bharatpur",
        event: "Grand Swagat, Milni & Reception (7:30 PM)",
        time: "26 November • 7:00 PM – 7:30 PM",
        badge: "Grand Arrival",
        color: "bg-rose-100 text-rose-900 border-rose-300",
      },
    ],
    features: [
      "Royal Chariot procession with brass band & traditional Dhol",
      "Procession through Bhubaneswar to Hotel Lemon Tree",
      "Grand Milni Swagat at Lemon Tree Tangerine Grand Halls",
    ],
    quote: "The Royal Chariot leading to the Sacred Union of Souls.",
  },
};

const EVENT_PILLS = [
  {
    id: "mehendi",
    label: "Mehendi",
    date: "24 Nov • 6 PM",
    venueKey: "residence",
    zone: "Our Residence Apartment Society Hall",
    icon: "🌿",
  },
  {
    id: "haldi",
    label: "Haldi",
    date: "25 Nov • 10 AM",
    venueKey: "lemon-tree",
    zone: "Poolside, Hotel Lemon Tree",
    icon: "💛",
  },
  {
    id: "sangeet",
    label: "शाम शानदार (Sangeet)",
    date: "25 Nov • 6:30 PM",
    venueKey: "lemon-tree",
    zone: "Tangerine Grand Hall 2",
    icon: "🍸",
  },
  {
    id: "baraat",
    label: "बारात (The Royal Chariot)",
    date: "26 Nov • 4 PM",
    venueKey: "baraat-route",
    zone: "From Our Residence to Lemon Tree",
    icon: "👑",
  },
  {
    id: "reception",
    label: "विवाह & Reception",
    date: "26 Nov 7:30 PM & 27 Nov",
    venueKey: "lemon-tree",
    zone: "Tangerine Grand Hall 1 & 2",
    icon: "💍",
  },
];

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT: VenueLocation
   ═══════════════════════════════════════════════════ */
const VenueLocation = () => {
  const [selectedVenueKey, setSelectedVenueKey] = useState("lemon-tree");
  const [activeEventFilter, setActiveEventFilter] = useState(null);
  const [mapMode, setMapMode] = useState("google"); // "google" | "illustrated"
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const currentVenue = VENUES[selectedVenueKey] || VENUES["lemon-tree"];

  // Handle external selection events (e.g. from EventTimeline)
  useEffect(() => {
    const handleSelectVenue = (e) => {
      const key = e.detail?.venueKey;
      if (key && VENUES[key]) {
        setSelectedVenueKey(key);
        setActiveEventFilter(null);
      }
    };
    window.addEventListener("select-wedding-venue", handleSelectVenue);
    return () => window.removeEventListener("select-wedding-venue", handleSelectVenue);
  }, []);

  const handleCopyAddress = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setToastMessage(`Copied ${label} location!`);
    setTimeout(() => {
      setCopied(false);
      setToastMessage("");
    }, 2800);
  };

  const handleShareWhatsApp = (venue) => {
    const text = encodeURIComponent(
      `Join us for Adarsh & Radhika's Wedding Celebration!\n\n📍 Venue: ${venue.name} (${venue.subtitle})\n📌 Location: ${venue.address}\n🗺️ Google Maps: ${venue.googleMapsUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const selectEvent = (pill) => {
    setActiveEventFilter(pill.id);
    setSelectedVenueKey(pill.venueKey);
  };

  return (
    <section
      id="venue-location"
      data-testid="venue-location"
      className="relative overflow-hidden ornate-border-top"
      style={{
        backgroundColor: "var(--clr-cream-dark, #F5ECDA)",
        padding: "var(--section-pad-y) var(--section-pad-x)",
      }}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full shadow-2xl bg-[var(--clr-maroon-deep)] text-[var(--clr-gold-bright)] border border-[var(--clr-gold)] text-center max-w-[90vw]"
          >
            <Check size={16} className="text-emerald-400 flex-shrink-0" />
            <span className="font-sans text-xs sm:text-sm font-semibold tracking-wide truncate">
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Header */}
      <motion.div
        className="text-center mb-8 sm:mb-12 px-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.35)] mb-3">
          <Compass size={13} className="text-[var(--clr-maroon)]" />
          <span
            className="uppercase tracking-[0.2em] font-bold"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: "var(--clr-maroon, #6B0F1A)",
              fontSize: "var(--fs-xs, 0.65rem)",
            }}
          >
            Celebration Venues &amp; Map
          </span>
        </div>

        <h2
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: "var(--clr-maroon, #6B0F1A)",
            fontSize: "clamp(2rem, 1.8rem + 2vw, 2.75rem)",
          }}
        >
          Venues &amp; Location Details
        </h2>

        <p
          className="max-w-xl mx-auto mt-2 text-xs sm:text-sm md:text-base font-sans"
          style={{ color: "var(--clr-text-muted, #6B5C60)" }}
        >
          Celebrate every joyous occasion of Adarsh &amp; Radhika&apos;s wedding at
          Hotel Lemon Tree and Our Residence.
        </p>

        <div
          className="mx-auto mt-3"
          style={{
            width: "60px",
            height: "2px",
            background: "var(--grad-gold)",
            borderRadius: "var(--radius-full)",
          }}
        />
      </motion.div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-1 sm:px-4">

        {/* 1. Quick Event Filter Pills - Mobile Friendly Touch Scroll */}
        <div className="mb-6 sm:mb-8 flex flex-col items-center">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Sparkles size={13} className="text-[var(--clr-gold)]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-[var(--clr-maroon)]">
              Jump to Event Location
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 w-full">
            {EVENT_PILLS.map((pill) => {
              const isSelected = activeEventFilter === pill.id;
              return (
                <button
                  key={pill.id}
                  onClick={() => selectEvent(pill)}
                  className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border cursor-pointer ${
                    isSelected
                      ? "bg-[var(--clr-maroon)] text-[var(--clr-gold-bright)] border-[var(--clr-gold)] shadow-md scale-105"
                      : "bg-[var(--clr-ivory)] text-[var(--clr-text)] border-[rgba(201,168,76,0.3)] hover:border-[var(--clr-gold)] hover:bg-white"
                  }`}
                >
                  <span className="text-sm">{pill.icon}</span>
                  <span className="font-serif font-bold text-xs sm:text-sm">{pill.label}</span>
                  <span
                    className={`text-[9px] sm:text-[10px] uppercase font-sans px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-[rgba(255,255,255,0.18)] text-[var(--clr-gold-bright)]"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {pill.date}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Destination Venue Selector Cards / Tabs - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Card 1: Hotel Lemon Tree */}
          <button
            onClick={() => {
              setSelectedVenueKey("lemon-tree");
              setActiveEventFilter(null);
            }}
            className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
              selectedVenueKey === "lemon-tree"
                ? "bg-[var(--clr-ivory)] border-[var(--clr-gold)] shadow-[0_10px_25px_rgba(107,15,26,0.15)] ring-1 ring-[var(--clr-gold)]"
                : "bg-[rgba(255,254,248,0.7)] border-[rgba(201,168,76,0.25)] hover:bg-[var(--clr-ivory)] hover:border-[var(--clr-gold)]"
            }`}
          >
            {selectedVenueKey === "lemon-tree" && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--grad-gold)]" />
            )}
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[var(--clr-maroon)] text-[var(--clr-gold-bright)] shadow-md">
                <MapPin size={18} />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-50 text-[var(--clr-maroon)] border border-rose-200">
                Main Venue
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[var(--clr-maroon-deep)] mb-0.5">
              Hotel Lemon Tree
            </h3>
            <p className="font-sans text-xs text-[var(--clr-text-muted)] font-medium mb-2 line-clamp-2">
              Bharatpur, Bhubaneswar &bull; Haldi, Sangeet, Reception &amp; Muhurtam
            </p>
            <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[var(--clr-gold)]">
              <span>View Venue Details</span>
              <Navigation size={11} />
            </div>
          </button>

          {/* Card 2: Our Residence */}
          <button
            onClick={() => {
              setSelectedVenueKey("residence");
              setActiveEventFilter(null);
            }}
            className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
              selectedVenueKey === "residence"
                ? "bg-[var(--clr-ivory)] border-[var(--clr-gold)] shadow-[0_10px_25px_rgba(45,139,78,0.15)] ring-1 ring-[var(--clr-gold)]"
                : "bg-[rgba(255,254,248,0.7)] border-[rgba(201,168,76,0.25)] hover:bg-[var(--clr-ivory)] hover:border-[var(--clr-gold)]"
            }`}
          >
            {selectedVenueKey === "residence" && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-amber-500" />
            )}
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-emerald-800 text-[var(--clr-gold-bright)] shadow-md">
                <Home size={18} />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Residence
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[var(--clr-maroon-deep)] mb-0.5">
              Our Residence
            </h3>
            <p className="font-sans text-xs text-[var(--clr-text-muted)] font-medium mb-2 line-clamp-2">
              Apartment Society Hall &bull; Mehendi (24 Nov)
            </p>
            <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-emerald-700">
              <span>View Residence Details</span>
              <Navigation size={11} />
            </div>
          </button>

          {/* Card 3: The Royal Baraat */}
          <button
            onClick={() => {
              setSelectedVenueKey("baraat-route");
              setActiveEventFilter(null);
            }}
            className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer sm:col-span-2 md:col-span-1 ${
              selectedVenueKey === "baraat-route"
                ? "bg-[var(--clr-ivory)] border-[var(--clr-gold)] shadow-[0_10px_25px_rgba(201,168,76,0.2)] ring-1 ring-[var(--clr-gold)]"
                : "bg-[rgba(255,254,248,0.7)] border-[rgba(201,168,76,0.25)] hover:bg-[var(--clr-ivory)] hover:border-[var(--clr-gold)]"
            }`}
          >
            {selectedVenueKey === "baraat-route" && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--grad-gold)]" />
            )}
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-amber-600 text-white shadow-md">
                <Car size={18} />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                26 Nov &bull; 4:00 PM
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[var(--clr-maroon-deep)] mb-0.5">
              The Royal Chariot
            </h3>
            <p className="font-sans text-xs text-[var(--clr-text-muted)] font-medium mb-2 line-clamp-2">
              From Our Residence to Hotel Lemon Tree, Bharatpur
            </p>
            <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-amber-700">
              <span>View Baraat Trail</span>
              <Navigation size={11} />
            </div>
          </button>
        </div>

        {/* 3. Dynamic Venue Details & Map Area - Mobile Friendly Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">

          {/* Left Column: Venue Details Card (5 cols on desktop, full width on mobile) */}
          <motion.div
            key={currentVenue.id}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 flex flex-col justify-between p-4 sm:p-6 md:p-8 rounded-3xl bg-[var(--clr-ivory)] border border-[rgba(201,168,76,0.3)] shadow-[var(--shadow-card)] relative overflow-hidden"
          >
            {/* Background Odia motif watermark */}
            <div className="absolute -right-8 -bottom-8 opacity-[0.03] pointer-events-none">
              <Compass size={220} />
            </div>

            <div>
              {/* Top Header */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-[var(--clr-gold)]">
                  {currentVenue.locationType}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--clr-maroon-deep)] mb-0.5">
                {currentVenue.name}
              </h3>
              <p className="text-xs sm:text-sm font-sans font-medium text-[var(--clr-maroon)] mb-4">
                {currentVenue.subtitle}
              </p>

              {/* Exact Venue Address Box */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-5">
                <div className="flex items-start gap-2.5">
                  <MapPin className="text-[var(--clr-maroon)] flex-shrink-0 mt-0.5" size={17} />
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-xs sm:text-sm text-[var(--clr-text)] font-semibold leading-relaxed">
                      {currentVenue.address}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-amber-200/60 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCopyAddress(currentVenue.address, currentVenue.name)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-[var(--clr-maroon)] border border-amber-300 hover:bg-amber-100 transition-colors cursor-pointer"
                  >
                    <Copy size={12} />
                    <span>Copy Location</span>
                  </button>
                  <button
                    onClick={() => handleShareWhatsApp(currentVenue)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors cursor-pointer"
                  >
                    <Share2 size={12} />
                    <span>Share on WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Event Hall & Schedule Breakdown */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <Layers size={15} className="text-[var(--clr-gold)]" />
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[var(--clr-maroon-deep)]">
                    Events at this Venue
                  </h4>
                </div>

                <div className="space-y-2.5">
                  {currentVenue.zones.map((zone, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-[rgba(201,168,76,0.25)] bg-[rgba(255,255,255,0.7)] hover:bg-white transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                        <span className="font-serif font-bold text-xs sm:text-sm text-[var(--clr-maroon)]">
                          {zone.name}
                        </span>
                        <span
                          className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${zone.color}`}
                        >
                          {zone.badge}
                        </span>
                      </div>
                      <p className="font-sans text-xs sm:text-sm font-semibold text-gray-800">
                        {zone.event}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-sans mt-0.5">
                        <Clock size={12} className="text-[var(--clr-gold)]" />
                        <span>{zone.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Quote from PDF */}
              {currentVenue.quote && (
                <div className="p-3 rounded-xl bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.25)] mb-5">
                  <div className="flex items-start gap-2">
                    <Heart size={14} className="text-[var(--clr-maroon)] mt-0.5 flex-shrink-0" />
                    <p className="text-xs font-sans italic text-[var(--clr-text-muted)] leading-relaxed">
                      &ldquo;{currentVenue.quote}&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {/* Amenities / Notes */}
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 mb-5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  <span>Guest Comfort &amp; Facilities</span>
                </div>
                <ul className="text-xs text-gray-600 space-y-1 font-sans pl-1">
                  {currentVenue.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--clr-gold)] flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3.5 border-t border-[rgba(201,168,76,0.25)] flex flex-wrap items-center gap-2.5">
              <a
                href={currentVenue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider no-underline transition-transform hover:scale-105 shadow-md flex-1 sm:flex-initial text-center"
                style={{
                  background: "var(--grad-maroon)",
                  color: "var(--clr-gold-bright, #E5C76B)",
                }}
              >
                <Navigation size={13} />
                <span>Open in Google Maps</span>
                <ExternalLink size={11} />
              </a>

              {selectedVenueKey === "baraat-route" && (
                <button
                  onClick={() => setSelectedVenueKey("lemon-tree")}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold bg-white border border-[var(--clr-gold)] text-[var(--clr-maroon)] hover:bg-amber-50 cursor-pointer flex-1 sm:flex-initial text-center"
                >
                  <MapPin size={12} />
                  <span>View Destination (Lemon Tree)</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Right Column: Creative Map Container (7 cols on desktop, full width on mobile) */}
          <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-4">

            {/* Map Mode Toggle Header */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-2xl bg-[var(--clr-ivory)] border border-[rgba(201,168,76,0.3)] shadow-sm">
              <div className="flex items-center gap-2 pl-1 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--clr-maroon)] font-sans truncate">
                  <strong className="text-[var(--clr-maroon-deep)]">{currentVenue.name}</strong>
                </span>
              </div>

              {/* Mode Toggle Buttons */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full border border-gray-200 ml-auto">
                <button
                  onClick={() => setMapMode("google")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    mapMode === "google"
                      ? "bg-[var(--clr-maroon)] text-[var(--clr-gold-bright)] shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Live Map
                </button>
                <button
                  onClick={() => setMapMode("illustrated")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    mapMode === "illustrated"
                      ? "bg-[var(--clr-maroon)] text-[var(--clr-gold-bright)] shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Royal Trail
                </button>
              </div>
            </div>

            {/* Map Canvas / Embed Frame - Height adjusts for mobile & desktop */}
            <div
              className="rounded-3xl overflow-hidden shadow-[var(--shadow-elevated)] border border-[rgba(201,168,76,0.35)] relative flex-1 min-h-[340px] sm:min-h-[420px] md:min-h-[480px] bg-white flex flex-col"
            >
              {mapMode === "google" ? (
                /* Mode A: Live Google Maps Embed */
                <div className="w-full h-full flex-1 relative min-h-[340px] sm:min-h-[420px]">
                  <iframe
                    title={`Map of ${currentVenue.name}`}
                    src={currentVenue.embedUrl}
                    width="100%"
                    height="100%"
                    className="w-full h-full min-h-[340px] sm:min-h-[420px] border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Floating venue badge on top right */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-amber-200 pointer-events-none hidden sm:block">
                    <p className="font-serif text-xs font-bold text-[var(--clr-maroon)]">
                      {currentVenue.name}
                    </p>
                    <p className="text-[10px] text-gray-500 font-sans">
                      Bhubaneswar, Odisha
                    </p>
                  </div>
                </div>
              ) : (
                /* Mode B: Creative Illustrated Wedding Trail / Bhubaneswar Infographic */
                <div className="w-full h-full flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#2D0A10] via-[#4A0E18] to-[#1A0508] text-[var(--clr-ivory)]">
                  {/* Background Mandala overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.1)_0%,transparent_70%)] pointer-events-none" />

                  {/* Top Bar inside Illustrated Map */}
                  <div className="relative z-10 flex items-center justify-between border-b border-[rgba(201,168,76,0.2)] pb-3">
                    <div>
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[var(--clr-gold)] font-bold">
                        Bhubaneswar Wedding Trail
                      </span>
                      <h4 className="font-serif text-lg sm:text-xl md:text-2xl text-[var(--clr-gold-bright)]">
                        Sacred Union Map Overview
                      </h4>
                    </div>
                    <span className="text-[10px] sm:text-xs font-sans px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.1)] border border-[rgba(201,168,76,0.3)] text-gray-300">
                      24 – 27 Nov 2026
                    </span>
                  </div>

                  {/* Mobile-Friendly Visual Layout of the Trail */}
                  <div className="relative z-10 my-4 py-2 flex-1 flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 w-full max-w-lg mx-auto">

                      {/* Hub 1: Our Residence */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedVenueKey("residence")}
                        className={`w-full md:w-5/12 p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer backdrop-blur-md ${
                          selectedVenueKey === "residence"
                            ? "bg-[rgba(255,255,255,0.18)] border-[var(--clr-gold-bright)] shadow-[0_0_20px_rgba(201,168,76,0.4)]"
                            : "bg-[rgba(0,0,0,0.45)] border-[rgba(201,168,76,0.25)] hover:bg-[rgba(255,255,255,0.1)]"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                            🏡
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                            Our Residence
                          </span>
                        </div>
                        <h5 className="font-serif text-sm sm:text-base font-bold text-white">
                          Apartment Society Hall
                        </h5>
                        <p className="text-[11px] text-gray-300 font-sans mt-1">
                          🌿 <strong>Mehendi</strong> • 24 Nov (6 PM)
                        </p>
                        <p className="text-[11px] text-amber-300 font-sans">
                          👑 <strong>Baraat Flag-off</strong> • 26 Nov (4 PM)
                        </p>
                      </motion.div>

                      {/* Procession Connector */}
                      <div className="flex flex-col items-center justify-center my-1 md:my-0">
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--clr-gold)] text-[var(--clr-maroon-deep)] text-[10px] font-bold uppercase tracking-wider shadow-md">
                          <Car size={12} />
                          <span>The Royal Chariot</span>
                        </div>
                        <span className="text-lg mt-1">🪘 🐘 🎺</span>
                        <div className="w-12 h-0.5 bg-[var(--clr-gold)] hidden md:block mt-1 opacity-60" />
                      </div>

                      {/* Hub 2: Hotel Lemon Tree */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedVenueKey("lemon-tree")}
                        className={`w-full md:w-5/12 p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer backdrop-blur-md ${
                          selectedVenueKey === "lemon-tree"
                            ? "bg-[rgba(255,255,255,0.18)] border-[var(--clr-gold-bright)] shadow-[0_0_20px_rgba(201,168,76,0.4)]"
                            : "bg-[rgba(0,0,0,0.45)] border-[rgba(201,168,76,0.25)] hover:bg-[rgba(255,255,255,0.1)]"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-full bg-[var(--clr-maroon-light)] flex items-center justify-center text-white text-xs font-bold shadow-md">
                            🍋
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-rose-300">
                            Grand Celebrations
                          </span>
                        </div>
                        <h5 className="font-serif text-sm sm:text-base font-bold text-white">
                          Hotel Lemon Tree
                        </h5>
                        <p className="text-[11px] text-amber-300 font-sans mt-1">
                          💛 <strong>Haldi</strong> • 25 Nov (10 AM)
                        </p>
                        <p className="text-[11px] text-purple-300 font-sans">
                          🍸 <strong>Shaam Shaandar</strong> • 25 Nov (6:30 PM)
                        </p>
                        <p className="text-[11px] text-rose-300 font-sans">
                          🎊 <strong>Reception &amp; Vivah</strong> • 26–27 Nov
                        </p>
                      </motion.div>

                    </div>
                  </div>

                  {/* Bottom Illustrated Map Info */}
                  <div className="relative z-10 pt-3 border-t border-[rgba(201,168,76,0.2)] flex flex-wrap items-center justify-between text-xs text-gray-300 gap-2">
                    <span className="text-[11px] text-gray-400">
                      💡 Tap either venue card to switch details
                    </span>
                    <button
                      onClick={() => setMapMode("google")}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--clr-gold)] text-[var(--clr-maroon-deep)] hover:bg-[var(--clr-gold-bright)] cursor-pointer"
                    >
                      <span>Switch to Live GPS Navigation</span>
                      <Navigation size={12} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Travel Time & Connectivity Helper Bar - Mobile Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-[var(--clr-ivory)] border border-[rgba(201,168,76,0.25)] flex items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 flex-shrink-0">
                  <Plane size={16} />
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-xs font-bold text-[var(--clr-maroon-deep)] truncate">
                    Biju Patnaik Airport (BBI)
                  </p>
                  <p className="font-sans text-[11px] text-gray-500">
                    Approx. 15–20 mins drive across Bhubaneswar
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-[var(--clr-ivory)] border border-[rgba(201,168,76,0.25)] flex items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 flex-shrink-0">
                  <Train size={16} />
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-xs font-bold text-[var(--clr-maroon-deep)] truncate">
                    Bhubaneswar Railway Station
                  </p>
                  <p className="font-sans text-[11px] text-gray-500">
                    Approx. 20–25 mins drive &bull; Ola / Uber 24/7
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default VenueLocation;
