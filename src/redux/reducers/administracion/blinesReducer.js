import {combineReducers} from 'redux';
import {GET_BLINES_SUCCESS} from "../../actions/administracion/blinesActions";

function list(state=[], action){
    switch(action.type){
        case GET_BLINES_SUCCESS:
            return action.blines;

        default:
            return state;
    }
}


const blinesReducer = combineReducers({
    list:list,
});


export default blinesReducer;