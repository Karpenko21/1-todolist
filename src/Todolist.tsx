import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import Button from "./Components/Button";

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
    addTask: (titleTask: string) => void
}

export function Todolist(props: PropsType) {

    const [titleTask, setTitleTask] = useState('')
    console.log(titleTask)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleTask(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }


    const addTaskHandler = () => {
        props.addTask(titleTask)
        setTitleTask('')
    }

/*    const removeTaskHandler =(tID: string) => {
        props.removeTask(tID)
    }*/

    const mappedTasks =  props.tasks.map(t => {
        const removeTaskHandler = () => {
            props.removeTask(t.id)
        }
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <Button name={'x'} callBack={removeTaskHandler}/>
            </li>)
    })

    const mainFilterAll =(filterValue: FilterValuesType) => {
        props.changeFilter(filterValue)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={titleTask} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <Button name={'+'} callBack={addTaskHandler}/>
        </div>
        <ul>
            {mappedTasks
                /*props.tasks.map(t => {
                  /!*  const removeTaskHandler =() => {
                        props.removeTask(t.id)
                    }*!/
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button name={'x'} callBack={()=>removeTaskHandler(t.id)}/>
                        </li>
                    )
                })*/
            }
        </ul>
        <div>
            {/*<button onClick={() => {
                props.changeFilter("all")
            }}>
                All
            </button>*/}
            <Button name={'All'} callBack={()=> mainFilterAll("all")}/>
            <Button name={'Active'} callBack={()=> mainFilterAll("active")}/>
            <Button name={'Completed'} callBack={()=> mainFilterAll("completed")}/>
            {/*<button onClick={()=> mainFilterAll("all")}>All</button>
            <button onClick={()=> mainFilterAll("active")}> Active</button>
            <button onClick={()=> mainFilterAll("completed")}> Completed</button>*/}
        </div>
    </div>
}
