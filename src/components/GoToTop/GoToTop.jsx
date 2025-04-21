import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300); 
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-black text-white shadow-lg hover:bg-black/80 focus:outline-none transition-transform transform hover:scale-110"
      >
        <ArrowUp size={24} />
      </button>
    )
  );
};

export default GoToTop;
