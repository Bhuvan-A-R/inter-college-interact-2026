"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

import { spocsData } from "@/data/spocsData";

export default function SpocsPage() {
  return (
    <div
      className="min-h-screen relative overflow-hidden pb-32"
      style={{
        background: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Background gradients and particles */}
      <ParticlesBackground />
      <div className="dot-grid absolute inset-0 pointer-events-none opacity-50 transition-opacity duration-500" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 0%, hsl(var(--primary) / 0.1) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 80% 100%, hsl(var(--secondary) / 0.08) 0%, transparent 60%)
          `,
        }}
      />

      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pt-32 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="pill-badge mb-6 inline-flex uppercase tracking-widest text-xs font-bold">
            Meet the Team
          </span>
          <h1
            className="font-display text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight"
            style={{ color: "hsl(var(--foreground))" }}
          >
            DEPARTMENT <span style={{ color: "hsl(var(--primary))" }}>SPOCS</span>
          </h1>
          <p
            className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Reach out to your respective department Single Point of Contacts (SPOCs) for event
            registrations, specific queries, and internal coordination for INTERACT 2K26.
          </p>
        </motion.div>
      </div>

      {/* Grid Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {spocsData.map((spoc, index) => (
            <motion.div
              key={spoc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group rounded-[var(--radius)] overflow-hidden relative"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              {/* Card top banner/gradient */}
              <div
                className="h-24 w-full"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)/0.2), hsl(var(--secondary)/0.1))",
                  borderBottom: "1px solid hsl(var(--border))",
                }}
              />

              {/* Avatar */}
              <div className="relative flex justify-center -mt-12 mb-4">
                <div
                  className="w-24 h-24 rounded-full overflow-hidden border-[4px]"
                  style={{ borderColor: "hsl(var(--card))", background: "hsl(var(--muted))" }}
                >
                  <Image
                    src={spoc.photo}
                    alt={spoc.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Text content */}
              <div className="px-6 pb-8 text-center">
                <h3
                  className="font-display text-2xl font-bold mb-1 tracking-wide"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {spoc.name}
                </h3>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {spoc.department}
                </p>

                <div
                  className="w-12 h-1 mx-auto rounded-full mb-6"
                  style={{ background: "hsl(var(--primary) / 0.3)" }}
                />

                {/* Contact Details */}
                <div className="flex flex-col gap-3 items-center text-sm font-medium">
                  <a
                    href={`tel:${spoc.phone}`}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    <Phone size={16} style={{ color: "hsl(var(--secondary))" }} />
                    {spoc.phone}
                  </a>
                  <a
                    href={`mailto:${spoc.email}`}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    <Mail size={16} style={{ color: "hsl(var(--secondary))" }} />
                    {spoc.email}
                  </a>
                </div>
              </div>

              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: "inset 0 0 0 1px hsl(var(--primary) / 0.5)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
