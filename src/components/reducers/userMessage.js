const initialState = '';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_MESSAGE':
      return action.userMessage;
    default:
      return state;
  }
}