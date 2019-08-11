import React, { Component } from 'react';

import Layout from '../layout/layout';
import List from '../list/list';
import Send from '../send/send';
class App extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      open: false,
      connected: false,
    }
    this.socket = new WebSocket('ws://st-chat.shas.tel');
    this.socket.onopen = () => {
      this.setState({
        connected: true,
      })
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  sendMessage(message) {
    if (this.state.connected) {
      this.socket.send(JSON.stringify({ from: 'pampers', message: `${message}` }))
    }
  }

  componentDidMount() {
    this.socket.onmessage = (e) => {
      this.setState({
        messages: JSON.parse(e.data).concat(this.state.messages)
      })
    }
  }

  render() {
    console.log(this.state.messages[0])
    return (
      <Layout>
        <List messages={this.state.messages} />
        <Send sendMessage={this.sendMessage} />
      </Layout>
    );
  }
}

export default App;
