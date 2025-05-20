// components/ParticipationSection.jsx
'use client';
import React, { useRef } from 'react';
import useProgressObserver from '../lib/useProgressObserver';

const ParticipationSection = () => {
  const sectionRef = useRef(null);
  useProgressObserver(sectionRef); // 👈 Observes scroll to trigger animation

  return (
    <section ref={sectionRef} id="participation-container" className="participation-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6" data-aos="fade-right">
            <img src="participation.jpg" alt="Participation" className="participation-img" />
          </div>
          <div className="col-md-6" data-aos="fade-left">
            <div className="participation-content">
              <h2 className="participation-title">Ready to participate?</h2>
              <p className="participation-text">
                Discover the most active clubs on campus and find your perfect fit. Engage with like-minded peers, develop leadership skills, and make the most of your college experience.
              </p>
              <div className="club-stats">
                {[ 
                  { name: 'ACM Club', width: 85 },
                  { name: 'Multimedia Club', width: 88 },
                  { name: 'Radio Club', width: 72 },
                  { name: 'Y-pheer Club', width: 92 },
                  { name: 'Sports Club', width: 78 }
                ].map((club, index) => (
                  <div className="club-stat" key={index}>
                    <div className="club-stat-name">{club.name}</div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${club.width}%` }}
                        aria-valuenow={club.width}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn join-btn">Join a Club Today</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParticipationSection;
