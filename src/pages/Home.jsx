import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

function Home() {
    const { t, i18n } = useTranslation()
    const tasks = useSelector(state => state.tasks)

    const totali = tasks.length
    const completate = tasks.filter(t => t.completed).length
    const inCorso= tasks.filter(t=> !t.completed).length
    
    const dataTorta = [
        { name: 'Completate', value: completate },
        { name: 'In corso', value: inCorso },
    ]

    const dataBarre = [
        { name: t('tasks.high'), value: tasks.filter(task => task.priority === 'alta').length },
        { name: t('tasks.medium'), value: tasks.filter(task => task.priority === 'media').length },
        { name: t('tasks.low'), value: tasks.filter(task => task.priority === 'bassa').length },
    ]

    const COLORS = ['#22c55e', '#eab308']

    return (
       <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('home.title')}</h1>
        
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-5 shadow-sm text-center">
                    <p className="text-4xl font-bold text-blue-500">{totali}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('home.total')}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-5 shadow-sm text-center">
                    <p className="text-4xl font-bold text-green-500">{completate}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('home.completed')}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-5 shadow-sm text-center">
                    <p className="text-4xl font-bold text-yellow-500">{inCorso}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('home.inProgress')}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-5 shadow-sm">
                    <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">{t('home.chartStatus')}</h2>
                    {totali === 0 ? (
                        <p className="text-center text-gray-400 text-sm py-8">{t('home.noData')}</p>
                    ) : (
                        <>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={dataTorta} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                                        {dataTorta.map((entry, index) => (
                                            <Cell key={index} fill={COLORS[index]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex justify-center gap-4 mt-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                                    {t('home.legendCompleted')}: {completate}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                                    {t('home.legendInProgress')}: {inCorso}
                                </span>
                            </div>
                        </>
                    )}
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-5 shadow-sm">
                    <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">{t('home.chartPriority')}</h2>
                    {totali === 0 ? (
                        <p className="text-center text-gray-400 text-sm py-8">{t('home.noData')}</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={dataBarre}>
                                <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <YAxis allowDecimals={false} tick={{ fill: '#9ca3af', fontSize: 12 }}/>
                                <Tooltip />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    <Cell fill="#ef4444" />
                                    <Cell fill="#eab308" />
                                    <Cell fill="#22c55e" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
       </div>
    )
}

export default Home