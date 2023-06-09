import React, {useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import styles from './styles.module.css';
import calendarDates from './CalendarData';
import icons from './icons';

const CalendarInput = forwardRef(({prevState}, ref) => {
    const [openPopup, setOpenPopup] = useState(false);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const currentYear = currentDate.getFullYear();
    const changeMonth = useRef(currentMonth);
    const selectedYear = useRef(currentYear); 
    const [selectedMonth, setSelectedMonth] = useState(calendarDates[currentMonth]);
    const [selectedDay, setSelectedDay] = useState(currentDay);

    const handlePopup = () => {
        setOpenPopup(!openPopup);
    }

    const handleDate = (e) => {
        const date = e.target.getAttribute('data-date');
        setSelectedDay(date);
        setOpenPopup(false);
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
            return selectedDay + " " + selectedMonth.month + " " + selectedYear.current;
        }
    }));

    //extracting the month from the prevState string
    useEffect(() => {
        if(!prevState) return;

        let prevDate = prevState;
        prevDate.replaceAll(' ', '');
        let month = '';
        Array.from(prevDate).forEach((char) => {
            if(!Number(char) && Number(char) != 0)
                month += char;
        })

        month = new Date(`23 ${month} 2023`).getMonth();
        setSelectedMonth(calendarDates[month]);
    }, [prevState])

    //extracting the year from the prevState string
    useEffect(() => {
        if(!prevState) return;

        let prevDate = prevState;
        let year = '';
        for(let i = prevDate.length - 1; i >= 0; i--){
            if(Number(prevDate[i]) || Number(prevDate[i]) === 0)
                year += prevDate[i];
            else
                break;
        }
        year = Array.from(year).reverse().join('');
        selectedYear.current = year;
    }, [prevState])

    //extracting the day from the prevState string
    useEffect(() => {
        if(!prevState) return;

        let prevDate = prevState;
        let day = '';
        Array.from(prevDate).every((char) => {
            if(Number(char)){
                day += char;
                return true;
            }
            else 
                return false
        })

        setSelectedDay(day);
    }, [prevState])

    //displaying the popup
    useEffect(() => {
        const popup = document.querySelector('.' + styles.popup);

        if(openPopup)
            popup.style.display = 'block';
        else
            popup.style.display = '';
    }, [openPopup])

    //adding an event listener that will close the popup if the user clicks on anything BUT the popup
    useEffect(() => {
        const handleClick = (e) => {
            if(!e.target.matches('.' + styles.popup) && !e.target.matches('.' + styles.popup_selectedDate) && 
               !e.target.matches('.' + styles.popup_selectedDate) && !e.target.matches('.' + styles.popup_dates) && 
               !e.target.matches('.' + styles.inputContainer_input) && !e.target.matches('.' + styles.arrow) && 
               !e.target.matches('.' + styles.popup_date_nextMonth))
                setOpenPopup(false);
        }
        if(openPopup)
            document.addEventListener('click', handleClick);
        else
            document.removeEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick)
        }

    }, [openPopup])

    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputContainer_title}>
                Invoice Date
            </label>
            <div className={styles.inputContainer_input} onClick={handlePopup}>
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
                    {selectedMonth.dates.map((date, i) => {
                        if(typeof(date) == 'number')
                            return(
                                <span className={styles.popup_date} onClick={handleDate} data-date={date} key={i}>
                                    {date}
                                </span>)
                        else
                            return(
                                <span className={styles.popup_date_nextMonth} key={i}>
                                    {date}
                                </span>)
                    })}
                </div>
            </div>
        </div>
    )
})

export default CalendarInput;