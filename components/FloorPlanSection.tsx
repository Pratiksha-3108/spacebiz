"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FloorPlanItem {
  id: string;
  category: "retail" | "terrace" | "corporate";
  categoryLabel: string;
  floor: string;
  tag: string;
  title: string;
  subtitle: string;
  reraCarpet: string;
  totalArea: string;
  dimensions: string;
  featureBadge: string;
  units: string;
  blueprintType: "retail" | "terrace" | "office";
}

const keyFloorPlans: FloorPlanItem[] = [
  {
    id: "ug-retail",
    category: "retail",
    categoryLabel: "Retail & Showroom",
    floor: "Upper Ground Floor",
    tag: "High Street Retail",
    title: "Upper Ground Floor Plan",
    subtitle: "Flagship anchor showrooms with grand double-height entrance on Baner Road",
    reraCarpet: "4,947 sq.ft. combined",
    totalArea: "UG-01: 3,370 sq.ft. | UG-02: 1,577 sq.ft.",
    dimensions: 'UG-01: 94\'1" × 30\'4" | UG-02: 65\'1" × 20\'3"',
    featureBadge: "Double-Height Baner Frontage",
    units: "Shops UG-01 & UG-02",
    blueprintType: "retail",
  },
  {
    id: "floor-11-terrace",
    category: "terrace",
    categoryLabel: "Executive Terrace Suite",
    floor: "11th Floor (Executive Suite)",
    tag: "Sky Terrace Suite",
    title: "11th Floor Executive Plan",
    subtitle: "Full-floor corporate plate with an expansive 468 sq.ft. open-to-sky terrace deck",
    reraCarpet: "8,361 sq.ft. (777 sq.m.)",
    totalArea: "9,308 sq.ft. (incl. 468 sq.ft. terrace)",
    dimensions: '100\'3" × 48\'11" (AVG)',
    featureBadge: "468 sq.ft. Private Open Terrace",
    units: "Office 1101 (Exclusive Full Plate)",
    blueprintType: "terrace",
  },
  {
    id: "highrise-15-29",
    category: "corporate",
    categoryLabel: "Corporate Tower Plate",
    floor: "Typical 15th to 29th Floors",
    tag: "High-Rise Tower Suite",
    title: "Typical 15th - 29th Tower Plan",
    subtitle: "Grade A corporate floor plates with panoramic 360° Pune skyline views",
    reraCarpet: "6,541 sq.ft. (608 sq.m.)",
    totalArea: "7,028 sq.ft. (incl. 487 sq.ft. AHU)",
    dimensions: '104\'11" × 38\'8" (AVG)',
    featureBadge: "12 High-Rise Corporate Floors",
    units: "Offices 1501 to 2901",
    blueprintType: "office",
  },
];

function BlueprintGraphic({ type }: { type: FloorPlanItem["blueprintType"] }) {
  if (type === "retail") {
    return (
      <div className="fp-blueprint-art fp-blueprint-retail">
        <svg viewBox="0 0 320 180" className="fp-svg" fill="none" stroke="currentColor">
          {/* Frontage Zone */}
          <rect x="20" y="20" width="280" height="140" rx="4" strokeWidth="1.5" />
          {/* Shop 1 */}
          <rect x="25" y="25" width="180" height="130" strokeWidth="1" opacity="0.7" />
          {/* Shop 2 */}
          <rect x="210" y="25" width="85" height="130" strokeWidth="1" opacity="0.7" />
          {/* Double height frontage indicator */}
          <line x1="25" y1="150" x2="295" y2="150" stroke="#a76a4c" strokeWidth="3" />
          <text x="160" y="165" textAnchor="middle" fontSize="8" fill="#a76a4c" stroke="none" fontWeight="600" letterSpacing="1.2">
            MAIN BANER ROAD FRONTAGE (4.2M HT)
          </text>
          <text x="115" y="90" textAnchor="middle" fontSize="10" fill="currentColor" stroke="none" opacity="0.8" letterSpacing="0.5">
            SHOWROOM / RETAIL 01
          </text>
          <text x="252" y="90" textAnchor="middle" fontSize="10" fill="currentColor" stroke="none" opacity="0.8" letterSpacing="0.5">
            RETAIL 02
          </text>
          {/* Entry Arrows */}
          <path d="M115 142 L115 132 M112 135 L115 132 L118 135" stroke="#a76a4c" strokeWidth="1.2" />
          <path d="M252 142 L252 132 M249 135 L252 132 L255 135" stroke="#a76a4c" strokeWidth="1.2" />
        </svg>
      </div>
    );
  }

  if (type === "terrace") {
    return (
      <div className="fp-blueprint-art fp-blueprint-terrace">
        <svg viewBox="0 0 320 180" className="fp-svg" fill="none" stroke="currentColor">
          {/* Outer Boundary */}
          <rect x="20" y="20" width="280" height="140" rx="4" strokeWidth="1.5" />
          {/* Main Office Plate */}
          <rect x="25" y="25" width="200" height="130" strokeWidth="1" opacity="0.6" />
          {/* Terrace Deck (Patterned) */}
          <rect x="230" y="25" width="65" height="130" strokeWidth="1.5" stroke="#a76a4c" fill="rgba(167, 106, 76, 0.08)" />
          <line x1="230" y1="25" x2="295" y2="155" stroke="#a76a4c" strokeWidth="0.8" opacity="0.3" />
          <line x1="295" y1="25" x2="230" y2="155" stroke="#a76a4c" strokeWidth="0.8" opacity="0.3" />
          {/* Central Lift Core */}
          <rect x="80" y="60" width="90" height="60" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <text x="125" y="94" textAnchor="middle" fontSize="9" fill="currentColor" stroke="none" opacity="0.75" letterSpacing="1">
            CORE & LIFTS
          </text>
          <text x="262" y="94" textAnchor="middle" fontSize="8" fill="#a76a4c" stroke="none" fontWeight="600" letterSpacing="0.8">
            OPEN SKY TERRACE
          </text>
          <text x="70" y="44" fontSize="8" fill="currentColor" stroke="none" opacity="0.6">
            OFFICE SUITE
          </text>
          {/* Dimension tick marks */}
          <line x1="20" y1="12" x2="300" y2="12" strokeWidth="0.8" opacity="0.4" />
          <line x1="20" y1="8" x2="20" y2="16" strokeWidth="0.8" opacity="0.4" />
          <line x1="300" y1="8" x2="300" y2="16" strokeWidth="0.8" opacity="0.4" />
        </svg>
      </div>
    );
  }

  // High-rise office plate
  return (
    <div className="fp-blueprint-art fp-blueprint-office">
      <svg viewBox="0 0 320 180" className="fp-svg" fill="none" stroke="currentColor">
        <rect x="20" y="20" width="280" height="140" rx="4" strokeWidth="1.5" />
        {/* Core lifts & stairs */}
        <rect x="110" y="45" width="100" height="90" strokeWidth="1.2" strokeDasharray="3 2" fill="rgba(167, 106, 76, 0.04)" />
        <text x="160" y="85" textAnchor="middle" fontSize="9" fill="currentColor" stroke="none" opacity="0.8" letterSpacing="1">
          LIFT LOBBY & STAIRS
        </text>
        <text x="160" y="105" textAnchor="middle" fontSize="8" fill="#a76a4c" stroke="none" opacity="0.85">
          AHU & SERVICES
        </text>
        {/* Workstation layout indicators */}
        <line x1="35" y1="45" x2="95" y2="45" strokeWidth="0.8" opacity="0.4" />
        <line x1="35" y1="90" x2="95" y2="90" strokeWidth="0.8" opacity="0.4" />
        <line x1="35" y1="135" x2="95" y2="135" strokeWidth="0.8" opacity="0.4" />
        <line x1="225" y1="45" x2="285" y2="45" strokeWidth="0.8" opacity="0.4" />
        <line x1="225" y1="90" x2="285" y2="90" strokeWidth="0.8" opacity="0.4" />
        <line x1="225" y1="135" x2="285" y2="135" strokeWidth="0.8" opacity="0.4" />
        <text x="65" y="93" textAnchor="middle" fontSize="8" fill="currentColor" stroke="none" opacity="0.6">
          WING A
        </text>
        <text x="255" y="93" textAnchor="middle" fontSize="8" fill="currentColor" stroke="none" opacity="0.6">
          WING B
        </text>
      </svg>
    </div>
  );
}

export default function FloorPlanSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const displayedPlans =
    activeFilter === "all"
      ? keyFloorPlans
      : keyFloorPlans.filter((p) => p.category === activeFilter);

  const handleEnquire = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-enquire-modal"));
    }
  };

  return (
    <section id="floor-plans" className="floorplan-luxury-section">
      {/* Background Subtle Luxury Architectural Grid */}
      <div className="floorplan-bg-grid" aria-hidden="true" />

      <div className="wrap floorplan-container">
        {/* Section Header */}
        <div className="floorplan-header">
          <span className="floorplan-eyebrow">ARCHITECTURAL BLUEPRINTS</span>
          <h2 className="floorplan-title">Floor Plans & Layouts</h2>
          <p className="floorplan-sub">
            Carefully curated layouts for retail, corporate terrace suites, and high-rise enterprise plates, engineered for maximum efficiency and daylight.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="floorplan-tabs-bar">
          <div className="floorplan-tabs-scroll">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`floorplan-tab-btn ${activeFilter === "all" ? "is-active" : ""}`}
            >
              <span>All 3 Key Formats</span>
              <span className="floorplan-tab-badge">3</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("retail")}
              className={`floorplan-tab-btn ${activeFilter === "retail" ? "is-active" : ""}`}
            >
              <span>Retail & Showroom</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("terrace")}
              className={`floorplan-tab-btn ${activeFilter === "terrace" ? "is-active" : ""}`}
            >
              <span>Executive Terrace Suite</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("corporate")}
              className={`floorplan-tab-btn ${activeFilter === "corporate" ? "is-active" : ""}`}
            >
              <span>Corporate Tower Plate</span>
            </button>
          </div>
        </div>

        {/* 3 Floor Plans Grid */}
        <div className="floorplan-cards-grid floorplan-3-grid">
          {displayedPlans.map((plan, idx) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="floorplan-card"
            >
              {/* Card Top / Header */}
              <div className="floorplan-card-top">
                <div className="floorplan-card-tag-row">
                  <span className="floorplan-card-tag">{plan.tag}</span>
                  <span className="floorplan-card-floor">{plan.floor}</span>
                </div>
                <h3 className="floorplan-card-heading">{plan.title}</h3>
                <p className="floorplan-card-subtitle">{plan.subtitle}</p>
              </div>

              {/* Card Blueprint Art / Graphic */}
              <div className="floorplan-card-visual">
                <BlueprintGraphic type={plan.blueprintType} />
                <div className="floorplan-card-visual-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>{plan.featureBadge}</span>
                </div>
              </div>

              {/* Card Specifications Table */}
              <div className="floorplan-card-specs">
                <div className="floorplan-spec-item">
                  <span className="floorplan-spec-label">RERA Carpet Area</span>
                  <span className="floorplan-spec-val highlight-copper">{plan.reraCarpet}</span>
                </div>
                <div className="floorplan-spec-item">
                  <span className="floorplan-spec-label">Total Usable Area</span>
                  <span className="floorplan-spec-val">{plan.totalArea}</span>
                </div>
                <div className="floorplan-spec-item">
                  <span className="floorplan-spec-label">Dimensions</span>
                  <span className="floorplan-spec-val">{plan.dimensions}</span>
                </div>
                <div className="floorplan-spec-item">
                  <span className="floorplan-spec-label">Inventory Units</span>
                  <span className="floorplan-spec-val">{plan.units}</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="floorplan-card-footer">
                <button
                  type="button"
                  onClick={handleEnquire}
                  className="floorplan-btn-primary btn-enquire"
                >
                  <span>Request Floor Plan PDF</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleEnquire}
                  className="floorplan-btn-secondary"
                >
                  Enquire Details
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
