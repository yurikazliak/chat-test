import React, { Component } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { connect } from 'react-redux';

// import { connected, disconnected } from '../actions/websocketConnetion';
import { getMessages } from '../actions/getMessages';
import { connected } from '../actions/connectionStatus';
import Layout from '../layout/layout';
import List from '../list/list';
import Send from '../send/send';
import Notifications from '../notifications';
class App extends Component {
  constructor() {
    super()
    // this.state = {
    //   messages: [],
    //   open: false,
    //   connected: false,
    // }
    // this.socket = new ReconnectingWebSocket('ws://st-chat.shas.tel', null, { debug: false, reconnectInterval: 3000 });
    this.socket = new WebSocket('ws://st-chat.shas.tel');
    this.socket.onopen = () => {
      this.props.dispatch(connected());
    }
    this.socket.onmessage = (e) => {
      this.props.dispatch(getMessages({ messages: JSON.parse(e.data) }));
    }
    // this.socket.onopen = () => {
    //   this.setState({
    //     connected: true,
    //   })
    // }
    // this.sendMessage = this.sendMessage.bind(this)
  }

  // sendMessage(message) {
  //   if (this.state.connected) {
  //     this.socket.send(JSON.stringify({ from: 'pampers', message: `${message}` }))
  //   }
  // }

  componentDidMount() {
    // this.socket.send(JSON.stringify({ from: this.props.user, message: this.props.sendMessage }))
    // this.socket.onmessage = (e) => {
    //   this.setState({
    //     messages: JSON.parse(e.data).concat(this.state.messages)
    //   })
    // }
  }

  render() {
    return (
      <Layout>
        <Notifications />
        <List />
        <Send socket={this.socket} />
      </Layout>
    );
  }
}

const mapStateProps = (state) => {
  return {
    // sendMessage: state.userMessage.sendMessage,
    // connection: state.connection,
    user: state.user,
    messages: state.messages,

  }
};

export default connect(mapStateProps)(App);
