import React from 'react';

type PropsType = {
    name: string,
    callBack: ()=> void
   /* color?: string
    size?: number*/
}


export const Button = (props: PropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }
    return (
        <button onClick={onClickHandler}>{props.name}</button>
    );
};

