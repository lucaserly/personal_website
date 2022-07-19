import React from 'react';
import videos from '../../constants/videos';
import './VideoModal.scss';
import { BsSkipBackward } from 'react-icons/bs';

const VideoModal = ({ isOpen, closeModal }) => {
  const containerClass = isOpen ? 'app__video-modal show' : 'app__video-modal';
  return (
    <div className={containerClass}>
      <div className='app__video-modal-content'>
        <BsSkipBackward
          className='app__video-modal-exit'
          onClick={closeModal}
        />
        {/* <div style={{ width: '400px', height: '800px' }}>
        </div> */}
        {/* <video controls playsInline autoPlay muted>
          <source src={videos.expense_tracker} type='video/webm' />
        </video> */}
        <video
          controls
          playsInline
          autoPlay
          muted
          src={videos.expense_tracker}
        ></video>
      </div>
    </div>
  );
};

export default VideoModal;
