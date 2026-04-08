import { Clapperboard, Music, Mic, Shirt, BookOpen, Palette, Star } from "lucide-react";

export const categories = [
  {
    name: "Theatre",
    count: 4,
    icon: Clapperboard,
    accent: "hsl(221 82% 55%)",
    accentLight: "hsl(221 82% 55% / 0.08)",
    accentBorder: "hsl(221 82% 55% / 0.2)",
    tags: ["Mimicry", "Skit", "Mime"],
  },
  {
    name: "Dance",
    count: 7,
    icon: Music,
    accent: "hsl(46 90% 51%)",
    accentLight: "hsl(46 90% 51% / 0.08)",
    accentBorder: "hsl(46 90% 51% / 0.25)",
    tags: ["Solo", "Group", "Battle"],
  },
  {
    name: "Music",
    count: 7,
    icon: Mic,
    accent: "hsl(224 68% 30%)",
    accentLight: "hsl(224 68% 30% / 0.08)",
    accentBorder: "hsl(224 68% 30% / 0.2)",
    tags: ["Voice of GAT", "Instrumental", "Classical"],
  },
  {
    name: "Fashion",
    count: 4,
    icon: Shirt,
    accent: "hsl(258 70% 55%)",
    accentLight: "hsl(258 70% 55% / 0.08)",
    accentBorder: "hsl(258 70% 55% / 0.25)",
    tags: ["Ramp Walk", "Solo", "Group"],
  },
  {
    name: "Literary",
    count: 5,
    icon: BookOpen,
    accent: "hsl(38 90% 46%)",
    accentLight: "hsl(38 90% 46% / 0.08)",
    accentBorder: "hsl(38 90% 46% / 0.22)",
    tags: ["Debate", "Elocution", "Poetry"],
  },
  {
    name: "Fine Arts",
    count: 7,
    icon: Palette,
    accent: "hsl(12 76% 50%)",
    accentLight: "hsl(12 76% 50% / 0.08)",
    accentBorder: "hsl(12 76% 50% / 0.22)",
    tags: ["Painting", "Rangoli", "Photography"],
  },
  {
    name: "General",
    count: 7,
    icon: Star,
    accent: "hsl(197 70% 45%)",
    accentLight: "hsl(197 70% 45% / 0.08)",
    accentBorder: "hsl(197 70% 45% / 0.22)",
    tags: ["Cooking", "Quiz", "Face Painting"],
  },
];

export const marqueeItems = [
  "Mimicry", "Dance Battle", "Voice of GAT", "Ramp Walk", "Debate",
  "Painting", "Photography", "Quiz", "Mime", "Skit",
];
