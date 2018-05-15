import {combineReducers} from 'redux';
import { GET_PRODUCTS_SUCCESS, NEW_PRODUCT_SUCCESS } from "../../../actions/sellpoint/products/productActions";

function list(state=[], action){
    switch(action.type){
        case GET_PRODUCTS_SUCCESS:
            return action.products;
        case NEW_PRODUCT_SUCCESS:
            return [...state, action.product]
        default:
            return state;
    }
}


const productsReducer = combineReducers({
    list:list
});

export default productsReducer


