import {combineReducers} from 'redux';
import {GET_CORRALES_SUCCESS} from "../actions/corralesActions";



function list(state=[], action){
    switch(action.type){
        case GET_CORRALES_SUCCESS:
            return action.corrales;
        default:
            return state;
    }
}


const corralesReducer = combineReducers({
    list:list,
});


export default corralesReducer;