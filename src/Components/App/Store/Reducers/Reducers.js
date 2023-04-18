export function EditInvoiceReducer(state = {open: false, invoice: null}, action) {
    switch(action.type){
        case 'set edit invoice':
            return {open: action.open, invoice: action.invoice};
        default: 
            return state;
    }
}

export function CreateInvoiceReducer(state = {open: false, invoice: null}, action) {
    switch(action.type){
        case 'set create invoice':
            return {open: action.open, invoice: action.invoice};
        default: 
            return state;
    }
}