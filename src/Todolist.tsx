import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    todolistID: string
    tasks: Array<TasksType>
    filter: FilterValuesType

    changeTodolistFilter: (todolistID: string, value: FilterValuesType) => void
    removeTodolist: (todolistID: string) => void

    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    removeTask: (id: string, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void

}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), props.todolistID);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }


    const onFilerClickHandler = (filterValue: FilterValuesType) => {
        props.changeTodolistFilter(props.todolistID, filterValue)
    }


    return <div>
        <div>
            <h3>{props.title}</h3><button onClick={() => props.removeTodolist(props.todolistID)}>x</button>
        </div>

        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todolistID)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID);
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={() => onFilerClickHandler("all")}
            >All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={() => onFilerClickHandler("active")}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={() => onFilerClickHandler("completed")}>Completed
            </button>
        </div>
    </div>
}
