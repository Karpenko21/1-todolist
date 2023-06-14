import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import {IconButton, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm: FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.key === "Enter") {
            addItem();
        }
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle);
            setTitle("");
        } else {
            setError(true);
        }
    }
    const userErrorMessage = <div className="error-message">Title is
        required</div>
    return (
        <div>
            <TextField
                placeholder={"Please, enter title"}
                size={"small"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={error}
                helperText={error && "Title is required!"}
            />
            <IconButton
                size="small"
                color="secondary"
                onClick={addItem}>
                <AddCircleSharpIcon/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;