import React from 'react';
import { motion } from 'framer-motion';

/**
 * ImageSlide Component
 * 
 * - Full-screen section (min-height: 100vh)
 * - Single complete image, object-fit: contain
 * - Smooth fade-in + subtle upward translation animation triggered on entering viewport
 * - Repeats / reverses naturally when scrolling up or down
 */
export default function ImageSlide({ src, alt, priority = false }) {
  return (
    <section className="slide-section">
      <motion.div
        className="slide-wrapper"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{
          duration: 0.9,
          ease: 'easeOut',
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
