import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import { setUserName } from '../actions/setUserName';
import userNameStyles from './userName.module.scss';

const UserName = (props) => {

  const handleChange = (e) => {
    props.dispatch(setUserName({ userName: e.target.value }));
    localStorage.setItem('chatUserName', e.target.value);
  }

  const handleKeyUp = (e) => {
    const enterKey = 13;
    const escapeKey = 27
    if (e.keyCode === enterKey || e.keyCode === escapeKey) {

      return e.target.blur();
    }
  }

  return (
    <TextField
      className={userNameStyles.textField}
      label={`Your name: ${props.user}`}
      placeholder={props.user}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      variant="filled"
    />
  )
}

const mapStateProps = (state) => {
  return {
    user: state.user,
  }
};

export default connect(mapStateProps)(UserName);