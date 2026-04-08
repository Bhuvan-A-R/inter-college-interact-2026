"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import interactLogo from "@/public/gat-logos/INTERACT2K26.png";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { categories, marqueeItems } from "@/data/homeData";
import ParticlesBackground from "@/components/ParticlesBackground";

/* ─────────────────────────────────────────────
    COUNT-UP HOOK
───────────────────────────────────────────── */
function useCountUp(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(ease(p) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return { count, ref };
}

function StatItem({
  to,
  label,
  prefix = "",
  suffix = "+",
}: {
  to: number;
  label: string;
  prefix?: string;
  suffix?: string;
}) {
  const { count, ref } = useCountUp(to);
  return (
    <div className="flex flex-col gap-1">
      <span
        ref={ref}
        className="font-display text-5xl md:text-6xl font-extrabold leading-none"
        style={{ color: "hsl(var(--secondary))" }}
      >
        {prefix}
        {count}
        {suffix}
      </span>
      <span
        className="text-xs uppercase tracking-[0.22em] font-semibold"
        style={{ color: "hsl(var(--muted))" }}
      >
        {label}
      </span>
    </div>
  );
}

function Marquee() {
  const repeated = [...marqueeItems, ...marqueeItems];
  return (
    <div
      className="overflow-hidden py-3 border-y"
      style={{
        borderColor: "hsl(var(--border))",
        background: "hsl(var(--secondary) / 0.05)",
      }}
    >
      <ParticlesBackground />
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 26s linear infinite;
          display: flex;
          width: max-content;
        }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-3 px-6">
            <span
              className="text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: "hsl(var(--foreground) / 0.5)" }}
            >
              {item}
            </span>
            <span style={{ color: "hsl(var(--secondary))", fontSize: 9 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
    PAGE
───────────────────────────────────────────── */
export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
      }}
    >

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden min-h-screen flex flex-col justify-center pt-24 pb-32"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 60% 35%, hsl(var(--primary) / 0.09) 0%, transparent 65%),
            radial-gradient(ellipse 45% 45% at 5% 85%,  hsl(var(--secondary) / 0.07) 0%, transparent 55%),
            hsl(var(--background))
          `,
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        {/* dot grid */}
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-100" />

        {/* ghost year watermark */}
        <div
          className="absolute top-[12%] select-none pointer-events-none transition-all duration-500 max-[550px]:left-1/2 max-[550px]:-translate-x-1/2 max-[550px]:opacity-[0.05] min-[551px]:right-[-2%] min-[551px]:opacity-[0.9]"
          style={{ width: "clamp(280px, 40vw, 700px)" }}
          aria-hidden
        >
          <Image
            src={interactLogo}
            alt="Interact Logo Watermark"
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 w-full">
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span className="pill-badge mb-8 inline-flex">
              Global Academy of Technology Presents
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            className="font-display leading-[0.92] mb-5"
            style={{
              // Reduced from clamp(2.5rem, 8vw, 6.5rem)
              fontSize: "clamp(2rem, 6vw, 5rem)",
              letterSpacing: "-0.02em",
              color: "hsl(var(--foreground))",
            }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            NATIONAL LEVEL
            <br />
            <span style={{ color: "hsl(var(--primary))" }}>INTER-COLLEGIATE</span>
            <br />
            <span
              style={{
                WebkitTextStroke: "1.5px hsl(var(--secondary))", // Slightly thinner stroke for smaller text
                color: "transparent",
              }}
            >
              EVENTS 2026
            </span>
          </motion.h1>

          {/* tagline */}
          <motion.p
            className="font-mono-jb text-sm uppercase tracking-[0.28em] mb-12"
            style={{ color: "hsl(var(--muted))" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            Inter-collegiate Event <br /> Registration Portal
          </motion.p>

          {/* stats */}
          <motion.div
            className="stats-row flex flex-wrap gap-y-8 mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StatItem to={categories.reduce((acc, c) => acc + c.count, 0)} label="Events" />
            <StatItem to={3} label="Days" />
            <StatItem to={1000} label="Participants" />
            {/* <div className="flex flex-col gap-1">
              <span
                className="font-display text-5xl md:text-4xl font-extrabold leading-none"
                style={{ color: "hsl(var(--secondary))" }}
              >
                ₹2L+
              </span>
              <span
                className="text-xs uppercase tracking-[0.22em] font-semibold"
                style={{ color: "hsl(var(--muted))" }}
              >
                Prize Pool
              </span>
            </div> */}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3 mb-10"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.52 }}
          >
            <Link href="/events" className="btn-primary">
              Explore Events <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* meta */}
          <motion.div
            className="flex flex-wrap items-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.68 }}
          >
            <span
              className="font-mono-jb text-xs flex items-center gap-2"
              style={{ color: "hsl(var(--muted))" }}
            >
              <Calendar size={12} />
              May 13–15, 2026
            </span>
            <span
              className="w-px h-3"
              style={{ background: "hsl(var(--border))" }}
            />
            <span
              className="font-mono-jb text-xs flex items-center gap-2"
              style={{ color: "hsl(var(--muted))" }}
            >
              <MapPin size={12} />
              GAT Campus, Bengaluru
            </span>
          </motion.div>
        </div>

        {/* diagonal cut to next section */}
        <div className="hero-cut" />
      </section>

      {/* ══ MARQUEE ══════════════════════════════════════════════════════ */}
      <Marquee />

      {/* ══ CATEGORIES ═══════════════════════════════════════════════════ */}
      <section
        className="py-28"
        style={{ background: "hsl(var(--card))", fontFamily: "'Outfit', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="eyebrow">{categories.reduce((acc, c) => acc + c.count, 0)} events across {categories.length} domains</span>
              <h2
                className="font-display text-5xl md:text-6xl font-black leading-[0.95]"
                style={{ color: "hsl(var(--foreground))" }}
              >
                CHOOSE YOUR
                <br />
                <span style={{ color: "hsl(var(--primary))" }}>DOMAIN</span>
              </h2>
            </div>
            <p
              className="text-base leading-relaxed md:max-w-xs"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              From high-stakes hackathons to mesmerizing musical performances — find your stage.
            </p>
          </div>

          {/* cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08, duration: 0.42 }}
                >
                  <Link
                    href={`/events?category=${cat.name.toLowerCase()}`}
                    className="cat-card group block rounded-[var(--radius)] p-6"
                    style={{
                      background: "hsl(var(--background))",
                      border: `1px solid ${cat.accentBorder}`,
                      textDecoration: "none",
                    }}
                  >
                    {/* icon box */}
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                      style={{ background: cat.accentLight, color: cat.accent }}
                    >
                      <Icon size={22} />
                    </div>

                    {/* name */}
                    <h3
                      className="font-display text-2xl font-bold mb-1 tracking-tight"
                      style={{ color: "hsl(var(--foreground))" }}
                    >
                      {cat.name}
                    </h3>

                    {/* count */}
                    <p
                      className="font-mono-jb text-xs mb-4"
                      style={{ color: cat.accent, fontWeight: 500 }}
                    >
                      {cat.count} events
                    </p>

                    {/* tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {cat.tags.map((t) => (
                        <span key={t} className="tag-chip">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* arrow reveal */}
                    <div
                      className="flex items-center gap-1 mt-5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ color: cat.accent }}
                    >
                      Browse events <ArrowRight size={12} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ SCHEDULE ═════════════════════════════════════════════════════ */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: "hsl(var(--background))", fontFamily: "'Outfit', sans-serif" }}
      >
        {/* ghost watermark */}
        <div
          className="font-display absolute left-[-2%] bottom-[4%] font-black leading-none select-none pointer-events-none"
          style={{
            fontSize: "clamp(90px,14vw,170px)",
            color: "hsl(var(--primary) / 0.1)",
            letterSpacing: "-0.02em",
          }}
          aria-hidden
        >
          INTERACT
        </div>
        {/* ghost watermark */}
        <div
          className="font-display absolute right-[-2%] top-[4%] font-black leading-none select-none pointer-events-none"
          style={{
            fontSize: "clamp(90px,14vw,170px)",
            color: "hsl(var(--primary) / 0.1)",
            letterSpacing: "-0.02em",
          }}
          aria-hidden
        >
          2K26
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

            {/* left col — sticky */}
            <div className="lg:sticky lg:top-28">
              <span className="eyebrow">The Itinerary</span>
              <h2
                className="font-display text-5xl md:text-6xl font-black leading-[0.93] mb-6"
                style={{ color: "hsl(var(--foreground))" }}
              >
                3 DAYS.
                <br />
                {categories.reduce((acc, c) => acc + c.count, 0)}+ EVENTS.
                <br />
                <span style={{ color: "hsl(var(--primary))" }}>YOUR CALL.</span>
              </h2>
              <p
                className="text-base leading-relaxed mb-8 max-w-sm"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                Plan your days ahead to make the most of INTERACT 2026. Every slot is a story — pick yours.
              </p>
              <button
                disabled
                className="btn-primary"
                style={{ opacity: 1, cursor: "not-allowed", pointerEvents: "none" }}
              >
                Full Schedule  ( Coming Soon... )
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ═══════════════════════════════════════════════════ */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 80% 80% at 50% 50%, hsl(var(--primary) / 0.12) 0%, transparent 70%),
            hsl(var(--accent))
          `,
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <span
            className="font-mono-jb text-xs uppercase tracking-[0.22em] mb-4 block"
            style={{ color: "hsl(var(--secondary))" }}
          >
            Registration are Live Now.
          </span>
          <h2
            className="font-display text-4xl md:text-6xl font-black leading-[0.93] mb-6"
            style={{ color: "hsl(var(--accent-foreground))" }}
          >
            READY TO
            <br />
            <span style={{ color: "hsl(var(--secondary))" }}>INTERACT?</span>
          </h2>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "hsl(var(--accent-foreground) / 0.6)" }}
          >
            Join 1000+ students across {categories.reduce((acc, c) => acc + c.count, 0)}+ events. Just bring your best game.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              disabled
              className="btn-gold"
              style={{ opacity: 1, cursor: "not-allowed", pointerEvents: "none" }}
            >
              Register Now ( Coming Soon... )
            </button>
            <Link
              href="/events"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.04em",
                borderRadius: "var(--radius)",
                background: "transparent",
                color: "hsl(var(--accent-foreground) / 0.8)",
                border: "1.5px solid hsl(var(--accent-foreground) / 0.2)",
                cursor: "pointer",
                textDecoration: "none",
                fontFamily: "'Outfit', sans-serif",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              Browse All Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}