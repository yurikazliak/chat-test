import React, { Component } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { connect } from 'react-redux';

// My components
import Layout from '../components/layout/layout';
import List from '../components/list/list';
import Send from '../components/send/send';

// My actions
import { getMessages } from '../store/actions/getMessages';
import { connected, disconnected } from '../store/actions/connectionStatus';
import { visible, hidden } from '../store/actions/windowVisibility';
import { visibleTime, hiddenTime } from '../store/actions/visibilityTime';
import { addNotifMessages, resetNotifMessages } from '../store/actions/notifyMessages';
import { resetOfflineMessages } from '../store/actions/offlineMessages';

class App extends Component {
  constructor() {
    super()
    this.socket = new ReconnectingWebSocket('wss://wssproxy.herokuapp.com/', null, { debug: false, reconnectInterval: 3000 });
    this.socket.onopen = () => {
      this.props.dispatch(connected());
    }
    this.socket.onmessage = (e) => {
      const messages = JSON.parse(e.data);
      this.props.dispatch(getMessages({ messages: messages }));
      if (this.props.messages.length > 0 && !this.props.windowVisibility) {
        const nonVisibleMessages = this.props.messages.filter(item => item.time > this.props.windowVisibilityTime.hiddenTime);
        this.props.dispatch(addNotifMessages({ notif: nonVisibleMessages }));
      }
    }
  }

  componentDidMount() {
    if (window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission().then((result) => {
        if (result === "denied") {
          console.log(result)
        }
      });
    }

    let visibilityChange;
    if (typeof document.hidden !== "undefined") {
      visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
      visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      visibilityChange = "webkitvisibilitychange";
    }

    document.addEventListener(visibilityChange, () => {
      if (document.hidden) {
        this.props.dispatch(hidden());
        this.props.dispatch(hiddenTime());
      } else {
        this.props.dispatch(visible());
        this.props.dispatch(visibleTime());
        this.props.dispatch(resetNotifMessages());
      }
    })

    if (this.props.windowVisibility) {
      document.title = 'CHAT!'
    } else {
      document.title = 'chat..'
      if (this.props.notifyMessages.length > 0) {
        document.title = `chat.. New Messages: ${this.props.notifyMessages.length}`
      }
    }

    window.addEventListener('online', () => {
      this.props.dispatch(connected());
      if (this.props.offlineMessages.length > 0) {
        this.props.offlineMessages.forEach(mess => {
          this.socket.send(JSON.stringify({ from: this.props.user, message: mess }))
        });
      }
      this.props.dispatch(resetOfflineMessages());
    });
    window.addEventListener('offline', () => {
      this.props.dispatch(disconnected());
    });
  }

  componentDidUpdate() {
    if (this.props.windowVisibility) {
      document.title = 'CHAT!'
    } else {
      document.title = 'chat..'
      if (this.props.notifyMessages.length > 0) {
        document.title = `chat.. New Messages: ${this.props.notifyMessages.length}`
      }
    }
  }

  render() {

    if (this.props.lastMessage && this.props.lastMessage.time && !this.props.windowVisibility) {
      const newNotif = new Notification(this.props.lastMessage.from, { body: this.props.lastMessage.message });
      setTimeout(newNotif.close.bind(newNotif), 3000);
    }

    return (
      <Layout>
        <List />
        <Send socket={this.socket} />
      </Layout>
    );
  }
}

const mapStateProps = (state) => {
  return {
    connection: state.connected,
    user: state.user,
    messages: state.messages.messages,
    windowVisibility: state.windowVisibility,
    windowVisibilityTime: state.windowVisibilityTime,
    lastMessage: state.notifyMessages.lastMessage,
    notifyMessages: state.notifyMessages.notif,
    offlineMessages: state.offlineMessages,
  }
};

export default connect(mapStateProps)(App);
