import React, { useState, useEffect } from 'react';
import {
  AiFillEye,
  AiFillGithub,
  AiOutlineVideoCameraAdd,
} from 'react-icons/ai';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Portfolio.scss';
import videos from '../../constants/videos';
import { VideoModal } from '../../components';
import { useIsMobile } from '../../hooks';

const Portfolio = () => {
  const isMobile = useIsMobile();
  const [activeFilter, setactiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const query = '*[_type == "portfolio"]';
    client.fetch(query).then((data) => {
      const parsedData = data.map((el) => {
        if (el.title === 'Expense Tracker') el.video = videos.expense_tracker;
        return el;
      });
      setWorks(parsedData);
      setFilterWork(parsedData);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setactiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);
    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
      if (item === 'All') setFilterWork(works);
      else setFilterWork(works.filter((work) => work.tags.includes(item)));
    }, 500);
  };

  return (
    <>
      <VideoModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
      <h2 className='head-text'>
        <span>Portfolio</span> <br /> section
      </h2>
      <div className='app__portfolio-filter'>
        {[
          'All',
          'React',
          'React Native',
          'Python',
          'Web Apps',
          'Mobile Apps',
          'Open Source',
        ].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__portfolio-filter-item app__flex p-text ${
              activeFilter === item ? 'item-active' : ''
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className='app__portfolio'
      >
        {filterWork.map((work, index) => (
          <div className='app__portfolio-item app__flex' key={index}>
            <div className='app__portfolio-img app__flex'>
              <img src={urlFor(work.imgUrl)} alt={work.name} />
              {!isMobile && (
                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{
                    duration: 0.25,
                    ease: 'easeInOut',
                    staggerChildren: 0.5,
                  }}
                  className='app__portfolio-hover app__flex'
                >
                  <a href={work.projectLink} target='_blank' rel='noreferrer'>
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{
                        duration: 0.25,
                      }}
                      className='app__flex'
                    >
                      <AiFillEye />
                    </motion.div>
                  </a>
                  <a href={work.codeLink} target='_blank' rel='noreferrer'>
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className='app__flex'
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                  {work.video && (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a onClick={() => setIsModalOpen(true)}>
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.25 }}
                        className='app__flex'
                      >
                        <AiOutlineVideoCameraAdd />
                      </motion.div>
                    </a>
                  )}
                </motion.div>
              )}
            </div>

            <div className='app__portfolio-content app__flex'>
              <h4 className='bold-text' style={{ textAlign: 'center' }}>
                {work.title}
              </h4>
              <p
                className='p-text'
                style={{ marginTop: 10, textAlign: 'center' }}
              >
                {work.description}
              </p>
              <div className='app__portfolio-tag app__flex'>
                <p className='p-text'>{work.tags[0]}</p>
              </div>
              {isMobile && (
                <div className='app__portfolio-mobile'>
                  <a
                    href={work.projectLink}
                    target='_blank'
                    rel='noreferrer'
                    className='app__portfolio-item-mobile'
                  >
                    <AiFillEye size={25} />
                  </a>
                  <a
                    href={work.codeLink}
                    target='_blank'
                    rel='noreferrer'
                    className='app__portfolio-item-mobile'
                  >
                    <AiFillGithub size={25} />
                  </a>
                  {work.video && (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a
                      onClick={() => setIsModalOpen(true)}
                      className='app__portfolio-item-mobile'
                    >
                      <AiOutlineVideoCameraAdd size={25} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Portfolio, 'app__portfolio-container'),
  'portfolio',
  'app__primarybg'
);
