import {combineReducers} from 'redux';
import {GET_INGRESOS_SUCCESS, SAVE_INGRESO_SUCCESS, EDIT_INGRESO_SUCCESS, DELETE_INGRESO_SUCCESS, GET_INGRESOS_DATA_SUCCESS} from "../../actions/administracion/ingresosActions";



function list(state=[], action){
    switch(action.type){
        case GET_INGRESOS_SUCCESS:
            return action.ingresos;
        case SAVE_INGRESO_SUCCESS:
            return [...state, action.ingreso];
        case EDIT_INGRESO_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.ingreso.id
            });
            return [...newL, action.ingreso];
        case DELETE_INGRESO_SUCCESS:
            let acualL = state.filter(a=>{
                return a.id!=action.ingresoId;
            });
            return acualL;
        default:
            return state;
    }
}

function allData(state={}, action) {
    switch (action.type){
        case GET_INGRESOS_DATA_SUCCESS:
            return action.dataIngreso;
        default:
            return state;
    }
}

/*
function ingresoSearch(state={}, action) {
    switch (action.type){
        case GET_INSEARCH_SUCCESS:
            return action.ingresoS;
        default:
            return state;
    }
}
*/


const ingresosReducer = combineReducers({
    list:list,
    allData:allData,
    //ingresoSearch:ingresoSearch
});


export default ingresosReducer;