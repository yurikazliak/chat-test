export const setUserName = ({ userName = 'user'} = {}) => ({
  type: 'SET_USERNAME',
  userName
})