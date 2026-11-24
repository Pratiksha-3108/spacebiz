"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Smooth scrolling
    const lenis = new Lenis({ duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
    let id = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    });

    // Click ripple on every .btn
    const ripple = (e: PointerEvent) => {
      const b = (e.target as HTMLElement).closest(".btn") as HTMLElement | null;
      if (!b) return;
      const r = b.getBoundingClientRect();
      const s = Math.max(r.width, r.height);
      const d = document.createElement("span");
      d.className = "rip";
      d.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
      b.appendChild(d);
      setTimeout(() => d.remove(), 700);
    };
    document.addEventListener("pointerdown", ripple);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      document.removeEventListener("pointerdown", ripple);
    };
  }, []);
  return <>{children}</>;
}
