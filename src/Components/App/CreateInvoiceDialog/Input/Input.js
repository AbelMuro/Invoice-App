import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import styles from './styles.module.css';


//i will need to style the input and the label
const Input = forwardRef(({label, placeholder}, ref) => {
    const [text, setText] = useState('');
    const errorMessage = useRef();
    const input = useRef();

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleBlur = (e) => {
        const isValid = e.target.checkValidity();

        if(isValid){
           errorMessage.current.style.display = '';
           input.current.style.border = ''
        }
        else{
            errorMessage.current.style.display = 'block';
            input.current.style.border = '1px solid #EC5757';
        } 
    }

    const handleClick = () => {
        errorMessage.current.style.display = '';
        input.current.style.border = ''
    }


    useImperativeHandle(ref, () => ({
        get state() {
            return text;
        }
    }))

    return(
        <div className={styles.inputContainer}>
            <label className={styles.inputContainer_label}>
                {label}
            </label>
            <input 
                type='text' 
                placeholder={placeholder}
                value={text}
                onChange={handleChange}
                onClick={handleClick}
                onBlur={handleBlur}
                className={styles.inputContainer_input}
                ref={input}
                required/>    
            <div className={styles.errorMessage} ref={errorMessage}>
                can't be empty
            </div>
        </div>
    )
});

export default Input;