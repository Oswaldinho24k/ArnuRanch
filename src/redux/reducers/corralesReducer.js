import {combineReducers} from 'redux';
import {GET_CORRALES_SUCCESS, SAVE_CORRAL_SUCCESS} from "../actions/corralesActions";



function list(state=[], action){
    switch(action.type){
        case GET_CORRALES_SUCCESS:
            return action.corrales;
        case SAVE_CORRAL_SUCCESS:
            return [...state, action.corral];
        default:
            return state;
    }
}




const corralesReducer = combineReducers({
    list:list,
});


export default corralesReducer;