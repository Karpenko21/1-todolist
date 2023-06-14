import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {
    Button,
    Checkbox,
    IconButton,
    List,
    ListItem,
    Typography
} from "@mui/material";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType

    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void

    removeTodoList: (todoListId: string) => void
    changeTodoListFilter: (value: FilterValuesType, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export function Todolist(props: PropsType) {

    const addNewTask = (title: string) => props.addTask(title, props.todoListId);

    const onAllClickHandler = () => props.changeTodoListFilter("all", props.todoListId);
    const onActiveClickHandler = () => props.changeTodoListFilter("active", props.todoListId);
    const onCompletedClickHandler = () => props.changeTodoListFilter("completed", props.todoListId);
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodoListTitle = (newTitle: string) => props.changeTodoListTitle(newTitle, props.todoListId)

    return <div>
        <Typography
            variant={"h5"}
            align={"center"}
            fontWeight={"bold"}
        >
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
            <IconButton
                color="primary"
                onClick={removeTodoList}>
                <DisabledByDefaultIcon />
            </IconButton>
        </Typography>
        <AddItemForm addItem={addNewTask} />
        <List>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todoListId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId);
                    }
                    const changeTaskTitle = (newTitle: string) => props.changeTaskTitle(t.id, newTitle, props.todoListId)

                    return <ListItem
                        key={t.id}
                        className={t.isDone ? "is-done" : ""}
                        divider
                        disablePadding
                        secondaryAction={
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={onClickHandler}>
                                <DisabledByDefaultIcon />
                            </IconButton>
                        }
                    >
                        <Checkbox
                               size="small"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                       <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>

                    </ListItem>
                })
            }
        </List>
        <div>
            <Button
                variant="contained"
                size="small"
                disableElevation
                color={props.filter === 'all' ? "secondary" : "primary"}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                sx={{"ml": "3px"}}
                variant="contained"
                size="small"
                disableElevation
                color={props.filter === 'active' ? "secondary" : "primary"}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                sx={{"ml": "3px"}}
                variant="contained"
                size="small"
                disableElevation
                color={props.filter === 'completed' ? "secondary" : "primary"}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}
