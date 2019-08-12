export const connected = ({ messages = [] } = {}) => ({
  type: 'SOCKETS_CONNECTING',
  messages
})

export const disconnected = () => ({
  type: 'SOCKETS_DISCONNECTING'
})