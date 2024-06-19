// components/theme-toggle/ThemeToggle.js
import React, {useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './ThemeToggle.module.scss';

export const defaultProperties = {
  dark: {
    sun: { r: 9, cx: '50%', cy: '50%' },
    moon: { r: 10, cx: '25%', cy: '25%' },
    svg: { transform: 'rotate(100deg)' },
    beams: { opacity: 0 },
    sunColor: '#FFFFFF', // White for dark mode
    moonColor: '#000000' // Dark for dark mode
  },
  light: {
    sun: { r: 6, cx: '50%', cy: '50%' },
    moon: { cx: '-30%', cy: '30%' },
    svg: { transform: 'rotate(40deg)' },
    beams: { opacity: 1 },
    sunColor: '#000000', // Dark for light mode
    moonColor: '#FFFFFF' // White for light mode
  },
  springConfig: { mass: 4, tension: 250, friction: 35 }
};

function ThemeToggle({ mode, toggleMode }) {
  const svgProps = useSpring({
    ...defaultProperties[mode].svg,
    config: defaultProperties.springConfig,
  });

  const sunProps = useSpring({
    ...defaultProperties[mode].sun,
    config: defaultProperties.springConfig,
  });

  const moonProps = useSpring({
    ...defaultProperties[mode].moon,
    config: defaultProperties.springConfig,
  });

  const sunBeamsProps = useSpring({
    ...defaultProperties[mode].beams,
    config: defaultProperties.springConfig,
  });

  useEffect(() => {
    // Example of safe DOM manipulation
    const element = document.getElementById('some-element');
    if (element) {
      // Do something with the element
    }

    return () => {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element); // Safe cleanup
      }
    };
  }, []);

  return (
      <button
          type="button"
          id="theme-toggle"
          title="Toggles light & dark"
          aria-label="auto"
          aria-live="polite"
          className={`${styles['theme-toggle-button']} ${mode === 'dark' ? styles['dark-mode'] : ''}`}
          onClick={toggleMode}
      >
        <animated.svg
            xmlns="http://www.w3.org/2000/svg"
            className="sun-and-moon"
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke={defaultProperties[mode].sunColor}
        >
          <mask id="moon-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <animated.circle style={moonProps} fill="black" />
          </mask>
          <animated.circle
              className="sun"
              mask="url(#moon-mask)"
              fill={defaultProperties[mode].sunColor}
              style={sunProps}
          />
          <animated.g className="sun-beams" stroke={defaultProperties[mode].sunColor} style={sunBeamsProps}>
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </animated.g>
        </animated.svg>
      </button>
  );
}

export { ThemeToggle };
