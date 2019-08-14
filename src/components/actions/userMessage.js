export const userMessage = ({ userMessage = '' } = {}) => ({
  type: 'USER_MESSAGE',
  userMessage
})

export const sendMessage = ({ sendMessage = '' } = {}) => ({
  type: 'SEND_MESSAGE',
  sendMessage
})