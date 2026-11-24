"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

export default function CountUp({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(v) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}
