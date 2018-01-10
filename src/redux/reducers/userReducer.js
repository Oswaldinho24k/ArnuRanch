import {combineReducers} from 'redux';
import {LOG_IN_SUCCESS} from "../actions/userActions";



function object(state={}, action){
    switch(action.type){
        case LOG_IN_SUCCESS:
            return {...state};
        default:
            return state;
    }
}


const userReducer = combineReducers({
    object,
});

export default userReducer