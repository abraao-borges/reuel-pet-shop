import React, { useEffect } from 'react';

const InstagramFeed = () => {
  const postUrls = [
    "https://www.instagram.com/p/DSc0d0gEQ5z/",
    "https://www.instagram.com/p/DSc0W3gkflt/",
    "https://www.instagram.com/p/DSc0GBlEffR/"
  ];

  useEffect(() => {
    // This checks if the Instagram script is loaded and re-processes the embeds
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, []); // Empty array means this runs once when the component mounts

  return (
    <section className="instagram-section">
      <div className="instagram-container">
        <h2 className="section-title"><i className="fab fa-instagram"></i> Siga-nos @reuelpetshop</h2>
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