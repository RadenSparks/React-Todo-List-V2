// components/Parallax.jsx
import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const Parallax = ({ children, backgroundImage }) => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const props = useSpring({
    backgroundPosition: `center ${scrollY * 0.5}px`, // Adjust the multiplier for speed
  });

  return (
    <animated.div style={{ 
      ...props, 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover', 
      height: '100vh', 
      position: 'relative' 
    }}>
      {children}
    </animated.div>
  );
};

export default Parallax;
