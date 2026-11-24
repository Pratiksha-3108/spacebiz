"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// The one orchestrated moment: tower rises out of the dark, then the title lines follow.
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <header ref={ref} className="hero">
      <motion.div className="hero-bg" style={{ y }}>
        <motion.img
          src="/images/banner.webp" alt="Jhamtani SpaceBiz Banner"
          style={{ transformOrigin: "left top" }}
          initial={{ scale: 1.1, filter: "brightness(0)" }}
          animate={{ scale: 1, filter: "brightness(1)" }}
          transition={{ duration: 2.2, ease }}
        />
      </motion.div>
      <nav className="nav">
        <ul className="nav-left">
          {[["About", "about"], ["Why Invest", "why-invest"], ["Amenities", "amenities"]].map(([l, h]) => (
            <li key={l}><a href={`#${h}`}>{l}</a></li>
          ))}
        </ul>

        <a href="#" className="nav-logo" aria-label="Jhamtani SpaceBiz">
          <img src="/images/Spacebiz logo.webp" alt="Jhamtani SpaceBiz" height={48} />
        </a>

        <div className="nav-right">
          <ul>
            {[["Location", "location"], ["Contact", "contact"]].map(([l, h]) => (
              <li key={l}><a href={`#${h}`}>{l}</a></li>
            ))}
          </ul>
          <a href="#contact" className="btn">Enquire now</a>
        </div>
      </nav>
      <motion.div className="hero-copy" style={{ opacity: fade }}>
        {["Grade A commercial", "spaces in Baner"].map((line, i) => (
          <span key={line} className="line">
            <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 1.1 + i * 0.15, ease }}>
              {line}
            </motion.span>
          </span>
        ))}
        <motion.div className="cta-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.8 }}>
          <a href="#amenities" className="btn solid">Explore amenities</a>
          <a href="#contact" className="btn">Enquire now</a>
        </motion.div>
      </motion.div>
    </header>
  );
}
