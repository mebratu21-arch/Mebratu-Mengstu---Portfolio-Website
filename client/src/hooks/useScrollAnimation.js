import { useEffect } from 'react';

/**
 * useScrollAnimation Hook
 * Automatically handles intersection observer logic for fade-in animations on scroll.
 */
export function useScrollAnimation(selectors = '.animate-target') {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll(selectors);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selectors]);
}
