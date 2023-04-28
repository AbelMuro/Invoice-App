export function OpenInvoiceReducer(state = {open: false, invoice: null}, action) {
    switch(action.type){
        case 'open invoice':
            return {open: action.open, invoice: action.invoice};
        default: 
            return state;
    }
}

export function OpenLogInReducer(state = false, action){
    switch(action.type){
        case 'open log in':
            return action.open;
        default: 
            return state;
    }
}

export function OpenDeleteReducer(state = {open: false, invoice: null}, action){
    switch(action.type){
        case 'open delete':
            return {open: action.open, invoice: action.invoice};
        default:
            return state;
    }
}