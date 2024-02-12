import React, { useRef, useEffect } from 'react'
import style from './InputWithLabel.module.css'
import { FaPlus } from 'react-icons/fa';


function InputWithLabel(props) {
    const inputRef = useRef(null); 

    useEffect(() => {
        inputRef.current.focus();
    });

    return (
        <div className={style.formGroup}>
            <label htmlFor="todoTitle" className={style.label}>{props.children}</label>
            <input 
                type="text" 
                id="todoTitle" 
                name="title" 
                className={style.inputText}
                value={props.todoTitle} 
                onChange={props.handleTitleChange}
                ref={inputRef} 
            />
            <button type="submit" className={style.addButton}>
                <FaPlus />
            </button>
        </div>
    )
}

export default InputWithLabel