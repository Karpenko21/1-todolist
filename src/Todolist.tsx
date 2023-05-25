import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType

    removeTask: (taskId: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTasksStatus: (taskId: string, checkedValue: boolean, todoListID: string) => void

    removeToDoList: (toDoListID: string) => void
    changeTodoListFilter: (value: FilterValuesType, todoListID: string ) => void
}


export function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>('')
    const [buttonName, setButtonName] = useState <FilterValuesType>('all')


    const addTask = () => {
        if (title.trim()) {
            props.addTask(title, props.todolistID);
            setTitle("");
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError("")
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onButtonClickHandler = (value: FilterValuesType) => {
        props.changeTodoListFilter(value, props.todolistID);
        setButtonName(value)
    }

    const removeTodolist = () => {
        props.removeToDoList(props.todolistID)
    }


    return (
        <div>
            <h3>{props.title}
            <button onClick={removeTodolist}>x</button></h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? styles.error   : ""}
                />
                <button onClick={addTask}>+</button>
                <div className={error ? styles.errorMessage : ""}>{error}</div>
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onClickHandler = () => props.removeTask(t.id, props.todolistID)

                        const onChangeCheckedHandler = (taskId: string, checkedValue: boolean, todoListID: string) => props.changeTasksStatus(taskId, checkedValue, todoListID)

                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}
                                   onChange={(e) => onChangeCheckedHandler(t.id, e.currentTarget.checked, props.todolistID)}/>
                            <span className={t.isDone ? styles.isDone : ""}>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={() => onButtonClickHandler('all')}
                        className={buttonName === 'all'?  styles.activeFilter : ""}>All</button>
                <button onClick={() => onButtonClickHandler('active')}
                        className={buttonName === 'active'?  styles.activeFilter : ""}>Active</button>
                <button onClick={() => onButtonClickHandler('completed')}
                        className={buttonName === 'completed'?  styles.activeFilter : ""}>Completed</button>
            </div>
        </div>
    )
}