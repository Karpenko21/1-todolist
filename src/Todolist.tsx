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
    changeStatus: (taskId: string, checkedValue: boolean) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>('')
    const [buttonName, setButtonName] = useState <FilterValuesType>('all')


    const addTask = () => {
        if (title.trim()) {
            props.addTask(title);
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
        props.changeFilter(value);
        setButtonName(value)
    }

    /*const onAllClickHandler = () => {
        props.changeFilter("all");
        setButtonName('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active");
        setButtonName("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed");
        setButtonName("completed")
    }*/


    return (
        <div>
            <h3>{props.title}</h3>
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

                        const onClickHandler = () => props.removeTask(t.id)

                        const onChangeCheckedHandler = (taskId: string, checkedValue: boolean) => props.changeStatus(taskId, checkedValue)

                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}
                                   onChange={(e) => onChangeCheckedHandler(t.id, e.currentTarget.checked)}/>
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