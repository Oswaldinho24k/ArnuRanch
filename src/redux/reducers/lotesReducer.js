import {combineReducers} from 'redux';
import {GET_LOTES_SUCCESS, SAVE_LOTE_SUCCESS} from "../actions/lotesActions";
import {DELETE_ANIMAL_SUCCESS} from "../actions/animalsActions";



function list(state=[], action){
    switch(action.type){
        case GET_LOTES_SUCCESS:
            return action.lotes;
        case SAVE_LOTE_SUCCESS:
            return [...state, action.batch];

        default:
            return state;
    }
}


const lotesReducer = combineReducers({
    list:list,
});


export default lotesReducer;