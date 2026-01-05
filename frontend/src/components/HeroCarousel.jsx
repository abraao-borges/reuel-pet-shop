// HeroCarousel.jsx
import React, { useRef } from 'react';

const HeroCarousel = () => {
  const scrollRef = useRef(null);

  const moveSlide = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const slideWidth = current.offsetWidth;
      current.scrollBy({ left: direction * slideWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-container">
      <div className="carousel-scroll-wrapper" ref={scrollRef}>
        {[1, 2, 3].map((num) => (
          <div key={num} className="slide" style={{ backgroundImage: `url('/images/pet_banner_${num}.jpg')` }} />
        ))}
      </div>
      <button className="prev" onClick={() => moveSlide(-1)}>&#10094;</button>
      <button className="next" onClick={() => moveSlide(1)}>&#10095;</button>
    </section>
  );
};

export default HeroCarousel;