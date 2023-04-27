import React, {useState, useEffect} from 'react';
import Sidebar from './Sidebar';
import MobileHeaderbar from './MobileSidebar';
import Invoices from './Invoices';
import InvoiceDialog from './InvoiceDialog';
import LogInDialog from './LogInDialog';
import ViewInvoice from './ViewInvoice';
import {Provider} from 'react-redux';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Store from './Store'
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './Firebase';
import './styles.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //this will redefine the removeChild() function from every Node
    useEffect(() => {
        const originalRemoveChild = Node.prototype.removeChild;
        Node.prototype.removeChild = (child) => {
            if(child.parentNode !== this) {
                return child;
            }
            return originalRemoveChild.apply(this, arguments);
      }}, [])

    onAuthStateChanged(auth, (currentUser) => {
        if(currentUser){
            setIsLoggedIn(true);
        }
           
        else{
            setIsLoggedIn(false);
        }
            
    })

    return(
        <BrowserRouter>
            <Provider store={Store}>
                <LogInDialog/>                
                <Sidebar/>           
                <MobileHeaderbar/>
                <InvoiceDialog/>
                <Routes>
                    <Route path='/' element={<Invoices isLoggedIn={isLoggedIn}/>}/>
                    <Route path='/:invoice' element={<ViewInvoice/>}/>
                </Routes>
                             
            </Provider>        
        </BrowserRouter>

    )
}

export default App;