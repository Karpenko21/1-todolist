import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    todolistTitle: string
    todolistFilter: FilterValuesType

    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle:(id: string, newTitle:string, todolistId: string) => void

    changeTodolistFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (id: string) => void
    addTodolist: (todolistTitle: string) => void

}

export function Todolist(props: PropsType) {


    const addTask = (title: string) => props.addTask(title, props.todolistId)





    const removeTodolist = () => props.removeTodolist(props.todolistId)

    const onAllClickHandler = () => props.changeTodolistFilter("all", props.todolistId);
    const onActiveClickHandler = () => props.changeTodolistFilter("active", props.todolistId);
    const onCompletedClickHandler = () => props.changeTodolistFilter("completed", props.todolistId);

    return <div>
        <h3> {props.todolistTitle}
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todolistId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.todolistId);
                    }
                    const getNewTitle = (title: string) => {
                        debugger
                        props.changeTaskTitle(t.id, title, props.todolistId)
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>
                           <EditableSpan title={t.title} changeTaskTitle={getNewTitle}/>
                        </span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.todolistFilter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.todolistFilter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.todolistFilter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


