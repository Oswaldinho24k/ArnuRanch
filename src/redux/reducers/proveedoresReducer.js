import {combineReducers} from 'redux';
import {GET_PROVEEDORES_SUCCESS, SAVE_PROVEEDOR_SUCCESS, EDIT_PROVEEDOR_SUCCESS} from "../actions/proveedoresActions";

function list(state=[], action){
    switch(action.type){
        case GET_PROVEEDORES_SUCCESS:
            return action.proveedores;
        case SAVE_PROVEEDOR_SUCCESS:
            return [...state, action.proveedor];
        case EDIT_PROVEEDOR_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.proveedor.id
        });
            return [...newL, action.proveedor];
        default:
            return state;
    }
}


const proveedoresReducer = combineReducers({
    list:list,
});


export default proveedoresReducer;