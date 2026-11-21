import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ImageSlide Component
 * 
 * - Seamless gapless presentation:
 *   Every page image joins directly with the next with 0px spacing.
 * - Connected Scroll Progression:
 *   As you scroll down, each page continuously glides into position
 *   with subtle momentum, soft opacity focus, and micro-scale breathing,
 *   flowing like one continuous joined visual presentation canvas.
 */
export default function ImageSlide({ src, alt, priority = false }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Soft physics-based spring for continuous fluid scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.8,
    restDelta: 0.0005,
  });

  // Seamless joint transforms:
  // Glides subtly into place and stays rock solid when centered in viewport
  const y = useTransform(smoothProgress, [0, 0.45, 0.55, 1], [30, 0, 0, -30]);
  const opacity = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [0.35, 1, 1, 0.35]);
  const scale = useTransform(smoothProgress, [0, 0.45, 0.55, 1], [0.985, 1, 1, 0.985]);

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
