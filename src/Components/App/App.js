import React from 'react';
import Sidebar from './Sidebar';
import MobileHeaderbar from './MobileSidebar';
import Invoices from './Invoices';
import {Provider} from 'react-redux';
import Store from './Store'
import './styles.css';

function App() {
    return(
        <Provider store={Store}>
            <Sidebar/>           
            <MobileHeaderbar/>
            <Invoices/>                
        </Provider>
    )
}

export default App;