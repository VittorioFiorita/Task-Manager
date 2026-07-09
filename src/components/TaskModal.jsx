import { useTranslation } from 'react-i18next'

function TaskModal({ task, onClose, onDelete, onToggle, onEdit }) {
    const { t } = useTranslation()
    if(!task) return null

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg p-6 flex flex-col gap-4"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-2">
                    <h2 className={`text-lg font-bold text-gray-800 dark:text-white ${task.completed ? 'line-through text-gray-400' : ''}`}>
                        {task.title}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-bold">✕</button>
                </div>

                <span className={`text-xs font-medium px-3 py-1 rounded-full w-fit ${
                    task.priority === 'alta' ? 'bg-red-100 text-red-600' :
                    task.priority === 'media' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-600'
                }`}>
                    {task.priority === 'alta' ? t('tasks.high') : task.priority === 'media' ? t('tasks.medium') : t('tasks.low')}
                </span>

                {task.description && (
                    <p className="text-gray-500 dark:text-gray-300 text-sm">{task.description}</p>
                )}

                <div className="flex gap-4 text-sm text-gray-400">
                    {task.dueDate && <span>📅 {task.dueDate}</span>}
                    <span>{task.completed ? `✅ ${t('tasks.completed')}` : `🕐 ${t('tasks.inProgress')}`}</span>
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <button
                        onClick={() => { onToggle(task.id); onClose() }}
                        className="flex-1 text-sm py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        {task.completed ? t('tasks.reopen') : t('tasks.complete')}
                    </button>
                    <button
                        onClick={() => { onDelete(task.id); onClose() }}
                        className="flex-1 text-sm py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                    >
                        {t('tasks.delete')}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskModal