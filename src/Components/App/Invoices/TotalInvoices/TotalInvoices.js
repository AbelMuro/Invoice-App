import React, {useState, useEffect} from 'react';
import styles from './styles.module.css';
import {collection, where, query} from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {db} from '../../Firebase';
import {useSelector} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';


function TotalInvoices({mobile, userID}) {
    const [allDrafts, setAllDrafts] = useState(0);
    const [allPending, setAllPending] = useState(0);
    const [allPaid, setAllPaid] = useState(0);
    const [addComma, setAddComma] = useState('')
    const filter = useSelector(state => state.filter);  
    const collectionRef = collection(db, `${userID}`);
    const [invoices, loading, error] = useCollectionData(
        filter.length ? 
            query(collectionRef, where('status', 'in', filter)) : 
            collectionRef
        );

    useEffect(() => {
        if(loading) return;

        let drafts = 0;
        let pending = 0;
        let paid = 0;

        invoices.forEach((invoice) => {
            if(invoice.status === 'Draft')
                drafts++;
            else if(invoice.status === 'Pending')
                pending++;
            else
                paid++;
        })
        setAllDrafts(drafts);
        setAllPending(pending);
        setAllPaid(paid);
    }, [loading])

    useEffect(() => {
        if(allDrafts > 0 && (allPending > 0 || allPaid > 0))
            setAddComma(',');
        else if(allPending > 0 && (allDrafts > 0 || allPaid > 0))
            setAddComma(',');
        else 
            setAddComma('');
    }, [filter, allDrafts, allPending, allPaid])

    return(                    
        loading ? 
            <div className={styles.loadingContainer}>   
                <CircularProgress size='1.2rem'/>
            </div> 
            : 
            <p className={styles.invoices_total}>
                {filter.length ? 
                    invoices.length ? 
                        mobile ? `${invoices.length} invoices` : `There are ${allDrafts ? allDrafts + ` draft${addComma} ` : ''}${allPending ? allPending + ` pending${allPaid > 0 ? addComma : ''} ` : ''}${allPaid ? allPaid + ` paid ` : ''}invoices`
                        : 
                        'No Invoices'
                    : 
                    invoices.length ? 
                        mobile ? `${invoices.length} invoices` : `There are ${invoices.length} total invoices` 
                        : 
                        'No Invoices' 
                }
            </p> 
    )
}

export default TotalInvoices;