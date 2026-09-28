import React, { useMemo } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════
   Color palette — Odia wedding flowers
   ═══════════════════════════════════════ */
const PETAL_COLORS = [
  "#C9A84C",   // gold
  "#E5C76B",   // bright gold
  "#D4AF37",   // classic gold
  "#F0A830",   // marigold
  "#E07A2E",   // saffron
  "#FFB6C1",   // rose pink
  "#c96b6b",   // soft red
  "#6B0F1A",   // deep maroon
];

/* ═══════════════════════════════════════
   Generate petal configuration
   ═══════════════════════════════════════ */
const generatePetal = (index) => {
  const size = Math.random() * 10 + 6;
  const startX = Math.random() * 100;
  const duration = Math.random() * 10 + 12;
  const delay = Math.random() * 14;
  const swayRange = Math.random() * 60 + 30;
  const color = PETAL_COLORS[index % PETAL_COLORS.length];
  const rotation = Math.random() * 360;
  const opacity = Math.random() * 0.3 + 0.3;

  return { size, startX, duration, delay, swayRange, color, rotation, opacity };
};

/* ═══════════════════════════════════════
   Individual petal with organic motion
   ═══════════════════════════════════════ */
const Petal = ({ config }) => (
  <motion.div
    aria-hidden="true"
    className="fixed pointer-events-none"
    style={{
      left: `${config.startX}%`,
      top: -20,
      width: config.size,
      height: config.size * 1.4,
      borderRadius: "50% 0 50% 50%",
      background: `radial-gradient(ellipse at 30% 30%, ${config.color}, ${config.color}88)`,
      opacity: config.opacity,
      transform: `rotate(${config.rotation}deg)`,
      filter: "blur(0.3px)",
      zIndex: 50,
    }}
    animate={{
      y: ["0vh", "105vh"],
      x: [0, config.swayRange, -config.swayRange * 0.6, config.swayRange * 0.3, 0],
      rotate: [config.rotation, config.rotation + 360],
      opacity: [0, config.opacity, config.opacity, config.opacity * 0.5, 0],
    }}
    transition={{
      duration: config.duration,
      delay: config.delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

/* ═══════════════════════════════════════════════
   FLOWER PETALS — Richer Odia-marigold palette
   ═══════════════════════════════════════════════ */
const FlowerPetals = ({ count = 20 }) => {
  const petals = useMemo(
    () => Array.from({ length: count }, (_, i) => generatePetal(i)),
    [count]
  );

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((config, i) => (
        <Petal key={i} config={config} />
      ))}
    </div>
  );
};

export default FlowerPetals;
