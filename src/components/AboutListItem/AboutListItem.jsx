import React, { useRef } from 'react';
import { useOnScreen } from '../../hooks';
import ProgressBar from '../ProgressBar/ProgressBar';
import './AboutListItem.scss';

const AboutListItem = ({ url, text, color, icon, skillLevel }) => {
  const ref = useRef();
  const isVisible = useOnScreen(ref);
  return (
    <li className='app__aboutlistitem' ref={ref}>
      <div
        className={
          isVisible
            ? 'app__aboutlistitem-icon visible'
            : 'app__aboutlistitem-icon'
        }
      >
        {icon}
      </div>
      <a
        href={url}
        target='_blank'
        rel='noreferrer'
        style={{
          color,
        }}
        className='p-text'
      >
        {text}
      </a>
      <ProgressBar color={color} skillLevel={skillLevel} />
    </li>
  );
};

export default AboutListItem;
