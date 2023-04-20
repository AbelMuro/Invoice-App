import React, {useState, useRef} from 'react';
import styles from './styles.module.css';


function CalendarInput() {
    const [date, setDate] = useState('');
    const errorMessage = useRef();
    const input = useRef();

    const handleDate = (e) => {
        setDate(e.target.value);
    }

    const handleClick = (e) => {
        errorMessage.current.style.display = '';
        input.current.style.border = '';
    }

    const handleBlur = (e) => {
        const isValid = e.target.checkValidity();

        if(isValid){
            errorMessage.current.style.display = '';
            input.current.style.border = '';
        }
        else{
            errorMessage.current.style.display = 'block'
            input.current.style.border = '1px solid #EC5757'
        }
    }


    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputContainer_title}>
                Invoice Date
            </label>
            <input 
                type='date' 
                value={date}
                onChange={handleDate}
                onClick={handleClick}
                onBlur={handleBlur}
                className={styles.inputContainer_calendar} 
                ref={input}
                required/>
            <div className={styles.errorMessage} ref={errorMessage}>
                can't be empty
            </div>
        </div>
    )
}

export default CalendarInput;