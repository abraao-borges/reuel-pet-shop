import React, { useEffect } from 'react';

const InstagramFeed = () => {
  // Add as many URLs as you want here. The grid will handle them automatically.
  const postUrls = [
    "https://www.instagram.com/p/DSc0d0gEQ5z/",
    "https://www.instagram.com/p/DSc0W3gkflt/",
    "https://www.instagram.com/p/DSc0GBlEffR/",
    "https://www.instagram.com/p/DTJCci5kREw/",
    "https://www.instagram.com/p/DS7O5BKkYzw/",
    "https://www.instagram.com/p/DS5En7okWBm/",
  ];

  useEffect(() => {
    // Force Instagram to re-render embeds when component mounts
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <section className="instagram-section">
      <div className="instagram-container">
        <h2 className="section-title">
          <i className="fab fa-instagram"></i> Siga-nos @reuelpetshop
        </h2>
        
        <div className="instagram-grid">
          {postUrls.map((url, idx) => (
            <div key={idx} className="insta-embed-wrapper">
              <blockquote 
                className="instagram-media" 
                data-instgrm-permalink={url} 
                data-instgrm-version="14"
              >
                <a href={url}></a>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;