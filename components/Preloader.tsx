"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---- Assets ---------------------------------------------------------------
const LOGO = "/images/Spacebiz logo.webp"; // top-center logo
const IMAGE_1 = "/images/banner.webp"; // loading card on the right
const IMAGE_2 = "/images/banner.webp"; // image that expands to fullscreen
// ---------------------------------------------------------------------------

type Phase = "loading" | "collapse" | "grow";

const EASE_IO = [0.77, 0, 0.175, 1] as const;
const EASE_GROW = [0.76, 0, 0.24, 1] as const;

// Word positions:
// During loading:
//   w1 ("An Address") in col 2
//   w2 ("Built For") in col 3
//   w3 ("Ambition") ABOVE the image card (top-right of col 4, matching 'Living' in Lenval)
//   w4 ("In Baner") BELOW the image card (bottom-left of col 4, matching 'Of' in Lenval)
// When aligned (100%):
//   all glide gracefully into the straight horizontal row at top: 50%
//   with guaranteed generous spacing between "Address" and "Built For"
const WORD_POS = {
  w1: {
    loading: { top: "42%", left: "8.5%" },
    aligned: { top: "50%", left: "8.5%" },
  },
  w2: {
    loading: { top: "53%", left: "29%" },
    aligned: { top: "50%", left: "29%" },
  },
  w3: {
    loading: { top: "15%", left: "70%" }, // ABOVE the image
    aligned: { top: "50%", left: "58.5%" }, // glides to straight row
  },
  w4: {
    loading: { top: "76%", left: "58.5%" }, // BELOW the image
    aligned: { top: "50%", left: "74%" }, // glides to straight row
  },
};

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Prevent scroll while preloader is active
    document.body.style.overflow = "hidden";

    const duration = 1250; // fast & responsive loader progression (ms to 100%)
    const startTime = performance.now();
    const timers: ReturnType<typeof setTimeout>[] = [];
    let animId = 0;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const raw = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - raw, 2.5);
      setProgress(Math.min(Math.round(eased * 100), 100));

      if (raw < 1) {
        animId = requestAnimationFrame(updateProgress);
        return;
      }

      // 100% reached
      // 1) image 1 collapses to line, words glide into straight row with clean spacing
      timers.push(setTimeout(() => setPhase("collapse"), 220));
      // 2) image 2 expands from center line to fullscreen
      timers.push(setTimeout(() => setPhase("grow"), 650));
      // 3) reveal hero smoothly
      timers.push(
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = "";
        }, 1600)
      );
    };

    animId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animId);
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  const aligned = phase !== "loading";
  const growing = phase === "grow";

  const getWordMotion = (key: keyof typeof WORD_POS) => {
    const pos = aligned ? WORD_POS[key].aligned : WORD_POS[key].loading;
    return {
      initial: {
        opacity: 0,
        top: WORD_POS[key].loading.top,
        left: WORD_POS[key].loading.left,
      },
      animate: {
        opacity: 1,
        top: pos.top,
        left: pos.left,
      },
      transition: {
        opacity: { duration: 0.4 },
        top: { duration: 0.55, ease: EASE_IO },
        left: { duration: 0.55, ease: EASE_IO },
      },
    };
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="lenval-preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: EASE_IO } }}
        >
          {/* Architectural Background Grid Lines */}
          <div className="lenval-grid-lines">
            <div className="lenval-col-line line-1" />
            <div className="lenval-col-line line-2" />
            <div className="lenval-col-line line-3" />
            <div className="lenval-col-line line-4" />
            <div className="lenval-h-line line-top" />
            <div className="lenval-h-line line-bottom" />
          </div>

          {/* Main Editorial Content Stage */}
          <div className="lenval-main-stage">
            {/* Word 1: An Address (Col 2) */}
            <motion.div className="lenval-word lenval-word-1" {...getWordMotion("w1")}>
              <span>An Address</span>
            </motion.div>

            {/* Word 2: Built For (Col 3) - guaranteed space after Address */}
            <motion.div className="lenval-word lenval-word-2" {...getWordMotion("w2")}>
              <span>Built For</span>
            </motion.div>

            {/* Word 3: Ambition - ABOVE the image card during loading */}
            <motion.div className="lenval-word lenval-word-3" {...getWordMotion("w3")}>
              <span>Ambition</span>
            </motion.div>

            {/* Word 4: In Baner - BELOW the image card during loading */}
            <motion.div className="lenval-word lenval-word-4" {...getWordMotion("w4")}>
              <span>In Baner</span>
            </motion.div>

            {/* IMAGE 1: Big loading card in col 4 (between Ambition above and In Baner below) */}
            <motion.div
              className="lenval-card"
              initial={{ clipPath: "inset(50% 0 50% 0)", opacity: 1 }}
              animate={
                phase === "loading"
                  ? {
                      clipPath: progress > 15 ? "inset(0% 0 0% 0)" : "inset(50% 0 50% 0)",
                      opacity: 1,
                      transition: { duration: 0.6, ease: EASE_IO },
                    }
                  : {
                      clipPath: "inset(50% 0 50% 0)",
                      opacity: phase === "collapse" ? 1 : 0,
                      transition: {
                        clipPath: { duration: 0.45, ease: EASE_IO },
                        opacity: { duration: 0.15, delay: 0.35 },
                      },
                    }
              }
            >
              <img src={IMAGE_1} alt="Jhamtani SpaceBiz" className="lenval-portal-img" />
            </motion.div>

            {/* IMAGE 2: Image Portal — thin line in the centre -> expands to fullscreen */}
            <motion.div
              className="lenval-image-portal"
              initial={{ width: "clamp(70px, 8vw, 120px)", height: "2px", opacity: 0 }}
              animate={
                growing
                  ? { width: "100vw", height: "100vh", opacity: 1 }
                  : {
                      width: "clamp(70px, 8vw, 120px)",
                      height: "2px",
                      opacity: aligned ? 0.8 : 0,
                    }
              }
              transition={{
                width: { duration: 0.9, ease: EASE_GROW },
                height: { duration: 0.9, ease: EASE_GROW },
                opacity: { duration: 0.15 },
              }}
            >
              <img
                src={IMAGE_2}
                alt="Jhamtani SpaceBiz Architecture"
                className="lenval-portal-img"
              />
            </motion.div>
          </div>

          {/* Top Center Logo Header */}
          <header className="lenval-top-header">
            <div className="lenval-logo-box">
              <img src={LOGO} alt="Jhamtani SpaceBiz" className="lenval-top-logo" />
            </div>
          </header>

          {/* Left: Loading label and percentage counter */}
          <div className="lenval-counter-column">
            <div className="lenval-loading-label">Loading</div>
            <div className="lenval-percent-number">{progress}%</div>
          </div>

          {/* Bottom Brand Details */}
          <div className="lenval-bottom-right">
            <div className="brand-name">JHAMTANI SPACEBIZ</div>
            <div className="brand-sub">Grade A Commercial Tower, Baner</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
