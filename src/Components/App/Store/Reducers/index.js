import {combineReducers} from '@reduxjs/toolkit';
import {OpenInvoiceReducer, OpenLogInReducer, OpenDeleteReducer, FilterReducer, ThemeSwitchReducer, OpenLogOutReducer} from './Reducers.js';

const rootReducer = combineReducers({
    invoiceDialog: OpenInvoiceReducer,
    loginDialog: OpenLogInReducer,
    logoutDialog: OpenLogOutReducer,
    deleteDialog: OpenDeleteReducer,
    filter: FilterReducer,
    theme: ThemeSwitchReducer
})

export default rootReducer;