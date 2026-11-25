"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloorPlanCategory {
  id: string;
  tabLabel: string;
  tag: string;
  scaleLabel: string;
  carpetArea: string;
  startingPrice: string;
  floorLevel: string;
  type: "retail" | "commercial1" | "parking" | "corporate" | "refuge";
}

const categories: FloorPlanCategory[] = [
  {
    id: "cat-ground-retail",
    tabLabel: "Ground Retail",
    tag: "A • GROUND RETAIL • TYPICAL FLOOR PLAN",
    scaleLabel: "SCALE 1 : 100 • MAHARERA APPROVED",
    carpetArea: "1,259 – 4,947 sq.ft.",
    startingPrice: "₹ 1.45 Cr*",
    floorLevel: "Lower & Upper Ground",
    type: "retail",
  },
  {
    id: "cat-1st-floor",
    tabLabel: "1st Floor Commercial",
    tag: "B • 1ST FLOOR COMMERCIAL • TYPICAL PLAN",
    scaleLabel: "SCALE 1 : 100 • MAHARERA APPROVED",
    carpetArea: "3,120 – 6,450 sq.ft.",
    startingPrice: "₹ 1.15 Cr*",
    floorLevel: "1st Floor Level",
    type: "commercial1",
  },
  {
    id: "cat-parking",
    tabLabel: "Multi-Level Parking",
    tag: "C • VEHICULAR & ROBOTIC PARKING PLAN",
    scaleLabel: "SCALE 1 : 150 • AUTOMATED ACCESS",
    carpetArea: "250+ Stalls Capacity",
    startingPrice: "Robotic & Two-Wheeler",
    floorLevel: "2nd, 3rd, 4th & Robotic",
    type: "parking",
  },
  {
    id: "cat-corporate-offices",
    tabLabel: "Corporate Offices (5th–9th)",
    tag: "D • CORPORATE BARE-SHELL • TYPICAL PLAN",
    scaleLabel: "SCALE 1 : 100 • MAHARERA APPROVED",
    carpetArea: "7,651 – 7,961 sq.ft.",
    startingPrice: "₹ 79.95 Lacs*",
    floorLevel: "5th, 7th, 8th & 9th Floors",
    type: "corporate",
  },
  {
    id: "cat-refuge-offices",
    tabLabel: "Refuge Floor Offices (6th & 10th)",
    tag: "E • SAFETY REFUGE FLOOR • TYPICAL PLAN",
    scaleLabel: "SCALE 1 : 100 • MAHARERA APPROVED",
    carpetArea: "7,146 – 7,455 sq.ft.",
    startingPrice: "₹ 89.95 Lacs*",
    floorLevel: "6th & 10th Floors",
    type: "refuge",
  },
];

/* ========================================================
   Architectural Floor Plan CAD Blueprints for All 5 Categories
   ======================================================== */
function CadBlueprintRenderer({ type }: { type: FloorPlanCategory["type"] }) {
  if (type === "retail") {
    // Ground Retail (Upper & Lower Ground)
    return (
      <svg viewBox="0 0 540 330" className="floorplan-cad-svg" fill="none" stroke="currentColor">
        <defs>
          <pattern id="gridRetail" width="22" height="22" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="22" y2="0" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="0" y2="22" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="540" height="330" fill="url(#gridRetail)" />

        {/* Outer Perimeter */}
        <polygon points="30,30 510,55 450,295 30,295" strokeWidth="2.4" stroke="#222" />
        <polygon points="36,36 502,59 444,289 36,289" strokeWidth="1" stroke="#555" opacity="0.5" />

        {/* North Compass */}
        <g transform="translate(485, 60)">
          <circle cx="0" cy="0" r="14" stroke="#333" strokeWidth="0.8" fill="#fff" />
          <polygon points="0,-12 3,0 0,-3 -3,0" fill="#222" />
          <polygon points="0,12 3,0 0,3 -3,0" fill="#999" opacity="0.6" />
          <text x="0" y="-15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#222">N</text>
        </g>

        {/* Baner Road Frontage */}
        <line x1="36" y1="289" x2="444" y2="289" stroke="#a76a4c" strokeWidth="3.5" />
        <text x="240" y="315" textAnchor="middle" fontSize="8.5" fill="#a76a4c" fontWeight="700" letterSpacing="0.08em">
          BANER ROAD GRAND DOUBLE-HEIGHT RETAIL FRONTAGE (4.2M HEIGHT)
        </text>

        {/* Columns Grid */}
        {[65, 175, 285, 395].map((cx) =>
          [60, 165, 270].map((cy) => (
            <rect key={`col-ret-${cx}-${cy}`} x={cx - 5} y={cy - 5} width="10" height="10" fill="#111" stroke="#000" />
          ))
        )}

        {/* Shop UG-01 */}
        <rect x="55" y="55" width="230" height="150" strokeWidth="1.2" stroke="#444" strokeDasharray="4 2" fill="rgba(0,0,0,0.015)" />
        <text x="170" y="125" textAnchor="middle" fontSize="11" fontWeight="700" fill="#222">SHOP UG-01 (FLAGSHIP RETAIL)</text>
        <text x="170" y="145" textAnchor="middle" fontSize="8.5" fill="#a76a4c" fontWeight="600">RERA: 3,370 SQ.FT.</text>
        <text x="170" y="162" textAnchor="middle" fontSize="8" fill="#777">DIM: 94&apos;1&quot; × 30&apos;4&quot;</text>

        {/* Shop UG-02 */}
        <rect x="310" y="65" width="125" height="140" strokeWidth="1.2" stroke="#444" strokeDasharray="4 2" fill="rgba(0,0,0,0.015)" />
        <text x="372" y="125" textAnchor="middle" fontSize="11" fontWeight="700" fill="#222">SHOP UG-02</text>
        <text x="372" y="145" textAnchor="middle" fontSize="8.5" fill="#a76a4c" fontWeight="600">RERA: 1,577 SQ.FT.</text>
        <text x="372" y="162" textAnchor="middle" fontSize="8" fill="#777">DIM: 65&apos;1&quot; × 20&apos;3&quot;</text>

        {/* Entrance Foyer & Drop-off */}
        <rect x="55" y="215" width="380" height="45" stroke="#999" strokeWidth="0.8" fill="rgba(167, 106, 76, 0.04)" />
        <text x="245" y="242" textAnchor="middle" fontSize="8" fontWeight="600" fill="#555">PEDESTRIAN PLAZA & RETAIL ENTRY CONCOURSE</text>
      </svg>
    );
  }

  if (type === "commercial1") {
    // 1st Floor Commercial
    return (
      <svg viewBox="0 0 540 330" className="floorplan-cad-svg" fill="none" stroke="currentColor">
        <defs>
          <pattern id="gridComm1" width="22" height="22" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="22" y2="0" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="0" y2="22" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="540" height="330" fill="url(#gridComm1)" />

        {/* Outer Perimeter */}
        <polygon points="30,30 510,55 450,295 30,295" strokeWidth="2.4" stroke="#222" />
        <polygon points="36,36 502,59 444,289 36,289" strokeWidth="1" stroke="#555" opacity="0.5" />

        {/* North Compass */}
        <g transform="translate(485, 60)">
          <circle cx="0" cy="0" r="14" stroke="#333" strokeWidth="0.8" fill="#fff" />
          <polygon points="0,-12 3,0 0,-3 -3,0" fill="#222" />
          <polygon points="0,12 3,0 0,3 -3,0" fill="#999" opacity="0.6" />
          <text x="0" y="-15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#222">N</text>
        </g>

        {/* Commercial Suite 101 */}
        <rect x="55" y="60" width="180" height="150" strokeWidth="1.4" stroke="#333" fill="rgba(0,0,0,0.02)" />
        <text x="145" y="125" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#222">COMMERCIAL SUITE 101</text>
        <text x="145" y="145" textAnchor="middle" fontSize="8.5" fill="#a76a4c" fontWeight="600">3,120 SQ.FT. CARPET</text>

        {/* Commercial Suite 102 */}
        <rect x="255" y="60" width="180" height="150" strokeWidth="1.4" stroke="#333" fill="rgba(0,0,0,0.02)" />
        <text x="345" y="125" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#222">COMMERCIAL SUITE 102</text>
        <text x="345" y="145" textAnchor="middle" fontSize="8.5" fill="#a76a4c" fontWeight="600">3,330 SQ.FT. CARPET</text>

        {/* Central Lifts & Service Core */}
        <rect x="180" y="225" width="140" height="55" stroke="#a76a4c" strokeWidth="1.5" fill="rgba(167, 106, 76, 0.07)" />
        <text x="250" y="250" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#a76a4c">CENTRAL LOBBY & HIGH SPEED ELEVATORS</text>
        <text x="250" y="265" textAnchor="middle" fontSize="7.5" fill="#666">DIRECT ESCALATOR LINK FROM GROUND</text>
      </svg>
    );
  }

  if (type === "parking") {
    // 2nd, 3rd, 4th & Robotic Parking
    return (
      <svg viewBox="0 0 540 330" className="floorplan-cad-svg" fill="none" stroke="currentColor">
        <defs>
          <pattern id="gridPark" width="22" height="22" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="22" y2="0" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="0" y2="22" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="540" height="330" fill="url(#gridPark)" />

        {/* Boundary */}
        <polygon points="30,30 510,55 450,295 30,295" strokeWidth="2.4" stroke="#222" />
        <polygon points="36,36 502,59 444,289 36,289" strokeWidth="1" stroke="#555" opacity="0.5" />

        {/* Parking Bays Grid */}
        {[70, 110, 150, 190, 230, 270, 310, 350, 390].map((bx) => (
          <g key={`park-bay-${bx}`}>
            <rect x={bx} y="75" width="30" height="55" stroke="#777" strokeWidth="0.8" strokeDasharray="3 2" fill="rgba(0,0,0,0.015)" />
            <text x={bx + 15} y="105" textAnchor="middle" fontSize="7" fill="#888">BAY</text>

            <rect x={bx} y="195" width="30" height="55" stroke="#777" strokeWidth="0.8" strokeDasharray="3 2" fill="rgba(0,0,0,0.015)" />
            <text x={bx + 15} y="225" textAnchor="middle" fontSize="7" fill="#888">BAY</text>
          </g>
        ))}

        {/* Central Driveway */}
        <rect x="60" y="140" width="370" height="45" fill="rgba(167, 106, 76, 0.05)" stroke="#a76a4c" strokeWidth="1" strokeDasharray="5 3" />
        <text x="245" y="166" textAnchor="middle" fontSize="9" fontWeight="700" fill="#a76a4c" letterSpacing="0.08em">
          TWO-WAY VEHICULAR CIRCULATION DRIVEWAY (6.0M DRIVE AISLE)
        </text>

        {/* Robotic Core */}
        <rect x="440" y="80" width="55" height="170" stroke="#333" strokeWidth="1.2" fill="#faf7f2" />
        <text x="467" y="155" textAnchor="middle" fontSize="8" fontWeight="700" fill="#222" transform="rotate(-90 467 155)">
          ROBOTIC CAR ELEVATOR
        </text>
      </svg>
    );
  }

  if (type === "corporate") {
    // 5th, 7th, 8th & 9th Floor Plan
    return (
      <svg viewBox="0 0 540 330" className="floorplan-cad-svg" fill="none" stroke="currentColor">
        <defs>
          <pattern id="gridCorp" width="22" height="22" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="22" y2="0" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="0" y2="22" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="540" height="330" fill="url(#gridCorp)" />

        {/* Outer Boundary */}
        <polygon points="30,40 510,60 455,290 30,290" strokeWidth="2.4" stroke="#222" />
        <polygon points="36,46 502,65 449,284 36,284" strokeWidth="1" stroke="#555" opacity="0.5" />

        {/* North Compass */}
        <g transform="translate(485, 65)">
          <circle cx="0" cy="0" r="14" stroke="#333" strokeWidth="0.8" fill="#fff" />
          <polygon points="0,-12 3,0 0,-3 -3,0" fill="#222" />
          <polygon points="0,12 3,0 0,3 -3,0" fill="#999" opacity="0.6" />
          <text x="0" y="-15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#222">N</text>
        </g>

        {/* Central Core & Lifts */}
        <rect x="175" y="80" width="165" height="125" strokeWidth="1.8" stroke="#222" fill="#faf7f2" />
        <rect x="190" y="90" width="28" height="30" strokeWidth="0.8" stroke="#555" />
        <rect x="225" y="90" width="28" height="30" strokeWidth="0.8" stroke="#555" />
        <rect x="260" y="90" width="28" height="30" strokeWidth="0.8" stroke="#555" />
        <rect x="295" y="90" width="28" height="30" strokeWidth="0.8" stroke="#555" />
        <text x="257" y="135" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#333">HIGH SPEED ELEVATORS</text>

        {/* AHU & Services Box */}
        <rect x="190" y="145" width="135" height="45" strokeWidth="1" stroke="#a76a4c" fill="rgba(167, 106, 76, 0.08)" />
        <text x="257" y="166" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#a76a4c">AHU ROOM (310 SQ.FT.)</text>
        <text x="257" y="180" textAnchor="middle" fontSize="7" fill="#666">FIRE STAIRS & ELECTRICAL DUCTS</text>

        {/* Usable Floor Plate Labels */}
        <text x="105" y="105" fontSize="9" fontWeight="700" fill="#333">EXECUTIVE SUITES</text>
        <line x1="45" y1="125" x2="165" y2="125" stroke="#999" strokeWidth="0.8" strokeDasharray="3 2" />

        <text x="400" y="105" fontSize="9" fontWeight="700" fill="#333">CONFERENCE WING</text>
        <line x1="350" y1="125" x2="470" y2="125" stroke="#999" strokeWidth="0.8" strokeDasharray="3 2" />

        <text x="257" y="240" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">
          OFFICES 501, 701, 801, 901
        </text>
        <text x="257" y="260" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#a76a4c">
          RERA CARPET: 7,651 SQ.FT. | TOTAL: 7,961 SQ.FT.
        </text>
        <text x="257" y="276" textAnchor="middle" fontSize="7.5" fill="#666">
          DIM: 97&apos;5&quot; × 52&apos;4&quot; (COLUMN-LIGHT EXPANSIVE PLATE)
        </text>
      </svg>
    );
  }

  // 6th & 10th Floor Plan (Corporate Plate with Refuge Area)
  return (
    <svg viewBox="0 0 540 330" className="floorplan-cad-svg" fill="none" stroke="currentColor">
      <defs>
        <pattern id="gridRefuge" width="22" height="22" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="22" y2="0" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="0" y2="22" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="540" height="330" fill="url(#gridRefuge)" />

      {/* Structural Walls */}
      <polygon points="30,40 510,60 455,290 30,290" strokeWidth="2.4" stroke="#222" />
      <polygon points="36,46 502,65 449,284 36,284" strokeWidth="1" stroke="#555" opacity="0.5" />

      {/* North Compass */}
      <g transform="translate(485, 65)">
        <circle cx="0" cy="0" r="14" stroke="#333" strokeWidth="0.8" fill="#fff" />
        <polygon points="0,-12 3,0 0,-3 -3,0" fill="#222" />
        <polygon points="0,12 3,0 0,3 -3,0" fill="#999" opacity="0.6" />
        <text x="0" y="-15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#222">N</text>
      </g>

      {/* Dedicated Refuge Area */}
      <rect x="45" y="80" width="115" height="125" strokeWidth="1.8" stroke="#a76a4c" fill="rgba(167, 106, 76, 0.08)" />
      <line x1="45" y1="80" x2="160" y2="175" stroke="#a76a4c" strokeWidth="0.6" opacity="0.4" />
      <line x1="45" y1="120" x2="160" y2="205" stroke="#a76a4c" strokeWidth="0.6" opacity="0.4" />
      <text x="102" y="135" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#a76a4c">REFUGE AREA</text>
      <text x="102" y="152" textAnchor="middle" fontSize="7.5" fill="#666">15&apos;0&quot; × 32&apos;3&quot;</text>

      {/* Central Lift Core */}
      <rect x="180" y="80" width="165" height="125" strokeWidth="1.8" stroke="#222" fill="#faf7f2" />
      <rect x="195" y="90" width="28" height="30" strokeWidth="0.8" stroke="#555" />
      <rect x="230" y="90" width="28" height="30" strokeWidth="0.8" stroke="#555" />
      <rect x="265" y="90" width="28" height="30" strokeWidth="0.8" stroke="#555" />
      <rect x="300" y="90" width="28" height="30" strokeWidth="0.8" stroke="#555" />
      <text x="262" y="135" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#333">HIGH SPEED LIFTS</text>

      {/* Office Suite Label */}
      <text x="400" y="105" fontSize="9" fontWeight="700" fill="#333">OFFICE SUITE</text>
      <line x1="355" y1="125" x2="475" y2="125" stroke="#999" strokeWidth="0.8" strokeDasharray="3 2" />

      <text x="262" y="240" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">
        OFFICES 601 & 1001
      </text>
      <text x="262" y="260" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#a76a4c">
        RERA CARPET: 7,146 SQ.FT. | TOTAL: 7,455 SQ.FT.
      </text>
      <text x="262" y="276" textAnchor="middle" fontSize="7.5" fill="#666">
        DIM: 98&apos;8&quot; × 52&apos;4&quot; (COMPLIANT SAFETY REFUGE FLOOR)
      </text>
    </svg>
  );
}

export default function FloorPlanSection() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const activeCategory = categories[activeTabIdx];

  const handleOpenModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-enquire-modal"));
    }
  };

  return (
    <section id="floor-plans" className="simple-floorplan-section">
      <div className="wrap floorplan-showcase-container">
        {/* Title matching luxury website style */}
        <div className="simple-floorplan-header">
          <h2 className="simple-floorplan-title">
            Floor <span className="simple-floorplan-title-accent">Plans</span>
          </h2>
        </div>

        {/* ========================================================
            All 5 Categories Pill Navigation (Matching Reference Screenshot)
            ======================================================== */}
        <div className="floorplan-tabs-row" role="tablist">
          {categories.map((cat, idx) => {
            const isActive = idx === activeTabIdx;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                className={`floorplan-tab-pill ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveTabIdx(idx)}
              >
                {cat.tabLabel}
              </button>
            );
          })}
        </div>

        {/* ========================================================
            Main Showcase Card with Locked Floor Plan & Stats Strip
            ======================================================== */}
        <motion.div
          className="floorplan-showcase-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Card Top Technical Metadata Bar */}
          <div className="floorplan-card-topbar">
            <div className="floorplan-card-tag">
              <span className="floorplan-tag-dot" />
              <span>{activeCategory.tag}</span>
            </div>
            <div className="floorplan-card-scale">{activeCategory.scaleLabel}</div>
          </div>

          {/* Blueprint Stage with Smooth Transition */}
          <div className="floorplan-stage-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                className="floorplan-cad-stage"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                {/* Authentic Vector Blueprint Layout */}
                <CadBlueprintRenderer type={activeCategory.type} />
              </motion.div>
            </AnimatePresence>

            {/* Frosted Blur & Lock Overlay (Matching Reference Screenshot) */}
            <div className="floorplan-lock-overlay" onClick={handleOpenModal}>
              <div className="floorplan-lock-content" onClick={(e) => e.stopPropagation()}>
                {/* Circular Lock Badge */}
                <div className="floorplan-lock-badge">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>

                {/* Lock Headings */}
                <h3 className="floorplan-lock-heading">Floor Plan Locked</h3>
                <p className="floorplan-lock-text">
                  Verify your details to unlock complete floor plan dimensions &amp; layouts.
                </p>

                {/* Unlock Action Button */}
                <button
                  type="button"
                  className="floorplan-unlock-btn btn-enquire"
                  onClick={handleOpenModal}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>Unlock Floor Plan</span>
                </button>
              </div>
            </div>

            {/* Corner Crop Marks for High-End Architectural CAD Vibe */}
            <div className="cad-corner top-left" aria-hidden="true" />
            <div className="cad-corner top-right" aria-hidden="true" />
            <div className="cad-corner bottom-left" aria-hidden="true" />
            <div className="cad-corner bottom-right" aria-hidden="true" />
          </div>

          {/* ========================================================
              Floating Bottom Stats Pill (Matching Reference Screenshot)
              ======================================================== */}
          <div className="floorplan-floating-strip-wrap">
            <div className="floorplan-floating-strip">
              <div className="floorplan-stat-block">
                <span className="floorplan-stat-label">CARPET AREA</span>
                <span className="floorplan-stat-val">{activeCategory.carpetArea}</span>
              </div>

              <div className="floorplan-stat-divider" />

              <div className="floorplan-stat-block">
                <span className="floorplan-stat-label">STARTING PRICE</span>
                <span className="floorplan-stat-val floorplan-stat-highlight">
                  {activeCategory.startingPrice}
                </span>
              </div>

              <div className="floorplan-stat-divider floorplan-stat-opt" />

              <div className="floorplan-stat-block floorplan-stat-opt">
                <span className="floorplan-stat-label">FLOOR LEVEL</span>
                <span className="floorplan-stat-val">{activeCategory.floorLevel}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
