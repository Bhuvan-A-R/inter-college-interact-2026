"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

interface GalleryClientProps {
  images: string[];
}

export default function GalleryClient({ images }: GalleryClientProps) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // Close lightbox
  const closeLightbox = () => setSelectedImg(null);

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
            <span className="eyebrow mb-6 inline-block">Moments Captured</span>
            <h1 className="font-display text-5xl md:text-7xl xl:text-8xl font-black leading-[0.95] mb-8">
              OUR <span className="text-[hsl(var(--primary))]">GALLERY.</span>
            </h1>
            <p className="text-[hsl(var(--muted-foreground))] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Take a look back at the electrifying moments and unforgettable experiences from our past events.
            </p>
          </motion.div>
        </div>

        {/* Diagonal Cut */}
        <div className="hero-cut" />
      </section>

      {/* ══ MASONRY GALLERY ═════════════════════════════════════════════════ */}
      <section className="py-20 bg-[hsl(var(--card))] min-h-[50vh]">
        <div className="container mx-auto px-6 max-w-7xl">
          {images.length === 0 ? (
            <div className="text-center py-20">
              <div className="cat-card p-10 max-w-lg mx-auto rounded-[var(--radius)]">
                <h3 className="text-2xl font-display font-bold mb-3 text-[hsl(var(--foreground))]">
                  Gallery is Empty
                </h3>
                <p className="text-[hsl(var(--muted-foreground))]">
                  We haven't uploaded any photos yet. Check back soon for exciting updates!
                </p>
              </div>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (i % 6) * 0.1 }}
                  className="break-inside-avoid relative group overflow-hidden rounded-2xl cursor-pointer"
                  onClick={() => setSelectedImg(img)}
                >
                  <img
                    src={`/gallery/${img}`}
                    alt={`Gallery Image ${i + 1}`}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <ZoomIn size={24} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ LIGHTBOX ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white bg-black/50 p-2 rounded-full backdrop-blur-md transition-colors z-[101]"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-full max-h-full flex justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`/gallery/${selectedImg}`}
                alt="Selected"
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
