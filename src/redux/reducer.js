import { DEPOSIT, LOGINUSER, REGISTERUSER,WIDTHREW } from "./types";


const initialState = {
    loading: false,
    user: "",
    error: "",
    balace: [],
    history:[]
}

const stateReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTERUSER:
            return {
                ...state, user: action.payload, histoy: [...state.history]
       }   
           break;
   
       case LOGINUSER:
           console.log(action.payload)
            return {
                ...state,
                user: action.payload,
                history: [...state.history]

            }
            break;
        
        case WIDTHREW:
                console.log(action.payload)
                 return {
                     ...state,
                     balance: action.payload
                 }
            break;
       case    DEPOSIT:
                console.log(action.payload)
                 return {
                     ...state,
                     balance: action.payload
                 }
            break;
           
       default: return state
           break;
   }
}

export default stateReducer