import React, {useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import styles from './styles.module.css';
import calendarDates from './CalendarData';
import icons from './icons';


//i need to style the popup with position properties
const CalendarInput = forwardRef((props, ref) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const currentYear = currentDate.getFullYear();
    const changeMonth = useRef(currentMonth);
    const selectedYear = useRef(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(calendarDates[currentMonth]);
    const [selectedDay, setSelectedDay] = useState(currentDay);

    const handleDate = (e) => {
        const date = e.target.getAttribute('data-date');
        setSelectedDay(date);
    }

    const handleMonth = (e) => {
        const direction = e.target.getAttribute('data-dir');

        if(direction == 'left'){
            if(changeMonth.current - 1 >= 0){
                setSelectedMonth(calendarDates[changeMonth.current - 1]);
                changeMonth.current -= 1;
            }
            else{
                setSelectedMonth(calendarDates[11]);
                changeMonth.current = 11;
                selectedYear.current -= 1;
            }
        }
        else{
            if(changeMonth.current + 1 <= 11){
                setSelectedMonth(calendarDates[changeMonth.current + 1]);
                changeMonth.current += 1;
            }   
            else{
                setSelectedMonth(calendarDates[0]);            
                changeMonth.current = 0;    
                selectedYear.current += 1;
            }
        }
    }

    useImperativeHandle(ref, () => ({
        get state() {
            return selectedDay + " " + selectedMonth + " " + selectedYear.current;
        }
    }));

    useEffect(() => {

    }, [selectedDay])

    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputContainer_title}>
                Invoice Date
            </label>
            <div className={styles.inputContainer_input}>
                {selectedDay + " " + selectedMonth.month + " " + selectedYear.current}
                <img src={icons['calendarIcon']} className={styles.calendarIcon}/>
            </div>
            <div className={styles.popup}>
                <nav className={styles.popup_selectedDate}>
                    <img src={icons['leftArrow']} className={styles.arrow} onClick={handleMonth} data-dir='left'/>
                    {selectedMonth.month + " " + selectedYear.current}
                    <img src={icons['rightArrow']} className={styles.arrow} onClick={handleMonth} data-dir='right'/>
                </nav>
                <div className={styles.popup_dates}>
                    {selectedMonth.dates.map((date) => {
                            if(typeof(date) == 'number')
                                return(
                                    <span className={styles.popup_date} onClick={handleDate} data-date={date}>
                                        {date}
                                    </span>)
                            else
                                return(
                                    <span className={styles.popup_date_nextMonth}>
                                        {date}
                                    </span>
                                )
                    })}
                </div>
            </div>
        </div>
    )
})

export default CalendarInput;