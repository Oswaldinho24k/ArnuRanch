import {combineReducers} from 'redux';
import {GET_CLIENTES_SUCCESS, SAVE_CLIENTE_SUCCESS} from "../actions/clientesActions";

function list(state=[], action){
    switch(action.type){
        case GET_CLIENTES_SUCCESS:
            return action.clientes;
        case SAVE_CLIENTE_SUCCESS:
            return [...state, action.cliente];
        default:
            return state;
    }
}


const clientesReducer = combineReducers({
    list:list,
});


export default clientesReducer;