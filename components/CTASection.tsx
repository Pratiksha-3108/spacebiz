"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WA_HREF =
  "https://wa.me/917447447669?text=" +
  encodeURIComponent(
    "Hi, I am interested in commercial space at Jhamtani SpaceBiz Baner. Please share details and arrange a site visit."
  );

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Animate the tall image vertically so its full height (from tower crown down to ground base) scrolls through as user scrolls
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-48%"]);

  return (
    <section ref={sectionRef} className="sharp-cta-section" id="contact">
      <div className="sharp-cta-box">
        {/* Right-aligned architectural window with full-height scrolling tower animation */}
        <div className="sharp-cta-bg-wrap" aria-hidden="true">
          <motion.img
            src="/images/CTA_banner.webp"
            alt="Jhamtani SpaceBiz 150m Tower"
            className="sharp-cta-building-img"
            style={{ y }}
          />
        </div>

        <div className="sharp-cta-content">
          <h2 className="sharp-cta-title">
            Now Is The Time To Make<br />Smart Move
          </h2>

          <p className="sharp-cta-subtitle">
            Let Our Experts Help You Discover The Right Property That Matches Your Lifestyle, Needs, And Budget.
          </p>

          <div className="sharp-cta-actions">
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="sharp-cta-btn"
            >
              Explore Properties
            </a>
            <a href="tel:+917447447669" className="sharp-cta-call-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call +91 744 744 766 9</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
