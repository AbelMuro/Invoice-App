import React from 'react';
import styles from './styles.module.css';
import icons from './icons';


//this is where i left off, i will need to style the buttons and the text in the styles.invoiceDetails
function ViewInvoice() {
    return(
        <section className={styles.invoice}>
            <a className={styles.goBackLink}>
                <img src={icons['arrowLeft']} className={styles.arrow}/>
                Go back
            </a>
            <div className={styles.invoice_details}>
                <div className={styles.invoice_statusTitle}>
                    Status
                    <div className={styles.invoice_status}>
                        <div className={styles.dot}></div>
                        Pending
                    </div>
                </div>
                <div className={styles.invoice_buttons}>
                    <button className={styles.invoice_editButton}>
                        Edit
                    </button>
                    <button className={styles.invoice_deleteButton}>
                        Delete
                    </button>
                    <button className={styles.invoice_paidButton}>
                        Mark as Paid
                    </button>
                </div>

            </div>

        </section>
    )
}

export default ViewInvoice