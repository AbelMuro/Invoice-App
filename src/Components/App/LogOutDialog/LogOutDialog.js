import React, {useEffect} from 'react';
import styles from './styles.module.css';
import {useSelector, useDispatch} from 'react-redux';

//this is where i left off, now i need to implement the event handlers for each of the buttons

function LogOutDialog() {
    const open = useSelector(state => state.logoutDialog);
    const dispatch = useDispatch();

    useEffect(() => {
        const closeDialog = (e) => {
            if(e.target.matches('.' + styles.overlay))
                dispatch({type: 'open log out', open: false});
        }
        if(open)
            document.addEventListener('click', closeDialog);
        else
            document.removeEventListener('click', closeDialog);
        return () => {
            document.removeEventListener('click', closeDialog);
        }
    },[open])

    useEffect(() => {
        const overlay = document.querySelector('.' + styles.overlay);

        if(open)
            overlay.style.display = 'block';
        else
            overlay.style.display = '';
    }, [open])

    return(
        <section className={styles.overlay}>
            <dialog className={styles.logoutDialog} open={open}>
                <h1 className={styles.logoutDialog_title}>
                    Log Out
                </h1>
                <p className={styles.logoutDialog_desc}>
                    Are you sure you want to log out?
                </p>
                <div className={styles.logoutDialog_buttons}>
                    <button className={styles.cancelButton}>
                        Cancel
                    </button>
                    <button className={styles.logOutButton}>
                        Log Out
                    </button>
                </div>
            </dialog>
        </section>
    )
}

export default LogOutDialog;