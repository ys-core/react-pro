
import { combineReducers  } from 'redux'


const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'


let initialState = {
    signInUser: ''
}

function signInReducer(state=initialState, action={}){
    const { type, payload } = action
    switch(type){
        case 'SIGN_IN' :  return {...state, signInUser: payload }  // Object.assign({},state,{ logged : payload })
        case 'SIGN_OUT' :  return {...state, signInUser: payload }   //  Object.assign({},state,{ logged : payload })
        default :  return state
    }
        
}

let reducer = combineReducers({
    signIn: signInReducer
})

export default reducer