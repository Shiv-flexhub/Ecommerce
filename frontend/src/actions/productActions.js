import axios from "axios"
import { 
    ALL_PRODUCT_FAIL, 
    ALL_PRODUCT_REQUESTS,
    ALL_PRODUCT_SUCCESS, 
    CLEAR_ERRORS, 
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUESTS,
    PRODUCT_DETAILS_SUCCESS} from "../constants/productConstants"

    //to get all the products
export const getProduct = () => async(dispatch)=>{
    try {
        dispatch({ type: ALL_PRODUCT_REQUESTS});

        const {data} = await axios.get("/api/v1/products");
    
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}


export const getProductDetails = (id) => async(dispatch)=>{
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUESTS});

        const {data} = await axios.get(`/api/v1/product/${id}`);
    
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })
        
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const clearErrors = () => async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}