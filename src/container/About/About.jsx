import React from 'react';
import './About.scss';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import { AboutListItem } from '../../components';
import { DiReact } from 'react-icons/di';
import {
  SiTypescript,
  SiApollographql,
  SiAngular,
  SiExpress,
  SiSequelize,
  SiMongodb,
  SiNestjs,
  SiGraphql,
  SiPostman,
  SiElasticsearch,
  SiMobx,
  SiRedux,
  SiSass,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';
import { FaNodeJs } from 'react-icons/fa';
import { GiKoala } from 'react-icons/gi';

const iconDefaultStyle = { width: '100%' };
const listDescStyle = {
  marginTop: '30px',
  marginBottom: '25px',
  letterSpacing: 1,
};

const About = () => {
  return (
    <>
      <div className='app__profiles'>
        <motion.div
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, type: 'tween' }}
          className='app__profile-item'
        >
          <h2 className='bold-text' style={{ color: 'var(--secondary-color)' }}>
            Frontend Developer
          </h2>
          <p className='p-text' style={listDescStyle}>
            Trying hard to build functional and good looking apps with:
          </p>
          <ul style={{ listStyleType: 'none' }}>
            <AboutListItem
              url='https://reactjs.org/'
              text='React'
              color='#61dafb'
              skillLevel='85%'
              icon={
                <DiReact
                  style={{
                    ...iconDefaultStyle,
                    height: '35px',
                    color: '#61dafb',
                  }}
                />
              }
            />
            <AboutListItem
              url='https://reactnative.dev/'
              text='React Native'
              color='#282c34'
              skillLevel='75%'
              icon={
                <TbBrandReactNative
                  style={{
                    ...iconDefaultStyle,
                    height: '35px',
                    color: '#282c34',
                  }}
                />
              }
            />
            <AboutListItem
              url='https://angular.io/'
              text='Angular'
              color='#c3002f'
              skillLevel='30%'
              icon={
                <SiAngular
                  style={{
                    ...iconDefaultStyle,
                    height: '35px',
                    color: '#c3002f',
                  }}
                />
              }
            />
            <AboutListItem
              url='https://www.typescriptlang.org/'
              text='TypeScript'
              color='#3178c6'
              skillLevel='75%'
              icon={
                <SiTypescript
                  style={{
                    ...iconDefaultStyle,
                    height: '28px',
                    color: '#3178c6',
                  }}
                />
              }
            />
            <AboutListItem
              url='https://www.apollographql.com/'
              text='Apollo GraphQL'
              color='#9126e4'
              skillLevel='70%'
              icon={
                <SiApollographql
                  style={{
                    ...iconDefaultStyle,
                    height: '28px',
                    color: '#9126e4',
                  }}
                />
              }
            />
            <AboutListItem
              url='https://mobx.js.org/README.html'
              text='MobX'
              color='#dd5c15'
              skillLevel='75%'
              icon={
                <SiMobx
                  style={{
                    ...iconDefaultStyle,
                    height: '28px',
                    color: '#dd5c15',
                  }}
                />
              }
            />
            <AboutListItem
              url='https://redux.js.org/'
              text='Redux'
              color='#764abc'
              skillLevel='50%'
              icon={
                <SiRedux
                  style={{
                    ...iconDefaultStyle,
                    height: '28px',
                    color: '#764abc',
                  }}
                />
              }
            />
            <AboutListItem
              url='https://sass-lang.com/'
              text='Sass'
              color='#cf649a'
              skillLevel='40%'
              icon={
                <SiSass
                  style={{
                    ...iconDefaultStyle,
                    height: '28px',
                    color: '#cf649a',
                  }}
                />
              }
            />
          </ul>
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, type: 'tween' }}
          className='app__profile-item'
        >
          <h2 className='bold-text'>Backend Developer</h2>
          <p className='p-text' style={listDescStyle}>
            Sometimes working in the back as well with:
          </p>
          <ul style={{ listStyleType: 'none' }}>
            <AboutListItem
              url='https://nodejs.org/en/'
              text='Node.js'
              color='#026e01'
              skillLevel='85%'
              icon={
                <FaNodeJs
                  style={{
                    ...iconDefaultStyle,
                    height: '35px',
                    color: '#026e01',
                  }}
                />
              }
            />
            <AboutListItem
              url='https://nestjs.com/'
              text='NestJS'
              color='#e0234e'
              skillLevel='70%'
              icon={
                <SiNestjs
                  style={{
                    ...iconDefaultStyle,
                    height: '35px',
                    color: '#e0234e',
                  }}
                />
              }
            />
            <AboutListItem
              url='https://expressjs.com/'
              text='Express'
              color='#010101'
              skillLevel='80%'
              icon={
                <SiExpress
                  style={{
                    ...iconDefaultStyle,
                    height: '35px',
                    color: '#010101',
                  }}
                />
              }
            />
            <AboutListItem
              url='https://koajs.com/'
              text='Koa'
              color='#010101'
              skillLevel='65%'
              icon={
                <GiKoala
                  style={{
                    ...iconDefaultStyle,
                    height: '35px',
                    color: '#010101',
                  }}
                />
              }
            />
            <AboutListItem
              url='https://sequelize.org/'
              text='Sequelize'
              color='#3b76c3'
              skillLevel='73%'
              icon={
                <SiSequelize
                  style={{
                    ...iconDefaultStyle,
                    height: '35px',
                    color: '#3b76c3',
                  }}
                />
              }
            />
            <AboutListItem
              url='https://www.mongodb.com/'
              text='MongoDB'
              color='#023430'
              skillLevel='55%'
              icon={
                <SiMongodb
                  style={{
                    ...iconDefaultStyle,
                    height: '35px',
                    color: '#023430',
                  }}
                />
              }
            />
            <AboutListItem
              url='https://www.elastic.co/'
              text='Elasticsearch'
              color='#fec513'
              skillLevel='30%'
              icon={
                <SiElasticsearch
                  style={{
                    ...iconDefaultStyle,
                    height: '35px',
                    color: '#fec513',
                  }}
                />
              }
            />

            <AboutListItem
              url='https://graphql.org/'
              text='GraphQL'
              color='#e00098'
              skillLevel='75%'
              icon={
                <SiGraphql
                  style={{
                    ...iconDefaultStyle,
                    height: '35px',
                    color: '#e00098',
                  }}
                />
              }
            />

            <AboutListItem
              url='https://www.postman.com/'
              text='Postman'
              color='#F26B3A'
              skillLevel='80%'
              icon={
                <SiPostman
                  style={{
                    ...iconDefaultStyle,
                    height: '35px',
                    color: '#F26B3A',
                  }}
                />
              }
            />
          </ul>
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg'
);
