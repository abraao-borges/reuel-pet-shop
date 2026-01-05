// This function moves the scrollbar of the container
window.moveSlide = function(n) {
    const wrapper = document.querySelector('.carousel-scroll-wrapper');
    
    if (!wrapper) {
        console.error("Carousel wrapper not found!");
        return;
    }

    // Get the width of one slide (usually 100% of screen)
    const slideWidth = wrapper.offsetWidth;

    // Scroll smoothly to the next position
    wrapper.scrollBy({
        left: n * slideWidth,
        behavior: 'smooth'
    });
}

// Optional: Auto-scroll every 5 seconds
setInterval(() => {
    // If we are at the end, scroll back to start?
    // For simple scroll snapping, just keeping scrolling right is easiest
    const wrapper = document.querySelector('.carousel-scroll-wrapper');
    if (wrapper) {
        // If we are at the end, reset to 0
        if (wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth) {
            wrapper.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            moveSlide(1);
        }
    }
}, 5000);