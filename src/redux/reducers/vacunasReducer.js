import {combineReducers} from 'redux';
import {GET_VACUNAS_SUCCESS, SAVE_VACUNA_SUCCESS, DELETE_VACUNA_SUCCESS, EDIT_VACUNA_SUCCESS} from "../actions/vacunasActions";

function list(state=[], action){
    switch(action.type){
        case GET_VACUNAS_SUCCESS:
            return action.vacunas;
        case SAVE_VACUNA_SUCCESS:
            return [...state, action.vacuna];
        case EDIT_VACUNA_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.vacuna.id
            });
            return [...newL, action.vacuna];
        case DELETE_VACUNA_SUCCESS:
            let acualL = state.filter(a=>{
                return a.id!=action.vacunaId;
            });
            return acualL;
        default:
            return state;
    }
}


const vacunasReducer = combineReducers({
    list:list,
});


export default vacunasReducer;