import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todolistID: string]: Array<TasksType>
}

function App() {
    const todolist_1ID = v1()
    const todolist_2ID = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolist_1ID, title: "What to learn", filter: "all"},
        {id: todolist_2ID, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolist_1ID]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolist_2ID]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Pasta", isDone: false},
            {id: v1(), title: "A bottle of water", isDone: false},
            {id: v1(), title: "Apples", isDone: false},
        ],
    })

    function removeTask(id: string, todolistID: string) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].filter(t => t.id !== id)
        })
    }

    function addTask(title: string, todolistID: string) {
        const newTask = {id: v1(), title: title.trim(), isDone: false}
        setTasks({
            ...tasks,
            [todolistID]: [newTask, ...tasks[todolistID]]
        })

    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistID: string) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        })
    }


    function changeTodolistFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl))
    }

    function removeTodolist(todolistID: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
    }


    const todolistComponent = todolists.map(tl => {

        let tasksForTodolist = tasks[tl.id];

        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
        }
        return (
            <Todolist
                key={tl.id}
                title={tl.title}
                todolistID={tl.id}
                tasks={tasksForTodolist}
                filter={tl.filter}

                changeTodolistFilter={changeTodolistFilter}
                removeTodolist={removeTodolist}

                changeTaskStatus={changeTaskStatus}
                removeTask={removeTask}
                addTask={addTask}
            />
        )
    })

    return <div className="App">
        {todolistComponent}
    </div>
}

export default App;
