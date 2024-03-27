import { useEffect } from 'react';
import WOW from 'wow.js';

const useWowAnimation = () => {
  useEffect(() => {
    const wow = new WOW({
      scrollContainer: "#root"
    });
    wow.init();
  }, []);
};

export default useWowAnimation;
