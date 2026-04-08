"use client";

import { useEffect, useRef } from "react";

interface SpotlightPosition {
  x: number;
  y: number;
}

/**
 * Tracks the mouse position and updates CSS variables --mx / --my on the
 * document root for use by spotlight-grid and cursor-spotlight elements.
 * Returns the current { x, y } position.
 */
export function useMouseSpotlight(): SpotlightPosition {
  const posRef = useRef<SpotlightPosition>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      // Cancel any pending frame to avoid queuing up work
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--mx", `${posRef.current.x}px`);
        document.documentElement.style.setProperty("--my", `${posRef.current.y}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return posRef.current;
}
