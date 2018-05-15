import {combineReducers} from 'redux';
import {GET_FACTURAS_SUCCESS, NEW_FACTURA_SUCCESS, DELETE_FACTURA_SUCCESS, GET_FACTURAS_DATA_SUCCESS, GET_FASEARCH_SUCCESS, EDIT_FACTURA_SUCCESS } from "../../actions/facturas/facturasActions";

function list(state=[], action){
    switch(action.type){
        case GET_FACTURAS_SUCCESS:
            return action.facturas;
        case NEW_FACTURA_SUCCESS:
            return [action.factura, ...state];
        case DELETE_FACTURA_SUCCESS:
            return  state.filter(r=>{
                return r.id!==action.factura;
            });
        case EDIT_FACTURA_SUCCESS:
            let newF = state.filter(a=>{
                return a.id!==action.factura.id
            });
            return [...newF, action.factura];

        default:
            return state;

    }
}

function allData(state=[], action) {
    switch (action.type){
        case GET_FACTURAS_DATA_SUCCESS:
            return action.dataFac;
        default:
            return state;
    }
}

function facturaSearch(state={}, action) {
    switch (action.type){
        case GET_FASEARCH_SUCCESS:
            return action.facturasS;
        default:
            return state;
    }
}


const facturasReducer = combineReducers({
    list:list,
    allData:allData,
    facturaSearch:facturaSearch
});


export default facturasReducer;