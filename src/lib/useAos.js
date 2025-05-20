'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function useAos() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
}
