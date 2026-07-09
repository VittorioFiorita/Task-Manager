import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('tasks')) || []

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            if(Array.isArray(action.payload)) {
                return[...action.payload, ...state]
            }
            state.unshift(action.payload)
        },
        deleteTask: (state, action) => {
            return state.filter(t => t.id !== action.payload)
        },
        toggleComplete: (state, action) => {
            const task = state.find(t => t.id === action.payload)
            if(task) task.completed = !task.completed
        },
        editTask: (state, action) => {
            const index= state.findIndex(t => t.id === action.payload.id)
            if (index !== -1) state[index] = {...state[index], ...action.payload}
        },
    },
})

export const{addTask, deleteTask, toggleComplete, editTask} = tasksSlice.actions
export default tasksSlice.reducer