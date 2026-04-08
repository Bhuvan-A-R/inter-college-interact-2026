"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  range?: number;   // pixel range at which magnetism kicks in (default: 40)
  strength?: number; // how many px the button shifts (default: 12)
}

/**
 * Wraps children in a Framer Motion container that magneticaly pulls
 * toward the cursor when within `range` pixels.
 */
const MagneticButton = ({
  children,
  className = "",
  range = 40,
  strength = 12,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useSpring(0, { stiffness: 400, damping: 30 });
  const y = useSpring(0, { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const dist = Math.sqrt(distX * distX + distY * distY);

    if (dist < range + rect.width / 2) {
      x.set((distX / (range + rect.width / 2)) * strength);
      y.set((distY / (range + rect.height / 2)) * strength);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-flex transform-gpu ${className}`}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
