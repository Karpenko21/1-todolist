import {FilterValuesType, TodolistType} from "../App";



export const todolistsReducer = (state: Array<TodolistType>, action: MainTodolistsType) => {
    switch (action.type) {
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.todoListID ? {...tl, filter: action.payload.value} : tl)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.todoListID ? {...tl, title: action.payload.title} : tl)
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistID)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistType = {id: action.payload.newTodolistID, title: action.payload.title, filter: 'all'}
            return [newTodolist, ...state]
        }

        default:
            return state
    }
}

type MainTodolistsType = ChangeTodolistFilterACType | ChangeTodolistTitleACType |RemoveTodolistACType | AddTodolistACType


type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (value: FilterValuesType, todoListID: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {value, todoListID}
    } as const
}



type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (title: string, todoListID: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {title, todoListID}
    } as const
}


export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistID}
    } as const
}


export type AddTodolistACType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (newTodolistID: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodolistID, title}
    } as const
}
