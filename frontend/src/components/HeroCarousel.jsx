// HeroCarousel.jsx
import React, { useRef } from 'react';

const HeroCarousel = () => {
  const scrollRef = useRef(null);

  const moveSlide = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const slideWidth = current.offsetWidth;
      const maxScroll = current.scrollWidth - slideWidth;
      const currentScroll = current.scrollLeft;

      if (direction === 1 && currentScroll >= maxScroll - 5) {
        current.scrollTo({ left: 0, behavior: 'smooth' });
      } 
      else if (direction === -1 && currentScroll <= 5) {
        current.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } 
      else {
        current.scrollBy({ left: direction * slideWidth, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="hero-container">
      <div className="carousel-scroll-wrapper" ref={scrollRef}>
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="slide">
            <img
              src={`/images/pet_banner_${num}.png`}
              alt={`Banner ${num}`}
              className="slide-img"
            />
          </div>
        ))}
      </div>
      <button className="prev" onClick={() => moveSlide(-1)}>&#10094;</button>
      <button className="next" onClick={() => moveSlide(1)}>&#10095;</button>
    </section>
  );
};

export default HeroCarousel;