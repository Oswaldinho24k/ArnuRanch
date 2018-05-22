import {combineReducers} from 'redux';
import {GET_CUENTAS_SUCCESS, NEW_CUENTA_SUCCESS, DELETE_CUENTA_SUCCESS, GET_CUENTAS_DATA_SUCCESS, GET_CUSEARCH_SUCCESS, EDIT_CUENTA_SUCCESS } from "../../actions/cuentas/cuentasActions";

function list(state=[], action){
    switch(action.type){
        case GET_CUENTAS_SUCCESS:
            return action.cuentas;
        case NEW_CUENTA_SUCCESS:
            return [action.cuenta, ...state];
        case DELETE_CUENTA_SUCCESS:
            return  state.filter(r=>{
                return r.id!==action.cuenta;
            });
        case EDIT_CUENTA_SUCCESS:
            let newF = state.filter(a=>{
                return a.id!==action.cuenta.id
            });
            return [...newF, action.cuenta];

        default:
            return state;

    }
}

function allData(state=[], action) {
    switch (action.type){
        case GET_CUENTAS_DATA_SUCCESS:
            return action.dataCue;
        default:
            return state;
    }
}

function cuentaSearch(state={}, action) {
    switch (action.type){
        case GET_CUSEARCH_SUCCESS:
            return action.cuentaS;
        default:
            return state;
    }
}


const cuentasReducer = combineReducers({
    list:list,
    allData:allData,
    cuentaSearch:cuentaSearch
});


export default cuentasReducer;