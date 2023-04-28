import {combineReducers} from '@reduxjs/toolkit';
import {OpenInvoiceReducer, OpenLogInReducer, OpenDeleteReducer} from './Reducers.js';

const rootReducer = combineReducers({
    invoiceDialog: OpenInvoiceReducer,
    loginDialog: OpenLogInReducer,
    deleteDialog: OpenDeleteReducer
})

export default rootReducer;