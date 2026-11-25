"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from "framer-motion";
import SectionHead from "./SectionHead";

interface LocationItem {
  id: string;
  name: string;
  time: string;
  x: number;
  y: number;
}

const places: LocationItem[] = [
  { id: "metro", name: "Metro Station", time: "0.5 km", x: 42, y: 56 },
  { id: "aundh", name: "Aundh", time: "Within 5 mins", x: 60, y: 38 },
  { id: "pashan", name: "Pashan", time: "Within 10 mins", x: 48, y: 72 },
  { id: "university", name: "Pune University", time: "Within 10 mins", x: 70, y: 62 },
  { id: "balewadi", name: "Balewadi", time: "Within 15 mins", x: 26, y: 20 },
  { id: "hinjewadi", name: "Hinjewadi", time: "Within 15 mins", x: 12, y: 38 },
  { id: "railway", name: "Pune Railway Station", time: "10 km", x: 84, y: 28 },
  { id: "airport", name: "Pune International Airport", time: "16 km", x: 88, y: 68 },
];

export default function ConnectivityMap() {
  const stageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const targetScrollRatio = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const isInView = useInView(stageRef, { once: true, margin: "-80px" });
  const [modalOpen, setModalOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  // Mouse cursor spring physics for View All button
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 22, mass: 0.4 });

  const onMouseMove = (e: React.MouseEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const onMouseEnter = (e: React.MouseEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    const curX = e.clientX - r.left;
    const curY = e.clientY - r.top;
    mx.set(curX);
    my.set(curY);
    x.jump(curX);
    y.jump(curY);
    setHovering(true);
  };

  // Lock body scroll when modal is open so the background website NEVER scrolls
  useEffect(() => {
    if (modalOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      // Prevent layout shift on scrollbar hide
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [modalOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Cursor-driven scrolling: moving cursor from top to bottom scrolls list from 1 to last item
  const handleListMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = listRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    // Map cursor Y smoothly across padding
    const ratio = Math.min(Math.max((relativeY - 15) / (rect.height - 30), 0), 1);
    targetScrollRatio.current = ratio;
  };

  const handleListMouseLeave = () => {
    targetScrollRatio.current = null;
    setHoveredRowId(null);
  };

  // Wheel event on list: stop propagation to guarantee no background scrolling
  const handleListWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    targetScrollRatio.current = null; // allow manual wheel scroll
    const el = listRef.current;
    if (!el) return;
    el.scrollTop += e.deltaY;
  };

  // Fluid lerp animation towards cursor scroll target
  useEffect(() => {
    if (!modalOpen) return;
    const el = listRef.current;
    if (!el) return;

    let active = true;
    const updateScroll = () => {
      if (!active || !el) return;
      if (targetScrollRatio.current !== null) {
        const maxScroll = el.scrollHeight - el.clientHeight;
        if (maxScroll > 0) {
          const target = targetScrollRatio.current * maxScroll;
          // Smooth lerp towards cursor target
          el.scrollTop += (target - el.scrollTop) * 0.14;
        }
      }
      animFrameRef.current = requestAnimationFrame(updateScroll);
    };

    animFrameRef.current = requestAnimationFrame(updateScroll);

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [modalOpen]);

  return (
    <section id="location" className="cmap-section">
      <div className="wrap">
        <SectionHead
          center
          eyebrow="CONNECTIVITY"
          title="At The Heart Of Everything"
          sub="Jhamtani SpaceBiz is strategically located on prime Baner Road to offer seamless connectivity, making every journey simple and convenient."
        />
      </div>

      {/* Interactive Map Area */}
      <div
        ref={stageRef}
        className="cmap-stage"
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setHovering(false)}
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="Click to open nearby destinations details"
      >
        {/* Exact Shri Vrinda Background Map Image */}
        <div className="cmap-bg-wrap">
          <img
            src="/images/map1.png"
            alt="Connectivity Map"
            className="cmap-bg-img"
          />
        </div>

        {/* Center Project Landmark (Jhamtani SpaceBiz) */}
        <motion.div
          className="cmap-center-marker"
          style={{ left: "40%", top: "42%" }}
          initial={{ opacity: 0, scale: 0.3, y: -20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.3, y: -20 }}
          transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.2 }}
        >
          <div className="cmap-card project-card">
            <span className="cmap-place-name">JHAMTANI SPACEBIZ</span>
            <span className="cmap-place-time">Prime Baner Road</span>
          </div>
          <div className="cmap-project-pin">
            <span className="project-pin-pulse" />
            <img src="/images/points.svg" alt="" className="cmap-pin-icon project-icon" />
          </div>
        </motion.div>

        {/* Staggered Pop-up: Locations pop up ONE BY ONE */}
        {places.map((p, i) => (
          <motion.div
            key={p.id}
            className={`cmap-place cmap-pin-${p.id}`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            initial={{ opacity: 0, scale: 0.2, y: -28 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.2, y: -28 }
            }
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: 0.35 + i * 0.22,
            }}
          >
            <div className="cmap-card">
              <span className="cmap-place-name">
                {p.id === "airport" ? (
                  <>
                    <span className="cmap-name-desktop">{p.name}</span>
                    <span className="cmap-name-mobile">Pune Airport</span>
                  </>
                ) : (
                  p.name
                )}
              </span>
              <span className="cmap-place-time">{p.time}</span>
            </div>
            <img src="/images/points.svg" alt="" className="cmap-pin-icon" />
          </motion.div>
        ))}

        {/* Cursor-Following View All Button - ALWAYS says "View All" */}
        <motion.div
          className={`cmap-view-btn ${hovering ? "is-active" : "is-idle"}`}
          style={{ x, y }}
          aria-hidden="true"
        >
          <span className="cmap-btn-glow-ring" />
          <span className="cmap-btn-glow-ring ring-2" />
          <span className="cmap-btn-label">View All</span>
        </motion.div>
      </div>

      {/* Exact Shri Vrinda "Nearby Destinations" Modal Overlay */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="cmap-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setModalOpen(false)}
            onWheel={(e) => e.stopPropagation()}
          >
            <motion.div
              className="cmap-modal-card"
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.96 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header */}
              <div className="cmap-modal-header">
                <div>
                  <span className="cmap-modal-eyebrow">Connectivity</span>
                  <h3 className="cmap-modal-title">Nearby Destinations</h3>
                </div>
                <button
                  type="button"
                  className="cmap-modal-close"
                  aria-label="Close modal"
                  onClick={() => setModalOpen(false)}
                >
                  &times;
                </button>
              </div>

              {/* Destinations List with Cursor-driven Scrolling from 1 to last */}
              <div
                ref={listRef}
                className="cmap-modal-list"
                onMouseMove={handleListMouseMove}
                onMouseLeave={handleListMouseLeave}
                onWheel={handleListWheel}
              >
                {places.map((p) => {
                  const isHovered = hoveredRowId === p.id;
                  return (
                    <div
                      key={p.id}
                      className={`cmap-modal-row ${isHovered ? "is-row-active" : ""}`}
                      onMouseEnter={() => setHoveredRowId(p.id)}
                    >
                      <span className="cmap-modal-loc-name">{p.name}</span>
                      <span className="cmap-modal-loc-time">{p.time}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
