'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'animate.css/animate.min.css';
import 'aos/dist/aos.css';
import './globals.css';

// Import your components
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Explore from '../components/Explore';
import Events from '../components/Events';
import ParticipationSection from '../components/ParticipationSection';
import Activities from '../components/Activities';
import Clubs from '../components/Clubs';
import Footer from '../components/Footer';
import Modals from '../components/Modals';
import ClubModals from '../components/Club-modals';
import EventModals from '../components/Event-modals';

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect to signin if not authenticated
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  // Show loading state if session is still being fetched
  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render the main content
  if (!session) {
    return null;
  }

  return (
    <>
      <a href="#" className="back-to-top" id="backToTop">
        <i className="fas fa-arrow-up"></i>
      </a>

      <Navbar />
      <Carousel />
      <Explore />
      <Events />
      <ParticipationSection />
      <Activities />
      <Clubs />
      <Footer />

      {/* Modals */}
      <Modals />
      <ClubModals />
      <EventModals />
    </>
  );
};

export default Page;
