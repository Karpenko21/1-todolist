import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskID: string, isDoneStatus: boolean) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState('')
    const [buttonName, setButtonName] = useState<FilterValuesType>('all')

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onButtonClickHandler = (value: FilterValuesType) => {
        props.changeFilter(value);
        setButtonName(value)
    }

    const onChangeCheckedHandler= (taskId: string, value: boolean) => {
        props.changeStatus(taskId, value)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? styles.error : ''} value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                        <input type="checkbox"
                               onChange={(event) => onChangeCheckedHandler(t.id,  event.currentTarget.checked)}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={buttonName === "all" ? styles.activeFilter : ''} onClick={() => onButtonClickHandler('all')}>All</button>
            <button className={buttonName === "active" ? styles.activeFilter : ''} onClick={() => onButtonClickHandler('active')}>Active</button>
            <button className={buttonName === "completed" ? styles.activeFilter : ''} onClick={() => onButtonClickHandler('completed')}>Completed</button>
        </div>
    </div>
}
