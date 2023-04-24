import React, {useEffect, useRef} from 'react';
import styles from './styles.module.css';
import {useSelector, useDispatch} from 'react-redux';
import TextInput from './TextInput';
import CalendarInput from './CalendarInput';
import SelectInput from './SelectInput';
import AddItems from './AddItems';
import {db, auth} from '../Firebase';
import {collection, addDoc} from 'firebase/firestore';

function CreateInvoiceDialog() {
    const open = useSelector(state => state.createInvoice);
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

    const handleSubmit = async (e) => {
        e.preventDefault();        
        emptyMessage.current.style.display = '';
        if(!items.current.state.length) {
            noItemMessage.current.style.display = 'block';
            return;
        }

        const newInvoice = {
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
            await addDoc(userCollectionRef, newInvoice);
            alert('Invoice has been added to the firestore');
            dispatch({type: 'open create invoice', open: false});
        }
        catch(error){
            console.log(error)
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
            if(e.target.matches('.' + styles.overlay))
                dispatch({type: 'open create invoice', open: false});
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
        <form className={styles.overlay} onInvalid={handleInvalid} onSubmit={handleSubmit}>
            <section className={styles.newInvoice}>
                <h1 className={styles.newInvoice_title}>
                    New Invoice
                </h1>
                <fieldset className={styles.billFrom}>
                    <h2 className={styles.billFrom_title}>
                        Bill From
                    </h2>
                    <TextInput type='text' label='Street Address' placeholder='19 Union Terrace' ref={streetAddress}/>  
                    <TextInput type='text' label='City' placeholder='London' ref={city}/>       
                    <TextInput type='text' label='Post Code' placeholder='E1 3EZ' ref={postCode}/>       
                    <TextInput type='text' label='Country' placeholder='United Kingdom' ref={country}/>                         
                </fieldset>
                <fieldset className={styles.billTo}>
                    <h2 className={styles.billTo_title}>
                        Bill To
                    </h2>
                    <TextInput type='text' label="Client's Name" placeholder='Alex Grim' ref={clientName}/>  
                    <TextInput type='email' label="Client's Email" placeholder='alexgrim@mail.com' otherErrorMessage='not valid email' ref={clientEmail}/>       
                    <TextInput type='text' label='Street Address' placeholder='84 Church Way' ref={clientStreetAddress}/>       
                    <TextInput type='text' label='City' placeholder='Bradford' ref={clientCity}/>
                    <TextInput type='text' label='Post Code' placeholder='BD1 9PB' ref={clientPostCode}/>
                    <TextInput type='text' label='Country' placeholder='United Kingdom' ref={clientCountry}/>
                </fieldset>
                <fieldset className={styles.invoiceDetails}>
                    <CalendarInput ref={invoiceDate}/>
                    <SelectInput ref={paymentTerms}/>
                    <TextInput type='text' label='Project Description' placeholder='Graphic Design' ref={projectDesc}/>
                </fieldset>
                <fieldset className={styles.itemList}>
                    <h2 className={styles.itemList_title}>
                        Item List
                    </h2>
                    <AddItems handleScroll={handleScroll} ref={items}/>
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
                        <button className={styles.draftButton}>
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

export default CreateInvoiceDialog;