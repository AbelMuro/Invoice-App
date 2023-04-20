import React, {useEffect} from 'react';
import styles from './styles.module.css';
import {useSelector, useDispatch} from 'react-redux';
import Input from './Input';
import CalendarInput from './CalendarInput';
import SelectInput from './SelectInput';

function CreateInvoiceDialog() {
    const open = useSelector(state => state.createInvoice);
    const dispatch = useDispatch();

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


    return(
        <section className={styles.overlay}>
            <form className={styles.newInvoice}>
                <h1 className={styles.newInvoice_title}>
                    New Invoice
                </h1>
                <fieldset className={styles.billFrom}>
                    <h2 className={styles.billFrom_title}>
                        Bill From
                    </h2>
                    <Input label='Street Address' placeholder='19 Union Terrace'/>  
                    <Input label='City' placeholder='London'/>       
                    <Input label='Post Code' placeholder='E1 3EZ'/>       
                    <Input label='Country' placeholder='United Kingdom'/>                         
                </fieldset>
                <fieldset className={styles.billTo}>
                    <h2 className={styles.billTo_title}>
                        Bill To
                    </h2>
                    <Input label="Client's Name" placeholder='Alex Grim'/>  
                    <Input label="Client's Email" placeholder='alexgrim@mail.com'/>       
                    <Input label='Street Address' placeholder='84 Church Way'/>       
                    <Input label='City' placeholder='Bradford'/>
                    <Input label='Post Code' placeholder='BD1 9PB'/>
                    <Input label='Country' placeholder='United Kingdom'/>
                </fieldset>
                <fieldset className={styles.invoiceDetails}>
                    <CalendarInput/>
                    <SelectInput/>
                    <Input label='Project Description' placeholder='Graphic Design'/>
                </fieldset>

            </form>            
        </section>
    )
}

export default CreateInvoiceDialog;