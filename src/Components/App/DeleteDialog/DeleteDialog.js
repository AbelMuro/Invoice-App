import React, {useEffect} from 'react';
import styles from './styles.module.css';
import {useSelector, useDispatch} from 'react-redux';


//now i need to define the event handlers for the delete button
function DeleteDialog() {
    const {open, invoice} = useSelector(state => state.deleteDialog);
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch({type: 'open delete', open: false, invoice: null});
    }

    const handleDelete = () => {
        
    }

    useEffect(() => {
        const overlay = document.querySelector('.' + styles.overlay);
        const deleteDialog = document.querySelector('.' + styles.deleteDialog)

        if(open){
            overlay.style.display = 'block';
            deleteDialog.style.display = 'block'
            setTimeout(() => {
                deleteDialog.style.backgroundColor = 'var(--dialog-bg)';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            }, 10)
        }
        else {
            overlay.style.backgroundColor = '';
            deleteDialog.style.backgroundColor = '';            
            setTimeout(() => {
                overlay.style.display = '';
                deleteDialog.style.display = ''
            }, 200)
        }
    }, [open])

    useEffect(() => {
        const handleClick = (e) => {
            if(e.target.matches('.' + styles.overlay))
                dispatch({type: 'open delete', open: false, invoice: null})
        }

        if(open)
            document.addEventListener('click', handleClick);
        else
            document.removeEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick)    
        }
    }, [open])

    useEffect(() => {
        const handleScroll = () => {
            window.scrollTo(0, 0);
        }

        if(open)
            document.addEventListener('scroll', handleScroll);
        else
            document.removeEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        }

    }, [open])

    return (
            <div className={styles.overlay}>
                <dialog className={styles.deleteDialog}>
                    <h3 className={styles.deleteDialog_title}>
                        Confirm Deletion
                    </h3>
                    <p className={styles.deleteDialog_message}>
                        Are you sure you want to delete invoice {open ?`#${invoice.invoiceNumber.toUpperCase()}` : ''}? 
                        This action cannot be undone
                    </p>
                    <div className={styles.buttons}>
                        <button className={styles.cancelButton} onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className={styles.deleteButton} onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </dialog>
            </div>
        )
}

export default DeleteDialog;