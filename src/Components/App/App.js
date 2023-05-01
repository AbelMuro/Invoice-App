import React, {useState} from 'react';
import Sidebar from './Sidebar';
import MobileHeaderbar from './MobileSidebar';
import Invoices from './Invoices';
import InvoiceDialog from './InvoiceDialog';
import LogInDialog from './LogInDialog';
import LogOutDialog from './LogOutDialog';
import ViewInvoice from './ViewInvoice';
import DeleteDialog from './DeleteDialog';
import LightOrDarkTheme from './LightOrDarkTheme';
import {Provider} from 'react-redux';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Store from './Store'
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './Firebase';
import './styles.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userID, setUserID] = useState('')

    onAuthStateChanged(auth, (currentUser) => {
        if(currentUser){
            setIsLoggedIn(true);
            setUserID(currentUser.uid)
        }
        else{
            setIsLoggedIn(false); 
            setUserID('');
        } 
    })

    return(
        <BrowserRouter>
            <Provider store={Store}>
                <LogInDialog/>   
                <LogOutDialog />             
                <Sidebar isLoggedIn={isLoggedIn}/>           
                <MobileHeaderbar isLoggedIn={isLoggedIn}/>
                <InvoiceDialog/>
                <LightOrDarkTheme/>
                <DeleteDialog isLoggedIn={isLoggedIn}/>
                <Routes>
                    <Route path='/' element={<Invoices isLoggedIn={isLoggedIn} userID={userID}/>}/>
                    <Route path='/:invoice' element={<ViewInvoice isLoggedIn={isLoggedIn}/>}/>
                </Routes>
            </Provider>        
        </BrowserRouter>

    )
}

export default App;