import {combineReducers} from 'redux';
import {GET_GASTOS_SUCCESS, NEW_GASTO_SUCCESS, DELETE_GASTO_SUCCESS, GET_GASTOS_DATA_SUCCESS, GET_GGSEARCH_SUCCESS, EDIT_GASTO_SUCCESS } from "../../actions/gastoGanado/gastoGanadoActions";

function list(state=[], action){
    switch(action.type){
        case GET_GASTOS_SUCCESS:
            return action.gastos;
        case NEW_GASTO_SUCCESS:
            return [action.gasto, ...state];
        case DELETE_GASTO_SUCCESS:
            return  state.filter(r=>{
                return r.id!==action.gasto;
            });
        case EDIT_GASTO_SUCCESS:
            let newG = state.filter(a=>{
                return a.id!==action.gasto.id
            });
            return [...newG, action.gasto];

        default:
            return state;

    }
}

function allData(state=[], action) {
    switch (action.type){
        case GET_GASTOS_DATA_SUCCESS:
            return action.dataGastos;
        default:
            return state;
    }
}

function gastoGanadoSearch(state={}, action) {
    switch (action.type){
        case GET_GGSEARCH_SUCCESS:
            return action.gastoS;
        default:
            return state;
    }
}


const gastosGanadoReducer = combineReducers({
    list:list,
    allData:allData,
    gastoGanadoSearch:gastoGanadoSearch
});


export default gastosGanadoReducer;