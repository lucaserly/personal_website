import React from 'react';
import { BsTwitter, BsInstagram, BsLinkedin, BsGithub } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { GrDocumentPdf } from 'react-icons/gr';
import cv from '../constants/cv';

const SocialMedia = () => {
  return (
    <div className='app__social'>
      <div>
        <GrDocumentPdf
          onClick={() => window.open(cv.lucas_erlacher, '_blank')}
        />
      </div>
      <div>
        <BsLinkedin
          onClick={() =>
            window.open('https://linkedin.com/in/lucaserlacher', '_blank')
          }
        />
      </div>
      <div>
        <BsGithub
          onClick={() => window.open('https://github.com/lucaserly', '_blank')}
        />
      </div>
      <div>
        <BsTwitter
          onClick={() =>
            window.open('https://twitter.com/lucas_erlacher', '_blank')
          }
        />
      </div>
      <div>
        <FaFacebookF
          onClick={() =>
            window.open('https://www.facebook.com/lucas.erlacher', '_blank')
          }
        />
      </div>
      <div>
        <BsInstagram
          onClick={() =>
            window.open('https://www.instagram.com/lucas.erl/', '_blank')
          }
        />
      </div>
    </div>
  );
};

export default SocialMedia;
