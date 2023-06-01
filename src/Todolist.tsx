import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";


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
    changeTasksTitle: (taskId: string, newTitle:string,  todoListID: string) => void

    removeToDoList: (toDoListID: string) => void
    changeTodoListFilter: (value: FilterValuesType, todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
}


export function Todolist(props: TodolistPropsType) {


    const [buttonName, setButtonName] = useState<FilterValuesType>('all')


    const onButtonClickHandler = (value: FilterValuesType) => {
        props.changeTodoListFilter(value, props.todolistID);
        setButtonName(value)
    }

    const removeTodolist = () => {
        props.removeToDoList(props.todolistID)
    }

    const addNewTask = (title: string) => props.addTask(title, props.todolistID)

    const changeTodolistTitle = (newTitle: string) => {props.changeTodolistTitle(newTitle, props.todolistID)}


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addNewTask}/>
            <ul>
                {
                    props.tasks.map(t => {

                        const onClickHandler = () => props.removeTask(t.id, props.todolistID)

                        const onChangeCheckedHandler = (taskId: string, checkedValue: boolean, todoListID: string) => props.changeTasksStatus(taskId, checkedValue, todoListID)
                       const  changeTaskTitle = (newTitle: string) => {props.changeTasksTitle(t.id, newTitle, props.todolistID )}

                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}
                                   onChange={(e) => onChangeCheckedHandler(t.id, e.currentTarget.checked, props.todolistID)}/>
                            <span className={t.isDone ? styles.isDone : ""}>
                                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                            </span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={() => onButtonClickHandler('all')}
                        className={buttonName === 'all' ? styles.activeFilter : ""}>All
                </button>
                <button onClick={() => onButtonClickHandler('active')}
                        className={buttonName === 'active' ? styles.activeFilter : ""}>Active
                </button>
                <button onClick={() => onButtonClickHandler('completed')}
                        className={buttonName === 'completed' ? styles.activeFilter : ""}>Completed
                </button>
            </div>
        </div>
    )
}