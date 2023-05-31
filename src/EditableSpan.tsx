import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTaskTitle: (title: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = (props) => {

    const [title, setTitle] = useState<string>(props.title)
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditMode = () => {
        debugger
        setIsEditMode(false)
        props.changeTaskTitle(title)
    }


    return (
        <div>
            {isEditMode
                ? <input autoFocus
                         value={title}
                         onChange={onChangeHandler}
                         onBlur={offEditMode}/>
                : <span onDoubleClick={onEditMode}>{props.title}</span>}
        </div>
    );
};

export default EditableSpan;