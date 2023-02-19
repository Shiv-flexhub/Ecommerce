import { combineReducers, applyMiddleware} from "redux"
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension"
import { configureStore } from "@reduxjs/toolkit"
import { productReducer, productDetailsReducer } from "./reducers/productReducers";

const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer
});

let initialState = {user:"ksnjns"};
const middleware = [thunk];



const store = configureStore({
    reducer,
    initialState,
  })

  export default store;