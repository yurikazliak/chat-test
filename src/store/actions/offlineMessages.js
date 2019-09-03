export const getOfflineMessages = ({ offlineMessage = '' } = {}) => ({
  type: 'GET_OFFLINE_MESSAGES',
  offlineMessage
})

export const resetOfflineMessages = () => ({
  type: 'RESET_OFFLINE_MESSAGES',
})