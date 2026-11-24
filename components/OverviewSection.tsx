"use client";

import { motion } from "framer-motion";

export default function OverviewSection() {
  return (
    <section id="about" className="overview-luxury-section">
      <div className="wrap">
        <motion.div
          className="overview-content-box"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow with decorative feather motif */}
          <div className="overview-eyebrow-wrap">
            <span className="overview-eyebrow">OVERVIEW</span>
            <svg
              className="overview-feather-icon"
              width="24"
              height="24"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Delicate peacock feather motif matching Shri Vrinda */}
              <path
                d="M10 38C15 30 24 20 38 10"
                stroke="#6b4c3e"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              {/* Plume vanes */}
              <path
                d="M38 10C34 16 28 20 20 26C16 29 12 33 10 38C14 34 20 30 26 26C31 22 36 17 38 10Z"
                fill="url(#featherGrad)"
                opacity="0.85"
              />
              {/* Feather Eye */}
              <ellipse cx="33" cy="14" rx="5" ry="4" transform="rotate(-30 33 14)" fill="#1c5d5a" />
              <ellipse cx="33" cy="14" rx="3.2" ry="2.4" transform="rotate(-30 33 14)" fill="#a76a4c" />
              <circle cx="33" cy="14" r="1.3" fill="#143432" />
              <defs>
                <linearGradient id="featherGrad" x1="10" y1="38" x2="38" y2="10" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a76a4c" />
                  <stop offset="0.45" stopColor="#1e6b66" />
                  <stop offset="1" stopColor="#2e8580" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Main Title */}
          <h2 className="overview-title">A Destination Crafted For Discovery</h2>

          {/* Description Paragraph */}
          <p className="overview-desc">
            Discover Jhamtani SpaceBiz, a vibrant commercial landmark in the heart of Baner that blends convenience, luxury, and variety. Every corner is designed to spark experiences, elevate lifestyle, and celebrate community, making it a destination where every visit leaves a lasting impression.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
