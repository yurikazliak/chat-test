const initialState = {
  visibleTime: new Date().getTime(),
  hiddenTime: new Date().getTime(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'VISIBLE_TIME':
      return Object.assign({}, state, {
        visibleTime: new Date().getTime()
      })
    case 'HIDDEN_TIME':
      return Object.assign({}, state, {
        hiddenTime: new Date().getTime()
      })
    default:
      return state;
  }
}