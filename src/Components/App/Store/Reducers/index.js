import {combineReducers} from '@reduxjs/toolkit';
import {OpenInvoiceReducer, OpenLogInReducer, OpenDeleteReducer, FilterReducer, ThemeSwitchReducer} from './Reducers.js';

const rootReducer = combineReducers({
    invoiceDialog: OpenInvoiceReducer,
    loginDialog: OpenLogInReducer,
    deleteDialog: OpenDeleteReducer,
    filter: FilterReducer,
    theme: ThemeSwitchReducer
})

export default rootReducer;