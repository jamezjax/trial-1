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
 * - Animation intensity boosted by 10% (vertical travel expanded from 25px to 27.5px).
 * - On the first page (isFirst = true), includes an interactive hotspot link over the logo
 *   directing to the official Instagram profile.
 */
export default function ImageSlide({ src, alt, priority = false, isFirst = false }) {
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
  // Vertical momentum increased by 10% (+27.5px -> 0px -> -27.5px) for a slightly more intensive scroll feel
  const y = useTransform(smoothProgress, [0, 0.5, 1], [27.5, 0, -27.5]);

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

        {isFirst && (
          <a
            href="https://www.instagram.com/asce.nso2026?dmpr=MTBuZGg0NTk3M2RwMA=="
            target="_blank"
            rel="noopener noreferrer"
            className="logo-hotspot"
            title="Follow ASCENSO on Instagram (@asce.nso2026)"
            aria-label="ASCENSO Instagram Profile"
          />
        )}
      </motion.div>
    </section>
  );
}
