import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTask, deleteTask, toggleComplete, editTask } from '../store/tasksSlice'
import { useTranslation } from 'react-i18next'
import TaskListGiorno from '../components/TaskListGiorno'
import TaskForm from '../components/TaskForm'
import useTaskFilter from '../hooks/useTaskFilter'

function Tasks() {
  const tasks = useSelector(state => state.tasks)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [filtroStato, setFiltroStato] = useState('tutte')
  const [filtroPriorita, setFiltroPriorita] = useState('tutte')
  const [ricerca, setRicerca] = useState('')

  const taskFiltrate = useTaskFilter(tasks, filtroStato, filtroPriorita, ricerca)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const filtriStato = [
    { label: t('tasks.all'), value: 'tutte' },
    { label: t('tasks.inProgress'), value: 'in corso' },
    { label: t('tasks.completed'), value: 'completate' },
  ]

  const filtriPriorita = [
    { label: t('tasks.all'), value: 'tutte' },
    { label: t('tasks.high'), value: 'alta' },
    { label: t('tasks.medium'), value: 'media' },
    { label: t('tasks.low'), value: 'bassa' },
  ]

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('tasks.title')}</h1>

      <TaskForm onAddTask={(task) => dispatch(addTask(task))} />

      <input
        type="text"
        value={ricerca}
        onChange={e => setRicerca(e.target.value)}
        placeholder={t('tasks.search')}
        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-400 w-full"
      />

      <div className="flex gap-3 flex-wrap">
        {filtriStato.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFiltroStato(value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filtroStato === value
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400'
            }`}
          >
            {label}
          </button>
        ))}

        <div className="w-px bg-gray-200 mx-1" />

        {filtriPriorita.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFiltroPriorita(value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filtroPriorita === value
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <TaskListGiorno
        tasks={taskFiltrate}
        onDelete={(id) => dispatch(deleteTask(id))}
        onToggle={(id) => dispatch(toggleComplete(id))}
        onEdit={(task) => dispatch(editTask(task))}
      />
    </div>
  )
}

export default Tasks