import React from 'react';
import { connect } from 'react-redux';

import { connected, disconnected } from '../actions/websocketConnetion';

const ConnectionButtons = (props) => {
  const socket = new WebSocket('ws://st-chat.shas.tel');

  return (
    <>
      <button
        style={{
          width: '100px',
          height: '25px',
        }}
        onClick={() => {
          socket.onmessage = (e) => {
            props.dispatch(connected({ messages: JSON.parse(e.data) }));
          }
        }}
      >Connect</button>
      <button
        style={{
          width: '100px',
          height: '25px',
        }}
        onClick={() => {
          socket.close(1000, 'close');
          props.dispatch(disconnected());
        }}
      >Disconnect</button>
    </>
  )
}

const mapStateProps = (state) => {
  return {
    connection: state.connection,
  }
};

export default connect(mapStateProps)(ConnectionButtons);