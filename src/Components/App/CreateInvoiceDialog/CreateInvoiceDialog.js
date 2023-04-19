import React, {useEffect} from 'react';
import styles from './styles.module.css';
import {useSelector} from 'react-redux'

//this is where i left off, need to make a transparent overlay
function CreateInvoiceDialog() {
    const open = useSelector(state => state.createInvoice)

    useEffect(() => {
        console.log('im here')
        const dialog = document.querySelector('.' + styles.newInvoice);

        if(open)
            dialog.style.left = '0px';
        else
            dialog.style.left = '';

    }, [open])


    return(
        <section className={styles.newInvoice}>

        </section>
    )
}

export default CreateInvoiceDialog;