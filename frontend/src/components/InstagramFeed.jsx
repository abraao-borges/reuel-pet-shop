import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../apiConfig';

const InstagramFeed = () => { // <--- This line was missing!
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This part only runs once to fetch the data
    fetch(`${BACKEND_URL}/api/instagram_links`)
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => console.error('Erro:', error));
  }, []);

  // NEW: This useEffect runs every time 'posts' changes
  useEffect(() => {
    if (!loading && posts.length > 0) {
      if (window.instgrm) {
        // This tells Instagram to turn the <blockquote> into a real post
        window.instgrm.Embeds.process();
      } else {
        // If the script hasn't loaded yet, we can't process
        console.warn("Instagram embed script not found.");
      }
    }
  }, [posts, loading]); // Dependency array: run when these change

  if (loading) return null; // Optional: hide section while loading

  return (
    <section className="instagram-section">
      <div className="instagram-container">
        <h2 className="section-title">
          <i className="fab fa-instagram"></i> Siga-nos @reuelpetshop
        </h2>
        
        <div className="instagram-grid">
          {posts.map((url, idx) => (
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
}; // <--- Don't forget to close the function!

export default InstagramFeed;