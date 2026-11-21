import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ImageSlide Component
 * 
 * Provides continuous scroll-linked motion:
 * - Direct scroll progression linking rather than a disjointed discrete trigger
 * - Smooth spring physics for fluid momentum feel
 * - As the user scrolls, each slide glides continuously into view and softly glides out
 */
export default function ImageSlide({ src, alt, priority = false }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth scroll progression with subtle physics damping
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Continuous fluid interpolation:
  // - Starts slightly lowered (+60px) and faded, glides cleanly to center (0px, 1.0 opacity, scale 1)
  // - Glides smoothly upward (-60px) and softly fades as user scrolls past
  const y = useTransform(smoothProgress, [0, 0.45, 0.55, 1], [60, 0, 0, -60]);
  const opacity = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [0.15, 1, 1, 0.15]);
  const scale = useTransform(smoothProgress, [0, 0.45, 0.55, 1], [0.97, 1, 1, 0.97]);

  return (
    <section ref={containerRef} className="slide-section">
      <motion.div
        className="slide-wrapper"
        style={{
          y,
          opacity,
          scale,
        }}
      >
        <img
          src={src}
          alt={alt}
          className="slide-image"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </motion.div>
    </section>
  );
}
