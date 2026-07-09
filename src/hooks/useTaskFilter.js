function useTaskFilter(tasks, filtroStato, filtroPriorita, ricerca) {
  return tasks
    .filter(t => {
      if (filtroStato === 'completate') return t.completed
      if (filtroStato === 'in corso') return !t.completed
      return true
    })
    .filter(t => {
      if (filtroPriorita === 'tutte') return true
      return t.priority === filtroPriorita
    })
    .filter(t => {
      if (!ricerca.trim()) return true
      return t.title.toLowerCase().includes(ricerca.toLowerCase()) ||
             t.description.toLowerCase().includes(ricerca.toLowerCase())
    })
    .sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(a.dueDate) - new Date(b.dueDate)
    })
}

export default useTaskFilter