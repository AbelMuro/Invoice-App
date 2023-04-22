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
//now i need to append the label and inputs into the containers
    const handleAddItem = () => {
        const item = document.createElement('div');
        const inputNameContainer = document.createElement('div');
        const inputQtyContainer = document.createElement('div');
        const inputPriceContainer = document.createElement('div');
        const itemTotalContainer = document.createElement('div');
        const inputName = document.createElement('input');
        const inputQty = document.createElement('input');  
        const inputPrice = document.createElement('input');   
        const inputNameLabel = document.createElement('label'); 
        const inputQtyLabel = document.createElement('label');
        const inputPriceLabel = document.createElement('label');
        const itemTotalLabel = document.createElement('label');
        const itemTotal = document.createElement('div');
        const trashIcon = document.createElement('div');
        inputNameContainer.setAttribute('class', styles.inputContainer);
        item.setAttribute('class', styles.item);
        inputName.setAttribute('type', 'text')          
        inputName.setAttribute('class', styles.input);
        inputName.setAttribute('required', ''); 
        inputName.addEventListener('click', handleClick);
        inputName.addEventListener('blur', handleBlur);
        inputName.addEventListener('invalid', handleInvalid);
        inputNameLabel.innerHTML = 'Item Name';
        inputNameLabel.setAttribute('class', styles.input_label);
        inputQty.setAttribute('type', 'number');      
        inputQty.setAttribute('class', styles.input);
        inputQty.setAttribute('placeholder', '1');   
        inputQty.setAttribute('required', '');    
        inputQty.addEventListener('click', handleClick);
        inputQty.addEventListener('blur', handleBlur);
        inputQty.addEventListener('invalid', handleInvalid);
        inputQtyContainer.setAttribute('class', styles.inputContainer);
        inputQtyLabel.innerHTML = 'Qty.'
        inputQtyLabel.setAttribute('class', styles.input_label);
        inputPrice.setAttribute('type', 'text');
        inputPrice.setAttribute('required', ''); 
        inputPrice.setAttribute('class', styles.input);
        inputPrice.setAttribute('placeholder', '156.00');
        inputPrice.addEventListener('click', handleClick);
        inputPrice.addEventListener('blur', handleBlur);
        inputPrice.addEventListener('invalid', handleInvalid);
        inputPriceContainer.setAttribute('class', styles.inputContainer);
        inputPriceLabel.innerHTML = 'Price';
        inputPriceLabel.setAttribute('class', styles.input_label);
        itemTotal.setAttribute('class', styles.item_total);
        itemTotal.innerHTML = '156.00';
        itemTotalContainer.setAttribute('class', styles.inputContainer);
        itemTotalLabel.innerHTML = 'Total';
        itemTotalLabel.setAttribute('class', styles.input_label);
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
                <p className={styles.input_label}>
                    Item Name
                </p>
                <p className={styles.input_label}>
                    Qty.
                </p>
                <p className={styles.input_label}>
                    Price
                </p>
                <p className={styles.input_label}>
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