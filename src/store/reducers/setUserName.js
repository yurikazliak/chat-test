const initialState = localStorage.getItem('chatUserName') !== null ? localStorage.getItem('chatUserName') : 'user';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return action.userName
    default:
      return state;
  }
}