import React, {useState} from 'react';
import styles from './styles.module.css';
import icons from './icons';

function CalendarInput() {
    const [date, setDate] = useState('21 Aug 2021');

    const handleDate = (e) => {
        setDate(e.target.value);
    }

    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputContainer_title}>
                Invoice Date
            </label>
            <div className={styles.inputContainer_input}>
                {date}
                <img src={icons['calendarIcon']} className={styles.calendarIcon}/>
            </div>
            <div className={styles.popup}>
                <nav className={styles.popup_selectedDate}>
                    <img src={icons['leftArrow']} className={styles.arrow}/>
                    {date}
                    <img src={icons['rightArrow']} className={styles.arrow}/>
                </nav>
                <div className={styles.popup_dates}>
                    
                </div>
            </div>
        </div>
    )
}

export default CalendarInput;