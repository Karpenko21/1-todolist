import React, {KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./Components/Button";

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
    addNewTask: (newTask: string) => void
}

export function Todolist(props: PropsType) {

    const [newTask, setNewTask] = useState('')

    const addTaskHandler = () => {
        props.addNewTask(newTask)
        setNewTask('')
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") addTaskHandler()
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.currentTarget.value)
    }

    const changeFilterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue)
    }

    const  mappedTasks = props.tasks.map(t => {
        const removeTaskHandler =()=> {
            props.removeTask(t.id)
        }
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <Button name={'x'} callBack={removeTaskHandler}/>
            </li>
        )
    })

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTask}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <Button name={'+'} callBack={addTaskHandler}/>
        </div>
        <ul>
            {mappedTasks}
        </ul>
        <div>
            <Button name={'All'} callBack={()=>changeFilterHandler("all")}/>
            <Button name={'Active'} callBack={()=>changeFilterHandler('active')}/>
            <Button name={'Completed'} callBack={()=>changeFilterHandler('completed')}/>
        </div>
    </div>
}
