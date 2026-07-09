import { useState } from 'react'
import PriorityBadge from './PriorityBadge'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function TaskCard({ title, description, priority, dueDate, time, completed, onDelete, onToggle, onEdit, id, onOpenModal}) {
    const { t } = useTranslation()
    const [isEditing, setIsEditing] = useState(false)
    const [nuovoTitolo, setNuovoTitolo] = useState(title)
    const [nuovaDescrizione, setNuovaDescrizione] = useState(description)
    const [nuovaPriorita, setNuovaPriorita] = useState(priority)
    const [nuovaData, setNuovaData] = useState(dueDate)
    const [nuovoOrario, setNuovoOrario] = useState(time || '')

    function handleEdit() {
        if (!nuovoTitolo.trim()) return
        onEdit({ id, title: nuovoTitolo, description: nuovaDescrizione, priority: nuovaPriorita, dueDate: nuovaData, time: nuovoOrario})
        setIsEditing(false)
    }

    return(
        <div className={`bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-4 shadow-sm flex flex-col gap-2 ${completed ? 'opacity-50' : ''}`}>
            <div className={`flex gap-2 ${isEditing ? 'flex-col' : 'items-start justify-between'}`}>
                {isEditing ? (
                    <div className='flex flex-col gap-2 w-full'>
                        <input 
                            type='text'
                            value={nuovoTitolo}
                            onChange={e=> setNuovoTitolo(e.target.value)}
                            className='border border-blue-400 dark:border-blue-500 dark:bg-gray-700 dark:text-white rounded-lg px-2 py-1 text-sm focus:outline-none'
                            autoFocus
                        />
                        <textarea 
                            value={nuovaDescrizione}
                            onChange={e=> setNuovaDescrizione(e.target.value)}
                            rows={2}
                            placeholder='Descrizione...'
                            className='border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-2 py-1 text-sm focus:outline-none resize-none'
                        />
                        <div className='flex gap-2'>
                            <select
                                value={nuovaPriorita}
                                onChange={e=> setNuovaPriorita(e.target.value)}
                                className='border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-2 py-1 text-sm flex-1 focus:outline-none'
                            >
                                <option value="alta">{t('tasks.high')}</option>
                                <option value="media">{t('tasks.medium')}</option>
                                <option value="bassa">{t('tasks.low')}</option>
                            </select>
                            <input 
                                type='date'
                                value={nuovaData}
                                onChange={e=> setNuovaData(e.target.value)}
                                className='border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-2 py-1 text-sm flex-1 focus:outline-none'
                            />
                            <input 
                                type='time'
                                value={nuovoOrario}
                                onChange={e=> setNuovoOrario(e.target.value)}
                                className='border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-2 py-1 text-sm flex-1 focus:outline-none'
                            />
                        </div>
                    </div>
                ):(
                    <Link
                        to={`/tasks/${id}`}
                        className={`font-semibold text-gray-800 dark:text-white hover:text-blue-500 transition-colors ${completed ? 'line-through' : ''}`}
                    >
                        {title}
                    </Link>
                )}
                {!isEditing && <PriorityBadge priority={priority}/>}
            </div>
            
            {!isEditing &&(
                <>
                    {description && (
                        <p className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">{description}</p>
                    )}
                    <div className="flex items-center justify-between mt-1">
                        {dueDate && (
                            <span className="text-xs text-gray-400">📅 {dueDate} {time && `⏰ ${time}`}</span>
                        )}
                        <span className={`text-xs font-medium ${completed ? 'text-green-500' : 'text-yellow-500'}`}>
                            {completed ? `✅ ${t('tasks.completed')}` : `🕐 ${t('tasks.inProgress')}`}
                        </span>
                    </div>
                </>
            )}

            <div className='hidden sm:flex gap-2 mt-2 pt-2 border-t border-gray-100 dark:border-gray-700'>
                <button
                    onClick={onToggle}
                    className='flex-1 text-xs py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors dark:text-white'
                >
                    {completed ? t('tasks.reopen') : t('tasks.complete')}
                </button>
                
                {isEditing ? (
                    <button
                        onClick={handleEdit}
                        className='flex-1 text-xs py-1.5 rounded-lg border border-blue-300 text-blue-500 hover:bg-blue-50 transition-colors'
                    >
                        {t('tasks.save')}
                    </button>
                ) : (
                    <button
                        onClick={()=> setIsEditing(true)}
                        className='flex-1 text-xs py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors dark:text-white'
                    >
                        {t('tasks.edit')}
                    </button>
                )}

                <button
                    onClick={onDelete}
                    className='flex-1 text-xs py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors'
                >
                    {t('tasks.delete')}
                </button>
            </div>

            <button
                onClick={e => { e.stopPropagation(); onOpenModal(); }}
                className='sm:hidden w-full text-xs py-1.5 rounded-lg border border-blue-200 text-blue-500 hover:bg-blue-50 transition-colors mt-1'
            >
                {t('tasks.details')}
            </button>
        </div>
    )
}

export default TaskCard