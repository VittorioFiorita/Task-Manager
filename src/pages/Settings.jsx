import { useTranslation } from 'react-i18next'
import { useTheme } from '../context/ThemeContext'

function Settings() {
  const { darkMode, toggleTheme } = useTheme()
  const { t, i18n } = useTranslation()

  function handleLanguage(e) {
    const lang = e.target.value
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('settings.title')}</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-800 dark:text-white">{t('settings.darkMode')}</h2>
            <p className="text-sm text-gray-400">{t('settings.darkModeDesc')}</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`w-12 h-6 rounded-full relative transition-colors ${darkMode ? 'bg-blue-500' : 'bg-gray-200'}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="border-t dark:border-gray-700 pt-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-800 dark:text-white">{t('settings.language')}</h2>
            <p className="text-sm text-gray-400">{t('settings.languageDesc')}</p>
          </div>
          <select
            value={i18n.language}
            onChange={handleLanguage}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-1.5 text-sm text-gray-600"
          >
            <option value="it">Italiano</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Settings