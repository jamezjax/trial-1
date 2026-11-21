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
 * - Page 1: Interactive hotspot link over the logo directing to ASCENSO Instagram profile.
 * - Profile Pages: Small Instagram cursive script logo at bottom-right corner directing to the person's profile.
 */
export default function ImageSlide({
  src,
  alt,
  priority = false,
  isFirst = false,
  instagramLink = null,
  instagramTitle = 'Instagram Profile',
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth scroll spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.9,
    restDelta: 0.0005,
  });

  // Seamless joint transition:
  // Vertical momentum (+27.5px -> 0px -> -27.5px)
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

        {instagramLink && (
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="page-instagram-link"
            title={instagramTitle}
            aria-label={instagramTitle}
          >
            <img
              src="/instagram-logo.png"
              alt="Instagram"
              className="page-instagram-img"
            />
          </a>
        )}
      </motion.div>
    </section>
  );
}
