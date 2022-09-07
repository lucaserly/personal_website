import React, { useState } from 'react';
import {
  About,
  Footer,
  Header,
  Experience,
  Portfolio,
  Hobbies,
} from './container';
import { Navbar } from './components';
import './App.scss';
import { images } from './constants';
import { motion } from 'framer-motion';

const App = () => {
  const [isLoading, setIsloading] = useState(true);
  setTimeout(() => setIsloading(false), 2000);
  return (
    <div className='app'>
      {isLoading ? (
        <motion.div
          whileInView={{ opacity: [1, 0] }}
          transition={{ duration: 2.5 }}
          className='app__spinning-logo-container'
        >
          <img src={images.avatar} alt='logo' className='app__spinning-logo' />
        </motion.div>
      ) : (
        <>
          <Navbar />
          <Header />
          <About />
          <Portfolio />
          <Experience />
          <Footer />
          <Hobbies />
        </>
      )}
    </div>
  );
};

export default App;
