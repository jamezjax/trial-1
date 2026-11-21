import React from 'react';
import ImageSlide from './components/ImageSlide';

// Presentation slides in upload/numerical order with associated social profile links
const slides = [
  {
    id: 1,
    src: '/images/1.webp',
    alt: 'Ascenso Presentation - Page 1',
    isFirst: true,
  },
  {
    id: 2,
    src: '/images/2.webp',
    alt: 'Ascenso Presentation - Page 2',
    instagramLink: 'https://www.instagram.com/anjanah1035?gwpx=dmpnMGxpbDN3YWJ6',
    instagramTitle: 'Follow Anjana on Instagram (@anjanah1035)',
  },
  {
    id: 3,
    src: '/images/3.webp',
    alt: 'Ascenso Presentation - Page 3',
    instagramLink: 'https://www.instagram.com/a_nna_th/?utm_source=ig_web_button_share_sheet',
    instagramTitle: 'Follow Anna on Instagram (@a_nna_th)',
  },
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
          isFirst={slide.isFirst}
          instagramLink={slide.instagramLink}
          instagramTitle={slide.instagramTitle}
        />
      ))}
    </main>
  );
}
