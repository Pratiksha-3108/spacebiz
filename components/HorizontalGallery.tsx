"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

interface GalleryItem {
  id: string;
  title: string;
  src: string;
  size: "small" | "big";
}

const slides: GalleryItem[] = [
  {
    id: "g1",
    title: "Exterior Architecture",
    src: "/images/image-1.webp",
    size: "small",
  },
  {
    id: "g2",
    title: "Premium Retail Frontage",
    src: "/images/image-2.webp",
    size: "big",
  },
  {
    id: "g3",
    title: "Grand Reception & Lobby",
    src: "/images/image-3.webp",
    size: "small",
  },
  {
    id: "g4",
    title: "Executive Wellness & Entrance",
    src: "/images/image-4.webp",
    size: "big",
  },
  {
    id: "g5",
    title: "Collaborative Common Areas",
    src: "/images/image-5.webp",
    size: "small",
  },
];

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(1400);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  // Mouse cursor spring physics for dynamic VIEW button
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 320, damping: 26, mass: 0.25 });
  const cursorY = useSpring(mouseY, { stiffness: 320, damping: 26, mass: 0.25 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const updateScrollDistance = useCallback(() => {
    if (!trackRef.current) return;
    const trackWidth = trackRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const travel = trackWidth - viewportWidth + 80;
    if (travel > 0) {
      setMaxScroll(travel);
    }
  }, []);

  useEffect(() => {
    updateScrollDistance();

    const ro = new ResizeObserver(() => {
      updateScrollDistance();
    });

    if (trackRef.current) {
      ro.observe(trackRef.current);
    }

    window.addEventListener("resize", updateScrollDistance);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateScrollDistance);
    };
  }, [updateScrollDistance]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);
  const progressLine = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Track cursor movement across the section
  const handleMouseMove = (e: React.MouseEvent) => {
    const pin = pinRef.current;
    if (!pin) return;
    const rect = pin.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleCardMouseEnter = (e: React.MouseEvent) => {
    const pin = pinRef.current;
    if (pin) {
      const rect = pin.getBoundingClientRect();
      const curX = e.clientX - rect.left;
      const curY = e.clientY - rect.top;
      mouseX.set(curX);
      mouseY.set(curY);
      cursorX.jump(curX);
      cursorY.jump(curY);
    }
    setIsHoveringImage(true);
  };

  const handleCardMouseLeave = () => {
    setIsHoveringImage(false);
  };

  return (
    <section ref={containerRef} id="gallery" className="oneroof-gallery-section">
      <div
        ref={pinRef}
        className="oneroof-pin"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsHoveringImage(false)}
      >
        {/* Floating Cursor-Following VIEW Button (ONLY visible when hovering over image cards) */}
        <motion.div
          className="oneroof-cursor-btn"
          style={{
            x: cursorX,
            y: cursorY,
            opacity: isHoveringImage ? 1 : 0,
            scale: isHoveringImage ? 1 : 0.3,
          }}
          transition={{ duration: 0.18 }}
          aria-hidden="true"
        >
          <span>VIEW</span>
        </motion.div>

        {/* Top Header - Light Theme */}
        <div className="oneroof-header-wrap">
          <div className="wrap">
            <span className="oneroof-eyebrow">GALLERY SHOWCASE</span>
            <h2 className="oneroof-title">A Closer Look at SpaceBiz</h2>
          </div>
        </div>

        {/* Dynamic Horizontal Track: Alternating Small (Portrait) & Big (Landscape) with Straight Edges (No Curves, No Numbers) */}
        <motion.div ref={trackRef} className="oneroof-track" style={{ x }}>
          {slides.map((item) => {
            const isBig = item.size === "big";
            return (
              <div
                key={item.id}
                className={`oneroof-card-col ${isBig ? "is-big" : "is-small"}`}
              >
                {/* For Big Card: Title placed ABOVE the image (No numbers) */}
                {isBig && (
                  <div className="oneroof-caption oneroof-caption-top">
                    <span className="oneroof-card-title">{item.title}</span>
                  </div>
                )}

                {/* Card Media: Straight Edges - View button ONLY activates when cursor is over this image */}
                <div
                  className={`oneroof-card-media ${isBig ? "media-big" : "media-small"}`}
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="oneroof-img"
                    onLoad={updateScrollDistance}
                  />
                </div>

                {/* For Small Card: Title placed BELOW the image (No numbers) */}
                {!isBig && (
                  <div className="oneroof-caption oneroof-caption-bottom">
                    <span className="oneroof-card-title">{item.title}</span>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Bottom Bar: Clean Progress Indicator (No Numbers) */}
        <div className="oneroof-bottom-bar">
          <div className="oneroof-bar-left">
            <div className="oneroof-bar-progress">
              <motion.div
                className="oneroof-bar-fill"
                style={{ width: progressLine }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
