import React, { useState } from 'react';
import './Navbar.scss';
import { audios, navigation } from '../../constants';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { MdMusicOff, MdMusicNote } from 'react-icons/md';
const audioElement = new Audio(audios.risingsun);
audioElement.loop = true;

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);

  return (
    <nav className='app__navbar'>
      <div className='app__navbar-audio'>
        {!playAudio ? (
          <MdMusicOff
            onClick={() => {
              setPlayAudio(true);
              audioElement.play();
            }}
          />
        ) : (
          <MdMusicNote
            className='app__navbar-audio-icon'
            onClick={() => {
              setPlayAudio(false);
              audioElement.pause();
            }}
            style={{ color: 'var(--secondary-color)' }}
          />
        )}
      </div>
      <ul className='app__navbar-links'>
        {navigation.map((item) => (
          <li className='app__flex p-text' key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>
      <div className='app__navbar-menu'>
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {navigation.map((item) => (
                <li key={item} onClick={() => setToggle(false)}>
                  <a href={`#${item}`}>{item}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
