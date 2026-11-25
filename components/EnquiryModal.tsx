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
    authorize: true,
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
        authorize: true,
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
      <div className="enquire-split-modal">
        {/* =========================================
            LEFT COLUMN: Banner Image with Top-Left Building Name & Location
            ========================================= */}
        <div className="enquire-banner-col">
          <img
            src="/images/CTA_banner.webp"
            alt="Jhamtani SpaceBiz"
            className="enquire-banner-full-img"
          />

          {/* Top-Left Building Name and Location Overlay */}
          <div className="enquire-banner-top-overlay" />
          <div className="enquire-banner-top-badge">
            <span className="enquire-banner-proj-name">Jhamtani SpaceBiz</span>
            <div className="enquire-banner-proj-loc">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Baner Road, Pune</span>
            </div>
          </div>
        </div>

        {/* =========================================
            RIGHT COLUMN: Form with Previous Fields
            ========================================= */}
        <div className="enquire-form-col">
          {/* Header Row: Title & Close Button */}
          <div className="enquire-form-header">
            <h3 id="enquire-modal-title" className="enquire-form-heading">
              Get Complete Project Details Now
            </h3>
            <button
              type="button"
              className="enquire-form-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Divider line across header */}
          <div className="enquire-header-divider" />

          {isSubmitted ? (
            <div className="enquire-split-success">
              <div className="enquire-success-icon-wrap">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#a76a4c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h4>Thank You!</h4>
              <p>Your request has been received. Our commercial project advisory team will reach out with the complete brochure and pricing details shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="enquire-split-form">
              {/* Field 1: Name */}
              <div className="enquire-line-field">
                <label className="enquire-field-label" htmlFor="prev-name">NAME</label>
                <input
                  id="prev-name"
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Field 2: Mobile Number */}
              <div className="enquire-line-field">
                <label className="enquire-field-label" htmlFor="prev-mobile">MOBILE NUMBER</label>
                <input
                  id="prev-mobile"
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-Digit Mobile Number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />
              </div>

              {/* Field 3: Email */}
              <div className="enquire-line-field">
                <label className="enquire-field-label" htmlFor="prev-email">EMAIL</label>
                <input
                  id="prev-email"
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Field 4: Preferred Space Type (Dropdown from previous form) */}
              <div className="enquire-line-field">
                <label className="enquire-field-label" htmlFor="prev-spacetype">PREFERRED SPACE TYPE</label>
                <div className="enquire-select-container">
                  <select
                    id="prev-spacetype"
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
                  <span className="enquire-select-arrow" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Field 5: Message (from previous form) */}
              <div className="enquire-line-field">
                <label className="enquire-field-label" htmlFor="prev-message">MESSAGE</label>
                <textarea
                  id="prev-message"
                  rows={2}
                  placeholder="Write your requirement here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Checkbox Consent (Exact previous authorization text) */}
              <div className="enquire-auth-row">
                <label className="enquire-auth-label">
                  <input
                    type="checkbox"
                    required
                    checked={formData.authorize}
                    onChange={(e) => setFormData({ ...formData, authorize: e.target.checked })}
                  />
                  <span>
                    I authorize Jhamtani and its representative to contact me with updates and notifications via Email, SMS, WhatsApp, and Call. This will override the registry on DND / NDNC.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="enquire-submit-row">
                <button type="submit" className="enquire-split-submit-btn">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
