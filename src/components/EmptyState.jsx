import { useTranslation } from "react-i18next"

function EmptyState() {
    const { t } = useTranslation()
    return(
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-6xl mb-4">📭</span>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">{t('empty.title')}</h3>
            <p className="text-gray-400 text-sm">{t('empty.subtitle')}</p>
        </div>
    )
}

export default EmptyState