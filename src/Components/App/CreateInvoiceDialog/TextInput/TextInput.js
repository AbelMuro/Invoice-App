import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import styles from './styles.module.css';


const TextInput = forwardRef(({type, label, placeholder, otherErrorMessage, ...rest}, ref) => {
    const [text, setText] = useState('');
    const errorMessage = useRef();
    const otherErrorMessageRef = useRef();
    const input = useRef();

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleBlur = (e) => {
        const isValid = e.target.checkValidity();
        const typeMismatch = e.target.validity.typeMismatch;

        if(isValid){
           errorMessage.current.style.display = '';
           input.current.style.border = '';
        }
        else if(typeMismatch){
            otherErrorMessageRef.current.style.display = 'block';
            input.current.style.border = '1px solid #EC5757';
        }
        else{
            errorMessage.current.style.display = 'block';
            input.current.style.border = '1px solid #EC5757';
        } 
    }

    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ');
        input.current.style.border = '1px solid #EC5757';        
        const typeMismatch = e.target.validity.typeMismatch;

        if(typeMismatch){
            otherErrorMessageRef.current.style.display = 'block';
            errorMessage.current.style.display = '';
        }
        else{
            errorMessage.current.style.display = 'block';
            otherErrorMessageRef.current.style.display = '';
        }
           
    }

    const handleClick = () => {
        input.current.setCustomValidity('');
        errorMessage.current.style.display = '';
        otherErrorMessageRef.current.style.display = ''
        input.current.style.border = ''
    }


    useImperativeHandle(ref, () => ({
        get state() {
            return text;
        },
        get resetState(){
            setText('');
        }
    }))

    return(
        <div className={styles.inputContainer}>
            <label className={styles.inputContainer_label}>
                {label}
            </label>
            <input 
                type={type} 
                placeholder={placeholder}
                value={text}
                onChange={handleChange}
                onClick={handleClick}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                className={styles.inputContainer_input}
                ref={input}
                {...rest}
                required/>    
            <div className={styles.errorMessage} ref={errorMessage}>
                can't be empty
            </div>
            <div className={styles.otherErrorMessage} ref={otherErrorMessageRef}>
                {otherErrorMessage}
            </div>
        </div>
    )
});

export default TextInput;