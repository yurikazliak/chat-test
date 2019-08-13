import React from 'react';
import { connect } from 'react-redux';
 
import Portal from './portal';
import Notification from './notification';

const notification = (props) => {
  console.log('notif', props.messages)
  if (props.messages.length > 0) {

    console.log('notif - length ', props.messages[props.messages.length - 1])
  }
  return (
    <Portal>
      <Notification />
    </Portal>
  )
}

const mapState = (state) => {
  return {
    notifications: state.notifications,
    messages: state.messages,
  }
}

export default connect(mapState)(notification);