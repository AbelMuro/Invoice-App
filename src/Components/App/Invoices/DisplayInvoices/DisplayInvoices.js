import React, {useCallback} from 'react';
import styles from './styles.module.css';
import icons from './icons'
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {db} from '../../Firebase';
import {collection, where, query} from 'firebase/firestore';
import {v4 as uuid} from 'uuid';
import useMediaQuery from '../../useMediaQuery';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';


function DisplayInvoices({userID}) {
    const filter = useSelector(state => state.filter);    
    const [mobile] = useMediaQuery('(max-width: 790px)');
    const userCollectionRef = collection(db, `${userID}`);
    const [invoices, loading, error] = useCollectionData(
            filter.length ? 
                query(userCollectionRef, where('status', 'in', filter)) :
                userCollectionRef
            );
    const navigate = useNavigate();

    const handleClick = (e) => {
        const invoiceNumber = e.target.getAttribute('data-invoice');
        const invoiceID = e.target.getAttribute('data-id');
        navigate(`/${invoiceNumber}`, {state: {invoiceID: invoiceID, userID: userID}});
    }

    const changeStatusColor = useCallback((ref) => {
        if(!ref) return;

        const statusBox = ref;
        const statusDot = ref.firstElementChild;
        const status = ref.getAttribute('data-status');

        if(status == 'Paid'){
            statusBox.style.backgroundColor = 'rgba(51, 214, 159, 0.06)';
            statusBox.style.color = '#33D69F'
            statusDot.style.backgroundColor = '#33D69F';
        }  
        else if(status == 'Pending'){
            statusBox.style.backgroundColor = 'rgb(255, 143, 0, 0.06)';
            statusBox.style.color = '#FF8F00';
            statusDot.style.backgroundColor = '#FF8F00';
        }
        else{
            statusBox.style.backgroundColor = 'var(--invoice-draft-bg)';
            statusBox.style.color = 'var(--invoice-draft-text)';
            statusDot.style.backgroundColor = 'var(--invoice-draft-text)';
        }
            
    }, [])

    return loading ? (<>loading</>) : 
                (
                    invoices.length ? 
                        <div className={styles.allInvoices}>
                            {invoices.map((invoice) => {
                                return(
                                    <section className={styles.displayInvoices} key={uuid()}>
                                        <div className={styles.displayInvoices_invoice} onClick={handleClick} data-invoice={invoice.invoiceNumber} data-id={invoice.invoiceID}>
                                            <div className={styles.displayInvoices_title_dueDate_name}>
                                                <h3 className={styles.displayInvoices_title}>
                                                    <span>#</span>
                                                    {invoice.invoiceNumber}
                                                </h3>
                                                <p className={styles.displayInvoices_dueDate}>
                                                    <span>Due</span> {invoice.invoiceDetails.invoiceDate}
                                                </p>
                                                <p className={styles.displayInvoices_name}>
                                                    {invoice.billTo.clientName}
                                                </p>
                                            </div>
                                            <div className={styles.displayInvoices_priceAndStatus}>
                                                <p className={styles.displayInvoices_price}>
                                                    ${invoice.items.reduce((accumulate, currentItem) => {
                                                            return accumulate + Number(currentItem.itemTotal);
                                                    }, 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                                </p>
                                                <div className={styles.displayInvoices_status} ref={changeStatusColor} data-status={invoice.status}>
                                                    <div className={styles.dot}></div>
                                                    {invoice.status}
                                                </div>
                                                {mobile ? <></> : <img src={icons['arrowRight']} className={styles.arrow}/>}
                                            </div>
                                        </div>
                                    </section> 
                                    )
                            })}
                    </div> : <>no invoices available</>
    ) 
}

export default DisplayInvoices;