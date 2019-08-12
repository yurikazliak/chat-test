const defaultUserName = localStorage.getItem('chatUserName') !== null ? localStorage.getItem('chatUserName') : '';

export default (state = defaultUserName, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return action.userName
    default:
      return state;
  }
}