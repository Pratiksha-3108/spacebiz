"use client";

import { motion } from "framer-motion";

interface HighlightPillar {
  id: string;
  num: number;
  text: string;
}

const pillars: HighlightPillar[] = [
  {
    id: "p1",
    num: 1,
    text: "Design-led, Efficiency-first Boutique & Enterprise Offices",
  },
  {
    id: "p2",
    num: 2,
    text: "Commanding 150-Metre Skyline Presence Across 37 Floors",
  },
  {
    id: "p3",
    num: 3,
    text: "Exclusive Private Floor Plates for Composed Workspaces",
  },
  {
    id: "p4",
    num: 4,
    text: "New-Age Automated Parking System for Seamless Everyday Access",
  },
  {
    id: "p5",
    num: 5,
    text: "Prime Baner Road Corridor with High-Speed Metro Connectivity & Modern Infrastructure",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function ProjectHighlights() {
  return (
    <section id="highlights" className="vj-highlights-section">
      <div className="vj-highlights-overlay" />

      <div className="wrap vj-highlights-container">
        {/* Section Heading matching VJ Indiworks style */}
        <motion.div
          className="vj-highlights-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="vj-highlights-title">HIGHLIGHTS</h2>
          <p className="vj-highlights-sub">
            Showcasing The Key Pillars Of Our Real Estate Services
          </p>
        </motion.div>

        {/* 5 Cards Grid: Row 1 has 3 cards, Row 2 has 2 centered cards */}
        <div className="vj-cards-grid">
          {/* Row 1: Cards 1, 2, 3 */}
          <div className="vj-cards-row vj-row-top">
            {pillars.slice(0, 3).map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                className="vj-card-wrapper"
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={cardVariants}
              >
                <div className="vj-card">
                  <div className="vj-card-icon">
                    <span>{pillar.num}</span>
                  </div>
                  <p className="vj-card-text">{pillar.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Row 2: Cards 4, 5 (Centered) */}
          <div className="vj-cards-row vj-row-bottom">
            {pillars.slice(3, 5).map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                className="vj-card-wrapper"
                custom={idx + 3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={cardVariants}
              >
                <div className="vj-card">
                  <div className="vj-card-icon">
                    <span>{pillar.num}</span>
                  </div>
                  <p className="vj-card-text">{pillar.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
