"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Navbar with background colour starts only once scrolled below the banner section
      const hero = document.querySelector(".hero") as HTMLElement | null;
      const bannerHeight = hero ? hero.offsetHeight : window.innerHeight;
      setScrolled(window.scrollY >= bannerHeight - 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    ["About", "about"],
    ["Highlights", "highlights"],
    ["Amenities", "amenities"],
    ["Floor Plans", "floor-plans"],
    ["Price List", "pricing"],
    ["Location", "location"],
    ["Contact", "contact"],
  ];

  return (
    <>
      <nav className={`nav ${scrolled || mobileMenuOpen ? "scrolled" : ""}`}>
        <ul className="nav-left">
          {[["About", "about"], ["Amenities", "amenities"], ["Floor Plans", "floor-plans"]].map(([l, h]) => (
            <li key={l}>
              <a href={`#${h}`}>{l}</a>
            </li>
          ))}
        </ul>

        <a href="#" className="nav-logo" aria-label="Jhamtani SpaceBiz">
          <img src="/images/Spacebiz logo.webp" alt="Jhamtani SpaceBiz" height={48} />
        </a>

        <div className="nav-right">
          <ul>
            {[["Location", "location"], ["Contact", "contact"]].map(([l, h]) => (
              <li key={l}>
                <a href={`#${h}`}>{l}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn">
            Enquire now
          </a>

          {/* 3-Line Hamburger Menu Button (Strictly Mobile Only) */}
          <button
            type="button"
            className={`nav-hamburger ${mobileMenuOpen ? "is-active" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line line-1" />
            <span className="hamburger-line line-2" />
            <span className="hamburger-line line-3" />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer (Strictly Mobile Only) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-nav-inner">
              <span className="mobile-nav-eyebrow">MENU</span>
              <ul className="mobile-nav-links">
                {navLinks.map(([label, href], idx) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + idx * 0.04, duration: 0.25 }}
                  >
                    <a
                      href={`#${href}`}
                      className="mobile-nav-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mobile-nav-footer">
                <a
                  href="#contact"
                  className="btn solid mobile-nav-cta"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Schedule a Site Visit
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
