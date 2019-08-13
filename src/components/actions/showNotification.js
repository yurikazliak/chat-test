export const showNotification = ({ text = {} } = {}) => ({
  type: 'SHOW_NOTIFICATION',
  text
})

export const hideNotification = () => ({
  type: 'HIDE_NOTIFICATION'
})