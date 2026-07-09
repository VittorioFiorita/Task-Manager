import { useTranslation } from "react-i18next"
function NotFound() {
    const { t } = useTranslation()
    return( 
        <div className="flex flex-col justify-center py-6 text-center">
            <span className="text-6xl mb-4">🔍</span>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t('notFound.title')}</h2>
            <p className="text-gray-400">{t('notFound.subtitle')}</p>
        </div>
    )
}

export default NotFound