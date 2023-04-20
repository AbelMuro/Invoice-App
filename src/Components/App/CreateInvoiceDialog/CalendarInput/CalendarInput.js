import React, {useState, useEffect} from 'react';
import styles from './styles.module.css';


function CalendarInput() {
    const [date, setDate] = useState('');

    const handleDate = (e) => {
        setDate(e.target.value);
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
                className={styles.inputContainer_calendar} 
                format={'dd/mm/yyyy'}
                required/>
        </div>
    )
}

export default CalendarInput;