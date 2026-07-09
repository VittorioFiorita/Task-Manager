export const initialState = [
  { id: 1, title: 'Studiare React', description: 'Completare il modulo sui componenti', priority: 'alta', dueDate: '2026-07-10', completed: false },
  { id: 2, title: 'Fare la spesa', description: 'Latte, pane, uova', priority: 'media', dueDate: '2026-07-08', completed: true },
  { id: 3, title: 'Chiamare il dentista', description: '', priority: 'bassa', dueDate: '', completed: false },
]

export function taskReducer(state, action) {
    switch (action.type) {
        case 'ADD_TASK':
            if(Array.isArray(action.payload)) {
                return [...action.payload, ...state]
            }
            return[action.payload, ...state]
        
        case 'DELETE_TASK':
            return state.filter(t => t.id !==action.payload)
        
        case 'TOGGLE_COMPLETE':
            return state.map(t =>
                t.id === action.payload ? {...t, completed : !t.completed} : t
            )
        
        case 'EDIT_TASK':
            return state.map(t=>
                t.id === action.payload.id ? {...t, ...action.payload} : t
            )
        
        default: return state
    }
}