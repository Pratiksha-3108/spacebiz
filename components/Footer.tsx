"use client";

import { useEffect, useRef } from "react";

export default function Footer() {
  const cardRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const word = wordRef.current;
    if (!card || !word) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      word.style.setProperty("--reveal", "0.3");
      return;
    }

    // fast = quick follower, slow = lagging trail
    const s = {
      tx: 0,
      ty: 0,
      fx: 0,
      fy: 0,
      sx: 0,
      sy: 0,
      reveal: 0,
      targetReveal: 0,
      lastMove: 0,
      inited: false,
    };
    let raf: number;

    const onMove = (e: PointerEvent) => {
      const r = word.getBoundingClientRect();
      s.tx = e.clientX - r.left;
      s.ty = e.clientY - r.top;
      if (!s.inited) {
        s.fx = s.sx = s.tx;
        s.fy = s.sy = s.ty;
        s.inited = true;
      }
      s.targetReveal = 1;
      s.lastMove = performance.now();
    };

    const onLeave = () => {
      s.targetReveal = 0;
    };

    const tick = (now: number) => {
      if (now - s.lastMove > 900) {
        s.targetReveal = 0; // fade back to the ghost when idle
      }
      s.fx += (s.tx - s.fx) * 0.16;
      s.fy += (s.ty - s.fy) * 0.16;
      s.sx += (s.tx - s.sx) * 0.06;
      s.sy += (s.ty - s.sy) * 0.06;
      s.reveal += (s.targetReveal - s.reveal) * (s.targetReveal > s.reveal ? 0.2 : 0.05);

      word.style.setProperty("--mx", `${s.fx.toFixed(1)}px`);
      word.style.setProperty("--my", `${s.fy.toFixed(1)}px`);
      word.style.setProperty("--tx", `${s.sx.toFixed(1)}px`);
      word.style.setProperty("--ty", `${s.sy.toFixed(1)}px`);
      word.style.setProperty("--reveal", s.reveal.toFixed(3));
      raf = requestAnimationFrame(tick);
    };

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <footer className="schmidt-footer-section">
      <div className="schmidt-footer-card" ref={cardRef}>
        {/* Giant SpaceBiz wordmark (top): faint ghost always, glows under the cursor */}
        <div className="schmidt-wordmark-wrap">
          <span className="schmidt-wordmark" ref={wordRef} aria-label="SpaceBiz">
            {"SpaceBiz".split("").map((ch, i) => (
              <span key={i} aria-hidden="true" className={i === 1 ? "schmidt-char-p" : undefined}>
                {ch}
              </span>
            ))}
          </span>
        </div>

        {/* Links row (below the wordmark) */}
        <div className="schmidt-top-row">
          <div className="schmidt-explore">Explore</div>

          <nav aria-label="Footer navigation">
            <ul className="schmidt-nav-list">
              <li><a href="#" className="schmidt-nav-link">Home</a></li>
              <li><a href="#about" className="schmidt-nav-link">Projects</a></li>
              <li><a href="#highlights" className="schmidt-nav-link">Solutions</a></li>
              <li><a href="#contact" className="schmidt-nav-link">Contact us</a></li>
            </ul>
          </nav>

          <div className="schmidt-contact-col">
            <div className="schmidt-social-icons">
              <a
                href="https://wa.me/917447447669?text=Hi%2C%20I%20am%20interested%20in%20Jhamtani%20SpaceBiz%20Baner"
                target="_blank"
                rel="noopener noreferrer"
                className="schmidt-icon-btn"
                aria-label="WhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/jhamtaniofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="schmidt-icon-btn"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.jhamtani.com"
                target="_blank"
                rel="noopener noreferrer"
                className="schmidt-icon-btn"
                aria-label="Official Website"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@jhamtaniofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="schmidt-icon-btn"
                aria-label="YouTube Channel"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>

            <div>
              <p className="schmidt-info-line">
                <span className="schmidt-label">E-mail:</span>{" "}
                <a href="mailto:enquiry@jhamtani.com" style={{ color: "inherit", textDecoration: "none" }}>
                  enquiry@jhamtani.com
                </a>
              </p>
              <p className="schmidt-info-line">
                <span className="schmidt-label">Call:</span>{" "}
                <a href="tel:+917447447669" style={{ color: "inherit", textDecoration: "none" }}>
                  +91 744 744 766 9
                </a>
              </p>
              <p className="schmidt-info-line" style={{ maxWidth: "360px", lineHeight: 1.4, marginLeft: "auto" }}>
                Survey No. 264P/1, Opp. Gadoo&apos;s Sweets, Near Amar Honda Showroom, Baner Road, Baner, Pune
              </p>
            </div>
          </div>
        </div>

        {/* Copyright & RERA */}
        <div className="schmidt-bottom-legal">
          <small style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "10px", width: "100%" }}>
            <span>
              © 2026 Jhamtani — Crafting Skylines. In association with Space Realty &amp; Square One.
            </span>
            <span>
              MahaRERA No:{" "}
              <a
                href="https://maharera.mahaonline.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "underline" }}
              >
                P52100054460
              </a>{" "}
              | maharera.mahaonline.gov.in
            </span>
          </small>
        </div>
      </div>
    </footer>
  );
}