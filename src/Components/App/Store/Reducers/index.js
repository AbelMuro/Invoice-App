import {combineReducers} from '@reduxjs/toolkit';
import {EditInvoiceReducer, CreateInvoiceReducer, OpenLogInReducer} from './Reducers.js';

const rootReducer = combineReducers({
    editInvoice: EditInvoiceReducer,
    createInvoice: CreateInvoiceReducer,
    loginDialog: OpenLogInReducer
})

export default rootReducer;