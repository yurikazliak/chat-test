export const setUserName = ({ userName = ''} = {}) => ({
  type: 'SET_USERNAME',
  userName
})