import stateReducer from "./reducer"
import axios from "axios"
import thunk from "redux-thunk"
import { applyMiddleware,createStore} from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';

 const store = createStore(stateReducer, composeWithDevTools(applyMiddleware(thunk)))
 export default store
