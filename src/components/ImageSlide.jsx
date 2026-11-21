import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ImageSlide Component
 * 
 * - Seamless joint between slides: zero gaps, continuous flow
 * - Clock / dial continuous circular progression:
 *   - Rotates smoothly like a clock sweep (subtle dial tilt that flows seamlessly into place)
 *   - Continuous scroll tracking with soft spring physics
 *   - Perfectly centers and stabilizes as it reaches the screen center
 *   - Slides seamlessly flow one right into the next
 */
export default function ImageSlide({ src, alt, priority = false }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Physics-based spring for organic clockwork inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.8,
    restDelta: 0.0005,
  });

  // Continuous Clock-like sweep & flow transforms:
  // Rotation: sweeps from -4.5deg (ticking clockwise into view) -> 0deg (locked at 12 o'clock center) -> +4.5deg (clock exit)
  const rotate = useTransform(smoothProgress, [0, 0.48, 0.52, 1], [-4.5, 0, 0, 4.5]);

  // Vertical seamless continuation flow (no gap, slides seamlessly pass baton)
  const y = useTransform(smoothProgress, [0, 0.48, 0.52, 1], [40, 0, 0, -40]);

  // Subtle dial scale breath for depth
  const scale = useTransform(smoothProgress, [0, 0.48, 0.52, 1], [0.96, 1, 1, 0.96]);

  // Unbroken opacity curve maintaining presence
  const opacity = useTransform(smoothProgress, [0, 0.28, 0.72, 1], [0.2, 1, 1, 0.2]);

  return (
    <section ref={containerRef} className="slide-section">
      <motion.div
        className="slide-wrapper"
        style={{
          rotate,
          y,
          scale,
          opacity,
          transformOrigin: '50% 50%',
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
