import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import sendStyle from './send.module.scss';
import { userMessage } from '../actions/userMessage';
import { getOfflineMessages } from '../actions/offlineMessages';

const Send = (props) => {

  const handleChange = (e) => {
    props.dispatch(userMessage({ userMessage: e.target.value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(userMessage({ userMessage: '' }));
    if (props.connected) {
      props.socket.send(JSON.stringify({ from: props.user, message: props.userMessage }))
    } else {
      props.dispatch(getOfflineMessages({ offlineMessage: props.userMessage }))
    }
  }

  return (
    <form
      className={sendStyle.sendForm}
      onSubmit={handleSubmit}
    >
      <TextField
        label='Enter your message'
        className={sendStyle.textField}
        variant="filled"
        onChange={handleChange}
        value={props.userMessage}
        placeholder='Enter your message'
        type='text'
      />
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    userMessage: state.userMessage,
    user: state.user,
    connected: state.connected,
    offlineMessages: state.offlineMessages,
  }
}

export default connect(mapStateToProps)(Send);