"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

interface LocationItem {
  id: string;
  name: string;
  time: string;
  numericTime: string;
  unit: string;
  category: string;
  distance: string;
  description: string;
}

const locations: LocationItem[] = [
  {
    id: "metro",
    name: "Metro Station",
    time: "0.5 km",
    numericTime: "0.5",
    unit: "KM AWAY",
    category: "TRANSIT HUB",
    distance: "0.5 km",
    description: "Rapid high-frequency urban transit connecting Baner directly to Pune city centre.",
  },
  {
    id: "aundh",
    name: "Aundh",
    time: "Within 5 mins",
    numericTime: "5",
    unit: "MINUTES BY CAR",
    category: "RETAIL & RESIDENTIAL",
    distance: "2.4 km",
    description: "Established commercial district with premium residential neighbourhoods and high street retail.",
  },
  {
    id: "pashan",
    name: "Pashan",
    time: "Within 10 mins",
    numericTime: "10",
    unit: "MINUTES BY CAR",
    category: "CONNECTOR CORRIDOR",
    distance: "4.2 km",
    description: "Direct expressway bypass route connecting Kothrud and western Pune neighbourhoods.",
  },
  {
    id: "university",
    name: "Pune University",
    time: "Within 10 mins",
    numericTime: "10",
    unit: "MINUTES BY CAR",
    category: "EDUCATIONAL & CIVIC",
    distance: "5.8 km",
    description: "Premier academic hub and direct transit corridor towards Shivaji Nagar and Central Pune.",
  },
  {
    id: "balewadi",
    name: "Balewadi",
    time: "Within 15 mins",
    numericTime: "15",
    unit: "MINUTES BY CAR",
    category: "LIFESTYLE & SPORTS",
    distance: "3.5 km",
    description: "Balewadi High Street corporate hub, sports complex, and upscale lifestyle boulevard.",
  },
  {
    id: "hinjewadi",
    name: "Hinjewadi",
    time: "Within 15 mins",
    numericTime: "15",
    unit: "MINUTES BY CAR",
    category: "IT & TECH PARK",
    distance: "8.2 km",
    description: "Maharashtra's premier IT corridor employing over 400,000 technology professionals.",
  },
];

export default function ConnectivitySection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Pin section while user scrolls through all connectivity landmarks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Automatically update the active card as the user scrolls
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = locations.length;
    const rawIdx = Math.floor(latest * total);
    const newIdx = Math.min(Math.max(rawIdx, 0), total - 1);
    setActiveIdx(newIdx);
  });

  const active = locations[activeIdx];

  // Function to smoothly scroll to a specific destination slice
  const scrollToDestination = (idx: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (idx / locations.length) * totalScrollable + 10;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
    setActiveIdx(idx);
  };

  return (
    <section ref={containerRef} id="location" className="connectivity-section pinned-scroller">
      <div className="connectivity-pin">
        {/* Full-height Map Background with sleek blackish tint */}
        <div className="connectivity-map-fullscreen">
          <iframe
            src="https://maps.google.com/maps?q=Baner%20Road,%20Pune,%20Maharashtra&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="connectivity-iframe-map"
            loading="lazy"
            title="Jhamtani SpaceBiz Fullscreen Map"
          />
          <div className="connectivity-map-dark-overlay" />
        </div>

        {/* Title & Subtitle placed at top on solid clean background (no glassy effect) */}
        <div className="connectivity-top-header">
          <div className="wrap">
            <span className="connectivity-tag">STRATEGIC ARTERIAL LOCATION · BANER ROAD</span>
            <h2>Where Business Meets Seamless Connectivity</h2>
            <p>
              Rising on prime Baner Road, Jhamtani SpaceBiz offers frictionless access
              to Pune&apos;s premier technology parks, transit networks, and vibrant urban corridors.
            </p>
          </div>
        </div>

        {/* Foreground UI Layer over the map */}
        <div className="connectivity-content-layer">
          <div className="connectivity-bottom-row">
            {/* Interactive Floating Square Box */}
            <div className="connectivity-square-box">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  className="square-box-inner"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="square-box-top-row">
                    <div className="square-box-number">{active.numericTime}</div>
                    <div className="square-box-unit">
                      <span className="unit-main">{active.unit}</span>
                      <span className="unit-sub">{active.category}</span>
                    </div>
                  </div>

                  <div className="square-box-divider" />

                  <div className="square-box-body">
                    <span className="destination-label">DESTINATION</span>
                    <h3 className="destination-name">{active.name}</h3>
                    <p className="destination-desc">{active.description}</p>
                  </div>

                  <div className="square-box-footer">
                    <div className="square-box-indicators">
                      {locations.map((loc, idx) => (
                        <button
                          key={loc.id}
                          type="button"
                          aria-label={`View ${loc.name}`}
                          className={`square-dot-btn ${idx === activeIdx ? "active" : ""}`}
                          onClick={() => scrollToDestination(idx)}
                        />
                      ))}
                    </div>
                    <div className="square-box-pagination">
                      <b>{activeIdx + 1}</b> / {locations.length}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Destinations Grid Panel */}
            <div className="connectivity-list-panel">
              <div className="connectivity-list-title-row">
                <span className="connectivity-list-title">Key Commercial Hubs &amp; Transit</span>
                <span className="connectivity-scroll-hint">
                  Scroll to explore · {activeIdx + 1}/{locations.length}
                </span>
              </div>
              <div className="connectivity-grid">
                {locations.map((loc, idx) => (
                  <button
                    key={loc.id}
                    type="button"
                    className={`connectivity-item-card ${idx === activeIdx ? "active" : ""}`}
                    onClick={() => scrollToDestination(idx)}
                  >
                    <div className="item-name">{loc.name}</div>
                    <div className="item-time">{loc.time}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
