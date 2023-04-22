import React, {useEffect} from 'react';
import styles from './styles.module.css';
import {useSelector, useDispatch} from 'react-redux';
import TextInput from './TextInput';
import CalendarInput from './CalendarInput';
import SelectInput from './SelectInput';
import AddItems from './AddItems';

function CreateInvoiceDialog() {
    const open = useSelector(state => state.createInvoice);
    const dispatch = useDispatch();

    const handleSubmit = () => {

    }

    const handleScroll = () => {
        const dialog = document.querySelector('.' + styles.newInvoice);
        dialog.scrollTo(0, 9999999);
    }

    useEffect(() => {
        const overlay = document.querySelector('.' + styles.overlay);
        if(open){
            overlay.style.left = '0%';
            setTimeout(() => {
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            }, 400)
        }
        else{
            overlay.style.backgroundColor = ''; 
            setTimeout(() => {
                overlay.style.left = ''; 
            }, 400)      
        }
    }, [open])

    useEffect(() => {
        const handleClick = (e) => {
            if(e.target.matches('.' + styles.overlay))
                dispatch({type: 'open create invoice', open: false});
        }

        if(open)
            document.addEventListener('click', handleClick);
        else
            document.removeEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }

    }, [open])

    useEffect(() => {
        const handleScroll = () => {
           window.scrollTo(0, 0)
        }

        if(open)
            document.addEventListener('scroll', handleScroll);
        else
            document.removeEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        }

    }, [open])


    return(
        <form className={styles.overlay}>
            <section className={styles.newInvoice} onSubmit={handleSubmit}>
                <h1 className={styles.newInvoice_title}>
                    New Invoice
                </h1>
                <fieldset className={styles.billFrom}>
                    <h2 className={styles.billFrom_title}>
                        Bill From
                    </h2>
                    <TextInput type='text' label='Street Address' placeholder='19 Union Terrace'/>  
                    <TextInput type='text' label='City' placeholder='London'/>       
                    <TextInput type='text' label='Post Code' placeholder='E1 3EZ'/>       
                    <TextInput type='text' label='Country' placeholder='United Kingdom'/>                         
                </fieldset>
                <fieldset className={styles.billTo}>
                    <h2 className={styles.billTo_title}>
                        Bill To
                    </h2>
                    <TextInput type='text' label="Client's Name" placeholder='Alex Grim'/>  
                    <TextInput type='email' label="Client's Email" placeholder='alexgrim@mail.com' otherErrorMessage='not valid email'/>       
                    <TextInput type='text' label='Street Address' placeholder='84 Church Way'/>       
                    <TextInput type='text' label='City' placeholder='Bradford'/>
                    <TextInput type='text' label='Post Code' placeholder='BD1 9PB'/>
                    <TextInput type='text' label='Country' placeholder='United Kingdom'/>
                </fieldset>
                <fieldset className={styles.invoiceDetails}>
                    <CalendarInput/>
                    <SelectInput/>
                    <TextInput type='text' label='Project Description' placeholder='Graphic Design'/>
                </fieldset>
                <fieldset className={styles.itemList}>
                    <h2 className={styles.itemList_title}>
                        Item List
                    </h2>
                    <AddItems handleScroll={handleScroll}/>
                </fieldset>
            </section>    
            <div className={styles.buttons}>
                    <button className={styles.discardButton}>
                        Discard
                    </button>
                    <button className={styles.draftButton}>
                        Save as Draft
                    </button>
                    <button className={styles.saveButton}> 
                        Save & Send
                    </button>
                </div>        
        </form>
    )
}

export default CreateInvoiceDialog;