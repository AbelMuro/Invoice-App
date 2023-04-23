import React, {useRef, forwardRef, useImperativeHandle, useState, useEffect} from 'react';
import styles from './styles.module.css';

const Input = forwardRef(({type, label, message}, ref) => {
    const [text, setText] = useState('');
    const emptyMessage = useRef();
    const typeMismatchMessage = useRef();
    const input = useRef();
    

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleBlur = (e) => {
        const isValid = e.target.checkValidity();
        const typeMismatch = e.target.validity.typeMismatch;

        if (typeMismatch){
            typeMismatchMessage.current.style.display = 'block';
            input.current.style.border = '1px solid #EC5757'
        }
            
        else if (!isValid){
            emptyMessage.current.style.display = 'block';
            input.current.style.border = '1px solid #EC5757';
        }
    }

    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ');
        const typeMismatch = e.target.validity.typeMismatch;
        if(typeMismatch){
            typeMismatchMessage.current.style.display = 'block';
            input.current.style.border = '1px solid #EC5757';
        }
        else{
            emptyMessage.current.style.display = 'block';
            input.current.style.border = '1px solid #EC5757'
        }
            
    }

    const handleClick = (e) => {
        e.target.setCustomValidity('');
        emptyMessage.current.style.display = '';
        typeMismatchMessage.current.style.display = '';
        input.current.style.border = '';
    }

    useImperativeHandle(ref, () => ({
        get state() {
            return text;
        },
        get resetState(){
            setText('');
            return '';
        }
    }))

    useEffect(() => {
        const inputRef = document.querySelector('.' + styles.inputContainer_input);
        const allErrorMessages = document.querySelectorAll('.' + styles.errorMessage)
        inputRef.style.border = '';
        allErrorMessages.forEach((message) => {
            message.style.display = '';
        })

    }, [])

    return (
        <fieldset className={styles.inputContainer}>
            <label className={styles.inputContainer_label}>
                {label}
            </label>
            <input 
                type={type} 
                value={text}
                onBlur={handleBlur}
                onChange={handleChange}
                onClick={handleClick}
                onInvalid={handleInvalid}
                className={styles.inputContainer_input}
                ref={input}
                required
            />
            <div className={styles.errorMessage} ref={typeMismatchMessage}>
                {message}
            </div>
            <div className={styles.errorMessage} ref={emptyMessage}>
                Can't be empty
            </div>
        </fieldset>
    )
})

export default Input;