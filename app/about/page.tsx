"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import gat from "@/components/images/gat1.jpg";

// Credential images
import affiliationImg from "@/components/images/affiliation.png";
import aicteImg from "@/components/images/aicte.png";
import recognizedImg from "@/components/images/recognized.png";

const About = () => {
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
            <span className="eyebrow mb-6 inline-block">Global Academy Of Technology</span>
            <h1 className="font-display text-5xl md:text-7xl xl:text-8xl font-black leading-[0.95] mb-8">
              ABOUT <span className="text-[hsl(var(--primary))]">GAT.</span>
            </h1>
            <p className="text-[hsl(var(--muted-foreground))] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              A legacy of academic excellence, innovation, and transformative education marking its Silver Jubilee.
            </p>
          </motion.div>
        </div>

        {/* Diagonal Cut */}
        <div className="hero-cut" />
      </section>

      {/* ══ CONTENT ═══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[hsl(var(--card))]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Image Section */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 relative"
            >
              {/* Decorative background shape */}
              <div className="absolute inset-0 bg-[hsl(var(--secondary))]/20 rounded-2xl -translate-x-4 translate-y-4 -z-10" />
              <Image
                src={gat}
                alt="Global Academy of Technology"
                className="w-full h-auto max-h-[550px] object-cover rounded-2xl shadow-2xl shadow-[hsl(var(--foreground))]/5 border border-[hsl(var(--border))]"
                priority
              />
            </motion.div>

            {/* Text Section */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2 space-y-6"
            >
              <h2 className="font-display text-3xl font-bold text-[hsl(var(--foreground))] mb-4">
                Inspiring Futures Since 2001
              </h2>
              <p className="text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
                Global Academy of Technology (GAT), <strong className="text-[hsl(var(--foreground))]">established in 2001</strong>, is one of the most sought-after engineering and management colleges in Bengaluru, Karnataka. Nestled within a sprawling 10-acre campus, GAT provides an ideal environment for students to excel academically amidst an atmosphere of innovation and optimism.
              </p>
              <p className="text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
                This year <strong className="text-[hsl(var(--secondary))]">2026</strong> marks a momentous milestone as the institution celebrates its <strong className="text-[hsl(var(--primary))]">Silver Jubilee – 25 years</strong> of academic excellence, innovation, and transformative education. With a legacy of shaping future leaders and achievers, GAT continues to set benchmarks in higher education, solidifying its position as a premier destination for aspiring engineers and managers.
              </p>
              <p className="text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
                GAT offers ample opportunities for various co-curricular and extracurricular activities, ensuring a well-rounded student experience. The campus is home to over <strong className="text-[hsl(var(--foreground))]">3,500 students</strong> and <strong className="text-[hsl(var(--foreground))]">300 experienced staff members</strong> dedicated to an effective teaching and learning process.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ CREDENTIALS ════════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden bg-[hsl(var(--background))] border-t border-[hsl(var(--border))]">
        {/* watermark */}
        <div
          className="font-display absolute left-[-5%] bottom-[5%] font-black leading-none select-none pointer-events-none opacity-[0.03]"
          style={{ fontSize: "clamp(120px, 20vw, 300px)" }}
          aria-hidden
        >
          TRUST
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="md:text-center mb-20">
            <span className="eyebrow inline-block">Excellence Recognized</span>
            <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95] text-[hsl(var(--foreground))]">
              OUR <span className="text-[hsl(var(--primary))]">CREDENTIALS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Credential 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="cat-card p-10 rounded-[var(--radius)] bg-[hsl(var(--card))] border border-[hsl(var(--border))] flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="h-32 flex items-center justify-center mb-8">
                <Image src={affiliationImg} alt="VTU Affiliation" width={110} height={110} className="object-contain drop-shadow-sm" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 tracking-tight text-[hsl(var(--foreground))]">
                University Affiliation
              </h3>
              <p className="text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
                Affiliated with <strong className="text-[hsl(var(--primary))]">Visvesvaraya Technological University (VTU)</strong>, Belagavi, Karnataka, since 2001. This ensures our curriculum meets modern industry standards.
              </p>
            </motion.div>

            {/* Credential 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="cat-card p-10 rounded-[var(--radius)] bg-[hsl(var(--card))] border border-[hsl(var(--border))] flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="h-32 flex items-center justify-center mb-8">
                <Image src={aicteImg} alt="AICTE Approval" width={110} height={110} className="object-contain drop-shadow-sm" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 tracking-tight text-[hsl(var(--foreground))]">
                Approved by AICTE
              </h3>
              <p className="text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
                All programs offered by the college have been approved by the <strong className="text-[hsl(var(--primary))]">All India Council for Technical Education (AICTE)</strong>, ensuring adherence to high education standards.
              </p>
            </motion.div>

            {/* Credential 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="cat-card p-10 rounded-[var(--radius)] bg-[hsl(var(--card))] border border-[hsl(var(--border))] flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="h-32 flex items-center justify-center mb-8">
                <Image src={recognizedImg} alt="Govt Recognised" width={110} height={110} className="object-contain drop-shadow-sm" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 tracking-tight text-[hsl(var(--foreground))]">
                Govt. Recognized
              </h3>
              <p className="text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
                Our cutting-edge programs are strictly recognized by the <strong className="text-[hsl(var(--primary))]">Government of Karnataka</strong>, guaranteeing that our courses meet national benchmarks.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER CTA ═════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[hsl(var(--card))] border-t border-[hsl(var(--border))] text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="font-display text-3xl font-bold mb-6 text-[hsl(var(--foreground))]">
            Discover More About GAT
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] mb-8">
            Experience our vibrant campus, explore academic alliances, and visualize your future at one of Bengaluru&apos;s premier institutions.
          </p>
          <a
            href="http://www.gat.ac.in"
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex"
          >
            Visit Official Website <ArrowRight size={16} />
          </a>
        </div>
      </section>

    </div>
  );
};

export default About;
