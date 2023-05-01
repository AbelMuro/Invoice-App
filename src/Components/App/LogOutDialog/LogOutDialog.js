import React, {useEffect} from 'react';
import styles from './styles.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {auth} from '../Firebase';
import {signOut} from 'firebase/auth';


function LogOutDialog() {
    const open = useSelector(state => state.logoutDialog);
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch({type: 'open log out', open: false});
    }

    const handleLogOut = async () => {
        await signOut(auth);
        dispatch({type: 'open log out', open: false});
    }

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
        const dialog = document.querySelector('.' + styles.logoutDialog);

        if(open){
            overlay.style.display = 'block';
            setTimeout(() => {
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                dialog.style.backgroundColor = 'var(--dialog-bg)';
            }, 10)            
        }
        else{
            dialog.style.backgroundColor = '';
            overlay.style.backgroundColor = '';
            setTimeout(() => {
                overlay.style.display = '';
            }, 200)
        }
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
                    <button className={styles.cancelButton} onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className={styles.logOutButton} onClick={handleLogOut}>
                        Log Out
                    </button>
                </div>
            </dialog>
        </section>
    )
}

export default LogOutDialog;