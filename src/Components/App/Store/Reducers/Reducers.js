export function EditInvoiceReducer(state = {open: false, invoice: null}, action) {
    switch(action.type){
        case 'set edit invoice':
            return {open: action.open, invoice: action.invoice};
        default: 
            return state;
    }
}

export function CreateInvoiceReducer(state = false, action) {
    switch(action.type){
        case 'open create invoice':
            return action.open;
        default: 
            return state;
    }
}