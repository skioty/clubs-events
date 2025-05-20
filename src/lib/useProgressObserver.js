import { useEffect } from 'react';

export default function useProgressObserver(ref) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = ref.current.querySelectorAll('.progress-bar');
          bars.forEach(bar => {
            const value = bar.getAttribute('aria-valuenow');
            bar.style.width = '0%';
            bar.animate([{ width: '0%' }, { width: `${value}%` }], {
              duration: 1000,
              fill: 'forwards'
            });
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);
}
