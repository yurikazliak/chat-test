export const getMessages = ({ messages = [] } = {}) => ({
  type: 'GET_MESSAGES',
  messages
})
