import React from 'react';
import styles from './styles.module.css';
import icons from './icons';
import {useNavigate} from 'react-router-dom';

//this is where i left off, i will need to style the buttons and the text in the styles.invoiceDetails
function ViewInvoice() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    }

    return(
        <section className={styles.invoice}>
            <a className={styles.goBackLink} onClick={handleGoBack}>
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
            <div className={styles.invoice_content}>
                <div className={styles.invoice_header}>
                    <h3 className={styles.invoice_title_desc}>
                        <span className={styles.invoice_title}>
                            <span>#</span>XM7845
                        </span>
                        <span className={styles.invoice_title_desc}>
                            Graphic Design
                        </span>
                    </h3>
                    <p className={styles.invoice_address}>
                        19 Union Terrace<br/>
                        London<br/>
                        E1 3EZ<br/>
                        United Kingdom<br/>
                    </p>
                </div>
            </div>

        </section>
    )
}

export default ViewInvoice