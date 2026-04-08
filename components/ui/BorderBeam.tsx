"use client";

import React, { useRef, useState, useEffect } from "react";

interface BorderBeamProps {
  /** Duration of one full loop around the perimeter in seconds */
  duration?: number;
  /** Width of the streak in pixels */
  size?: number;
  color1?: string;
  color2?: string;
  className?: string;
}

/**
 * Renders an animated "streak of light" that travels along the border of
 * its parent element on hover. Uses CSS offset-path along a rect() shape.
 *
 * Usage: place this as a direct child of a `position: relative` container
 * and ensure the parent has `overflow: hidden`.
 */
const BorderBeam = ({
  duration = 3,
  size = 80,
  color1 = "#00f2ff",
  color2 = "#8b5cf6",
  className = "",
}: BorderBeamProps) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute"
        style={{
          inset: 0,
          borderRadius: "inherit",
          background: "transparent",
        }}
      >
        {/* Travelling beam element */}
        <div
          style={{
            position: "absolute",
            width: `${size}px`,
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${color1}, ${color2}, transparent)`,
            offsetPath: `rect(0 100% 100% 0 round inherit)`,
            offsetDistance: "0%",
            animation: `border-beam ${duration}s linear infinite`,
            filter: `blur(0px) drop-shadow(0 0 4px ${color1})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: `${size}px`,
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${color2}, ${color1}, transparent)`,
            offsetPath: `rect(0 100% 100% 0 round inherit)`,
            offsetDistance: "0%",
            animation: `border-beam ${duration}s linear infinite`,
            animationDelay: `${duration / 2}s`,
            filter: `blur(0px) drop-shadow(0 0 4px ${color2})`,
          }}
        />
      </div>
    </div>
  );
};

export default BorderBeam;
