import React, {useState, useEffect} from 'react'
import styles from './styles.module.css';
import icons from './icons';


function FilterBox() {
    const [openPopup, setOpenPopup] = useState(false);

    const handlePopup = () => {
        setOpenPopup(!openPopup);
    }

    useEffect(() => {
        const popup = document.querySelector('.' + styles.filterbox_popup);

        if(openPopup)
            popup.style.display = 'flex';
        else
            popup.style.display = '';

    }, [openPopup])


    useEffect(() => {
        const handleClick = (e) => {
            if(!e.target.matches('.' + styles.filterbox) && !e.target.matches('.' + styles.filterbox_popup) &&
               !e.target.matches('.' + styles.filterbox_fieldset) && !e.target.matches('.' + styles.filterbox_title) &&
               !e.target.matches('.' + styles.filterbox_check) && !e.target.matches('.' + styles.filterbox_label))
               setOpenPopup(false);
        }

        if(openPopup)
            document.addEventListener('click', handleClick);
        else 
            document.removeEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [openPopup])


    return(
        <div className={styles.filterbox}>
            <div className={styles.filterbox_title} onClick={handlePopup}>
                Filter by status
                <img src={icons['arrow']} className={styles.arrow}/>
            </div>
            <div className={styles.filterbox_popup}>
                <fieldset className={styles.filterbox_fieldset}>
                    <input type='checkbox' className={styles.filterbox_check} id='draft'/>
                    <label className={styles.filterbox_label} htmlFor='draft'>
                        Draft
                    </label>                    
                </fieldset>
                <fieldset className={styles.filterbox_fieldset}>
                    <input type='checkbox' className={styles.filterbox_check} id='pending'/>
                    <label className={styles.filterbox_label} htmlFor='pending'>
                        Pending
                    </label>
                </fieldset>
                <fieldset className={styles.filterbox_fieldset}>
                    <input type='checkbox' className={styles.filterbox_check} id='paid'/>
                    <label className={styles.filterbox_label} htmlFor='paid'>
                        Paid
                    </label>
                </fieldset>

            </div>
        </div>
    )
}

export default FilterBox;