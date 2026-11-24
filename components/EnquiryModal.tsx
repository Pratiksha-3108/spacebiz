"use client";

import { useState, useEffect } from "react";

export default function EnquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    spaceType: "",
    message: "",
    authorize: false, // Not auto-selected by default
  });

  useEffect(() => {
    // Global event listener: opens modal on any "Enquire now" click or custom event
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const btn = target.closest(
        'a[href="#contact"], a[href="#enquire"], .btn-enquire, button.btn-enquire'
      );
      if (btn) {
        const text = btn.textContent?.toLowerCase() || "";
        if (text.includes("enquire") || btn.getAttribute("href") === "#contact") {
          e.preventDefault();
          setIsOpen(true);
        }
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("open-enquire-modal", handleCustomOpen);

    // Escape key closes modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("open-enquire-modal", handleCustomOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setIsSubmitted(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setFormData({
        name: "",
        mobile: "",
        email: "",
        spaceType: "",
        message: "",
        authorize: false,
      });
    }, 2800);
  };

  if (!isOpen) return null;

  return (
    <div
      className="enquire-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquire-modal-title"
    >
      <div className="enquire-modal-card">
        {/* Close Button */}
        <button
          className="enquire-close-btn"
          onClick={() => setIsOpen(false)}
          aria-label="Close enquiry form"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {isSubmitted ? (
          <div className="enquire-success-state">
            <div className="enquire-success-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a76a4c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3>Thank You!</h3>
            <p>Your enquiry has been received. Our sales advisory team will get in touch with you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="enquire-form">
            <div className="enquire-header">
              <span className="enquire-eyebrow">Jhamtani SpaceBiz • Baner</span>
              <h2 id="enquire-modal-title" className="enquire-title">Enquiry Form</h2>
              <p className="enquire-subtitle">Connect with our commercial advisory team for bespoke office & retail options</p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginTop: "10px", fontSize: "11px", color: "#a1a1aa", letterSpacing: "0.04em" }}>
                <span>Direct Hotline: <strong style={{ color: "#d97746" }}>+91 744 744 766 9</strong></span>
                <span>•</span>
                <span>MahaRERA: <strong style={{ color: "#f4f4f5" }}>P52100054460</strong></span>
              </div>
            </div>

            {/* Row 1: Name & Mobile Number */}
            <div className="enquire-grid-2">
              <div className="enquire-field">
                <label htmlFor="enquire-name">NAME</label>
                <input
                  id="enquire-name"
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="enquire-field">
                <label htmlFor="enquire-mobile">MOBILE NUMBER</label>
                <input
                  id="enquire-mobile"
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-Digit Mobile Number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />
              </div>
            </div>

            {/* Row 2: Email & Preferred Space Type */}
            <div className="enquire-grid-2">
              <div className="enquire-field">
                <label htmlFor="enquire-email">EMAIL</label>
                <input
                  id="enquire-email"
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="enquire-field">
                <label htmlFor="enquire-spacetype">PREFERRED SPACE TYPE</label>
                <div className="enquire-select-wrap">
                  <select
                    id="enquire-spacetype"
                    required
                    value={formData.spaceType}
                    onChange={(e) => setFormData({ ...formData, spaceType: e.target.value })}
                  >
                    <option value="" disabled>Select Space Type</option>
                    <option value="Commercial Office">Commercial Office</option>
                    <option value="Premium Retail Frontage">Premium Retail Frontage</option>
                    <option value="Ground-Level Showroom">Ground-Level Showroom</option>
                    <option value="Bare Shell Floor Plate">Bare Shell Floor Plate</option>
                    <option value="Corporate HQ Floor">Corporate HQ Floor</option>
                  </select>
                  <span className="enquire-select-chevron" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Row 3: Message */}
            <div className="enquire-field full">
              <label htmlFor="enquire-message">MESSAGE</label>
              <textarea
                id="enquire-message"
                rows={4}
                placeholder="Write your requirement here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {/* Row 4: Disclaimer Checkbox */}
            <div className="enquire-disclaimer-wrap">
              <label className="enquire-checkbox-label">
                <input
                  type="checkbox"
                  required
                  checked={formData.authorize}
                  onChange={(e) => setFormData({ ...formData, authorize: e.target.checked })}
                />
                <span className="enquire-disclaimer-text">
                  I authorize Jhamtani and its representative to contact me with updates and notifications via Email, SMS, WhatsApp, and Call. This will override the registry on DND / NDNC.
                </span>
              </label>
            </div>

            {/* Row 5: Centered Pill Submit Button */}
            <div className="enquire-btn-row">
              <button type="submit" className="enquire-submit-btn">
                SUBMIT
              </button>
            </div>

            <p style={{ textAlign: "center", fontSize: "10.5px", color: "#71717a", marginTop: "16px", lineHeight: "1.4" }}>
              Site Address: Survey No. 264P/1, Opp. Gadoo&apos;s Sweets, Near Amar Honda Showroom, Baner Road, Baner, Pune
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
