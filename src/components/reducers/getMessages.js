const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MESSAGES':
      return action.messages.length === 1 ? action.messages.concat(state) : action.messages
    default:
      return state;
  }
}