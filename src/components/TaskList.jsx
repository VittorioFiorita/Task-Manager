import { useState } from "react";
import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState"
import TaskModal from "./TaskModal";

function TaskList({ tasks, onDelete, onToggle, onEdit}) {
    const [taskSelezionata, setTaskSelezionata] = useState(null)

    if(tasks.length === 0){
        return <EmptyState />
    }

    return(
        <>
            <div className="flex flex-col gap-4">
                {tasks.map((task) => (
                    <TaskCard 
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        priority={task.priority}
                        dueDate={task.dueDate}
                        time={task.time}
                        completed={task.completed}
                        onDelete={() => onDelete(task.id)}
                        onToggle={() => onToggle(task.id)}
                        onEdit={onEdit}
                        id={task.id}
                        onOpenModal={() => setTaskSelezionata(task)}
                    />
                ))}
            </div>

            <TaskModal
                    task={taskSelezionata}
                    onClose={() => setTaskSelezionata(null)}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    onEdit={onEdit}
                />
        </>
    )
}

export default TaskList