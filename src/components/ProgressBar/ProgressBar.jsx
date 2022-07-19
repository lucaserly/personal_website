import React, { useRef } from 'react';
import { useOnScreen } from '../../hooks';
import './ProgressBar.scss';

const adjust = (color, amount) =>
  '#' +
  color
    .replace(/^#/, '')
    .replace(/../g, (color) =>
      (
        '0' +
        Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
      ).substr(-2)
    );

const ProgressBar = ({ color, skillLevel = '50%' }) => {
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  return (
    <div className='app__progressbar-container' ref={ref}>
      <div
        className={isVisible ? 'progress' : ''}
        style={{ backgroundColor: color, width: skillLevel }}
      ></div>
      <div
        className='progress-bar'
        style={{ backgroundColor: adjust(color, 100) }}
      ></div>
    </div>
  );
};

export default ProgressBar;
