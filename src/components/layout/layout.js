import React from 'react';

import laoyoutStyle from './layout.module.scss';

const laoyout = ({ children }) => {
  return (
    <>
      <div className={laoyoutStyle.container}>
        <header>
          <h3>Hello! This is my chat</h3>
        </header>
        <div className={laoyoutStyle.content}>
          {children}
        </div>
        <footer>
          <span>
            <h6>(c) Yuri Kazliak</h6>
          </span>
        </footer>
      </div>
    </>
  )
}

export default laoyout;
