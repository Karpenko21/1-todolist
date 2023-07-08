import React, {ChangeEvent, memo} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {AppRootStateType} from "./state/store";


export type TaskWithReduxPropsType = {
    task: TaskType
    todolistId: string,
}

const TaskWithRedux = memo(({
                                task,
                                todolistId
                            }: TaskWithReduxPropsType) => {

    const dispatch = useDispatch()
  /*  const t = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId].filter(t => t.id === task.id)[0])
      можно вот так добраться до таски через useSelector
      или так
      const t = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId]
          .find(t => t.id === task.id) as TaskType)*/

    const onClickHandler = () => dispatch(removeTaskAC(task.id, todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId));
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistId));
    }

    return (
        <div className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
})

export default TaskWithRedux;