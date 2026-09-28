import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink, Home, Map } from "lucide-react";

const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/search/Lemon+Tree+Hotel+Bhubaneswar";

const EMBED_SRC =
  "https://www.google.com/maps?q=Lemon+Tree+Hotel+Bhubaneswar&output=embed";

/* ═══════════════════════════════════════════════════
   VENUE LOCATION — Multiple Venues Layout
   ═══════════════════════════════════════════════════ */
const VenueLocation = () => {
  return (
    <section
      data-testid="venue-location"
      className="relative overflow-hidden ornate-border-top"
      style={{
        backgroundColor: "var(--clr-cream-dark, #F5ECDA)",
        padding: "var(--section-pad-y) var(--section-pad-x)",
      }}
    >
      {/* Section title */}
      <motion.div
        className="text-center mb-10 sm:mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p
          className="uppercase tracking-[0.25em] mb-2"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: "var(--clr-text-muted, #6B5C60)",
            fontSize: "var(--fs-xs, 0.65rem)",
            fontWeight: 600,
          }}
        >
          Find Your Way
        </p>
        <h2
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: "var(--clr-maroon, #6B0F1A)",
            fontSize: "var(--fs-3xl, 2.25rem)",
          }}
        >
          Venues &amp; Directions
        </h2>
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

      {/* Content — stacked on mobile, side-by-side on desktop */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
        
        {/* Venues details cards (Two stack) */}
        <motion.div
          className="w-full lg:w-5/12 flex flex-col gap-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {/* Venue 1: Lemon Tree Hotel */}
          <div
            className="rounded-2xl p-6 sm:p-8 flex-1 flex flex-col justify-center"
            style={{
              backgroundColor: "var(--clr-ivory, #FFFEF8)",
              boxShadow: "var(--shadow-card)",
              border: "1px solid rgba(201,168,76,0.25)",
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--clr-maroon)] shadow-md">
                <MapPin size={20} className="text-[var(--clr-gold-bright)]" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[var(--clr-maroon-deep)] font-semibold leading-tight">Lemon Tree Hotel</h3>
                <p className="font-sans text-sm text-[var(--clr-text-muted)] font-medium">Bharatpur, Bhubaneswar</p>
              </div>
            </div>
            
            <p className="font-sans text-sm text-[var(--clr-text-soft)] mb-5 pl-1">
              Baraat, Reception & Wedding Ceremony
            </p>

            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center self-start gap-2 px-5 py-2.5 rounded-full no-underline transition-transform hover:scale-105"
              style={{
                background: "var(--grad-maroon)",
                color: "var(--clr-gold-bright, #E5C76B)",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "var(--fs-xs, 0.75rem)",
                fontWeight: 600,
                letterSpacing: "0.05em",
                boxShadow: "0 4px 16px rgba(107,15,26,0.25)",
              }}
            >
              <Navigation size={14} />
              Open in Google Maps
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Venue 2: Residence & Sangeet */}
          <div
            className="rounded-2xl p-6 sm:p-8 flex-1 flex flex-col justify-center relative overflow-hidden"
            style={{
              backgroundColor: "var(--clr-ivory, #FFFEF8)",
              boxShadow: "var(--shadow-card)",
              border: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            <div className="absolute -right-4 -bottom-4 opacity-5">
              <Home size={120} />
            </div>
            
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--clr-gold)] shadow-md">
                <Home size={18} className="text-[var(--clr-maroon-deep)]" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[var(--clr-maroon-deep)] font-semibold leading-tight">Groom's Residence</h3>
                <p className="font-sans text-sm text-[var(--clr-text-muted)] font-medium">Home Sweet Home</p>
              </div>
            </div>

            <p className="font-sans text-sm text-[var(--clr-text-soft)] pl-1 relative z-10 mb-4">
              Mehendi & Haldi Ceremonies
            </p>

            <div className="border-t border-[rgba(201,168,76,0.3)] pt-4 mt-1 relative z-10">
              <div className="flex items-center gap-2">
                <Map size={16} className="text-[var(--clr-gold)]" />
                <p className="font-sans text-sm text-[var(--clr-text-muted)]">
                  <strong>Sangeet Venue:</strong> To Be Decided
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Map embed (Lemon Tree) */}
        <motion.div
          className="w-full lg:w-7/12"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="rounded-2xl overflow-hidden h-full min-h-[350px] sm:min-h-[450px]"
            style={{
              boxShadow: "var(--shadow-card)",
              border: "1px solid rgba(201,168,76,0.25)",
            }}
          >
            <iframe
              title="Wedding Venue – Lemon Tree Hotel, Bhubaneswar"
              src={EMBED_SRC}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", minHeight: "350px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default VenueLocation;
