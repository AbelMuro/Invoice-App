export function OpenInvoiceReducer(state = {open: false, invoice: null}, action) {
    switch(action.type){
        case 'open invoice':
            return {open: action.open, invoice: action.invoice};
        default: 
            return state;
    }
}

export function FilterReducer(state = [], action){
    switch(action.type){
        case 'add filter':
            return [...state, action.filter];
        case 'remove filter':
                return state.filter((filter) => {
                    if(action.filter == filter)
                        return false;
                    else
                        return true;
                });
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