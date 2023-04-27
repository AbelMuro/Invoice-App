import React, {useEffect, useRef, memo} from 'react';
import styles from './styles.module.css';
import {useSelector, useDispatch} from 'react-redux';
import TextInput from './TextInput';
import CalendarInput from './CalendarInput';
import SelectInput from './SelectInput';
import AddItems from './AddItems';
import {db, auth} from '../Firebase';
import {collection, addDoc, updateDoc} from 'firebase/firestore';


function InvoiceDialog() {
    const {open, invoice} = useSelector(state => state.invoiceDialog);
    const streetAddress = useRef();
    const city = useRef();
    const postCode = useRef();
    const country = useRef();
    const clientName = useRef();
    const clientEmail = useRef();
    const clientStreetAddress = useRef();
    const clientCity = useRef();
    const clientPostCode = useRef();
    const clientCountry = useRef();
    const invoiceDate = useRef();
    const paymentTerms = useRef();
    const projectDesc = useRef();
    const items = useRef();
    const emptyMessage = useRef();
    const noItemMessage = useRef();
    const dispatch = useDispatch();

    const updateDatabase = async (e) => {
        e.preventDefault();   
        emptyMessage.current.style.display = '';             
        const isDraftButton = e.target.getAttribute('data-button');
        if(!items.current.state.length && !isDraftButton) {
            noItemMessage.current.style.display = 'block';
            return;
        }
        const alphabet = 'abcdefghiklmnopqrstuvwxyz';
        const firstLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        const secondLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        let number = Math.floor(Math.random() * 10000);
        if(number < 1000)
            number += 1000;
        const invoiceNumber = firstLetter + secondLetter + number;

        const newInvoice = {
            invoiceNumber: invoiceNumber,
            status: isDraftButton ? 'Draft' : 'Pending',
            billFrom: {
                streetAddress: streetAddress.current.state,
                city: city.current.state,
                postCode: postCode.current.state,
                country: country.current.state
            },
            billTo: {
                clientName: clientName.current.state,
                clientEmail: clientEmail.current.state,
                clientStreetAddress: clientStreetAddress.current.state,
                clientCity: clientCity.current.state,
                clientPostCode: clientPostCode.current.state,
                clientCountry: clientCountry.current.state,
            },
            invoiceDetails: {
                invoiceDate: invoiceDate.current.state,
                paymentTerms: paymentTerms.current.state,
                projectDesc: projectDesc.current.state
            },
            items: items.current.state
        }

        const userCollectionRef = collection(db, `${auth.currentUser.uid}`)

        try{
            const newDocRef = await addDoc(userCollectionRef, newInvoice);
            await updateDoc(newDocRef, {invoiceID: newDocRef.id})
            alert('Invoice has been added to the firestore');
            dispatch({type: 'open create invoice', open: false});
        }
        catch(error){
            console.log(error)
        }
        finally{
            streetAddress.current.resetState;
            city.current.resetState;
            postCode.current.resetState;
            country.current.resetState;
            clientName.current.resetState;
            clientEmail.current.resetState;
            clientStreetAddress.current.resetState;
            clientCity.current.resetState;
            clientPostCode.current.resetState;
            clientCountry.current.resetState;
            projectDesc.current.resetState;
            items.current.resetState;
            dispatch({type: 'open create invoice', open: false});
        }
    }

    const handleInvalid = () => {
        emptyMessage.current.style.display = 'block';
        if(!items.current.state.length) 
            noItemMessage.current.style.display = 'block'
    }

    const handleScroll = () => {
        const dialog = document.querySelector('.' + styles.newInvoice);
        dialog.scrollTo(0, 9999999);
    }

    useEffect(() => {
        const overlay = document.querySelector('.' + styles.overlay);
        if(open){
            overlay.style.left = '0%';
            setTimeout(() => {
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            }, 400)
        }
        else{
            overlay.style.backgroundColor = ''; 
            setTimeout(() => {
                overlay.style.left = ''; 
            }, 400)      
        }
    }, [open])

    useEffect(() => {
        const handleClick = (e) => {
            if(e.target.matches('.' + styles.overlay)){
                dispatch({type: 'open invoice', open: false});                
            }
        }
        if(open)
            document.addEventListener('click', handleClick);
        else
            document.removeEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }

    }, [open])

    useEffect(() => {
        const handleScroll = () => {
           window.scrollTo(0, 0)
        }
        if(open)
            document.addEventListener('scroll', handleScroll);
        else
            document.removeEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        }
    }, [open])


    return(
        <form className={styles.overlay} onInvalid={handleInvalid} onSubmit={updateDatabase}>
            <section className={styles.newInvoice}>
                <h1 className={styles.newInvoice_title}>
                    {invoice ? <>
                        Edit 
                        <span>#</span> 
                        {invoice.invoiceNumber}
                    </> : 'New Invoice'}
                </h1>
                <fieldset className={styles.billFrom}>
                    <h2 className={styles.billFrom_title}>
                        Bill From
                    </h2>
                    <TextInput type='text' label='Street Address' placeholder='19 Union Terrace' ref={streetAddress} prevState={invoice ? invoice.billFrom.streetAddress : null}/>  
                    <TextInput type='text' label='City' placeholder='London' ref={city} prevState={invoice ? invoice.billFrom.city : null}/>       
                    <TextInput type='text' label='Post Code' placeholder='E1 3EZ' ref={postCode} prevState={invoice ? invoice.billFrom.postCode : null}/>       
                    <TextInput type='text' label='Country' placeholder='United Kingdom' ref={country} prevState={invoice ? invoice.billFrom.country: null}/>                         
                </fieldset>
                <fieldset className={styles.billTo}>
                    <h2 className={styles.billTo_title}>
                        Bill To
                    </h2>
                    <TextInput type='text' label="Client's Name" placeholder='Alex Grim' ref={clientName} prevState={invoice ? invoice.billTo.clientName : null}/>  
                    <TextInput type='email' label="Client's Email" placeholder='alexgrim@mail.com' otherErrorMessage='not valid email' ref={clientEmail} prevState={invoice ? invoice.billTo.clientEmail : null}/>       
                    <TextInput type='text' label='Street Address' placeholder='84 Church Way' ref={clientStreetAddress} prevState={invoice ? invoice.billTo.clientStreetAddress : null}/>       
                    <TextInput type='text' label='City' placeholder='Bradford' ref={clientCity} prevState={invoice ? invoice.billTo.clientCity : null}/>
                    <TextInput type='text' label='Post Code' placeholder='BD1 9PB' ref={clientPostCode} prevState={invoice ? invoice.billTo.clientPostCode : null}/>
                    <TextInput type='text' label='Country' placeholder='United Kingdom' ref={clientCountry} prevState={invoice ? invoice.billTo.clientCountry : null}/>
                </fieldset>
                <fieldset className={styles.invoiceDetails}>
                    <CalendarInput ref={invoiceDate} prevState={invoice ? invoice.invoiceDetails.invoiceDate : null}/>
                    <SelectInput ref={paymentTerms} prevStatet={invoice ? invoice.invoiceDetails.paymentTerms : null}/>
                    <TextInput type='text' label='Project Description' placeholder='Graphic Design' ref={projectDesc} prevState={invoice ? invoice.invoiceDetails.projectDesc : null}/>
                </fieldset>
                <fieldset className={styles.itemList}>
                    <h2 className={styles.itemList_title}>
                        Item List
                    </h2>
                    {open ? <AddItems handleScroll={handleScroll} prevItems={invoice ? invoice.items : []} ref={items}/> : <></>}
                </fieldset>
                <div className={styles.errorMessage}>
                    <p className={styles.emptyMessage} ref={emptyMessage}>
                        - All fields must be added
                    </p>
                    <p className={styles.itemMessage} ref={noItemMessage}>
                        - An item must be added
                    </p>
                </div>  
            </section>    
            <div className={styles.whiteBox}>
                <div className={styles.buttons}>
                    <button className={styles.discardButton}>
                        Discard
                    </button>
                    <div className={styles.buttonContainer}>
                        <button type='button' className={styles.draftButton} onClick={updateDatabase} data-button={true}>
                            Save as Draft
                        </button>
                        <button className={styles.saveButton}> 
                            Save & Send
                        </button>                        
                    </div>
                </div>                      
            </div>
        </form>
    )
}

export default memo(InvoiceDialog);