import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { setUserName } from '../actions/setUserName';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '10em'
  },
  textField: {
    fontSize: '1em',
    margin: '0.5em 0.8em',
  },
}))

const UserName = (props) => {
  const classes = useStyles();

  const handleChange = (e) => {
    props.dispatch(setUserName({ userName: e.target.value }));
    localStorage.setItem('chatUserName', e.target.value);
  }

  const handleKeyUp = (e) => {
    const enterKey = 13;
    const escapeKey = 27
    if (e.keyCode === enterKey || e.keyCode === escapeKey) return e.target.blur();
  }

  return (
    <TextField
      label={`Your name: ${props.user}`}
      placeholder={props.user}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      className={classes.textField}
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