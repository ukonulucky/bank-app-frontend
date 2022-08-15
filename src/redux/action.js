import {DEPOSIT,REGISTERUSER,WIDTHREW,LOGINUSER,HISTORY} from "./types"
export const loginUser = (info) => {
    return {
        type: LOGINUSER,
        payload: info
    }
}
export const registerUser = (info) => {
    return {
        type: REGISTERUSER,
        payload:info
    }
}

export const withdrawUser = (info) => {
    return {
        type: WIDTHREW,
        payload:info
    }
}

export const depositUser = (info) => {
    return {
        type: REGISTERUSER,
        payload:info
    }
   
}
export const historyUser = (info) => {
    return {
        type: HISTORY,
        payload: info
    }
}