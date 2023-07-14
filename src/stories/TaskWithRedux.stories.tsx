import type {Meta, StoryObj}   from  '@storybook/react';
import {TaskWithRedux} from "../TaskWithRedux";
import {useSelector} from "react-redux";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {AppRootStateType} from "../state/store";
import {TaskType} from "../TodolistWithRedux";

const  meta: Meta<typeof  TaskWithRedux> = {
    title:   'TODOLISTS/TaskWithRedux',
    component:   TaskWithRedux,
    tags: [  'autodocs'],
    // args: {
    //     task: {id: '111', title: 'JS', isDone: false},
    //     todolistId: 'todo1'
    // },
    decorators: [ReduxStoreProviderDecorator]


};

export default  meta;
type Story = StoryObj<  typeof  TaskWithRedux>;


const TaskComponent = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    return  <TaskWithRedux task={task} todolistId={'todolistId1'}/>
}


export const  AppWithReduxStory: Story = {
    render: args => <TaskComponent />
}