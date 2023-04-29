import React, {useRef, memo} from 'react';
import styles from './styles.module.css';
import useMediaQuery from '../../useMediaQuery';
import {v4 as uuid} from 'uuid';

function DisplayItems({invoice}) {
    const netTotal = useRef(0);
    netTotal.current = 0;           //resets the accumulator when there is a render
    const [mobile] = useMediaQuery('(max-width: 700px)');

    return(            
        <>
            {mobile ? <></> : 
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
                </div>}
            {invoice.items.length ? invoice.items.map((item) => {
                netTotal.current += Number(item.itemTotal.replace('$', ''));
                return(
                    mobile ? 
                        <div className={styles.invoice_item_mobile} key={uuid()}>
                            <div className={styles.invoice_nameQtyPriceMobile}>
                                <h3 className={styles.invoice_itemTitleMobile}>
                                    {item.itemName}
                                </h3>
                                <p className={styles.invoice_QtyPriceMobile}>
                                    {item.itemQty + ' x ' + '$' + Number(item.itemPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div className={styles.invoice_totalMobile}>
                                ${Number(item.itemTotal).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                        </div> : 
                        <div className={styles.invoice_item} key={uuid()}>
                            <h2 className={styles.invoice_itemTitle}>
                                {item.itemName}
                            </h2>
                            <div className={styles.group}>
                                <p className={styles.invoice_qty}>
                                    <span>{item.itemQty}</span>
                                </p>
                                <p className={styles.invoice_price}>
                                    <span>${Number(item.itemPrice).toLocaleString(undefined, { maximumFractionDigits: 2 ,minimumFractionDigits: 2 })}</span>
                                </p>
                                <p className={styles.invoice_total}>
                                    <span>${Number(item.itemTotal).toLocaleString(undefined, { maximumFractionDigits: 2,  minimumFractionDigits: 2 })}</span>
                                </p>
                            </div>
                        </div>
                    )                                    
                }) : <div className={styles.noItemsMessage}>
                        No Items Available
                    </div>} 
                <div className={styles.invoice_amountDue}>
                    <h3 className={styles.invoice_amountDueTitle}>
                        Amount Due
                    </h3>
                    {'$' + netTotal.current.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
            </>    
            )           

}

export default memo(DisplayItems);