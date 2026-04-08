"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import BorderBeam from "./BorderBeam";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Extra inline styles */
  style?: React.CSSProperties;
  /** Framer Motion animation variants (optional) */
  animate?: object | string;
  initial?: object | string;
  transition?: object;
  /** Whether to show BorderBeam on hover (default true) */
  showBeam?: boolean;
  beamColor1?: string;
  beamColor2?: string;
  beamDuration?: number;
  /** data attribute forwarding */
  "data-col"?: number;
  "data-row"?: number;
}

/**
 * A high-gloss dark Bento card with:
 * - Glass morphism background
 * - Edge-lighting 1px border gradient
 * - Subtle mesh gradient glow blobs
 * - BorderBeam streak on hover
 * - Framer Motion spring animation support
 */
const GlassCard = ({
  children,
  className = "",
  style,
  animate,
  initial,
  transition,
  showBeam = true,
  beamColor1 = "#00f2ff",
  beamColor2 = "#8b5cf6",
  beamDuration = 3,
  ...rest
}: GlassCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`bento-card p-6 ${className}`}
      style={style}
      initial={initial ?? { opacity: 0, scale: 0.95 }}
      animate={animate ?? { opacity: 1, scale: 1 }}
      transition={transition ?? { type: "spring", stiffness: 260, damping: 24 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      {...(rest as any)}
    >
      {/* Mesh glow — blue top-left */}
      <div
        className="mesh-glow-blue"
        style={{ top: "-40px", left: "-40px" }}
        aria-hidden="true"
      />
      {/* Mesh glow — violet bottom-right */}
      <div
        className="mesh-glow-violet"
        style={{ bottom: "-40px", right: "-40px" }}
        aria-hidden="true"
      />

      {/* Card content */}
      <div className="relative z-10">{children}</div>

      {/* Border Beam on hover */}
      {showBeam && isHovered && (
        <BorderBeam
          color1={beamColor1}
          color2={beamColor2}
          duration={beamDuration}
        />
      )}
    </motion.div>
  );
};

export default GlassCard;
