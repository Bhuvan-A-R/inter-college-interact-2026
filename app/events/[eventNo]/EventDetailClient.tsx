"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Phone, Clock, Trophy, Share2, AlertCircle, ArrowRight } from "lucide-react";
import { EventCategory } from "@/data/eventCategories";
import { EventList } from "@/data/eventList";
import { motion } from "framer-motion";

interface Props {
  category: EventCategory;
  details: EventList[];
}

const getColorForCategory = (category: string) => {
  const map: Record<string, { bg: string, text: string, split: string }> = {
    THEATRE: { bg: "bg-gat-blue", text: "text-gat-blue", split: "gat-blue" },
    DANCE: { bg: "bg-gat-gold", text: "text-gat-gold", split: "gat-gold" },
    MUSIC: { bg: "bg-gat-navy", text: "text-gat-navy", split: "gat-navy" },
    FASHION: { bg: "bg-gat-cobalt", text: "text-gat-cobalt", split: "gat-cobalt" },
    LITERARY: { bg: "bg-gat-dark-gold", text: "text-gat-dark-gold", split: "gat-dark-gold" },
    FINE_ARTS: { bg: "bg-gat-blue", text: "text-gat-blue", split: "gat-blue" },
    GENERAL_EVENTS: { bg: "bg-gat-gold", text: "text-gat-gold", split: "gat-gold" },
  };
  return map[category] || { bg: "bg-gat-charcoal", text: "text-gat-charcoal", split: "gat-charcoal" };
};

export default function EventDetailClient({ category, details }: Props) {
  const colors = getColorForCategory(category.category);
  const hasDetails = details.length > 0;
  const mainDetail = hasDetails ? details[0] : null;

  const [activeAccordion, setActiveAccordion] = useState<string | null>("description");

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gat-off-white font-body pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Top Nav row ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-bold text-gat-steel hover:text-gat-blue transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Events
          </Link>

          <div className="flex items-center gap-3">
            {/* <button className="p-2 text-gat-steel hover:text-gat-blue bg-white rounded-lg border border-gat-blue/10 shadow-sm transition-colors">
              <Share2 className="w-4 h-4" />
            </button> */}
            {/* <Link
              href="/register"
              className="px-4 py-2 text-sm font-bold bg-gat-blue text-white rounded-lg hover:bg-gat-midnight transition-colors shadow-sm"
            >
              Register →
            </Link> */}
            <button
  onClick={() => window.location.href = '/auth/signin'}
  className="btn-gold"
  style={{ cursor: "pointer" }}
>
  Login / Register
  <ArrowRight size={16} />
</button>

          </div>
        </div>

        {/* ── Header ───────────────────────────────────────────────────────────── */}
        <header className="bg-white p-8 md:p-10 rounded-2xl border border-gat-blue/10 shadow-card mb-8 relative overflow-hidden">
          {/* Top accent line */}
          <div className={`absolute top-0 inset-x-0 h-1.5 ${colors.bg}`} />
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-2.5 py-1 rounded-md text-xs font-heading font-bold tracking-widest uppercase bg-opacity-10 border border-opacity-20 ${colors.text} ${colors.bg.replace('bg-', 'bg-')}/10 border-${colors.split}/20`}>
              {category.category.replace(/_/g, " ")}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-heading font-bold tracking-widest uppercase bg-gat-off-white border border-gat-steel/20 text-gat-steel">
              {category.maxParticipant > 1 ? `TEAM (${category.maxParticipant})` : "SOLO"}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-heading font-bold tracking-widest uppercase bg-gat-off-white border border-gat-steel/20 text-gat-steel">
              Event #{String(category.eventNo).padStart(2, "0")}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-black text-gat-midnight leading-tight mb-2">
            {category.eventName}
          </h1>
          <p className="text-gat-steel text-sm md:text-base font-medium">
            Part of the {category.category.replace(/_/g, " ")} lineup
          </p>
        </header>

        {/* ── Grid Layout ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Meta & Actions */}
          {/* <div className="lg:col-span-1 space-y-6">
            
            // Prize Pool 
            <div className="bg-white p-6 rounded-2xl border border-gat-blue/10 shadow-sm">
              <h3 className="flex items-center gap-2 text-gat-midnight font-bold font-heading text-lg mb-4">
                <Trophy className="w-5 h-5 text-gat-gold" /> Prize Pool
              </h3>
              
              <div className="flex items-center justify-between p-3 bg-gat-gold/10 rounded-lg border border-gat-gold/20 mb-3">
                <span className="font-bold text-gat-midnight">1st Prize 🥇</span>
                <span className="font-mono font-bold text-lg text-gat-dark-gold">
                  {category.amount ? `₹${category.amount}` : "TBD"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gat-steel/10 rounded-lg border border-gat-steel/20">
                <span className="font-bold text-gat-charcoal">2nd Prize 🥈</span>
                <span className="font-mono font-bold text-lg text-gat-charcoal">
                  TBD
                </span>
              </div>
            </div>

            // Registration Progress 
            <div className="bg-white p-6 rounded-2xl border border-gat-blue/10 shadow-sm">
              <h3 className="flex items-center gap-2 text-gat-midnight font-bold font-heading text-lg mb-4">
                <Users className="w-5 h-5 text-gat-blue" /> Registration Form
              </h3>
              
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-gat-steel font-bold">Seats Left</span>
                <span className="font-mono font-bold text-gat-midnight">
                  {category.maxParticipant} Teams Total
                </span>
              </div>
              <div className="w-full h-2 bg-gat-steel/20 rounded-full overflow-hidden mb-6">
                <div className="bg-gat-blue h-full w-[25%]" />
              </div>

              <Link
                href="/register"
                className="block w-full text-center py-3 bg-gat-gold text-gat-midnight font-black rounded-lg hover:bg-gat-dark-gold transition-colors shadow-gold"
              >
                Register Now →
              </Link>
            </div>
          </div> */}

          {/* RIGHT COLUMN: Details & Accordions */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gat-blue/10 shadow-sm">
              <h2 className="text-2xl font-bold font-heading text-gat-midnight mb-6 border-b border-gat-blue/5 pb-4">
                About This Event
              </h2>

              {/* Accordion Group */}
              <div className="space-y-4">
                
                {/* Description */}
                <div className="border border-gat-steel/20 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => toggleAccordion("description")}
                    className="w-full flex items-center justify-between p-4 bg-gat-off-white hover:bg-gat-blue/5 transition-colors font-bold text-gat-midnight"
                  >
                    Description & Guidelines
                    <span className="text-gat-steel">{activeAccordion === "description" ? "−" : "+"}</span>
                  </button>
                  {activeAccordion === "description" && (
                    <div className="p-5 bg-white text-gat-charcoal text-sm leading-relaxed border-t border-gat-steel/10">
                      {hasDetails ? (
                        <div className="space-y-4">
                          {details.map((detail, idx) => (
                            <div key={idx} className="space-y-3">
                              {details.length > 1 && <h4 className="font-bold text-gat-midnight">{detail.name}</h4>}
                              <ol className="list-decimal pl-5 space-y-2">
                                {detail.rules.map((rule, ridx) => <li key={ridx}>{rule}</li>)}
                              </ol>
                            </div>
                          ))}
                        </div>
                      ) : (
                         <div className="flex items-center gap-3 text-gat-steel">
                           <AlertCircle className="w-5 h-5" />
                           Detailed rules will be announced shortly.
                         </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Coordinators */}
                <div className="border border-gat-steel/20 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => toggleAccordion("coordinators")}
                    className="w-full flex items-center justify-between p-4 bg-gat-off-white hover:bg-gat-blue/5 transition-colors font-bold text-gat-midnight"
                  >
                    Contact Coordinators
                    <span className="text-gat-steel">{activeAccordion === "coordinators" ? "−" : "+"}</span>
                  </button>
                  {activeAccordion === "coordinators" && (
                    <div className="p-5 bg-white text-gat-charcoal text-sm leading-relaxed border-t border-gat-steel/10">
                      {mainDetail && (mainDetail.coordinator || (mainDetail.coordinators && mainDetail.coordinators.length > 0)) ? (
                        <div className="grid sm:grid-cols-2 gap-4">
                          {mainDetail.coordinator && (
                            <div className="flex items-start gap-4 p-4 border border-gat-blue/10 rounded-lg hover:border-gat-blue/30 transition-colors bg-gat-off-white">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${colors.bg}`}>
                                <Users className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-bold text-gat-midnight">{mainDetail.coordinator.name}</p>
                                <a href={`tel:${mainDetail.coordinator.mobile.replace(/\s/g, "")}`} className="flex items-center gap-1.5 text-xs text-gat-blue hover:underline mt-1">
                                  <Phone className="w-3 h-3" /> {mainDetail.coordinator.mobile}
                                </a>
                              </div>
                            </div>
                          )}
                          {mainDetail.coordinators && mainDetail.coordinators.map((coord, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 border border-gat-blue/10 rounded-lg hover:border-gat-blue/30 transition-colors bg-gat-off-white">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${colors.bg}`}>
                                <Users className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-bold text-gat-midnight">{coord.name}</p>
                                <a href={`tel:${coord.mobile.replace(/\s/g, "")}`} className="flex items-center gap-1.5 text-xs text-gat-blue hover:underline mt-1">
                                  <Phone className="w-3 h-3" /> {coord.mobile}
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gat-steel italic">Coordinator info pending.</p>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
