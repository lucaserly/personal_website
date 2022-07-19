import React from 'react';
import { navigation } from '../constants';

const NavigationDots = ({ active }) => {
  return (
    <div className='app__navigation'>
      {navigation.map((item, index) => (
        //eslint-disable-next-line
        <a
          href={`#${item}`}
          key={item + index}
          className='app__navigation-dot'
          style={
            active === item ? { backgroundColor: 'var(--secondary-color)' } : {}
          }
        />
      ))}
    </div>
  );
};

export default NavigationDots;
