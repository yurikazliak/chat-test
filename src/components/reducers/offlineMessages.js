const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_OFFLINE_MESSAGES':
      return state.concat(action.offlineMessage)
    case 'RESET_OFFLINE_MESSAGES':
      return []
    default:
      return state;
  }
}