import React from 'react';
import styles from './styles.module.css';
import images from './images';

function NoInvoices({mobile}) {
    return(
        <section className={styles.emptyIllustration}>
            <img src={images['emptyIllustration']} className={styles.emptyIllustration_image}/>
            <h1 className={styles.emptyIllustration_title}>
                There is nothing here
            </h1>
            <p className={styles.emptyIllustration_desc}>
                Create an invoice by clicking the<br/>
                <span>{mobile ? 'New' : 'New Invoice'}</span> button and get started
            </p>
        </section>
    )
}

export default NoInvoices;