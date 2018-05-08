import {combineReducers} from 'redux';
import {GET_EGRESOS_SUCCESS, SAVE_EGRESO_SUCCESS, EDIT_EGRESO_SUCCESS, DELETE_EGRESO_SUCCESS, GET_EGRESOS_DATA_SUCCESS} from "../../actions/administracion/egresosActions";



function list(state=[], action){
    switch(action.type){
        case GET_EGRESOS_SUCCESS:
            return action.egresos;
        case SAVE_EGRESO_SUCCESS:
            return [...state, action.egreso];
        case EDIT_EGRESO_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.egreso.id
            });
            return [...newL, action.egreso];
        case DELETE_EGRESO_SUCCESS:
            let acualL = state.filter(a=>{
                return a.id!=action.egresoId;
            });
            return acualL;
        default:
            return state;
    }
}

function allData(state={}, action) {
    switch (action.type){
        case GET_EGRESOS_DATA_SUCCESS:
            return action.dataEgreso;
        default:
            return state;
    }
}


const egresosReducer = combineReducers({
    list:list,
    allData:allData
});


export default egresosReducer;