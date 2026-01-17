import React, { useEffect, useState } from 'react';

const InstagramFeed = () => {
  const postUrls = [
    "https://www.instagram.com/p/DSc0d0gEQ5z/",
    "https://www.instagram.com/p/DSc0W3gkflt/",
    "https://www.instagram.com/p/DSc0GBlEffR/",
    "https://www.instagram.com/p/DTJCci5kREw/",
    "https://www.instagram.com/p/DS7O5BKkYzw/",
    "https://www.instagram.com/p/DS5En7okWBm/",
  ];

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const BACKEND_URL = "https://reuel-pet-shop.onrender.com";

    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }

    fetch(`${BACKEND_URL}/api/instagram_links`)
      .then(response => {
        if (!response.ok) throw new Error('Resposta de rede não foi ok');
        return response.json();
      })
      .then(data => {
        console.log("Links do Instagram carregados:", data);
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro:', error);
        setLoading(false);
      });
  }, []);

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
};

export default InstagramFeed;