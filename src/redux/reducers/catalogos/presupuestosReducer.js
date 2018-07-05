import {combineReducers} from 'redux';
import { GET_PRESUPUESTOS_SUCCESS, SAVE_PRESUPUESTOS_SUCCESS, DELETE_PRESUPUESTOS_SUCCESS, EDIT_PRESUPUESTOS_SUCCESS} from "../actions/catalogos/presupuestosActions";

function list(state=[], action){
    switch(action.type){
        case GET_PRESUPUESTOS_SUCCESS:
            return action.presupuestos;
        case SAVE_PRESUPUESTOS_SUCCESS:
            return [...state, action.presupuestos];
        case EDIT_PRESUPUESTOS_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.presupuestos.id
            });
            return [...newL, action.presupuestos];
        case DELETE_PRESUPUESTOS_SUCCESS:
            let acualL = state.filter(a=>{
                return a.id!=action.presupuestosId;
            });
            return acualL;
        default:
            return state;
    }
}


const presupuestosReducer = combineReducers({
    list:list,
});


export default presupuestosReducer;