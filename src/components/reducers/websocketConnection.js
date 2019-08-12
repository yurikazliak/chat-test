const defaultConnection = {
  messages: [],
  connected: false
};

export default (state = defaultConnection, action = {}) => {
  switch (action.type) {
    case 'SOCKETS_CONNECTING':
      return Object.assign({}, state, {
        messages: action.messages.concat(state.messages),
        connected: true
      });
    case 'SOCKETS_DISCONNECTING':
      return Object.assign({}, state, {
        connected: false
      });
    default:
      return state;
  }
}