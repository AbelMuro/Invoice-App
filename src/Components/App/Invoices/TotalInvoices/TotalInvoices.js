import React from 'react';
import styles from './styles.module.css';
import {collection} from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {db} from '../../Firebase';

function TotalInvoices({mobile, userID}) {
    const collectionRef = collection(db, `${userID}`);
    const [invoices, loading, error] = useCollectionData(collectionRef);

    return(                    
        loading ? <></> : 
            <p className={styles.invoices_total}>
                {mobile ? `${invoices.length} invoices` : `There are ${invoices.length} total invoices`}
            </p> 
    )
}

export default TotalInvoices;