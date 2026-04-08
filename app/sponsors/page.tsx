"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hexagon, Triangle, Circle, Square, Star, Box, Diamond, Compass } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Placeholder data for sponsors
const sponsorTiers = [
  {
    tierName: "Title Sponsor",
    color: "hsl(var(--primary))",
    bg: "hsl(var(--primary)/0.05)",
    sponsors: [
      { name: "Apex Technologies", Icon: Hexagon, description: "Empowering the future with cutting-edge cloud infrastructure and AI solutions." }
    ]
  },
  {
    tierName: "Co-Sponsors",
    color: "hsl(var(--secondary))",
    bg: "hsl(var(--secondary)/0.05)",
    sponsors: [
      { name: "Nexus Dynamics", Icon: Triangle, description: "Pioneering next-generation robotics and automation." },
      { name: "Quantum Media", Icon: Compass, description: "Digital storytelling and immersive media experiences." }
    ]
  },
  {
    tierName: "Associate Sponsors",
    color: "hsl(var(--foreground))",
    bg: "hsl(var(--card))",
    sponsors: [
      { name: "Elevate EdTech", Icon: Star, description: "Learning partner" },
      { name: "BiteWorks", Icon: Circle, description: "Food & Beverage partner" },
      { name: "TransitGo", Icon: Square, description: "Mobility partner" },
      { name: "Aura Lifestyle", Icon: Diamond, description: "Merchandise partner" },
      { name: "Vanguard Sec", Icon: Box, description: "Security partner" },
    ]
  }
];

export default function Sponsors() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-body-out">
      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-36 pb-24 lg:pt-48 lg:pb-32">
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-100" />
        
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:text-center max-w-4xl mx-auto"
          >
            <span className="eyebrow mb-6 inline-block">Partnered for Excellence</span>
            <h1 className="font-display text-5xl md:text-7xl xl:text-8xl font-black leading-[0.95] mb-8">
              OUR <span className="text-[hsl(var(--primary))]">SPONSORS.</span>
            </h1>
            <p className="text-[hsl(var(--muted-foreground))] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We extend our heartfelt gratitude to the incredible organizations driving INTERACT 2026 forward. Their support makes this techno-cultural fest a reality.
            </p>
          </motion.div>
        </div>

        {/* Diagonal Cut */}
        <div className="hero-cut" />
      </section>

      {/* ══ SPONSORS TIERS ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-[hsl(var(--card))]">
        <div className="container mx-auto px-6 max-w-7xl space-y-32">
          {sponsorTiers.map((tier, tIdx) => (
            <div key={tier.tierName} className="relative">
              {/* Tier Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 
                  className="font-display text-4xl md:text-5xl font-black tracking-tight uppercase"
                  style={{ color: tier.color }}
                >
                  {tier.tierName}
                </h2>
                <div 
                  className="h-1 w-24 mx-auto mt-6 rounded-full" 
                  style={{ backgroundColor: tier.color, opacity: 0.3 }} 
                />
              </motion.div>

              {/* Grid of Sponsors */}
              <div 
                className={`grid gap-8 ${
                  tier.sponsors.length === 1 
                    ? "grid-cols-1 max-w-3xl mx-auto" 
                    : tier.sponsors.length === 2 
                      ? "grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto" 
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {tier.sponsors.map((sponsor, sIdx) => {
                  const Icon = sponsor.Icon;
                  return (
                    <motion.div
                      key={sponsor.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: sIdx * 0.1 }}
                      className="cat-card p-10 rounded-[var(--radius)] border border-[hsl(var(--border))] flex flex-col items-center text-center relative overflow-hidden group hover:border-[hsl(var(--primary)/0.5)] transition-all duration-300"
                      style={{ backgroundColor: "hsl(var(--background))" }}
                    >
                      {/* Decorative Background Glow based on tier color */}
                      <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                        style={{ backgroundColor: tier.color }}
                      />

                      <div 
                        className="w-24 h-24 mb-8 flex items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundColor: tier.bg, color: tier.color }}
                      >
                        <Icon size={48} strokeWidth={1.5} />
                      </div>
                      
                      <h3 className="font-display text-2xl font-bold mb-4 tracking-tight text-[hsl(var(--foreground))]">
                        {sponsor.name}
                      </h3>
                      
                      <p className="text-base leading-relaxed text-[hsl(var(--muted-foreground))] max-w-[250px]">
                        {sponsor.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA SECTION ═════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[hsl(var(--background))] border-t border-[hsl(var(--border))] text-center relative overflow-hidden">
        {/* ghost year watermark */}
        <div
          className="font-display absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] whitespace-nowrap"
          style={{ fontSize: "clamp(100px, 15vw, 250px)" }}
          aria-hidden
        >
          PARTNER WITH US
        </div>

        <div className="container mx-auto px-6 max-w-2xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-[hsl(var(--foreground))]">
              Become a Sponsor
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-10 text-lg">
              Want to showcase your brand to thousands of tech enthusiasts and future leaders? 
              Partner with INTERACT 2026 and be a part of the biggest techno-cultural fest.
            </p>
            <Link
              href="/contactus"
              className="btn-primary inline-flex items-center gap-2"
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
