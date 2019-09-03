const initState = {
  notif: [],
  lastMessage: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'SET_NOTIF_MESSAGE':
      return {
        notif: action.notif,
        lastMessage: action.notif.length > 0 ? action.notif.reverse()[0] : {},
      }
    case 'RESET_NOTIF_MESSAGE':
      return {
        notif: [],
        lastMessage: {},
      }
    default:
      return state;
  }
}