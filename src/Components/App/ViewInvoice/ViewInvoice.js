import React from 'react';
import DisplayItems from './DisplayItems';
import styles from './styles.module.css';
import icons from './icons';
import {useNavigate, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {db} from '../Firebase';
import {collection, doc, deleteDoc} from 'firebase/firestore';
import {useDocumentData} from 'react-firebase-hooks/firestore';

function ViewInvoice() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {state} = useLocation();
    const collectionRef = collection(db, `${state.userID}`);
    const docRef = doc(collectionRef, `${state.invoiceID}`);
    const [invoice, loading, error] = useDocumentData(docRef);

    const handleGoBack = () => {
        navigate('/');
    }

    const handleDelete = () => {
        dispatch({type: 'open delete', open: true, invoice: invoice})
    }

    const handleEdit = () => {
        window.scrollTo(0, 0);
        dispatch({type: 'open invoice', open: true, invoice: invoice});
    }

    const calculatePaymentDueDate = () => {
        const OneDayMilliseconds = 86400000;
        const SevenDayMilliseconds = 604800000;
        const FourteenDayMilliseconds = 1209600000;
        const ThirtyDayMilliseconds = 2592000000;     
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const invoiceDate = invoice.invoiceDetails.invoiceDate;
        const invoiceDateMilliseconds = new Date(invoiceDate).getTime();
        let nextXDays;

        if(invoice.invoiceDetails.paymentTerms === '1')
            nextXDays = new Date(invoiceDateMilliseconds + OneDayMilliseconds);
        else if(invoice.invoiceDetails.paymentTerms === '7')
            nextXDays = new Date(invoiceDateMilliseconds + SevenDayMilliseconds);
        else if(invoice.invoiceDetails.paymentTerms === '14')
            nextXDays = new Date(invoiceDateMilliseconds + FourteenDayMilliseconds);
        else
            nextXDays = new Date(invoiceDateMilliseconds + ThirtyDayMilliseconds);

        const nextDay = nextXDays.getDate();
        const nextMonth = nextXDays.getMonth();
        const nextYear = nextXDays.getFullYear();
        return nextDay + " " + months[nextMonth] + " " + nextYear;        
    }


    return(
          loading ? 
                <>loading</> 
                :
                <section className={styles.invoice}>
                    <a className={styles.goBackLink} onClick={handleGoBack}>
                        <img src={icons['arrowLeft']} className={styles.arrow}/>
                        <span>Go back</span>
                    </a>
                    <div className={styles.invoice_details}>
                        <div className={styles.invoice_statusTitle}>          
                            Status
                            <div className={styles.invoice_status}>
                                <div className={styles.dot}></div>
                                {invoice.status}
                            </div>
                        </div>
                        <div className={styles.invoice_buttons}>
                            <button className={styles.invoice_editButton} onClick={handleEdit}>
                                Edit
                            </button>
                            <button className={styles.invoice_deleteButton} onClick={handleDelete}>
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
                                    <span>#</span>{invoice.invoiceNumber}
                                </span>
                                <span className={styles.invoice_desc}>
                                    {invoice.invoiceDetails.projectDesc}
                                </span>
                            </h3>
                            <p className={styles.invoice_address}>
                                {invoice.billFrom.streetAddress}<br/>
                                {invoice.billFrom.city}<br/>
                                {invoice.billFrom.postCode}<br/>
                                {invoice.billFrom.country}<br/>
                            </p>
                        </div>
                        <div className={styles.invoice_billTo}>
                            <div className={styles.invoice_dateAndPaymentDue}>
                                <div className={styles.invoice_date}>
                                    <h3 className={styles.invoice_dateTitle}>
                                        Invoice Date
                                    </h3>
                                    {invoice.invoiceDetails.invoiceDate}
                                </div>
                                <div className={styles.invoice_paymentDue}>
                                    <h3 className={styles.invoice_paymentDueTitle}>
                                        Payment Due
                                    </h3>
                                    {calculatePaymentDueDate()}
                                </div>
                            </div>
                            <div className={styles.invoice_clientAddress}>
                                <h3 className={styles.invoice_billToTitle}>
                                    Bill To
                                </h3>
                                <p className={styles.invoice_clientName}>
                                    {invoice.billTo.clientName}
                                </p>
                                {invoice.billTo.clientStreetAddress}<br/>
                                {invoice.billTo.clientCity}<br/>
                                {invoice.billTo.clientPostCode}<br/>
                                {invoice.billTo.clientCountry}<br/>
                            </div>
                            <div className={styles.invoice_clientEmail}>
                                <h3 className={styles.invoice_sendTo}>
                                    Send to
                                </h3>
                               {invoice.billTo.clientEmail}
                            </div>
                        </div>
                        <div className={styles.invoice_items}>
                            <DisplayItems invoice={invoice}/>
                        </div>
                    </div>
                </section>
    )
}

export default ViewInvoice