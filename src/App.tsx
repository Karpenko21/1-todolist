import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {isSymbolObject} from "util/types";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title.trim(), isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    const filteredTasks = () => {

        let tasksForTodolist = tasks;

        if (filter === "active") {
            return tasksForTodolist = tasks.filter(t => !t.isDone);
        } else if (filter === "completed") {
            return tasksForTodolist = tasks.filter(t => t.isDone);
        }
        return tasksForTodolist
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const changeStatus = (taskId: string, checkedValue: boolean) => {
        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: checkedValue} : el))
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks()}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}/>
        </div>
    )
}

export default App;
