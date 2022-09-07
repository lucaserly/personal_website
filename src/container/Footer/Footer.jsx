import React, { useState } from 'react';
import './Footer.scss';

import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import { images } from '../../constants';
import cv from '../../constants/cv';
import { SocialMedia } from '../../components';
import { useIsMobile } from '../../hooks';

const Footer = () => {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name,
      email,
      message,
    };

    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    });
  };

  return (
    <>
      <h2 className='head-text'>Get in Touch</h2>
      {isMobile && <SocialMedia />}
      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt='email' />
          <a href='mailto:l.erlacher@icloud.com' className='p-text'>
            l.erlacher@icloud.com
          </a>
        </div>
        <div className='app__footer-card'>
          <img src={images.mobile} alt='mobile' />
          <a href='tel: +39 3519160641' className='p-text'>
            +39 3519160641
          </a>
        </div>
        <div
          className='app__footer-card'
          onClick={() => window.open(cv.lucas_erlacher, '_blank')}
        >
          <span className='p-text'>Download CV</span>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className='app__footer-form app__flex'>
          <div className='app__flex'>
            <input
              className='p-text'
              type='text'
              name='name'
              placeholder='Your Name'
              value={name}
              onChange={handleChangeInput}
            />
          </div>
          <div className='app__flex'>
            <input
              className='p-text'
              type='email'
              name='email'
              placeholder='Your Email'
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className='p-text'
              palceholder='Your Message'
              value={message}
              name='message'
              onChange={handleChangeInput}
            />
          </div>
          <button type='button' className='p-text' onClick={handleSubmit}>
            {loading ? 'Sending' : 'Send Message'}
          </button>
        </div>
      ) : (
        <h3 className='head-text'>Thank you for getting in touch</h3>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__primarybg'
);
