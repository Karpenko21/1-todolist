import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';


export  type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

function App() {

    const toDoListId_1 = v1()
    const toDoListId_2 = v1()

    const [todoList, setTodolist] = useState<Array<TodolistType>>([
        {id: toDoListId_1, title: "What to learn", filter: "all"},
        {id: toDoListId_2, title: "What to buy", filter: "all"},
    ])

    type TasksStateType = {
        [todolistId: string]: Array<TaskType>
    }

    const [tasks, setTasks] = useState<TasksStateType>({
        [toDoListId_1]:
            [{id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
        [toDoListId_2]:
            [{id: v1(), title: "Meat", isDone: true},
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Bread", isDone: false},
                {id: v1(), title: "Pasta", isDone: false},
                {id: v1(), title: "A bottle of water", isDone: false},
            ],
    })



    function removeTask(id: string, todoListID: string) {
        /*const tasksArrayAfterRemove: Array<TaskType> = tasks[toDoListID].filter(t => t.id != id);
        const copyTasks = {...tasks}
        copyTasks[toDoListID] = tasksArrayAfterRemove
        setTasks(copyTasks) */

        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== id)})

    }

    function addTask(title: string, todoListID: string) {

        const newTask: TaskType = {id: v1(), title: title.trim(), isDone: false}
        /*        const tasksArrayAfterAdd: Array<TaskType> = [newTask, ...tasks[toDoListID]]
                const copyTasks = {...tasks}
                setTasks(copyTasks)*/

        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]});
    }

    const changeTasksStatus = (taskId: string, checkedValue: boolean, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskId ? {...el, isDone: checkedValue} : el)
        })
    }


    function changeTodolistFilter(value: FilterValuesType, todoListID: string) {
        setTodolist(todoList.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl));
    }

    function addToDoListFilter() {
    }

    function removeToDoList(toDoListID: string) {
        setTodolist(todoList.filter(tl => tl.id !== toDoListID))
    }


    const todolistComponents: Array<JSX.Element> = todoList.map(tl => {


            let tasksForTodolist = tasks[tl.id];

            if (tl.filter === "active") {
                tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
            }
            if (tl.filter === "completed") {
                tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
            }


            /*const filteredTasks = () => {

                let tasksForTodolist = tasks[tl.id];

                if (tl.filter === "active") {
                    return tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                } else if (filter === "completed") {
                    return tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                }
                return tasksForTodolist
            }*/

            return (
                <Todolist key={tl.id}
                          todolistID={tl.id}
                          title={tl.title}
                          filter={tl.filter}

                          tasks={tasksForTodolist}

                          removeTask={removeTask}
                          removeToDoList={removeToDoList}
                          changeTodoListFilter={changeTodolistFilter}
                          addTask={addTask}
                          changeTasksStatus={changeTasksStatus}/>
            )
        }

    )
    return (
        <div className={"App"}>{todolistComponents}</div>
    )

}

export default App;
