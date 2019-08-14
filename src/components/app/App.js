import React, { Component } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { connect } from 'react-redux';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import { connected, disconnected } from '../actions/websocketConnetion';
import { getMessages } from '../actions/getMessages';
import { connected } from '../actions/connectionStatus';
import Layout from '../layout/layout';
import List from '../list/list';
import Send from '../send/send';
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
  // notify() {
  //   toast.info(`${this.props.lastMessage.from} : ${this.props.lastMessage.message}`);
  // }
  notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("Hi there!");
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Hi there!");
        }
      });
    }

    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
  }

  componentDidMount() {
    // this.socket.send(JSON.stringify({ from: this.props.user, message: this.props.sendMessage }))
    // this.socket.onmessage = (e) => {
    //   this.setState({
    //     messages: JSON.parse(e.data).concat(this.state.messages)
    //   })
    // }
    Notification.requestPermission().then((result) => {
      if (result === 'denied') {
        console.log(result)
      }
    });
  }

  render() {
    if (this.props.lastMessage.time && (this.props.lastMessage.time - new Date().getTime() < 4000)) {
      // this.notifyMe();
      // new Notification(`${this.props.lastMessage.from}: ${this.props.lastMessage.message}`);
      // this.notify();
      const spawnNotification = (title, body) => {
        var options = {
          body: body,
          // icon: icon
        };
        // const title = this.props.lastMessage.from;
        const newNotif = new Notification(title, options);
        setTimeout(newNotif.close.bind(newNotif), 4000);
      }
      spawnNotification(this.props.lastMessage.from, this.props.lastMessage.message);
    }
    return (
      <>
        {/* <ToastContainer /> */}
        <Layout>
          <List />
          <Send socket={this.socket} />
        </Layout>
      </>
    );
  }
}

const mapStateProps = (state) => {
  return {
    // sendMessage: state.userMessage.sendMessage,
    // connection: state.connection,
    user: state.user,
    messages: state.messages.messages,
    lastMessage: state.messages.lastMessage,
  }
};

export default connect(mapStateProps)(App);
