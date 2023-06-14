import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {
    AppBar,
    Button,
    Container, createTheme, CssBaseline, Grid,
    IconButton, Paper, ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {amber, lightGreen} from "@mui/material/colors";

//c- create
//r- read (view, filter, sort, search, page)
//u- update
//d- delete

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed";

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Cheeps", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Dry fish", isDone: false},
            {id: v1(), title: "Whiskey", isDone: false},
        ]
    })


    function removeTask(id: string, todoListId: string) {
        // const tasksArrayAfterDelete: Array<TaskType> = tasks[todoListId].filter(t => t.id != id)
        // const copyTasks: TasksStateType  = {...tasks}
        // copyTasks[todoListId] = tasksArrayAfterDelete
        // setTasks(copyTasks)
        //
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].filter(t => t.id !== id)
        })
    }

    function addTask(title: string, todoListId: string) {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        // const tasksArrayAfterAdd: Array<TaskType> = [newTask, ...tasks[todoListId]]
        // const copyTasks: TasksStateType  = {...tasks}
        // copyTasks[todoListId] = tasksArrayAfterAdd
        // setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]});
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {
                ...t,
                isDone: isDone
            } : t)
        })
    }

    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {
                ...t,
                title: title
            } : t)
        })
    }

    function addTodoList(title: string) {
        const newTodoId = v1()
        const newTodo: TodoListType = {
            id: newTodoId,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodo])
        setTasks({...tasks, [newTodoId]: []})

    }

    function changeTodoListFilter(filter: FilterValuesType, todoListId: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {
            ...tl,
            filter: filter
        } : tl))
    }

    function changeTodoListTitle(title: string, todoListId: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {
            ...tl,
            title: title
        } : tl))
    }

    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        const copyTask = { ...tasks}
        delete copyTask[todoListId]
        setTasks(copyTask)
    }


    const todoListsComponents: Array<JSX.Element> = todoLists.map(tl => {
        let tasksForTodolist: Array<TaskType> = [];

        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
        }
        if (tl.filter === "all") {
            tasksForTodolist = tasks[tl.id]
        }

        return (
            <Grid item key={tl.id}>
                <Paper sx={{"p": "15px"}} elevation={8}>
                    <Todolist

                        todoListId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForTodolist}

                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}

                        removeTodoList={removeTodoList}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    const myTheme = createTheme({
        palette: {
            primary: amber,
            secondary: lightGreen,
            mode: "dark"

        }
    })

    return (
        <ThemeProvider theme={myTheme} >
            <CssBaseline />
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            TodoLists
                        </Typography>
                        {/*<FormGroup>*/}
                        {/*    <FormControlLabel*/}
                        {/*        control={<Checkbox*/}
                        {/*            onChange={(e)=>setDarkMode(e.currentTarget.checked)} />}*/}
                        {/*        label={isDarkMode*/}
                        {/*            ? "Dark mode off"*/}
                        {/*            : "Dark mode on"}*/}
                        {/*    />*/}
                        {/*</FormGroup>*/}

                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container sx={{"p": "10px 0"}}>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todoListsComponents}
                    </Grid>
                </Container>
            </div>
       </ThemeProvider>
    );
}

export default App;
