import {combineReducers} from 'redux';
import {GET_LOTES_SUCCESS} from "../actions/lotesActions";



function list(state=[], action){
    switch(action.type){
        case GET_LOTES_SUCCESS:
            return action.lotes;
        default:
            return state;
    }
}


const lotesReducer = combineReducers({
    list:list,
});


export default lotesReducer;