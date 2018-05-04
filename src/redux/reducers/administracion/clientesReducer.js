import {combineReducers} from 'redux';
import {GET_CLIENTES_SUCCESS, SAVE_CLIENTE_SUCCESS, EDIT_CLIENTE_SUCCESS, DELETE_CLIENTE_SUCCESS, GET_CLIENTES_DATA_SUCCESS} from "../../actions/administracion/clientesActions";


function list(state=[], action){
    switch(action.type){
        case GET_CLIENTES_SUCCESS:
            return action.clientes;
        case SAVE_CLIENTE_SUCCESS:
            return [action.cliente, ...state ];
        case EDIT_CLIENTE_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.cliente.id
            });
            return [...newL, action.cliente];
        case DELETE_CLIENTE_SUCCESS:
            let acualL = state.filter(a=>{
                return a.id!=action.clienteId;
            });
            return acualL;
        default:
            return state;
    }
}


function allData(state={}, action) {
    console.log(action)
    switch (action.type){
        case GET_CLIENTES_DATA_SUCCESS:
            return action.dataClient;
        default:
            return state;
    }
}


const clientesReducer = combineReducers({
    list:list,
    allData:allData
});


export default clientesReducer;