import React from 'react';
import FilterBox from './FilterBox';
import styles from './styles.module.css';

function Invoices () {
    return(
        <main className={styles.invoices}>
            <header className={styles.invoices_headerContainer}>
                <section className={styles.invoices_header}>
                    <h1 className={styles.invoices_title}>
                        Invoices
                    </h1>
                    <p className={styles.invoices_total}>
                        There are 7 total invoices
                    </p>
                </section>
                <div className={styles.invoice_buttons}>
                    <FilterBox/>
                    <button className={styles.invoice_button}>
                        <span>+</span>New Invoice
                    </button>
                </div>
            </header>
        </main>
    )
}

export default Invoices;