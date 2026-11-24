"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

const slides = [
  [
    "Billiards & Gaming Lounge",
    "/images/Luxury Game Lounge_ Billiards and Arcade.png",
  ],
  [
    "Modern Fitness Gym",
    "/images/amenities/fitness-gym.webp",
  ],
  [
    "Executive Salon & Grooming",
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=2000&q=85",
  ],
  [
    "Corporate Food Court & Dining",
    "/images/amenities/food-court.webp",
  ],
  [
    "Landscaped Sky Terraces",
    "/images/image-4.webp",
  ],
] as const;

const INTRO = 0.14; // share of the scroll used for the image rising over the intro
const ease = [0.22, 1, 0.36, 1] as const;

export default function AmenitiesShowcase() {
  const ref = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const panelY = useTransform(p, [0, INTRO], ["35vh", "0vh"]);
  const introY = useTransform(p, [0, INTRO], [0, -90]);
  const introOpacity = useTransform(p, [0, INTRO * 0.8], [1, 0]);
  const uiOpacity = useTransform(p, [INTRO * 0.6, INTRO], [0, 1]);

  useMotionValueEvent(p, "change", (v) => {
    const t = Math.min(Math.max((v - INTRO) / (1 - INTRO), 0), 0.9999);
    setIdx(Math.floor(t * slides.length));
  });

  const scrollToProgress = (target: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + target * total, behavior: "smooth" });
  };
  const goTo = (i: number) => {
    const c = Math.min(Math.max(i, 0), slides.length - 1);
    scrollToProgress(INTRO + ((c + 0.5) / slides.length) * (1 - INTRO));
  };

  return (
    <section ref={ref} id="amenities" className="amen-show">
      <div className="amen-pin">
        <motion.div className="amen-intro" style={{ y: introY, opacity: introOpacity }}>
          <span className="eyebrow">AMENITIES</span>
          <h2>Indulge in the art of leisure</h2>
          <p className="sub">Curated lifestyle spaces, wellness facilities and recreational zones designed for work-life integration.</p>
          <span className="amen-scroll-cue" aria-hidden>↓</span>
        </motion.div>

        <motion.div className="amen-panel" style={{ y: panelY }}>
          {slides.map(([t, src], i) => (
            <motion.img
              key={t}
              src={src}
              alt={t}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="amen-img"
              animate={{ opacity: i === idx ? 1 : 0, scale: i === idx ? 1 : 1.12 }}
              transition={{ duration: 1.2, ease }}
            />
          ))}
          <div className="amen-shade" />

          <motion.div className="amen-ui" style={{ opacity: uiOpacity }}>
            <div className="amen-title-wrap">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={idx}
                  className="amen-title"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease }}
                >
                  {slides[idx][0]}
                </motion.h3>
              </AnimatePresence>
              <span className="amen-count">{String(idx + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
            </div>
            <div className="amen-controls">
              <button type="button" className="amen-nav" onClick={() => goTo(idx - 1)} disabled={idx === 0}>Previous</button>
              <span className="amen-line" />
              <button type="button" className="amen-skip" onClick={() => scrollToProgress(1)}>SKIP ⌄</button>
              <span className="amen-line" />
              <button type="button" className="amen-nav" onClick={() => goTo(idx + 1)} disabled={idx === slides.length - 1}>Next</button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
