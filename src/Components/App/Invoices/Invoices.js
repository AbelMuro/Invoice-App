import React, {useState} from 'react';
import FilterBox from './FilterBox';
import DisplayInvoices from './DisplayInvoices';
import styles from './styles.module.css';
import useMediaQuery from '../useMediaQuery';
import {useDispatch} from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../Firebase';


//now i need to get the collection from the user's profile and display all the documents with firestore react hooks
function Invoices () {
    const [mobile] = useMediaQuery('(max-width: 790px)');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();

    const handleCreateInvoice = () => {
        dispatch({type: 'open create invoice', open: true});
    }

    const handleLogIn = () => {
        alert('You must be logged in to post an invoice')
        dispatch({type: 'open log in', open: true});
    }

    onAuthStateChanged(auth, (currentUser) => {
        if(currentUser)
            setIsLoggedIn(true);
        else
            setIsLoggedIn(false);
    })

    return(
        <main className={styles.invoices}>
            <header className={styles.invoices_headerContainer}>
                <section className={styles.invoices_header}>
                    <h1 className={styles.invoices_title}>
                        Invoices
                    </h1>
                    <p className={styles.invoices_total}>
                        {mobile ? '7 invoices' : 'There are 7 total invoices'}
                    </p>
                </section>
                <div className={styles.invoice_buttons}>
                    <FilterBox mobile={mobile}/>
                    <button className={styles.invoice_button} onClick={isLoggedIn ? handleCreateInvoice : handleLogIn}>
                        <span>+</span>
                        {mobile ? 'New' : 'New Invoice'}
                    </button>
                </div>
            </header>
            <DisplayInvoices mobile={mobile}/>
        </main>
    )
}

export default Invoices;