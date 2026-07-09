import { useTranslation } from 'react-i18next'

function PriorityBadge({ priority }) {
  const { t } = useTranslation()

  const styles = {
    alta: 'bg-red-100 text-red-600',
    media: 'bg-yellow-100 text-yellow-600',
    bassa: 'bg-green-100 text-green-600',
  }

  const labels = {
    alta: t('tasks.high'),
    media: t('tasks.medium'),
    bassa: t('tasks.low'),
  }

  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${styles[priority] || 'bg-gray-100 text-gray-500'}`}>
      {labels[priority] || priority}
    </span>
  )
}

export default PriorityBadge