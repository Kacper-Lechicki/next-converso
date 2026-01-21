'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer',
        'bg-primary text-primary-foreground hover:bg-primary/90',
        isVisible
          ? 'translate-y-0 opacity-100 visible'
          : 'translate-y-4 opacity-0 invisible',
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};
