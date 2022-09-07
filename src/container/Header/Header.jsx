import React, { useState, useEffect, useRef } from 'react';
import './Header.scss';
import { motion } from 'framer-motion';
import { images } from '../../constants';
import { AppWrap } from '../../wrapper';
import { useIsMobile, useOnScreen } from '../../hooks';

const variants = {
  show: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 6.6,
      type: 'spring',
    },
  },
  hide: {
    opacity: 0,
  },
};

const placeholderText = [
  { text: '👨‍💻 Full-stack Developer', img: images.developer },
  { text: '🆓 Freelancer', img: images.avatar_2 },
  { text: '⛷ Ski Instructor', img: images.skier },
  { text: '🏌️‍♂️ Golf Instructor', img: images.golfer },
];

const Header = () => {
  const isMobile = useIsMobile();
  const ref = useRef();
  const isVisible = useOnScreen(ref);
  const [state, setState] = useState(placeholderText[0]);

  useEffect(() => {
    const to = setInterval(() => {
      setState((oldState) => {
        const currentIndex = placeholderText.indexOf(oldState);
        const nextIndex =
          -1 === currentIndex || currentIndex === placeholderText.length - 1
            ? 0
            : currentIndex + 1;
        return placeholderText[nextIndex];
      });
    }, 7000);

    return () => clearInterval(to);
  }, []);

  return (
    <>
      <div
        className='app__header app__flex'
        style={isMobile ? { paddingTop: '3%' } : {}}
      >
        <motion.div
          whileInView={{ x: [-100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          className='app__header-info'
        >
          <div className='app__header-badge' ref={ref}>
            <div className='badge-cmb'>
              <span
                className={isVisible ? 'waving visible' : 'waving'}
                style={{ display: 'inline-block' }}
              />
              <span
                style={{
                  display: 'inline-block',
                  marginRight: '1rem',
                  marginLeft: '0rem',
                }}
              >
                ,
              </span>
              <span
                style={{
                  display: 'inline-block',
                  marginRight: '1rem',
                }}
              >
                I
              </span>
              <span
                style={{
                  display: 'inline-block',
                  marginRight: '1rem',
                }}
              >
                am
              </span>

              {['L', 'u', 'c', 'a', 's'].map((letter) => (
                <h1
                  style={{ display: 'inline', marginRight: 5 }}
                  className='head-text'
                  key={letter}
                >
                  {letter}
                </h1>
              ))}

              <span
                style={{
                  display: 'inline',
                  marginRight: '1rem',
                  marginLeft: '1rem',
                }}
              >
                from
              </span>
              <span
                className='flag'
                style={{ display: 'inline-block', marginLeft: 5 }}
              />
            </div>

            <div className='tag-cmp'>
              <motion.div
                key={state.text}
                variants={variants}
                animate={'show'}
                initial='hide'
              >
                <span className='p-text'>{state.text}</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, delayChildren: 0.5 }}
          className='app__header-img'
        >
          <motion.img
            whileInView={{ scale: [0, 1] }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            variants={variants}
            animate={'show'}
            initial='hide'
            key={state.img}
            src={state.img}
            alt='profile-avatar'
            className='profile-avatar'
          />
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(Header, 'home');
