const defaultConnection = {
  message: 'Just created',
  connected: false
};

export default (state = defaultConnection, action = {}) => {
  switch (action.type) {
    case 'SOCKETS_CONNECTING':
      return Object.assign({}, state, {
        message: 'Connecting...',
        connected: false
      });
    case 'SOCKETS_DISCONNECTING':
      return Object.assign({}, state, {
        message: 'Disconnecting...',
        connected: true
      });
    default:
      return state;
  }
}