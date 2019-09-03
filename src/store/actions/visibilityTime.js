export const visibleTime = ({ visibleTime = new Date().getTime() } = {} ) => ({
  type: 'VISIBLE_TIME',
  visibleTime
})

export const hiddenTime = ({ hiddenTime = new Date().getTime() } = {} ) => ({
  type: 'HIDDEN_TIME',
  hiddenTime
})
