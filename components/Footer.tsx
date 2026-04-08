"use client";

import Image from "next/image";
import Link from "next/link";
import insta from "@/public/images/flogo2.png";
import yt from "@/public/images/flogo1.png";
import linkedin from "@/public/images/flogo4.png";

const Footer = () => {
  return (
    <footer className="bg-gat-midnight text-white pt-16 pb-24 md:pb-8 border-t border-gat-cobalt/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-heading font-bold text-3xl tracking-wide">
                <span className="text-white">GAT</span>{" "}
                <span className="text-gat-gold">INTERACT</span>
              </span>
            </div>
            
            <p className="text-sm text-gat-steel font-body leading-relaxed pr-4">
              Join Global Academy of Technology for INTERACT 2026 – a celebration of innovation, creativity, and technology. Where Code Meets Culture.
            </p>
            
            {/* Social icons */}
            <div className="flex items-center gap-4">
              {[
                { href: "https://www.linkedin.com", img: linkedin, alt: "LinkedIn" },
                { href: "https://www.instagram.com", img: insta, alt: "Instagram" },
                { href: "https://www.youtube.com", img: yt, alt: "YouTube" },
              ].map(({ href, img, alt }) => (
                <a
                  key={alt}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={alt}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gat-gold hover:border-gat-gold transition-all duration-300 group"
                >
                  <Image
                    src={img}
                    alt={alt}
                    width={18}
                    height={18}
                    className="brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:invert-0 group-hover:brightness-100 transition-all"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg text-white mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-3 font-body text-sm">
              <li>
                <Link href="/" className="text-gat-steel hover:text-gat-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-gat-steel hover:text-gat-gold transition-colors">About GAT</Link>
              </li>
              <li>
                <Link href="/sponsors" className="text-gat-steel hover:text-gat-gold transition-colors">Sponsors</Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gat-steel hover:text-gat-gold transition-colors">Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Events */}
          {/* <div>
            <h3 className="font-heading font-bold text-lg text-white mb-6 tracking-wide">Events</h3>
            <ul className="space-y-3 font-body text-sm">
              <li>
                <Link href="/events?category=technical" className="text-gat-steel hover:text-gat-gold transition-colors">Technical Events</Link>
              </li>
              <li>
                <Link href="/events?category=cultural" className="text-gat-steel hover:text-gat-gold transition-colors">Cultural Events</Link>
              </li>
              <li>
                <Link href="/events?category=workshop" className="text-gat-steel hover:text-gat-gold transition-colors">Workshops</Link>
              </li>
              <li>
                <Link href="/events?category=gaming" className="text-gat-steel hover:text-gat-gold transition-colors">Gaming</Link>
              </li>
              <li>
                <Link href="/schedule" className="text-gat-steel hover:text-gat-gold transition-colors">Full Schedule</Link>
              </li>
            </ul>
          </div> */}

          {/* Column 4: Legal & Contact */}
          <div>
            <h3 className="font-heading font-bold text-lg text-white mb-6 tracking-wide">Legal</h3>
            <ul className="space-y-3 font-body text-sm mb-8">
              <li>
                <Link href="/privacy-policy" className="text-gat-steel hover:text-gat-gold transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-services" className="text-gat-steel hover:text-gat-gold transition-colors">Terms of Service</Link>
              </li>
            </ul>
            
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-widest border border-gat-steel/20 bg-white/5 text-gat-steel hover:text-white hover:border-gat-gold hover:bg-gat-gold/10 rounded-lg transition-all duration-200"
            >
              ↑ Back to Top
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gat-cobalt/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gat-steel font-body">
            Copyright © 2026 Global Academy of Technology · All Rights Reserved.
          </p>
          <p className="text-xs text-gat-steel font-body">
            Developed with ♥ by the Interact 2026 Website Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
