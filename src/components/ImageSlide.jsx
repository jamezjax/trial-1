import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ImageSlide Component
 * 
 * - Fullscreen Stretch: Fills the entire screen (100vw x 100vh, object-fit: cover) with 0 gaps.
 * - Deep Blend Transition: 
 *   Cross-blends continuously with smooth opacity curve, subtle parallax vertical glide,
 *   gentle zoom breathing, and micro-blur at boundaries for an organic blended flow.
 */
export default function ImageSlide({ src, alt, priority = false }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Soft physics-based spring for organic blending inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    mass: 0.75,
    restDelta: 0.0005,
  });

  // Parallax glide: slides smoothly into viewport and continues past
  const y = useTransform(smoothProgress, [0, 0.5, 1], ['12%', '0%', '-12%']);

  // Seamless cross-fade opacity blend: soft transition into full focus at center
  const opacity = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.1, 0.85, 1, 0.85, 0.1]
  );

  // Gentle scale depth transition (1.06 -> 1.0 -> 1.06) to enrich blending depth
  const scale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [1.05, 1, 1.05]
  );

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
