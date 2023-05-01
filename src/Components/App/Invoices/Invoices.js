import React from 'react';
import FilterBox from './FilterBox';
import styles from './styles.module.css';
import useMediaQuery from '../useMediaQuery';
import {useDispatch} from 'react-redux';
import DisplayInvoices from './DisplayInvoices';
import TotalInvoices from './TotalInvoices';
import {auth} from '../Firebase';
import images from './images'

function Invoices ({isLoggedIn, userID}) {
    const [mobile] = useMediaQuery('(max-width: 790px)');
    const dispatch = useDispatch();

    const handleCreateInvoice = () => {
        dispatch({type: 'open invoice', open: true, invoice: null});
    }

    const handleLogIn = () => {
        alert('You must be logged in to post an invoice');
        dispatch({type: 'open log in', open: true});
    }

    return(
        <main className={styles.invoices}>
            <header className={styles.invoices_headerContainer}>
                <section className={styles.invoices_header}>
                    <h1 className={styles.invoices_title}>
                        Invoices
                    </h1>
                    {isLoggedIn ? <TotalInvoices mobile={mobile} userID={userID}/> : <></>}
                </section>
                <div className={styles.invoice_buttons}>
                    <FilterBox mobile={mobile}/>
                    <button className={styles.invoice_button} onClick={isLoggedIn ? handleCreateInvoice : handleLogIn}>
                        <span>+</span>
                        {mobile ? 'New' : 'New Invoice'}
                    </button>
                </div>
            </header>
            {isLoggedIn ? <DisplayInvoices userID={auth.currentUser.uid}/> : 
                <div className={styles.emptyIllustration}>
                    <img src={images['emptyIllustration']} className={styles.emptyIllustration_image}/>
                    <p className={styles.emptyIllustration_title}>
                        Please log in to view your invoices
                    </p>
                </div>
                }
        </main>
    )
}

export default Invoices;