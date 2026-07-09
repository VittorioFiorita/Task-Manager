import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logo from '../assets/logo.svg'

function Header() {
  const { t } = useTranslation()
  
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Task Manager logo" className="w-8 h-8" />
          <span className="text-lg font-bold text-gray-800 dark:text-white">Task Manager</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 dark:text-white hover:text-blue-600 font-medium transition-colors text-sm">
            {t('header.home')}
          </Link>
          <Link to="/tasks" className="text-gray-600 dark:text-white hover:text-blue-600 font-medium transition-colors text-sm">
            {t('header.tasks')}
          </Link>
          <Link to="/settings" className="text-gray-600 dark:text-white hover:text-blue-600 font-medium transition-colors text-sm">
            {t('header.settings')}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
