function useTaskFilter(tasks, filtroStato, filtroPriorità, ricerca) {
    return tasks
        .filter(t =>{
            if(filtroStato === 'completate') return t.completed
            if(filtroStato === 'in corso') return !t.completed
            return true
        })
        .filter(t =>{
            if(filtroPriorità === 'tutte') return true
            return t.priority === filtroPriorità
        })
        .filter(t => {
            if(!ricerca.trim()) return true
            return t.title.toLowerCase().includes(ricerca.toLowerCase()) ||
                t.description.toLowerCase().includes(ricerca.toLowerCase())
        })
}

export default useTaskFilter