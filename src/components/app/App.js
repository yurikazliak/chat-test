import React, { Component } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { connect } from 'react-redux';
// import { Offline, Online } from "react-detect-offline";

// My components
import Layout from '../layout/layout';
import List from '../list/list';
import Send from '../send/send';

// My actions
import { getMessages } from '../actions/getMessages';
import { connected, disconnected } from '../actions/connectionStatus';
import { visible, hidden } from '../actions/windowVisibility';
import { visibleTime, hiddenTime } from '../actions/visibilityTime';
import { addNotifMessages, resetNotifMessages } from '../actions/notifyMessages';
import { resetOfflineMessages } from '../actions/offlineMessages';

class App extends Component {
  constructor() {
    super()
    this.socket = new ReconnectingWebSocket('wss://wssproxy.herokuapp.com/', null, { debug: false, reconnectInterval: 3000 });
    // this.socket = new ReconnectingWebSocket('ws://st-chat.shas.tel', null, { debug: false, reconnectInterval: 3000 });
    // this.socket = new WebSocket('ws://st-chat.shas.tel');
    this.socket.onopen = () => {
      this.props.dispatch(connected());
    }
    this.socket.onmessage = (e) => {
      const messages = JSON.parse(e.data);
      this.props.dispatch(getMessages({ messages: messages }));
      if (this.props.messages.length > 0 && !this.props.windowVisibility) {
        const nonVisibleMessages = this.props.messages.filter(item => item.time > this.props.windowVisibilityTime.hiddenTime);
        // console.log('filtred', nonVisibleMessages)
        this.props.dispatch(addNotifMessages({ notif: nonVisibleMessages }));
      }
    }
    // this.notifyMe = this.notifyMe.bind(this);
  }

  // notifyMe() {
  //   if (!("Notification" in window)) {
  //     alert("This browser does not support desktop notification");
  //   }

  //   else if (Notification.permission === "granted") {
  //     console.log('notif if-1')
  //     const newNotif = new Notification(this.props.lastMessage.from, { body: this.props.lastMessage.message });
  //     setTimeout(newNotif.close.bind(newNotif), 4000);
  //   }
  //   else if (Notification.permission !== "denied") {
  //     console.log('notif if-2')
  //     Notification.requestPermission().then(function (permission) {
  //       if (permission === "granted") {
  //         const newNotif = new Notification(this.props.lastMessage.from, { body: this.props.lastMessage.message });
  //         setTimeout(newNotif.close.bind(newNotif), 4000);
  //       }
  //     });
  //   }
  // }

  // notifyMe() {
  //   if (!("Notification" in window)) {
  //     alert("This browser does not support desktop notification");
  //   }

  //   else if (Notification.permission === "granted") {
  //     const spawnNotification = (title, body) => {
  //       var options = {
  //         body: body,
  //         // icon: icon
  //       };
  //       const newNotif = new Notification(title, options);
  //       setTimeout(newNotif.close.bind(newNotif), 4000);
  //     }
  //     spawnNotification(this.props.lastMessage.from, this.props.lastMessage.message);
  //   }
  //   else if (Notification.permission !== "denied") {
  //     Notification.requestPermission().then(function (permission) {
  //       if (permission === "granted") {
  //         const spawnNotification = (title, body) => {
  //           var options = {
  //             body: body,
  //             // icon: icon
  //           };
  //           const newNotif = new Notification(title, options);
  //           setTimeout(newNotif.close.bind(newNotif), 4000);
  //         }
  //         spawnNotification(this.props.lastMessage.from, this.props.lastMessage.message);
  //       }
  //     });
  //   }
  // }

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

        // if (this.props.lastMessage && this.props.lastMessage.time) {
        //   // console.log('lastMessage', this.props.lastMessage)
        //   // this.notifyMe();
        //   const newNotif = new Notification(this.props.lastMessage.from, { body: this.props.lastMessage.message });
        //   setTimeout(newNotif.close.bind(newNotif), 3000);
        // }
        // console.log('hidden', new Date().getTime())
        // document.title = 'hidden'
        // if (this.props.lastMessage && this.props.lastMessage.time) {
        //   console.log('lastMessage', this.props.lastMessage)
        //   this.notifyMe()
        //   // const spawnNotification = (title, body) => {
        //   //   var options = {
        //   //     body: body,
        //   //     // icon: icon
        //   //   };
        //   //   // const title = this.props.lastMessage.from;
        //   //   const newNotif = new Notification(title, options);
        //   //   setTimeout(newNotif.close.bind(newNotif), 4000);
        //   // }

        //   // spawnNotification(this.props.lastMessage.from, this.props.lastMessage.message);
        // }
      } else {
        this.props.dispatch(visible());
        this.props.dispatch(visibleTime());
        this.props.dispatch(resetNotifMessages());
        // console.log('visible', new Date().getTime())
        // document.title = 'visible'
      }
      // console.log('visibility', document.hidden);
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
    // console.log('update')
    // console.log(this.socket)
    // console.log(document.visibilityState)
    // console.log(this.props);   
  }

  render() {
    // window.addEventListener('online', console.log('online'), false);
    if (this.props.lastMessage && this.props.lastMessage.time && !this.props.windowVisibility) {
      // console.log('lastMessage', this.props.lastMessage)
      // this.notifyMe();
      const newNotif = new Notification(this.props.lastMessage.from, { body: this.props.lastMessage.message });
      setTimeout(newNotif.close.bind(newNotif), 3000);
    }
    // if (this.props.lastMessage && this.props.lastMessage.time && (this.props.lastMessage.time - new Date().getTime() < 4000)) {
    //   // console.log('notif!!!!')
    //   // new Notification(`${this.props.lastMessage.from}: ${this.props.lastMessage.message}`);
    //   const spawnNotification = (title, body) => {
    //     var options = {
    //       body: body,
    //       // icon: icon
    //     };
    //     // const title = this.props.lastMessage.from;
    //     const newNotif = new Notification(title, options);
    //     setTimeout(newNotif.close.bind(newNotif), 4000);
    //   }
    //   spawnNotification(this.props.lastMessage.from, this.props.lastMessage.message);
    // }
    return (
      <Layout>
        {/* <Online> */}

        <List />
        {/* </Online> */}
        {/* <Offline>You offline now!</Offline> */}
        <Send socket={this.socket} />
      </Layout>
    );
  }
}

const mapStateProps = (state) => {
  return {
    // userMessage: state.userMessage,
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
