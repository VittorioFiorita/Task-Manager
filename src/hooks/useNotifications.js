function useNotifications() {
  async function richiediPermesso() {
    if (!('Notification' in window)) return false
    if (Notification.permission === 'granted') return true
    const result = await Notification.requestPermission()
    return result === 'granted'
  }

  function programmaNofifica(titolo, orario, data) {
    if (!orario || !data) return
    
    const adesso = new Date()
    const dataOrario = new Date(`${data}T${orario}`)
    const diff = dataOrario - adesso

    if (diff <= 0) return

    setTimeout(() => {
      if (Notification.permission === 'granted') {
        new Notification('Task Manager', {
          body: `⏰ ${titolo}`,
          icon: '/favicon.svg',
        })
      }
    }, diff)
  }

  return { richiediPermesso, programmaNofifica }
}

export default useNotifications