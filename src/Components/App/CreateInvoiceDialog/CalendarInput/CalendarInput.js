import React, {useState} from 'react';
import styles from './styles.module.css';
import icons from './icons';

function CalendarInput() {
    const [selectedDate, setSelectedDate] = useState('21 Aug 2021');
    const dates = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28, 29, 30,31, 1, 2,3,4];

    const handleDate = (e) => {
        setDate(e.target.value);
    }

    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputContainer_title}>
                Invoice Date
            </label>
            <div className={styles.inputContainer_input}>
                {selectedDate}
                <img src={icons['calendarIcon']} className={styles.calendarIcon}/>
            </div>
            <div className={styles.popup}>
                <nav className={styles.popup_selectedDate}>
                    <img src={icons['leftArrow']} className={styles.arrow}/>
                    {selectedDate}
                    <img src={icons['rightArrow']} className={styles.arrow}/>
                </nav>
                <div className={styles.popup_dates}>
                    {dates.map((date) => {
                        return(<span className={styles.popup_date}>{date}</span>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default CalendarInput;