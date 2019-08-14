const initialState = {
  messages: [],
  lastMessage: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MESSAGES':
      return {
        messages: action.messages.length === 1 ? action.messages.concat(state.messages) : action.messages,
        lastMessage: state.messages.length > 0 ? action.messages.reverse()[0] : {},
      }
    default:
      return state;
  }
}