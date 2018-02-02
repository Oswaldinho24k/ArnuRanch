import {combineReducers} from 'redux';
import {GET_EGRESOS_SUCCESS, SAVE_EGRESO_SUCCESS} from "../actions/egresosActions";



function list(state=[], action){
    switch(action.type){
        case GET_EGRESOS_SUCCESS:
            return action.egresos;
        case SAVE_EGRESO_SUCCESS:
            return [...state, action.egreso];
        default:
            return state;
    }
}


const egresosReducer = combineReducers({
    list:list,
});


export default egresosReducer;