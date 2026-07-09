import TaskCard from './TaskCard'
import EmptyState from './EmptyState'
import TaskModal from './TaskModal'
import { useState } from 'react'

function TaskListPerGiorno({ tasks, onDelete, onToggle, onEdit }) {
  const [taskSelezionata, setTaskSelezionata] = useState(null)

  if (tasks.length === 0) return <EmptyState />

  const oggi = new Date().toISOString().split('T')[0]
  const domani = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  function getLabelGiorno(data) {
    if (data === oggi) return '📅 Oggi'
    if (data === domani) return '📅 Domani'
    if (!data) return '📅 Senza data'
    return `📅 ${new Date(data + 'T00:00').toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}`
  }

  const gruppi = {}
  tasks.forEach(task => {
    const chiave = task.dueDate || '__senza_data__'
    if (!gruppi[chiave]) gruppi[chiave] = []
    gruppi[chiave].push(task)
  })

  const chiaveOrdinate = Object.keys(gruppi).sort((a, b) => {
    if (a === '__senza_data__') return 1
    if (b === '__senza_data__') return -1
    return new Date(a) - new Date(b)
  })

  return (
    <>
      <div className="flex flex-col gap-6">
        {chiaveOrdinate.map(chiave => (
          <div key={chiave}>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
              {getLabelGiorno(chiave === '__senza_data__' ? '' : chiave)}
            </h2>
            <div className="flex flex-col gap-3">
              {gruppi[chiave].map(task => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  dueDate={task.dueDate}
                  time={task.time}
                  completed={task.completed}
                  onDelete={() => onDelete(task.id)}
                  onToggle={() => onToggle(task.id)}
                  onEdit={onEdit}
                  onOpenModal={() => setTaskSelezionata(task)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <TaskModal
        task={taskSelezionata}
        onClose={() => setTaskSelezionata(null)}
        onDelete={onDelete}
        onToggle={onToggle}
        onEdit={onEdit}
      />
    </>
  )
}

export default TaskListPerGiorno