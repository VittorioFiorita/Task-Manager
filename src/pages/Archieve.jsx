import { useSelector, useDispatch } from 'react-redux'
import { deleteTask, toggleComplete, editTask } from '../store/tasksSlice'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import TaskListGiorno from '../components/TaskListGiorno'

function Archive() {
  const tasks = useSelector(state => state.tasks)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const taskCompletate = tasks.filter(t => t.completed)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('archive.title')}</h1>
        <Link to="/tasks" className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
          {t('archive.back')}
        </Link>
      </div>

      <TaskListGiorno
        tasks={taskCompletate}
        onDelete={(id) => dispatch(deleteTask(id))}
        onToggle={(id) => dispatch(toggleComplete(id))}
        onEdit={(task) => dispatch(editTask(task))}
      />
    </div>
  )
}

export default Archive
