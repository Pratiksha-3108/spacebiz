"use client";

import { motion } from "framer-motion";

interface PricePlan {
  id: string;
  type: string;
  size: string;
  price: string;
  highlight?: boolean;
}

const pricePlans: PricePlan[] = [
  {
    id: "office-compact",
    type: "Office Space",
    size: "265 - 275 sq.ft.",
    price: "₹ 79.95 - 89.95 Lacs*",
  },
  {
    id: "office-executive",
    type: "Office Space",
    size: "295 - 355 sq.ft.",
    price: "₹ 89.95 Lacs* - 1.13 Cr*",
    highlight: true,
  },
];

export default function PriceListSection() {
  return (
    <section id="pricing" className="price-luxury-section">
      {/* Background Decorative Sparkle / Diamond Accents */}
      <div className="price-bg-sparkles" aria-hidden="true">
        <svg className="price-sparkle-icon sparkle-left" width="120" height="120" viewBox="0 0 100 100" fill="none">
          <path d="M50 0C50 27.6 27.6 50 0 50C27.6 50 50 72.4 50 100C50 72.4 72.4 50 100 50C72.4 50 50 27.6 50 0Z" fill="url(#sparkleGrad)" opacity="0.3" />
          <defs>
            <linearGradient id="sparkleGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c4825e" />
              <stop offset="1" stopColor="#a76a4c" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="price-sparkle-icon sparkle-right" width="140" height="140" viewBox="0 0 100 100" fill="none">
          <path d="M50 0C50 27.6 27.6 50 0 50C27.6 50 50 72.4 50 100C50 72.4 72.4 50 100 50C72.4 50 50 27.6 50 0Z" fill="url(#sparkleGrad2)" opacity="0.25" />
          <defs>
            <linearGradient id="sparkleGrad2" x1="100" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a76a4c" />
              <stop offset="1" stopColor="#c4825e" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="wrap price-container">
        {/* Section Header */}
        <motion.div
          className="price-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="price-eyebrow">INVESTMENT OPPORTUNITY</span>
          <h2 className="price-title">Price List</h2>
          <p className="price-sub">
            Smart Investments Start With Clear Pricing
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="price-cards-grid">
          {pricePlans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              className={`price-card ${plan.highlight ? "is-featured" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="price-card-inner">
                {/* Type Row */}
                <div className="price-spec-row">
                  <span className="price-spec-label">Type:</span>
                  <span className="price-spec-value">{plan.type}</span>
                </div>

                {/* Size Row */}
                <div className="price-spec-row">
                  <span className="price-spec-label">Size:</span>
                  <span className="price-spec-value">{plan.size}</span>
                </div>

                {/* Divider Line */}
                <div className="price-card-divider" />

                {/* Price Row */}
                <div className="price-spec-row price-highlight-row">
                  <span className="price-spec-label">Price:</span>
                  <span className="price-amount">{plan.price}</span>
                </div>

                {/* CTA Action */}
                <div className="price-card-action">
                  <a href="#contact" className="btn solid price-card-btn">
                    View More
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
