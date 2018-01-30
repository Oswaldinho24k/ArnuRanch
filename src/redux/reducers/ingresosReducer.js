import {combineReducers} from 'redux';
import {GET_INGRESOS_SUCCESS, SAVE_INGRESO_SUCCESS} from "../actions/ingresosActions";



function list(state=[], action){
    switch(action.type){
        case GET_INGRESOS_SUCCESS:
            return action.ingresos;
        case SAVE_INGRESO_SUCCESS:
            return [...state, action.ingreso];
        default:
            return state;
    }
}


const ingresosReducer = combineReducers({
    list:list,
});


export default ingresosReducer;