const initialState = !document.hidden;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'VISIBLE':
      return true
    case 'HIDDEN':
      return false
    default:
      return state;
  }
}