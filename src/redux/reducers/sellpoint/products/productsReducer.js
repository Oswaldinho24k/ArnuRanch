import {combineReducers} from 'redux';
import { GET_PRODUCTS_SUCCESS, NEW_PRODUCT_SUCCESS, EDIT_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS } from "../../../actions/sellpoint/products/productActions";

function list(state=[], action){
    switch(action.type){
        case GET_PRODUCTS_SUCCESS:
            return action.products;
        case NEW_PRODUCT_SUCCESS:
            return [...state, action.product]
        case EDIT_PRODUCT_SUCCESS:
            let filtered = state.filter(p=>{
                return p.id!==action.product.id;
            })
            return [...filtered, action.product];
        case DELETE_PRODUCT_SUCCESS:
            filtered = state.filter(p=>{
                return p.id!==action.product.id;
            })
            return [...filtered];
        default:
            return state;
    }
}


const productsReducer = combineReducers({
    list:list
});

export default productsReducer


