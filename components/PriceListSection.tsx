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
