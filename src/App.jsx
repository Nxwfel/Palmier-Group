import { useState, useEffect } from 'react'
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'
import * as reactSpring from '@react-spring/three'
import * as drei from '@react-three/drei'
import * as fiber from '@react-three/fiber'
import { motion } from 'framer-motion'
import './App.css'

const websites = [
  {
    id: 1,
    title: "Palmier Auto",
    date: "October 13, 2025",
    launchDate: "2025-10-13T00:00:00",
    status: "launched",
    link: "https://palmierauto.example.com",
    buttonText: "Visit Website"
  },
  {
    id: 2,
    title: "Palmier Affaires",
    date: "June 23, 2026",
    launchDate: "2026-06-23T00:00:00",
    status: "launched",
    link: "https://palmieraffaires.example.com",
    buttonText: "Visit Website"
  },
  {
    id: 3,
    title: "Palmier Loc",
    date: "August 1, 2026",
    launchDate: "2026-08-01T00:00:00",
    status: "upcoming"
  },
  {
    id: 4,
    title: "Palmier Services",
    status: "tba"
  },
  {
    id: 5,
    title: "Palmier Travel",
    status: "tba"
  },
  {
    id: 6,
    title: "Palmier Drive",
    status: "tba"
  },
  {
    id: 7,
    title: "PalmierFormation",
    status: "tba"
  }
];

const Countdown = ({ targetDate }) => {
  const getTimeLeft = (dateStr) => {
    const total = Date.parse(dateStr) - Date.parse(new Date());
    if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(total / (1000 * 60 * 60 * 24)),
      hours: Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((total / 1000 / 60) % 60),
      seconds: Math.floor((total / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="countdown-timer">
      <div className="time-block"><span>{timeLeft.days}</span><small>d</small></div>
      <div className="time-block"><span>{timeLeft.hours}</span><small>h</small></div>
      <div className="time-block"><span>{timeLeft.minutes}</span><small>m</small></div>
      <div className="time-block"><span>{timeLeft.seconds}</span><small>s</small></div>
    </div>
  );
};

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

  const [isHovered, setIsHovered] = useState(false);

  // Auto-play interval
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, isHovered]);

  const handlePanEnd = (event, info) => {
    // Detect swipe left or right
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  return (
    <div className="app-container">
      <div className="background-effects">
        <ShaderGradientCanvas
          importedFiber={{ ...fiber, ...drei, ...reactSpring }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex:0
          }}
        >
          <ShaderGradient
            animate="on"
            axesHelper="off"
            brightness={1.2}
            cAzimuthAngle={170}
            cDistance={6.7}
            cPolarAngle={70}
            cameraZoom={1}
            color1="#008f68"
            color2="#b37d00"
            color3="#0b1110"
            destination="onCanvas"
            embedMode="off"
            envPreset="city"
            format="gif"
            fov={45}
            frameRate={10}
            gizmoHelper="hide"
            grain="off"
            lightType="3d"
            pixelDensity={1}
            positionX={0}
            positionY={0.9}
            positionZ={-0.3}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={45}
            rotationY={0}
            rotationZ={0}
            shader="defaults"
            type="waterPlane"
            uAmplitude={0}
            uDensity={1.2}
            uFrequency={0}
            uSpeed={0.2}
            uStrength={3.4}
            uTime={0}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </div>

      <div className="title-section">
        <h1>Palmier Group</h1>
      </div>

      <div className="carousel-wrapper">
        <motion.div 
          className="carousel"
          onPanEnd={handlePanEnd}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ touchAction: 'none' }}
        >
          {websites.map((site, index) => {
            let position = 'hidden';
            if (index === activeIndex) {
              position = 'center';
            } else if (index === (activeIndex - 1 + websites.length) % websites.length) {
              position = 'left';
            } else if (index === (activeIndex + 1) % websites.length) {
              position = 'right';
            }

            const themeClass = site.status === 'launched' ? 'theme-white' : site.status === 'tba' ? 'theme-bw' : 'theme-upcoming';

            return (
              <motion.div
                key={site.id}
                className={`card ${position} ${themeClass}`}
                onClick={() => goToSlide(index)}
                whileTap={{ scale: 0.95 }}
              >
                <div className="card-header">
                  <div className="header-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 6h16v12H4z" opacity="0.2"/>
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM9 17H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
                    </svg>
                  </div>
                  <span>Website Project</span>
                  {site.status === 'launched' && (
                    <a href={site.link} target="_blank" rel="noreferrer" className="external-link" onClick={(e) => e.stopPropagation()}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>

                <div className="card-image-placeholder">
                   <div className="gradient-blob amber"></div>
                   <div className="gradient-blob green"></div>
                </div>

                <div className="card-content">
                  <h2>{site.title}</h2>
                  <div className="details">
                    {site.date && (
                      <div className="detail-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        {site.date}
                      </div>
                    )}
                    <div className="detail-item status-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      {site.status === 'launched' ? 'Launched' : site.status === 'upcoming' ? 'Launching Soon' : 'To be announced'}
                    </div>
                  </div>

                  {site.status === 'launched' && (
                    <a href={site.link} target="_blank" rel="noreferrer" className="action-btn" onClick={(e) => e.stopPropagation()}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                      </svg>
                      {site.buttonText}
                    </a>
                  )}
                  {site.status === 'upcoming' && (
                    <div className="countdown-container">
                      <Countdown targetDate={site.launchDate} />
                    </div>
                  )}
                  {site.status === 'tba' && (
                    <div className="tba-placeholder">
                      <span>Coming Soon</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default App
