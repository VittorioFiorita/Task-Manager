import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TaskDetail() {
    const {id} = useParams()
    const tasks = useSelector(state => state.tasks)
    const task = tasks.find(t => String(t.id) === id)
    
    if (!task) {
        return(
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="text-6xl mb-4">🔍</span>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Task non trovata</h2>
                <Link to="/tasks" className="text-blue-500 hover:underline mt-2">← Torna alla lista</Link>
            </div>
        )
    }

    return(
        <div className="flex flex-col gap-6">
            <Link to="/tasks" className="text-blue-500 hover:underline text-sm">← Torna alla lista</Link>

            <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                    <h1 className={`text-2xl font-bold text-gray-800 dark:text-white ${task.completed ? 'line-through text-gray-400' : ''}`}>
                        {task.title}
                    </h1>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                        task.priority === 'alta' ? 'bg-red-100 text-red-600' :
                        task.priority === 'media' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                    }`}>
                        {task.priority}
                    </span>
                </div>

                {task.description &&(
                    <p className="text-gray-500 dark:text-gray-400">{task.description}</p>
                )}

                <div className="flex gap-6 text-sm text-gray-400 dark:text-gray-350">
                    {task.dueDate && <span>📅 Scadenza: {task.dueDate}</span>}
                    <span>{task.completed ? '✅ Completato' : '🕐 In corso'}</span>
                </div>
            </div>
        </div>
    )
}