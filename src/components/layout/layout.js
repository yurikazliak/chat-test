import React from 'react';
import { connect } from 'react-redux';

import laoyoutStyle from './layout.module.scss';
import UserName from '../userName/userName';

const laoyout = (props) => {

  const { children, user } = props;
  return (
    <>
      <div className={laoyoutStyle.container}>
        <header>
          <h3>Hello, {user} !</h3>
          <UserName />
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

const mapStateProps = (state) => {
  return {
    user: state.user,
  }
};

export default connect(mapStateProps)(laoyout);
