import React from "react";
import Navbar from "../components/Navbar";
import Footer from ".././components/Footer";
import "./globals.css";
import AuthContextProvider from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-provider";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Playfair_Display, Rajdhani, DM_Sans, JetBrains_Mono } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const rajdhani = Rajdhani({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-rajdhani" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata = {
  metadataBase: new URL("https://www.vtufestinteract.com"),
  title: {
    default: "Home - INTERACT 2026",
    template: "%s - INTERACT 2026",
  },
  description:
    "Join Global Academy of Technology for INTERACT 2026 – a celebration of innovation, creativity, and technology at one of the biggest college fests. Explore events, workshops, and performances designed for a memorable experience.",
  keywords: [
    "INTERACT 2026",
    "Global Academy of Technology",
    "gat fest 2026",
    "college fest",
    "tech fest",
    "university festival",
    "innovation",
    "creativity",
    "technology events",
  ],
  authors: [{ name: "Bhuvan S A", url: "https://www.bhuvansa.com/" }],
  creator: "Bhuvan S A",
  publisher: "Global Academy of Technology",
  openGraph: {
    url: "https://www.vtufestinteract.com",
    siteName: "INTERACT 2026",
    type: "website",
    title: "INTERACT 2026",
    description:
      "Join Global Academy of Technology for INTERACT 2026 – a celebration of innovation, creativity, and technology with events, workshops, and performances designed for an unforgettable experience.",
    images: [
      {
        url: "https://www.vtufestinteract.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "INTERACT 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INTERACT 2026",
    description:
      "Experience the best of innovation and creativity at INTERACT 2026 hosted by Global Academy of Technology.",
    site: "@vtufest2026",
    creator: "@bhuvansa",
    images: ["https://www.vtufestinteract.com/images/og-image.jpg"],
  },
};

// Global layout for pages
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${rajdhani.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body text-gat-charcoal bg-white antialiased">
        <ThemeProvider>
          <AuthContextProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
            <Toaster
              theme="light"
              toastOptions={{
                style: {
                  background: "#1a3a8b",
                  color: "#ffffff",
                  border: "1px solid #2362ec",
                },
              }}
            />
            <Footer />
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
