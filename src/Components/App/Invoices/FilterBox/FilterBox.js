import React from 'react'
import styles from './styles.module.css';
import icons from './icons';

function FilterBox() {
    return(
        <div className={styles.filterbox}>
            <div className={styles.filterbox_title}>
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