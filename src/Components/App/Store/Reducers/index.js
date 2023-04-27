import {combineReducers} from '@reduxjs/toolkit';
import {OpenInvoiceReducer, OpenLogInReducer} from './Reducers.js';

const rootReducer = combineReducers({
    invoiceDialog: OpenInvoiceReducer,
    loginDialog: OpenLogInReducer
})

export default rootReducer;