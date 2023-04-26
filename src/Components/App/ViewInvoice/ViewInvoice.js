import React, {useEffect} from 'react';
import styles from './styles.module.css';
import icons from './icons';
import {useNavigate, useLocation} from 'react-router-dom';
import {db} from '../Firebase';
import {collection, doc} from 'firebase/firestore';
import {useDocumentData} from 'react-firebase-hooks/firestore';


function ViewInvoice() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const collectionRef = collection(db, `${state.userID}`);
    const docRef = doc(collectionRef, `${state.invoiceID}`);
    const [invoice, loading, error] = useDocumentData(docRef);

    const handleGoBack = () => {
        navigate('/');
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

    //this is where i left off, i need to convert, 1, 5, 10, and 30 days to milliseconds and then add that number to the milliseconds
    //of invoiceDate
    useEffect(() => {

        if(!loading){

        }
            
    }, [loading])

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
                                    <span>#</span>{invoice.status}
                                </span>
                                <span className={styles.invoice_title_desc}>
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
                            <div className={styles.titles}>
                                <h3 className={styles.titles_title}>
                                    Item Name
                                </h3>
                                <div className={styles.group}>
                                    <h3 className={styles.titles_title}>
                                        QTY.
                                    </h3>
                                    <h3 className={styles.titles_title}>
                                        Price
                                    </h3>
                                    <h3 className={styles.titles_title}>
                                        Total
                                    </h3>                            
                                </div>
                            </div>
                            <div className={styles.invoice_item}>
                                <h2 className={styles.invoice_itemTitle}>
                                    Banner Design
                                </h2>
                                <div className={styles.group}>
                                    <p className={styles.invoice_qty}>
                                        <span>1</span>
                                    </p>
                                    <p className={styles.invoice_price}>
                                        <span>$564.22</span>
                                    </p>
                                    <p className={styles.invoice_total}>
                                        <span>$8994.20</span>
                                    </p>
                                </div>
                                <div className={styles.invoice_amountDue}>
                                    <h3 className={styles.invoice_amountDueTitle}>
                                        Amount Due
                                    </h3>
                                    $556.54
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
    )
}

export default ViewInvoice