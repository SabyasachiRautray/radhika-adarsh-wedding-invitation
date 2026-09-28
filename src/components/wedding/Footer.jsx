import React from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../../constants/testIds";
import { Heart } from "lucide-react";

/* ═══════════════════════════════════════════════
   FOOTER — Elegant closing with branding
   ═══════════════════════════════════════════════ */
const Footer = () => {
  return (
    <footer
      data-testid={WEDDING.footer}
      className="relative text-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--clr-cream, #FDF6EC) 0%, #2D0A10 30%, #1A0508 100%)",
        padding: "var(--section-pad-y) var(--section-pad-x)",
        paddingBottom: "3rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto pt-10 sm:pt-14"
      >
        {/* Decorative heart divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-10 sm:w-16" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5))" }} />
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart size={16} style={{ color: "var(--clr-gold, #C9A84C)" }} fill="currentColor" />
          </motion.div>
          <div className="h-px w-10 sm:w-16" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.5), transparent)" }} />
        </div>

        <p
          className="mb-3"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: "rgba(245,236,218,0.55)",
            fontSize: "var(--fs-sm, 0.8rem)",
          }}
        >
          We can't wait to celebrate with you!
        </p>

        <h3
          className="mb-3"
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: "var(--clr-gold-bright, #E5C76B)",
            fontSize: "var(--fs-2xl, 1.75rem)",
          }}
        >
          Subhalaxmi & Adarsh
        </h3>

        <p
          className="uppercase tracking-[0.2em] mb-8"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: "rgba(245,236,218,0.4)",
            fontSize: "var(--fs-xs, 0.65rem)",
            fontWeight: 500,
          }}
        >
          24 — 27 August 2026 &bull; Bhubaneswar, Odisha
        </p>

        {/* Divider */}
        <div
          className="mx-auto mb-8"
          style={{
            width: "50px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)",
          }}
        />

        {/* Sacred Knots branding */}
        <div className="flex flex-col items-center justify-center gap-2.5">
          <img
            src={process.env.PUBLIC_URL + "/logosacred.png"}
            alt="Sacred Knots Logo"
            className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
            style={{ filter: "brightness(1.1) drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }}
          />
          <p
            className="uppercase tracking-[0.25em] font-semibold"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: "var(--clr-gold, #C9A84C)",
              fontSize: "var(--fs-xs, 0.65rem)",
              opacity: 0.7,
            }}
          >
            Crafted with love tale
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
