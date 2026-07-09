import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function TaskForm({ onAddTask }) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'media',
    dueDate: '',
    time: '',
  })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    
    const nuoviErrori = {}
    if (!formData.title.trim()) nuoviErrori.title = t('form.titleRequired')
    
    if (Object.keys(nuoviErrori).length > 0) {
      setErrors(nuoviErrori)
      return
    }

    setErrors({})
    onAddTask({
      ...formData,
      id: Date.now(),
      completed: false,
    })
    setFormData({ title: '', description: '', priority: 'media', dueDate: '', time: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm p-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{t('form.newTask')}</h2>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('form.title')}</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder={t('form.titlePlaceholder')}
          className={`border rounded-lg px-3 py-2 text-sm focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
            errors.title 
              ? 'border-red-400 focus:border-red-400' 
              : 'border-gray-300 dark:border-gray-600 focus:border-blue-400'
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('form.description')}</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder={t('form.descriptionPlaceholder')}
          rows={3}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-none"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('form.priority')}</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          >
            <option value="alta">{t('tasks.high')}</option>
            <option value="media">{t('tasks.medium')}</option>
            <option value="bassa">{t('tasks.low')}</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('form.dueDate')}</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('form.time')}</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-colors"
      >
        {t('form.add')}
      </button>
    </form>
  )
}

export default TaskForm