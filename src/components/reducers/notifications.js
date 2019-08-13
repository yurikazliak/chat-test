const initialState = {
  show: false,
  text: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        show: true,
        text: action.text
      };
      case 'HIDE_NOTIFICATION':
        return {
          show: false,
          text: {}
        }
    default:
      return state
  }
}