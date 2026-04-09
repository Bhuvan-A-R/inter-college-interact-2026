"use client";

import React, { useState, useMemo } from "react";
import { Search, Trophy, ChevronRight } from "lucide-react";
import { eventCategories } from "@/data/eventCategories";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Helper to assign brand colors to categories
const getColorForCategory = (category: string) => {
  const map: Record<string, { bg: string, text: string, border: string }> = {
    THEATRE: { bg: "bg-gat-blue", text: "text-gat-blue", border: "border-gat-blue" },
    DANCE: { bg: "bg-gat-gold", text: "text-gat-gold", border: "border-gat-gold" },
    MUSIC: { bg: "bg-gat-navy", text: "text-gat-navy", border: "border-gat-navy" },
    FASHION: { bg: "bg-gat-cobalt", text: "text-gat-cobalt", border: "border-gat-cobalt" },
    LITERARY: { bg: "bg-gat-dark-gold", text: "text-gat-dark-gold", border: "border-gat-dark-gold" },
    FINE_ARTS: { bg: "bg-gat-blue", text: "text-gat-blue", border: "border-gat-blue" },
    GENERAL_EVENTS: { bg: "bg-gat-gold", text: "text-gat-gold", border: "border-gat-gold" },
  };
  return map[category] || { bg: "bg-gat-charcoal", text: "text-gat-charcoal", border: "border-gat-charcoal" };
};

const EventPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  // Derive unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(eventCategories.map((e) => e.category)));
    return ["ALL", ...cats];
  }, []);

  // Filter events
  const filteredEvents = useMemo(() => {
    return eventCategories.filter((e) => {
      const matchesSearch = e.eventName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "ALL" || e.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-gat-off-white font-body pt-12">
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gat-blue/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gat-steel mb-2 flex items-center gap-2">
            <Link href="/" className="hover:text-gat-blue transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gat-blue">Events</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-black text-gat-midnight mb-6">
            Browse Events
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gat-steel" />
            </div>
            <input
              type="text"
              placeholder="Search all events... (e.g., Debate, Dance)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-4 rounded-xl border border-gat-blue/20 bg-gat-off-white focus:bg-white focus:ring-2 focus:ring-gat-blue focus:border-transparent transition-all outline-none text-gat-charcoal font-medium placeholder-gat-steel/70"
            />
          </div>
        </div>
      </header>

      {/* ── Tabs & Grid ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Category Tabs */}
        <div className="flex overflow-x-auto scrollbar-none gap-2 pb-6 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const count = cat === "ALL" ? eventCategories.length : eventCategories.filter(e => e.category === cat).length;
            
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap flex items-center gap-2 px-5 py-2.5 rounded-lg font-heading uppercase tracking-wide text-sm font-bold border-b-2 transition-all ${
                  isActive
                    ? "bg-gat-cobalt text-white border-gat-gold shadow-[0_4px_24px_rgba(35,98,236,0.18)]"
                    : "bg-white text-gat-steel border-transparent hover:text-gat-charcoal hover:bg-gat-blue/5"
                }`}
              >
                {cat.replace(/_/g, " ")}
                <span className={`px-2 py-0.5 rounded-md text-xs ${isActive ? "bg-white/20 text-white" : "bg-gat-off-white text-gat-steel"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Event Grid */}
        {filteredEvents.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.05 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event) => {
                const colors = getColorForCategory(event.category);
                
                return (
                  <motion.div
                    layout
                    key={event.eventNo}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={`/events/${event.eventNo}`} className="block h-full">
                      <div className="group h-full relative bg-white border border-gat-blue/10 rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(27,58,139,0.04)] hover:shadow-[0_8px_32px_rgba(35,98,236,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
                        
                        {/* Top Color Bar */}
                        <div className={`h-[4px] w-full ${colors.bg}`} />

                        <div className="p-5 flex flex-col flex-grow">
                          {/* Badges */}
                          <div className="flex gap-2 mb-4">
                            <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-heading font-bold uppercase tracking-widest bg-opacity-10 border border-opacity-20 ${colors.text} ${colors.bg.replace('bg-', 'bg-')}/10 ${colors.border.replace('border-', 'border-')}/20`}>
                              {event.category.replace(/_/g, " ")}
                            </span>
                            <span className="inline-flex px-2 py-1 rounded-md text-[10px] font-heading font-bold uppercase tracking-widest bg-gat-off-white border border-gat-steel/20 text-gat-steel group-hover:border-gat-blue/30 transition-colors">
                              {event.maxParticipant > 1 ? `TEAM (${event.maxParticipant})` : "SOLO"}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-heading text-xl font-bold text-gat-midnight group-hover:text-gat-blue transition-colors leading-snug mb-3">
                            {event.eventName}
                          </h3>

                          {/* Footer Info */}
                          <div className="mt-auto pt-4 border-t border-gat-blue/5 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-gat-dark-gold">
                              {/* <Trophy className="w-4 h-4" /> */}
                              <span className="font-mono text-sm font-bold">
                                {event.amount ? `₹${event.amount}` : "FREE"}
                              </span>
                            </div>
                            <span className="text-[10px] font-bold text-gat-steel uppercase tracking-widest bg-gat-off-white px-2 py-1 rounded-md">
                              #{String(event.eventNo).padStart(2, "0")}
                            </span>
                          </div>
                        </div>

                        {/* Hover Slide-up Action */}
                        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gat-blue p-3 flex justify-center">
                          <span className="text-white text-sm font-bold tracking-wide flex items-center gap-2">
                            View Details <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-24 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gat-steel/10 mb-4">
              <Search className="w-8 h-8 text-gat-steel" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-gat-midnight mb-2">No events found</h3>
            <p className="text-gat-charcoal">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("ALL"); }}
              className="mt-6 px-6 py-2 bg-gat-blue text-white rounded-lg font-bold hover:bg-gat-midnight transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;