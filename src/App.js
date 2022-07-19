import React from 'react';
import { About, Footer, Header, Experience, Portfolio } from './container';
import { Navbar } from './components';
import './App.scss';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Header />
      <About />
      <Portfolio />
      <Experience />
      <Footer />
    </div>
  );
};

export default App;
