import React from 'react';
import styles from './styles.module.css';
import icons from './icons'


function DisplayInvoices({mobile}) {

    return(
        <section className={styles.displayInvoices}>
            <div className={styles.displayInvoices_invoice}>
                <div className={styles.displayInvoices_title_dueDate_name}>
                    <h3 className={styles.displayInvoices_title}>
                        <span>#</span>XM914
                    </h3>
                    <p className={styles.displayInvoices_dueDate}>
                        <span>Due</span> 20 Sep 2021
                    </p>
                    <p className={styles.displayInvoices_name}>
                        Alex Grim
                    </p>
                </div>
                <div className={styles.displayInvoices_priceAndStatus}>
                    <p className={styles.displayInvoices_price}>
                        $ 102.89
                    </p>
                    <div className={styles.displayInvoices_status}>
                        <div className={styles.dot}></div>
                        Paid
                    </div>
                    {mobile ? <></> : <img src={icons['arrowRight']} className={styles.arrow}/>}
                </div>
                
            </div>
        </section>
    )
}

export default DisplayInvoices;