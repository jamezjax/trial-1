import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ImageSlide Component
 * 
 * - Seamlessly Joined Full-Screen Presentation:
 *   - The entire image stretches to 100% width and 100% height (`object-fit: fill`),
 *     filling every pixel and eliminating any letterbox margins or black bands.
 *   - Opacity remains constant 1 (solid image at all times) so no black background shows through.
 *   - Zero gaps between sections: bottom of page N touches top of page N+1 directly.
 *   - Smooth scroll-linked spring inertia connects the flow seamlessly as you scroll down.
 */
export default function ImageSlide({ src, alt, priority = false }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth scroll spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.8,
    restDelta: 0.0005,
  });

  // Seamless joint transition:
  // Subtle vertical momentum (+25px -> 0px -> -25px) that maintains continuous contact between pages
  const y = useTransform(smoothProgress, [0, 0.5, 1], [25, 0, -25]);

  return (
    <section ref={containerRef} className="slide-section">
      <motion.div
        className="slide-wrapper"
        style={{
          y,
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
