import React from 'react';
import { connect } from 'react-redux';

import sendStyle from './send.module.scss';
import { userMessage, sendMessage } from '../actions/userMessage';

const Send = (props) => {
// console.log('send', props.socket)
  const handleChange = (e) => {
    props.dispatch(userMessage({ userMessage: e.target.value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // props.dispatch(sendMessage({ sendMessage: props.userMessage }));
    props.dispatch(userMessage({ userMessage: '' }));
    if (props.connected) {
      props.socket.send(JSON.stringify({ from: props.user, message: props.userMessage }))
    }
  }
  
  return (
    <form
      className={sendStyle.sendForm}
      onSubmit={handleSubmit}
    >
      <input
        className={sendStyle.message}
        onChange={handleChange}
        value={props.userMessage}
        placeholder='Enter your message'
        type='text' />
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    // sendMessage: state.userMessage.sendMessage,
    userMessage: state.userMessage,
    user: state.user,
    connected: state.connected,
  }
}

export default connect(mapStateToProps)(Send);