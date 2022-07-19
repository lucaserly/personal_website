import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Experience.scss';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [activeFilter, setactiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [filteredExperience, setFilteredExperience] = useState([]);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    client.fetch(query).then((data) => {
      const sortedData = data.sort((a, b) => a.order - b.order);
      setExperiences(sortedData);
      setFilteredExperience(sortedData);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setactiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
      if (item === 'All') setFilteredExperience(experiences);
      else
        setFilteredExperience(
          experiences.filter((experience) => experience.company === item)
        );
    }, 500);
  };

  return (
    <>
      <h2 className='head-text'>Experience</h2>
      <div className='app__experience-filter'>
        {['All', ...experiences.map((experience) => experience.company)].map(
          (item, index) => (
            <div
              key={index}
              onClick={() => handleWorkFilter(item)}
              className={`app__experience-filter-item app__flex p-text ${
                activeFilter === item ? 'item-active' : ''
              }`}
            >
              {item}
            </div>
          )
        )}
      </div>
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className='app__experience'
      >
        {filteredExperience.length > 0 &&
          filteredExperience.map((experience) => {
            return (
              <motion.div
                className='app__experience-item'
                key={experience.company}
              >
                <div className='app__experience-item-left'>
                  <img
                    src={urlFor(experience.logo)}
                    alt='logo'
                    style={{ height: '90px', cursor: 'pointer' }}
                    onClick={() => window.open(experience.url, '_blank')}
                  />
                </div>

                <div className='app__experience-item-right'>
                  <div className='app__experience-item-right-title'>
                    <span className='p-text'>{experience.jobTitle}</span>{' '}
                    <span
                      className='p-text'
                      style={{
                        color: 'var(--secondary-color)',
                        fontWeight: 'bold',
                      }}
                    >
                      {' '}
                      @{' '}
                      <a
                        href={experience.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{
                          textDecoration: 'none',
                          color: 'var(--secondary-color)',
                        }}
                      >
                        {experience.company}
                      </a>
                    </span>
                  </div>

                  <p style={{ marginBottom: '10px' }}>
                    {experience.dateStart} - {experience.dateEnd} -{' '}
                    {experience.location}
                  </p>
                  <ul>
                    {experience.description &&
                      experience.description
                        .split('/n')
                        .map((el, index) => <li key={index}>{el}</li>)}
                  </ul>
                </div>
              </motion.div>
            );
          })}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Experience, 'app__experience'),
  'experience',
  'app__whitebg'
);
