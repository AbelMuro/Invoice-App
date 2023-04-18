import {combineReducers} from '@reduxjs/toolkit';
import {EditInvoiceReducer, CreateInvoiceReducer} from './Reducers.js';

const rootReducer = combineReducers({
    editInvoice: EditInvoiceReducer,
    createInvoice: CreateInvoiceReducer,
})

export default rootReducer;