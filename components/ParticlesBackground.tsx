"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music, Code, Cpu, Palette, Sparkles, Zap, Mic, Trophy } from "lucide-react";

const colors = ["text-gat-blue", "text-gat-gold", "text-gat-cobalt", "text-gat-navy", "text-slate-400"];
const icons = [Music, Code, Cpu, Palette, Sparkles, Zap, Mic, Trophy];

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  iconIndex: number;
  rotation: number;
}

const ParticlesBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleCount = 25;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 16 + 12, // 12px to 28px
      duration: Math.random() * 25 + 20, // 20s to 45s
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      iconIndex: Math.floor(Math.random() * icons.length),
      rotation: Math.random() * 360,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-10]">
      {/* Solid White Background */}
      <div className="absolute inset-0 bg-white" />
      {/* Light subtle grid for texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#8b97b6_1px,transparent_1px)] opacity-[1] [background-size:24px_24px]" />
      
      {/* Animated Particles */}
      {particles.map((p) => {
        const IconComponent = icons[p.iconIndex];
        return (
          <motion.div
            key={p.id}
            className={`absolute ${p.color} opacity-40`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -(Math.random() * 200 + 100), 0],
              x: [0, Math.random() * 150 - 75, 0],
              scale: [1, Math.random() * 0.5 + 1, 1],
              opacity: [0, 0.6, 0],
              rotate: [p.rotation, p.rotation + 180, p.rotation + 360],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          >
            <IconComponent size={p.size} strokeWidth={1.5} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ParticlesBackground;
