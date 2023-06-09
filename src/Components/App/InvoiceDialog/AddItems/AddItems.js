import React, {useRef, useState, useEffect, forwardRef, useImperativeHandle, memo} from 'react';
import styles from './styles.module.css';
import useMediaQuery from '../../useMediaQuery';
import {v4 as uuid} from 'uuid'

const AddItems = forwardRef(({handleScroll, prevItems}, ref) => {
    const [allPrevItems, setAllPrevItems] = useState(prevItems);
    const allItems = useRef();
    const [noItems, setNoItems] = useState(true);
    const [mobile] = useMediaQuery('(max-width: 750px)');

    const handleClick = (e) => {
        e.target.setCustomValidity('');
        e.target.style.border = '';
    }
    
    const handlePrice = (e) => {
        const total = e.target.parentElement.nextElementSibling.childNodes[1];      // selecting the node that has the net total
        const qty = e.target.parentElement.previousElementSibling.childNodes[1].value;    // selecting the node that has the qty
        if(qty){
            const newTotal = Number(qty) * Number(e.target.value)
            total.innerHTML = newTotal.toFixed(2);
        }
        else
            total.innerHTML = 0;
    }

    const handleQty = (e) => {
        const total = e.target.parentElement.nextElementSibling.nextElementSibling.childNodes[1];//selecting the node with the net total
        const price = e.target.parentElement.nextElementSibling.childNodes[1].value;         //selecting the node with the price
        if(price){
            const newTotal = Number(price) * Number(e.target.value);
            total.innerHTML = newTotal.toFixed(2);
        }
        else 
            total.innerHTML = 0;
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

    const handlePrevItemsDelete = (e) => {
        const nodeToDeleteIndex = e.target.parentElement.getAttribute('data-index');

        setAllPrevItems((prevItems) => {
            return prevItems.filter((item, index) => {
                if(index == Number(nodeToDeleteIndex))
                    return false;
                else
                    return true;
            })
        })
    }

    const handleDeleteAllItems = () => {
        const allItems = document.querySelectorAll('.' + styles.item);
        allItems.forEach((item) => {
            const trashIcon = item.childNodes[4];
            trashIcon.click();
        })
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
        inputPrice.setAttribute('step', 0.01);
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
        itemTotal.innerHTML = '0';
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
        allItems.current.appendChild(item);
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

    useEffect(() => {
        if(prevItems)
            setAllPrevItems(prevItems);
    },[prevItems])

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
        },
        get resetState(){
            handleDeleteAllItems();
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
            <div className={styles.allItems} ref={allItems}>
                {allPrevItems.length ? 
                    <div className={styles.prevItems}>
                        {allPrevItems.map((item, index) => {
                            return(
                                <div className={styles.item} key={uuid()} data-index={index}>
                                    <div className={styles.inputContainer}>
                                        <label className={styles.input_label}>
                                            Item Name
                                        </label>
                                        <input 
                                            type='text' 
                                            defaultValue={item.itemName}
                                            className={styles.input} 
                                            onClick={handleClick}
                                            onBlur={handleBlur}
                                            onInvalid={handleInvalid}
                                            required/>
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <label className={styles.input_label}>
                                            Qty.
                                        </label>
                                        <input
                                            type='number'
                                            defaultValue={item.itemQty}
                                            className={styles.input}
                                            placeholder='1'
                                            onClick={handleClick}
                                            onBlur={handleBlur}
                                            onInvalid={handleInvalid}
                                            onChange={handleQty}
                                            required
                                            />
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <label className={styles.input_label}>
                                            Price
                                        </label>
                                        <input
                                            type='number'
                                            defaultValue={item.itemPrice}
                                            className={styles.input}
                                            placeholder='156.00'
                                            step={0.01}
                                            onClick={handleClick}
                                            onBlur={handleBlur}
                                            onInvalid={handleInvalid}
                                            onChange={handlePrice}
                                            required
                                            />
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <label className={styles.input_label}>
                                            Total
                                        </label>
                                        <div className={styles.item_total}>
                                            {item.itemTotal}
                                        </div>
                                    </div>
                                    <div className={styles.trashIcon} onClick={handlePrevItemsDelete}></div>
                                </div>
                            )
                        })}                    
                    </div> : <></>}
            </div>
            <button type='button' className={styles.addItemButton} onClick={handleAddItem}>
                + Add New Item
            </button>
        </div>
    )
})

export default memo(AddItems);