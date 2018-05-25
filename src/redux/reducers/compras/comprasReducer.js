import {combineReducers} from 'redux';
import {GET_COMPRAS_SUCCESS, NEW_COMPRA_SUCCESS, DELETE_COMPRA_SUCCESS, GET_COMPRAS_DATA_SUCCESS, GET_COSEARCH_SUCCESS, EDIT_COMPRA_SUCCESS } from "../../actions/compras/comprasActions";

function list(state=[], action){
    switch(action.type){
        case GET_COMPRAS_SUCCESS:
            return action.compras;
        case NEW_COMPRA_SUCCESS:
            return [action.compra, ...state];
        case DELETE_COMPRA_SUCCESS:
            return  state.filter(r=>{
                return r.id!==action.compra;
            });
        case EDIT_COMPRA_SUCCESS:
            let newC = state.filter(a=>{
                return a.id!==action.compra.id
            });
            return [...newC, action.compra];

        default:
            return state;

    }
}

function allData(state=[], action) {
    switch (action.type){
        case GET_COMPRAS_DATA_SUCCESS:
            return action.dataCom;
        default:
            return state;
    }
}

function compraSearch(state={}, action) {
    switch (action.type){
        case GET_COSEARCH_SUCCESS:
            return action.compraS;
        default:
            return state;
    }
}


const comprasReducer = combineReducers({
    list:list,
    allData:allData,
    compraSearch:compraSearch
});


export default comprasReducer;