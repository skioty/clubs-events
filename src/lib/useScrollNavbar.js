import { useEffect } from 'react';

export default function useScrollNavbar(ref) {
  useEffect(() => {
    const onScroll = () => {
      if (ref.current) {
        ref.current.classList.toggle('navbar-scrolled', window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);
}
