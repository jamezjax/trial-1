import React from 'react';
import ImageSlide from './components/ImageSlide';

// Presentation slides in upload/numerical order
const slides = [
  { id: 1, src: '/images/1.webp', alt: 'Ascenso Presentation - Page 1' },
  { id: 2, src: '/images/2.webp', alt: 'Ascenso Presentation - Page 2' },
  { id: 3, src: '/images/3.webp', alt: 'Ascenso Presentation - Page 3' },
  { id: 6, src: '/images/6.webp', alt: 'Ascenso Presentation - Page 6' },
  { id: 7, src: '/images/7.webp', alt: 'Ascenso Presentation - Page 7' },
  { id: 8, src: '/images/8.webp', alt: 'Ascenso Presentation - Page 8' },
  { id: 9, src: '/images/9.webp', alt: 'Ascenso Presentation - Page 9' },
  { id: 10, src: '/images/10.webp', alt: 'Ascenso Presentation - Page 10' },
];

export default function App() {
  return (
    <main className="presentation-container">
      {slides.map((slide, index) => (
        <ImageSlide
          key={slide.id}
          src={slide.src}
          alt={slide.alt}
          priority={index === 0}
        />
      ))}
    </main>
  );
}
