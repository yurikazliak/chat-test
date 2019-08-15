export const addNotifMessages = ({ notif = [] } = {} ) => ({
  type: 'SET_NOTIF_MESSAGE',
  notif
}
)
export const resetNotifMessages = () => ({
  type: 'RESET_NOTIF_MESSAGE',
})