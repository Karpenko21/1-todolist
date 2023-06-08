import {TasksStateType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";


export const tasksReducer = (state: TasksStateType, action: MainTasksType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(t => t.id !== action.payload.id)
            }
        }
        case 'ADD-TASK': {
            const newTask: TaskType = {id: v1(), title: action.payload.title.trim(), isDone: false}
            return {...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]}
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(el =>
                    el.id === action.payload.taskId ? {...el, title: action.payload.newTitle} : el)
            }
        }
        case "CHANGE-TASK-STATUS" : {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(el =>
                    el.id === action.payload.taskId ? {...el, isDone: action.payload.checkedValue} : el)
            }
        }
        case "CREATE-TASKS-FOR-NEW-TODOLIST" : {
            return {...state, [action.payload.newTodoListID]: []}
        }
        default:
            return state
    }
}

type MainTasksType = RemoveTaskACType | AddTaskACType
    | ChangeTasksTitleACType | ChangeTasksStatusACType
    | CreateTasksForNewTodolistACType


type RemoveTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (id: string, todoListID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id, todoListID}
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string, todoListID: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title, todoListID}
    } as const
}


type ChangeTasksTitleACType = ReturnType<typeof changeTasksTitleAC>

export const changeTasksTitleAC = (taskId: string, newTitle: string, todoListID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {taskId, newTitle, todoListID}
    } as const
}


type ChangeTasksStatusACType = ReturnType<typeof changeTasksStatusAC>

export const changeTasksStatusAC = (taskId: string, checkedValue: boolean, todoListID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {taskId, checkedValue, todoListID}
    } as const
}

type CreateTasksForNewTodolistACType = ReturnType<typeof createTasksForNewTodolistAC>

export const createTasksForNewTodolistAC = (newTodoListID: string) => {
    return {
        type: 'CREATE-TASKS-FOR-NEW-TODOLIST',
        payload: {newTodoListID}
    } as const
}

