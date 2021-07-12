const initialState = {
    users:[]
}

export default (state=initialState,action) => {
    
    switch (action.type) {
        case 'List':
            console.log("List",action.payload);
            return {...state,users:action.payload};
            
        default:
            return state;
    }
}