import React, {useEffect} from 'react';
import styles from './styles.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {doc, collection, deleteDoc} from 'firebase/firestore';
import {auth, db} from '../Firebase';
import {useNavigate} from 'react-router-dom';


function DeleteDialog() {
    const {open, invoice} = useSelector(state => state.deleteDialog);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCancel = () => {
        dispatch({type: 'open delete', open: false, invoice: null});
    }

    const handleDelete = async () => {
        navigate('/');
        dispatch({type: 'open delete', open: false, invoice: null});
        try{
            const collectionRef = collection(db, `${auth.currentUser.uid}`);
            const docRef = doc(collectionRef, `${invoice.invoiceID}`);
            await deleteDoc(docRef);        
        }
        catch(error){
            console.log(error)
        }
        finally{
            setTimeout(() => {
                alert('Invoice has been deleted');
            }, 500)
        }
    }

    useEffect(() => {
        const overlay = document.querySelector('.' + styles.overlay);
        const deleteDialog = document.querySelector('.' + styles.deleteDialog)

        if(open){   
            overlay.style.display = 'block';                                //changing display from none to block will cancel any animation created by the transition property
            deleteDialog.style.display = 'block';
            setTimeout(() => {                                              //im using setTimeout because its async, so it wont cancel the animation
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
                <dialog className={styles.deleteDialog} open={open}>
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