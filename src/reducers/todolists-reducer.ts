import {FilterValuesType, TodoListType} from "../App";


export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    todolistId: string
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}

export  type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todolistId: string
}

export type ChangeTodolistStatusActionType = {
    type: "CHANGE-TODOLIST-STATUS-FILTER",
    filter: FilterValuesType
    todolistId: string
}
export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistStatusActionType


export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.todolistId)
        case "ADD-TODOLIST":
            const newTodo: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }
            return [...todolists, newTodo]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.todolistId ? {
                ...tl,
                title: action.title
            } : tl)
        case "CHANGE-TODOLIST-STATUS-FILTER":
            return todolists.map(tl => tl.id === action.todolistId ? {
                ...tl,
                filter: action.filter
            } : tl)
        default:
            return todolists
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST",
        todolistId: id
    }
}

export const AddTodolistAC = (title: string, id: string): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        title: title,
        todolistId: id
    }
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        todolistId: id,
        title: title
    }
}

export const ChangeTodolistStatusAT = (id: string, filter: FilterValuesType): ChangeTodolistStatusActionType => {
    return {
        type: "CHANGE-TODOLIST-STATUS-FILTER",
        filter: filter,
        todolistId: id
    }
}