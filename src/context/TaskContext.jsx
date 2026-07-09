import { createContext, useContext, useReducer, useEffect } from "react";
import { taskReducer } from "../store/TaskReducer";

const TaskContext = createContext()

export function TaskProvider({children}) {
    const [tasks, dispatch] = useReducer(taskReducer, JSON.parse(localStorage.getItem('tasks')) || [])
    
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    function addTask(task) {
        dispatch({type: 'ADD_TASK', payload: task})
    }

    function deleteTask(id) {
        dispatch({type: 'DELETE_TASK', payload: id})
    }

    function toggleTask(id) {
        dispatch({type: 'TOGGLE_COMPLETE', payload: id})
    }

    function editTask(task) {
        dispatch({type: 'EDIT_TASK', payload: task})
    }

    return(
        <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTask, editTask }}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTasks() {
    return useContext(TaskContext)
}