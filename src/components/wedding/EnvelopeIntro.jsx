import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../../constants/testIds";

/* ═══════════════════════════════════════════════════════════
   Ornamental SVG Corner — Odia temple-inspired paisley motif
   ═══════════════════════════════════════════════════════════ */
const OrnateCorner = ({ className = "" }) => (
  <svg viewBox="0 0 220 220" fill="none" className={className}>
    {/* Paisley swirl */}
    <path
      d="M10,10 C50,15 75,50 85,85 C95,120 75,155 50,165 C25,175 5,155 15,125 C25,95 55,75 85,85"
      stroke="#C9A84C"
      strokeWidth="1.5"
      fill="none"
      opacity="0.7"
    />
    {/* Inner circle */}
    <circle cx="45" cy="45" r="25" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
    {/* Lotus-like petal */}
    <path
      d="M30,30 Q45,10 60,30 Q45,50 30,30Z"
      fill="#C9A84C"
      opacity="0.12"
    />
    {/* Dot ornaments */}
    <circle cx="20" cy="70" r="2.5" fill="#C9A84C" opacity="0.5" />
    <circle cx="70" cy="20" r="2.5" fill="#C9A84C" opacity="0.5" />
    <circle cx="55" cy="55" r="1.5" fill="#E5C76B" opacity="0.6" />
  </svg>
);

/* ═══════════════════════════════════
   Floating particle for ambiance
   ═══════════════════════════════════ */
const FloatingParticle = ({ delay, x, size = 4 }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: "50%",
      background: "radial-gradient(circle, rgba(229,199,107,0.6), transparent)",
    }}
    animate={{
      y: [-30, -80, -30],
      opacity: [0, 0.8, 0],
      scale: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

/* ═══════════════════════════════════════
   ENVELOPE INTRO — Premium Odia Wedding
   ═══════════════════════════════════════ */
const EnvelopeIntro = ({ onOpen }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      data-testid={WEDDING.introOverlay}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(107,15,26,0.03) 0%, rgba(61,8,20,0.06) 60%, rgba(61,8,20,0.10) 100%), var(--clr-cream, #FDF6EC)",
      }}
      exit={{ opacity: 0, scale: 1.15 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Floating ambient particles */}
      {[15, 30, 50, 70, 85].map((x, i) => (
        <FloatingParticle key={i} x={x} delay={i * 0.8} size={3 + i} />
      ))}

      {/* Top-left ornate corner */}
      <OrnateCorner className="absolute top-0 left-0 w-28 sm:w-36 opacity-30 pointer-events-none" />
      {/* Bottom-right ornate corner, rotated */}
      <OrnateCorner className="absolute bottom-0 right-0 w-28 sm:w-36 opacity-30 pointer-events-none rotate-180" />

      {/* Subtle golden edge accents */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent 10%, rgba(201,168,76,0.3) 50%, transparent 90%)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent 10%, rgba(201,168,76,0.3) 50%, transparent 90%)" }}
      />

      {showContent && (
        <div className="flex flex-col items-center gap-6 sm:gap-8 px-6 max-w-sm mx-auto">
          {/* Ganesha image — Odia Pattachitra style */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden flex items-center justify-center"
              style={{
                border: "2.5px solid var(--clr-gold, #C9A84C)",
                boxShadow: "0 0 30px rgba(201,168,76,0.20), 0 4px 20px rgba(107,15,26,0.10)",
                background: "var(--clr-ivory, #FFFEF8)",
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/ganesha_odia.png"}
                alt="Lord Ganesha — Pattachitra"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* Decorative ring around Ganesha */}
            <motion.div
              className="absolute -inset-2 rounded-full pointer-events-none"
              style={{ border: "1px solid rgba(201,168,76,0.25)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Shloka */}
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center leading-relaxed"
            style={{
              fontFamily: "'Noto Sans Devanagari', 'Cormorant Garamond', serif",
              color: "var(--clr-maroon, #6B0F1A)",
              fontSize: "var(--fs-sm, 0.8rem)",
              fontWeight: 500,
              opacity: 0.75,
            }}
          >
            ॐ श्री गणेशाय नमः
          </motion.p>

          {/* Invitation text */}
          <motion.div
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <p
              className="uppercase tracking-[0.2em] mb-3"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: "var(--clr-text-muted, #6B5C60)",
                fontSize: "var(--fs-xs, 0.7rem)",
                fontWeight: 500,
              }}
            >
              You are cordially invited
            </p>
            <h2
              className="mb-1"
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: "var(--clr-maroon, #6B0F1A)",
                fontSize: "var(--fs-3xl, 2.25rem)",
                lineHeight: 1.2,
              }}
            >
              Subhalaxmi (Radhika)
            </h2>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "var(--clr-gold, #C9A84C)",
                fontSize: "var(--fs-xl, 1.25rem)",
                fontWeight: 500,
              }}
            >
              &
            </p>
            <h2
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: "var(--clr-maroon, #6B0F1A)",
                fontSize: "var(--fs-3xl, 2.25rem)",
                lineHeight: 1.2,
              }}
            >
              Adarsh (Bitu)
            </h2>
          </motion.div>

          {/* Open button */}
          <motion.button
            data-testid={WEDDING.envelopeButton}
            onClick={onOpen}
            className="relative px-8 py-3 sm:px-10 sm:py-3.5 rounded-full overflow-hidden group cursor-pointer"
            style={{
              border: "1.5px solid var(--clr-gold, #C9A84C)",
              backgroundColor: "transparent",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "0.15em",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span
              className="relative z-10 text-xs sm:text-sm uppercase font-semibold transition-colors duration-400"
              style={{ color: "var(--clr-maroon, #6B0F1A)" }}
            >
              Open Invitation
            </span>
            {/* Hover fill */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: "var(--grad-maroon)" }}
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
            />
            {/* Pulsing ring attention-grabber */}
            <motion.div
              className="absolute -inset-1 rounded-full pointer-events-none"
              style={{ border: "1.5px solid var(--clr-gold, #C9A84C)" }}
              animate={{ scale: [1, 1.3, 1.3], opacity: [0.6, 0, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.button>

          {/* Sacred Knots branding */}
          <motion.div
            className="flex flex-col items-center justify-center gap-2 mt-4"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <img
              src={process.env.PUBLIC_URL + "/logosacred.png"}
              alt="Sacred Knots Logo"
              className="h-8 sm:h-9 w-auto object-contain"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.08))" }}
            />
            <p
              className="text-xs uppercase tracking-[0.2em] font-semibold"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: "var(--clr-maroon, #6B0F1A)",
                opacity: 0.65,
              }}
            >
              Crafted with love tale
            </p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default EnvelopeIntro;
