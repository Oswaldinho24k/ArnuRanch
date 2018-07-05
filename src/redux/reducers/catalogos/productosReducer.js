import {combineReducers} from 'redux';
import { GET_PRODUCTOS_SUCCESS, SAVE_PRODUCTOS_SUCCESS, DELETE_PRODUCTOS_SUCCESS, EDIT_PRODUCTOS_SUCCESS} from "../actions/catalogos/productosActions";

function list(state=[], action){
    switch(action.type){
        case GET_PRODUCTOS_SUCCESS:
            return action.productos;
        case SAVE_PRODUCTOS_SUCCESS:
            return [...state, action.productos];
        case EDIT_PRODUCTOS_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.productos.id
            });
            return [...newL, action.productos];
        case DELETE_PRODUCTOS_SUCCESS:
            let acualL = state.filter(a=>{
                return a.id!=action.productosId;
            });
            return acualL;
        default:
            return state;
    }
}


const productosReducer = combineReducers({
    list:list,
});


export default productosReducer;