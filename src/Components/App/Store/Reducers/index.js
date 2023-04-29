import {combineReducers} from '@reduxjs/toolkit';
import {OpenInvoiceReducer, OpenLogInReducer, OpenDeleteReducer, FilterReducer} from './Reducers.js';

const rootReducer = combineReducers({
    invoiceDialog: OpenInvoiceReducer,
    loginDialog: OpenLogInReducer,
    deleteDialog: OpenDeleteReducer,
    filter: FilterReducer
})

export default rootReducer;