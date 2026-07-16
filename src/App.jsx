import { useState } from 'react'
import './App.css'

const websites = [
  {
    id: 1,
    title: "EcoTech Innovators",
    date: "March 15, 2024",
    time: "10:00 AM EST",
    location: "Green Valley",
    link: "https://example.com/ecotech",
    buttonText: "Visit Website"
  },
  {
    id: 2,
    title: "Amber Fields Dashboard",
    date: "June 22, 2024",
    time: "2:00 PM EST",
    location: "Global Remote",
    link: "https://example.com/amberfields",
    buttonText: "Visit Website"
  },
  {
    id: 3,
    title: "Nature's Palette Portfolio",
    date: "August 10, 2024",
    time: "9:00 AM EST",
    location: "Creative Studio",
    link: "https://example.com/naturespalette",
    buttonText: "Visit Website"
  },
  {
    id: 4,
    title: "Sustainable Solutions API",
    date: "November 5, 2024",
    time: "1:00 PM EST",
    location: "Tech Hub",
    link: "https://example.com/sustainable",
    buttonText: "Visit Website"
  },
  {
    id: 5,
    title: "Green Energy Portal",
    date: "January 12, 2025",
    time: "11:30 AM EST",
    location: "Innovation Center",
    link: "https://example.com/greenenergy",
    buttonText: "Visit Website"
  }
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % websites.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + websites.length) % websites.length);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="app-container">
      <div className="carousel-wrapper">
        <button className="nav-btn prev-btn" onClick={prevSlide}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="carousel">
          {websites.map((site, index) => {
            let position = 'hidden';
            if (index === activeIndex) {
              position = 'center';
            } else if (index === (activeIndex - 1 + websites.length) % websites.length) {
              position = 'left';
            } else if (index === (activeIndex + 1) % websites.length) {
              position = 'right';
            }

            return (
              <div
                key={site.id}
                className={`card ${position}`}
                onClick={() => goToSlide(index)}
              >
                <div className="card-header">
                  <div className="header-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 6h16v12H4z" opacity="0.2"/>
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM9 17H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
                    </svg>
                  </div>
                  <span>Website Project</span>
                  <a href={site.link} target="_blank" rel="noreferrer" className="external-link" onClick={(e) => e.stopPropagation()}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <div className="card-image-placeholder">
                   <div className="gradient-blob amber"></div>
                   <div className="gradient-blob green"></div>
                </div>

                <div className="card-content">
                  <h2>{site.title}</h2>
                  <div className="details">
                    <div className="detail-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      {site.date}
                    </div>
                    <div className="detail-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      {site.time}
                    </div>
                    <div className="detail-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {site.location}
                    </div>
                  </div>

                  <a href={site.link} target="_blank" rel="noreferrer" className="action-btn" onClick={(e) => e.stopPropagation()}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                    {site.buttonText}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <button className="nav-btn next-btn" onClick={nextSlide}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="background-effects">
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>
      </div>
    </div>
  )
}

export default App
