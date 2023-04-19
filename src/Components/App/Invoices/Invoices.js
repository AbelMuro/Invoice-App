import React from 'react';
import FilterBox from './FilterBox';
import DisplayInvoices from './DisplayInvoices';
import styles from './styles.module.css';
import useMediaQuery from '../useMediaQuery';

function Invoices () {
    const [mobile] = useMediaQuery('(max-width: 790px)');

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
                    <button className={styles.invoice_button}>
                        <span>+</span>
                        {mobile ? 'New' : 'New Invoice'}
                    </button>
                </div>
            </header>
            <DisplayInvoices/>
        </main>
    )
}

export default Invoices;