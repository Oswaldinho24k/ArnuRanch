import {combineReducers} from 'redux';
import {GET_PROVEEDORES_SUCCESS, SAVE_PROVEEDOR_SUCCESS} from "../actions/proveedoresActions";

function list(state=[], action){
    switch(action.type){
        case GET_PROVEEDORES_SUCCESS:
            return action.proveedores;
        case SAVE_PROVEEDOR_SUCCESS:
            return [...state, action.proveedor];
        default:
            return state;
    }
}


const proveedoresReducer = combineReducers({
    list:list,
});


export default proveedoresReducer;