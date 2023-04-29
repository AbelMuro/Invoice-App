import React, {useState, useEffect} from 'react'
import styles from './styles.module.css';
import icons from './icons';
import {useDispatch} from 'react-redux';

function FilterBox({mobile}) {
    const [openPopup, setOpenPopup] = useState(false);
    const [draft, setDraft] = useState(false);
    const [pending, setPending] = useState(false);
    const [paid, setPaid] = useState(false);
    const dispatch = useDispatch();

    const handlePopup = () => {
        setOpenPopup(!openPopup);
    }

    const handleDraft = () => {
        setDraft(!draft)
    }

    const handlePending = () => {
        setPending(!pending)
    }

    const handlePaid = () => {
        setPaid(!paid);
    }

    useEffect(() => {
        const popup = document.querySelector('.' + styles.filterbox_popup);
        const arrowRef = document.querySelector('.' + styles.arrow);
        if(openPopup){
            popup.style.display = 'flex';
            arrowRef.style.transform = 'rotate(180deg)';
        }
        else {
           popup.style.display = ''; 
           arrowRef.style.transform = '';
        }
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


    useEffect(() => {
        if(draft)
            dispatch({type: 'add filter', filter: 'Draft'});
        else
            dispatch({type: 'remove filter', filter: 'Draft'})
    }, [draft])

    useEffect(() => {
        if(pending)
            dispatch({type:'add filter', filter: 'Pending'});
        else
            dispatch({type: 'remove filter', filter: 'Pending'})
    }, [pending])

    useEffect(() => {
        if(paid)
            dispatch({type:'add filter', filter: 'Paid'});
        else
            dispatch({type: 'remove filter', filter: 'Paid'});
    }, [paid])

    return(
        <div className={styles.filterbox}>
            <div className={styles.filterbox_title} onClick={handlePopup}>
                {mobile ? 'Filter' : 'Filter by status'}
                <img src={icons['arrow']} className={styles.arrow}/>
            </div>
            <div className={styles.filterbox_popup}>
                <fieldset className={styles.filterbox_fieldset}>
                    <input 
                        type='checkbox' 
                        value={draft}
                        onChange={handleDraft}
                        className={styles.filterbox_check} 
                        id='draft'/>
                    <label className={styles.filterbox_label} htmlFor='draft'>
                        Draft
                    </label>                    
                </fieldset>
                <fieldset className={styles.filterbox_fieldset}>
                    <input 
                        type='checkbox' 
                        value={pending}
                        onChange={handlePending}
                        className={styles.filterbox_check} 
                        id='pending'/>
                    <label className={styles.filterbox_label} htmlFor='pending'>
                        Pending
                    </label>
                </fieldset>
                <fieldset className={styles.filterbox_fieldset}>
                    <input 
                        type='checkbox' 
                        value={paid}
                        onChange={handlePaid}
                        className={styles.filterbox_check} 
                        id='paid'/>
                    <label className={styles.filterbox_label} htmlFor='paid'>
                        Paid
                    </label>
                </fieldset>

            </div>
        </div>
    )
}

export default FilterBox;