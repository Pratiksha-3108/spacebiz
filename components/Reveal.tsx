"use client";
import { motion } from "framer-motion";

// Soft rise for text blocks. Image wipes use <ImageWipe/>.
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Image uncovers from the bottom while slowly settling its scale.
export function ImageWipe({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <motion.div
      className={`wipe ${className ?? ""}`}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
