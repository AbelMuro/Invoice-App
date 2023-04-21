import React, {useRef} from 'react';
import styles from './styles.module.css';

function AddItems({handleScroll}) {
    const allItems = useRef();

    const handleClick = (e) => {
        e.target.setCustomValidity('');
        e.target.style.border = '';
    }

    const handleBlur = (e) => {
        const isValid = e.target.checkValidity();

        if(isValid)
            e.target.style.border = '';
        else 
            e.target.style.border = '1px solid #EC5757';
    }

    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ');
        e.target.style.border = '1px solid #EC5757';
    }

    const handleDelete = (e) => {
        const nodeToDelete = e.target.parentElement;
        nodeToDelete.remove();
    }

    const handleAddItem = () => {
        const item = document.createElement('div');
        const inputName = document.createElement('input');
        const inputQty = document.createElement('input');  
        const inputPrice = document.createElement('input');    
        const itemTotal = document.createElement('div');
        const trashIcon = document.createElement('div')
        item.setAttribute('class', styles.item);
        inputName.setAttribute('type', 'text')          
        inputName.setAttribute('class', styles.input);
        inputName.setAttribute('required', ''); 
        inputName.addEventListener('click', handleClick);
        inputName.addEventListener('blur', handleBlur);
        inputName.addEventListener('invalid', handleInvalid);
        inputQty.setAttribute('type', 'number');      
        inputQty.setAttribute('class', styles.input);
        inputQty.setAttribute('placeholder', '1');   
        inputQty.setAttribute('required', '');    
        inputQty.addEventListener('click', handleClick);
        inputQty.addEventListener('blur', handleBlur);
        inputQty.addEventListener('invalid', handleInvalid);
        inputPrice.setAttribute('type', 'text');
        inputPrice.setAttribute('required', ''); 
        inputPrice.setAttribute('class', styles.input);
        inputPrice.setAttribute('placeholder', '156.00');
        inputPrice.addEventListener('click', handleClick);
        inputPrice.addEventListener('blur', handleBlur);
        inputPrice.addEventListener('invalid', handleInvalid);
        itemTotal.setAttribute('class', styles.item_total);
        itemTotal.innerHTML = '156.00';
        trashIcon.setAttribute('class', styles.trashIcon);
        trashIcon.addEventListener('click', handleDelete);
        item.append(inputName);
        item.append(inputQty);
        item.append(inputPrice);
        item.append(itemTotal);
        item.append(trashIcon);
        allItems.current.append(item);
        handleScroll();
    }

    return(
        <div className={styles.items}>
            <div className={styles.items_titles}>
                <p className={styles.items_title}>
                    Item Name
                </p>
                <p className={styles.items_title}>
                    Qty.
                </p>
                <p className={styles.items_title}>
                    Price
                </p>
                <p className={styles.items_title}>
                    Total
                </p>
            </div>  
            <div className={styles.allItems} ref={allItems}></div>
            <button type='button' className={styles.addItemButton} onClick={handleAddItem}>
                + Add New Item
            </button>
        </div>
    )
}

export default AddItems;