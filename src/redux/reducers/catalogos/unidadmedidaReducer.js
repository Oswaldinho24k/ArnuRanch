import {combineReducers} from 'redux';
import { GET_UNIDADMEDIDA_SUCCESS, SAVE_UNIDADMEDIDA_SUCCESS, DELETE_UNIDADMEDIDA_SUCCESS, EDIT_UNIDADMEDIDA_SUCCESS} from "../../actions/catalogos/unidadmedidaActions";

function list(state=[], action){
    switch(action.type){
        case GET_UNIDADMEDIDA_SUCCESS:
            return action.unidadMe;
        case SAVE_UNIDADMEDIDA_SUCCESS:
            return [...state, action.unidadM];
        case EDIT_UNIDADMEDIDA_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.unindadM.id
            });
            return [...newL, action.unindadM];
        case DELETE_UNIDADMEDIDA_SUCCESS:
            let acualL = state.filter(a=>{
                return a.id!=action.unindadMId;
            });
            return acualL;
        default:
            return state;
    }
}


const unidadmedidaReducer = combineReducers({
    list:list,
});


export default unidadmedidaReducer;