import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useNotifications from '../hooks/useNotifications'

function TaskModal({ task, onClose, onDelete, onToggle, onEdit }) {
    const { t } = useTranslation()
    const [isEditing, setIsEditing] = useState(false)
    const [nuovoTitolo, setNuovoTitolo] = useState(task?.title || '')
    const [nuovaDescrizione, setNuovaDescrizione] = useState(task?.description || '')
    const [nuovaPriorita, setNuovaPriorita] = useState(task?.priority || 'media')
    const [nuovaData, setNuovaData] = useState(task?.dueDate || '')
    const [nuovoOrario, setNuovoOrario] = useState(task?.time || '')
    const { richiediPermesso, programmaNofifica } = useNotifications()

    if (!task) return null

    async function handleEdit() {
        if (!nuovoTitolo.trim()) return
        onEdit({ id: task.id, title: nuovoTitolo, description: nuovaDescrizione, priority: nuovaPriorita, dueDate: nuovaData, time: nuovoOrario })

        if (nuovaData && nuovoOrario) {
            const permesso = await richiediPermesso()
            if (permesso) programmaNofifica(nuovoTitolo, nuovoOrario, nuovaData)
        }
    
        setIsEditing(false)
        onClose()
    }

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

                {!isEditing ? (
                    <>
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

                        <div className="flex gap-4 text-sm text-gray-400 flex-wrap">
                            {task.dueDate && <span>📅 {task.dueDate}</span>}
                            {task.time && <span>⏰ {task.time}</span>}
                            <span>{task.completed ? `✅ ${t('tasks.completed')}` : `🕐 ${t('tasks.inProgress')}`}</span>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            value={nuovoTitolo}
                            onChange={e => setNuovoTitolo(e.target.value)}
                            className="border border-blue-400 dark:border-blue-500 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none"
                            autoFocus
                        />
                        <textarea
                            value={nuovaDescrizione}
                            onChange={e => setNuovaDescrizione(e.target.value)}
                            rows={2}
                            placeholder="Descrizione..."
                            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none resize-none"
                        />
                        <select
                            value={nuovaPriorita}
                            onChange={e => setNuovaPriorita(e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none"
                        >
                            <option value="alta">{t('tasks.high')}</option>
                            <option value="media">{t('tasks.medium')}</option>
                            <option value="bassa">{t('tasks.low')}</option>
                        </select>
                        <div className="flex gap-2">
                            <input
                                type="date"
                                value={nuovaData}
                                onChange={e => setNuovaData(e.target.value)}
                                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none"
                            />
                            <input
                                type="time"
                                value={nuovoOrario}
                                onChange={e => setNuovoOrario(e.target.value)}
                                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none"
                            />
                        </div>
                    </div>
                )}

                <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <button
                        onClick={() => { onToggle(task.id); onClose() }}
                        className="flex-1 text-sm py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        {task.completed ? t('tasks.reopen') : t('tasks.complete')}
                    </button>
                    {isEditing ? (
                        <button
                            onClick={handleEdit}
                            className="flex-1 text-sm py-2 rounded-lg border border-blue-300 text-blue-500 hover:bg-blue-50 transition-colors"
                        >
                            {t('tasks.save')}
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex-1 text-sm py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            {t('tasks.edit')}
                        </button>
                    )}
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