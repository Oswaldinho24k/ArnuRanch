import {combineReducers} from 'redux';
import {GET_EGRESOS_SUCCESS, SAVE_EGRESO_SUCCESS, EDIT_EGRESO_SUCCESS, DELETE_EGRESO_SUCCESS} from "../../actions/administracion/egresosActions";



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


const egresosReducer = combineReducers({
    list:list,
});


export default egresosReducer;