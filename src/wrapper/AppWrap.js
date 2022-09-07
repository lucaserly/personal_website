import React from 'react';
import { NavigationDots, SocialMedia } from '../components';
import { useIsMobile } from '../hooks';

const AppWrap = (Component, idName, classNames) =>
  function HOC(props) {
    const isMobile = useIsMobile();
    return (
      <div id={idName} className={`app__container ${classNames}`}>
        {!isMobile && <SocialMedia />}
        <div className='app__wrapper app__flex'>
          <Component {...props} />
          <div className='copyright'>
            <p>@2022 LUCAS</p>
            <p>All rights reserved</p>
          </div>
        </div>
        <NavigationDots active={idName} />
      </div>
    );
  };

export default AppWrap;
