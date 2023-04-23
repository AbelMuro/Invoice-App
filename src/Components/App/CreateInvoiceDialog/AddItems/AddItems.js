import React, {useRef, useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import styles from './styles.module.css';
import useMediaQuery from '../../useMediaQuery';


//i am trying to dynamically update the total everytime the user updates the price and qty
const AddItems = forwardRef(({handleScroll}, ref) => {
    const allItems = useRef();
    const [noItems, setNoItems] = useState(true);
    const [mobile] = useMediaQuery('(max-width: 750px)');

    const handleClick = (e) => {
        e.target.setCustomValidity('');
        e.target.style.border = '';
    }
    

    const handlePrice = (e) => {
        const total = e.target.parentElement.nextElementSibling.childNodes[1];
        console.log(total);
    }

    const handleQty = (e) => {
        const total = e.target.parentElement.nextElementSibling.nextElementSibling.childNodes[1];
        console.log(total);
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

        if(!allItems.current.childNodes.length)
            setNoItems(true);
    }


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
        item.setAttribute('class', styles.item);
        inputName.setAttribute('type', 'text')          
        inputName.setAttribute('class', styles.input);
        inputName.setAttribute('required', ''); 
        inputName.addEventListener('click', handleClick);
        inputName.addEventListener('blur', handleBlur);
        inputName.addEventListener('invalid', handleInvalid);
        inputNameLabel.innerHTML = 'Item Name';
        inputNameLabel.setAttribute('class', styles.input_label);
        inputNameContainer.setAttribute('class', styles.inputContainer);
        inputNameContainer.append(inputNameLabel);
        inputNameContainer.append(inputName);
        inputQty.setAttribute('type', 'number');      
        inputQty.setAttribute('class', styles.input);
        inputQty.setAttribute('placeholder', '1');   
        inputQty.setAttribute('required', '');    
        inputQty.addEventListener('click', handleClick);
        inputQty.addEventListener('blur', handleBlur);
        inputQty.addEventListener('invalid', handleInvalid);
        inputQty.addEventListener('change', handleQty);
        inputQtyLabel.innerHTML = 'Qty.'
        inputQtyLabel.setAttribute('class', styles.input_label);
        inputQtyContainer.setAttribute('class', styles.inputContainer);
        inputQtyContainer.append(inputQtyLabel);
        inputQtyContainer.append(inputQty);
        inputPrice.setAttribute('type', 'number');
        inputPrice.setAttribute('required', ''); 
        inputPrice.setAttribute('class', styles.input);
        inputPrice.setAttribute('placeholder', '156.00');
        inputPrice.addEventListener('click', handleClick);
        inputPrice.addEventListener('blur', handleBlur);
        inputPrice.addEventListener('invalid', handleInvalid);
        inputPrice.addEventListener('change', handlePrice);
        inputPriceLabel.innerHTML = 'Price';
        inputPriceLabel.setAttribute('class', styles.input_label);
        inputPriceContainer.setAttribute('class', styles.inputContainer);        
        inputPriceContainer.append(inputPriceLabel);
        inputPriceContainer.append(inputPrice);
        itemTotal.setAttribute('class', styles.item_total);
        itemTotal.innerHTML = '156.00';
        itemTotalLabel.innerHTML = 'Total';
        itemTotalLabel.setAttribute('class', styles.input_label);
        itemTotalContainer.setAttribute('class', styles.inputContainer);        
        itemTotalContainer.append(itemTotalLabel);
        itemTotalContainer.append(itemTotal);
        trashIcon.setAttribute('class', styles.trashIcon);
        trashIcon.addEventListener('click', handleDelete);
        item.append(inputNameContainer);
        item.append(inputQtyContainer);
        item.append(inputPriceContainer);
        item.append(itemTotalContainer);
        item.append(trashIcon);
        allItems.current.append(item);
        handleScroll();
        setNoItems(false);
    }

    useEffect(() => {
        const allItemsContainer = document.querySelector('.' + styles.allItems);

        if(noItems)
            allItemsContainer.style.marginBottom = '0px';
        else
            allItemsContainer.style.marginBottom = '';

    }, [noItems, mobile])

    useImperativeHandle(ref, () => ({
        get state() {
            const inputNodes = document.querySelectorAll('.' + styles.item);
            return Array.from(inputNodes).map((item) => {
                const itemName = item.childNodes[0].childNodes[1].value;         //getting the value of the input, the input is deep nested within 2 elements
                const itemQty = item.childNodes[1].childNodes[1].value;
                const itemPrice = item.childNodes[2].childNodes[1].value;
                const itemTotal = item.childNodes[3].childNodes[1].innerHTML;
                return{
                    itemName: itemName,
                    itemQty: itemQty,
                    itemPrice: itemPrice,
                    itemTotal: itemTotal
                };
            })
        }
    }))

    return(
        <div className={styles.items}>
            <div className={styles.items_titles} >
                <p className={styles.title}>
                    Item Name
                </p>
                <p className={styles.title}>
                    Qty.
                </p>
                <p className={styles.title}>
                    Price
                </p>
                <p className={styles.title}>
                    Total
                </p>
            </div>  
            <div className={styles.allItems} ref={allItems}></div>
            <button type='button' className={styles.addItemButton} onClick={handleAddItem}>
                + Add New Item
            </button>
        </div>
    )
})

export default AddItems;