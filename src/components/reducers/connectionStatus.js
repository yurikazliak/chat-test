const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CONNECTED':
      return true
    case 'DISCONNECTED':
      return false
    default:
      return state;
  }
}