import React from 'react';

import laoyoutStyle from './layout.module.scss';
import UserName from '../userName/userName';

const laoyout = (props) => {

  const { children } = props;

  return (
    <div className={laoyoutStyle.container}>
      <header>
        <UserName />
      </header>
      <div className={laoyoutStyle.content}>
        {children}
      </div>
      <footer>
        <span>
          <h6>&reg; Rolling Scopes School &copy; Yuri Kazliak</h6>
        </span>
      </footer>
    </div>
  )

}

export default laoyout;
