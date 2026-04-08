"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Filter } from "lucide-react";
import { events } from "@/data/scheduleInterDepartment";

// ── Track config ──────────────────────────────────────────────────────────────
const TRACKS = [
  { label: "25-04-2026", dateKey: "25th April", trackNo: 1, color: "#f87171", bg: "rgba(248,113,113,0.15)", border: "rgba(248,113,113,0.35)" },
  { label: "09-05-2026", dateKey: "9th May",    trackNo: 2, color: "#c084fc", bg: "rgba(192,132,252,0.15)", border: "rgba(192,132,252,0.35)" },
  { label: "11-05-2026", dateKey: "11th May",   trackNo: 3, color: "#60a5fa", bg: "rgba(96,165,250,0.15)",  border: "rgba(96,165,250,0.35)"  },
  { label: "12-05-2026", dateKey: "12th May",   trackNo: 4, color: "#4ade80", bg: "rgba(74,222,128,0.15)", border: "rgba(74,222,128,0.35)"  },
];

const DOMAIN_COLORS: Record<string, string> = {
  THEATRE:          "#f97316",
  DANCE:            "#a855f7",
  MUSIC:            "#00f2ff",
  FASHION:          "#f43f5e",
  LITERARY:         "#22d3ee",
  "FINE ARTS":      "#84cc16",
  "GENERAL EVENTS": "#fbbf24",
};

function trackForDate(dateKey: string) {
  return TRACKS.find((t) => t.dateKey === dateKey);
}

const ALL_DOMAINS = ["All", ...Array.from(new Set(events.map((e) => e.domain)))];

export default function SchedulePage() {
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [activeDomain, setActiveDomain] = useState("All");

  const filtered = events.filter((e) => {
    const track = trackForDate(e.date);
    const matchTrack = activeTrack === null || track?.trackNo === activeTrack;
    const matchDomain = activeDomain === "All" || e.domain === activeDomain;
    return matchTrack && matchDomain;
  });

  return (
    <div className="relative min-h-screen bg-[#020202]">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 65%)" }}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <header className="relative z-10 py-20 md:py-28 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.p
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-[#00f2ff]/60 mb-4"
          >
            INTERACT 2K26 · Global Academy of Technology
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="silver-text text-6xl md:text-8xl font-black tracking-tighter mb-5"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            Schedule
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/40 text-lg max-w-xl mx-auto"
          >
            Four tracks. Forty-one events. One unforgettable fest.
          </motion.p>
        </div>
        <div className="mt-10 h-px max-w-sm mx-auto bg-gradient-to-r from-transparent via-[#00f2ff]/30 to-transparent" />
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* ── Section heading ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-1 h-10 rounded-full bg-gradient-to-b from-[#00f2ff] to-[#8b5cf6]" />
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-0.5">Event Category</p>
            <h2 className="text-2xl md:text-3xl font-black text-white/90" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Inter Department Events
            </h2>
          </div>
        </motion.div>

        {/* ── Track filter pills ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-5"
        >
          <button
            onClick={() => setActiveTrack(null)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200"
            style={{
              background: activeTrack === null ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
              borderColor: activeTrack === null ? "rgba(255,255,255,0.30)" : "rgba(255,255,255,0.10)",
              color: activeTrack === null ? "#fff" : "rgba(255,255,255,0.45)",
            }}
          >
            All Tracks
          </button>
          {TRACKS.map((t) => (
            <button
              key={t.trackNo}
              onClick={() => setActiveTrack(activeTrack === t.trackNo ? null : t.trackNo)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200"
              style={{
                background: activeTrack === t.trackNo ? t.bg : "rgba(255,255,255,0.04)",
                borderColor: activeTrack === t.trackNo ? t.border : "rgba(255,255,255,0.08)",
                color: activeTrack === t.trackNo ? t.color : "rgba(255,255,255,0.45)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.color }} />
              Track {t.trackNo} · {t.label}
            </button>
          ))}
        </motion.div>

        {/* ── Domain filter pills ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <Filter className="w-3.5 h-3.5 text-white/25 self-center" />
          {ALL_DOMAINS.map((d) => {
            const dc = d === "All" ? "#ffffff" : DOMAIN_COLORS[d] ?? "#ffffff";
            const active = activeDomain === d;
            return (
              <button
                key={d}
                onClick={() => setActiveDomain(d)}
                className="px-3 py-1 rounded-full text-[11px] font-semibold border transition-all duration-200"
                style={{
                  background: active ? `${dc}18` : "transparent",
                  borderColor: active ? `${dc}50` : "rgba(255,255,255,0.08)",
                  color: active ? dc : "rgba(255,255,255,0.35)",
                }}
              >
                {d}
              </button>
            );
          })}
        </motion.div>

        {/* ── Table ────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.015)" }}
        >
          {/* Table header */}
          <div
            className="grid text-[10px] font-bold tracking-widest uppercase text-white/35 border-b"
            style={{
              gridTemplateColumns: "3rem 1fr 8rem 9rem 9rem 11rem",
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
              padding: "0.75rem 1.25rem",
            }}
          >
            <span>#</span>
            <span>Event</span>
            <span>Domain</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Date</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Time</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />Venue</span>
          </div>

          {/* Table body */}
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-white/30 text-sm">
              No events match the selected filters.
            </div>
          ) : (
            filtered.map((ev, idx) => {
              const track = trackForDate(ev.date);
              const domainColor = DOMAIN_COLORS[ev.domain] ?? "#ffffff";
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={ev.eventId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(idx * 0.018, 0.4) }}
                  className="grid items-center border-b last:border-b-0 transition-colors duration-150 hover:bg-white/[0.025]"
                  style={{
                    gridTemplateColumns: "3rem 1fr 8rem 9rem 9rem 11rem",
                    borderColor: "rgba(255,255,255,0.05)",
                    background: isEven ? "transparent" : "rgba(255,255,255,0.012)",
                    padding: "0.85rem 1.25rem",
                    gap: "0.5rem",
                  }}
                >
                  {/* # */}
                  <span className="text-[11px] font-bold text-white/25">
                    {String(ev.eventId).padStart(2, "0")}
                  </span>

                  {/* Event name */}
                  <span className="text-sm font-semibold text-white/85 leading-snug pr-4">
                    {ev.eventName}
                  </span>

                  {/* Domain */}
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase"
                    style={{ color: domainColor }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: domainColor }} />
                    {ev.domain}
                  </span>

                  {/* Date — track pill */}
                  {track ? (
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border w-fit"
                      style={{ background: track.bg, borderColor: track.border, color: track.color }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: track.color }} />
                      {track.label}
                    </span>
                  ) : (
                    <span className="text-xs text-white/30">{ev.date}</span>
                  )}

                  {/* Time */}
                  <span className="text-xs text-white/50">{ev.timings}</span>

                  {/* Venue */}
                  <span className="text-xs text-white/40 leading-snug">{ev.venue}</span>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* Result count */}
        <p className="mt-4 text-xs text-white/25 text-right">
          Showing {filtered.length} of {events.length} events
        </p>

        {/* Legend */}
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          {TRACKS.map((t) => (
            <span
              key={t.trackNo}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold border"
              style={{ background: t.bg, borderColor: t.border, color: t.color }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: t.color }} />
              {t.label} — Event Track {t.trackNo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
