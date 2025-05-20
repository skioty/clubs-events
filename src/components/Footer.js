// components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer id="footer-container">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4" data-aos="fade-up">
            <h5 className="footer-heading">About</h5>
            <p className="footer-text">
              Our college clubs and events platform connects students with vibrant communities, fostering skill development and networking opportunities throughout your academic journey.
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
            <h5 className="footer-heading">Quick Links</h5>
            <a href="#" className="footer-link">Home</a>
            <a href="#clubs" className="footer-link">Clubs</a>
            <a href="#events" className="footer-link">Events</a>
            <a href="#gallery" className="footer-link">Activities</a>
            <a href="#about" className="footer-link">About</a>
          </div>

          {/* Contact Info */}
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
            <h5 className="footer-heading">Contact</h5>
            <a href="#" className="footer-link"><i className="fas fa-map-marker-alt me-2"></i> Karpandi: Phuentsholing, Bhutan</a>
            <a href="#" className="footer-link"><i className="fas fa-phone me-2"></i> +975 77713289</a>
            <a href="#" className="footer-link"><i className="fas fa-envelope me-2"></i> info@collegeclubsevents.edu</a>
          </div>
        </div>

        {/* Copyright */}
        <div className="copyright text-center mt-4">
          <p>© 2025 College Clubs & Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
