import { useEffect, useRef } from 'react';

const useRevealOnScroll = () => {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.unobserve(el);
  }, []);

  return ref;
};

export default useRevealOnScroll;
