"use client";

import { useEffect, useRef } from "react";

const WA_HREF =
  "https://wa.me/917447447669?text=" +
  encodeURIComponent(
    "Hi, I am interested in commercial space at Jhamtani SpaceBiz Baner. Please share details and arrange a site visit."
  );

export default function CTASection() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("is-in");
    }

    return () => io.disconnect();
  }, []);

  return (
    <section className="sharp-cta-section" id="contact">
      <div className="sharp-cta-box" ref={cardRef}>
        {/* Background building image from website with soft architectural sketch & feathered blur */}
        <div className="sharp-cta-bg-wrap" aria-hidden="true">
          <img
            src="/images/cta-spacebiz-sketch.webp"
            alt="Jhamtani SpaceBiz Building"
            className="sharp-cta-building-img"
          />
        </div>

        <div className="sharp-cta-content">
          <h2 className="sharp-cta-title">
            Now Is The Time To Make<br />Smart Move
          </h2>

          <p className="sharp-cta-subtitle">
            Let Our Experts Help You Discover The Right Property That Matches Your Lifestyle, Needs, And Budget.
          </p>

          <div className="sharp-cta-actions">
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="sharp-cta-btn"
            >
              Explore Properties
            </a>
            <a href="tel:+917447447669" className="sharp-cta-call-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Call +91 744 744 766 9</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
