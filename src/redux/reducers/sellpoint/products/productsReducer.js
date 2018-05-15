import {combineReducers} from 'redux';
import { GET_PRODUCTS_SUCCESS } from "../../../actions/sellpoint/products/productActions";

function list(state=[], action){
    switch(action.type){
        case GET_PRODUCTS_SUCCESS:
            return action.products;
        default:
            return state;
    }
}


const productsReducer = combineReducers({
    list:list
});

export default productsReducer


