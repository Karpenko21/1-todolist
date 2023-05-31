import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "./Todolist.module.css";

type AddItemFormPropsType = {
    addItem: (title:string) => void
}

const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    const userError = 'Title is required'

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const addItem = () => {
        if (title.trim()) {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError(true)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem();
        }
    }

    return (
        <div>

            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? styles.error   : ""}
            />
            <button onClick={addItem}>+</button>
            <div className={error ? styles.errorMessage : ""}>
                {error ? userError : ''}
            </div>
        </div>
    );
};

export default AddItemForm;