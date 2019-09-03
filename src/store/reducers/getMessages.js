const initialState = {
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MESSAGES':
      return {
        messages: action.messages.length === 1 ? action.messages.concat(state.messages) : action.messages,
      }
    default:
      return state;
  }
}