import React from 'react';
import styles from './styles.module.css';

function DisplayInvoices() {
    return(
        <div className={styles.displayInvoices}>
            <div className={styles.displayInvoices_invoice}>
                <div className={styles.displayInvoices_invoiceData}>
                    <p className={styles.displayInvoices_invoiceTitle}>
                        <span>#</span>XM914
                    </p>
                    <p className={styles.displayInvoices_invoiceDueData}>
                        <span>Due</span> 20 Sep 2021
                    </p>
                    <p className={styles.displayInvoices_invoiceName}>
                        Alex Grim
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DisplayInvoices;