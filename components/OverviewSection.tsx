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
          {/* Eyebrow */}
          <div className="overview-eyebrow-wrap">
            <span className="overview-eyebrow">OVERVIEW</span>
          </div>

          {/* Main Title */}
          <h2 className="overview-title">A Destination Crafted For Discovery</h2>

          {/* Description Paragraph */}
          <p className="overview-desc">
            Discover Jhamtani SpaceBiz, a vibrant commercial landmark in the heart of Baner that blends convenience, luxury, and variety. Every corner is designed to spark experiences, elevate lifestyle, and celebrate community, making it a destination where every visit leaves a lasting impression.
          </p>

          {/* High-conversion Action Buttons */}
          <div className="overview-cta-row">
            <a href="#contact" className="btn solid overview-btn">
              Download Brochure
            </a>
            <a href="#contact" className="btn overview-btn">
              Schedule a Site Visit
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
