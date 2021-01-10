const initialState = {
    str: ''
}

const addressInputReduce = (state = initialState, action) => {
    switch(action.type){
        case 'ADDRESS_INPUT' : {
            return {
                ...state,
                str: action.str
            }
        }
        default: {
            return state
        }
    }
}

export default addressInputReduce