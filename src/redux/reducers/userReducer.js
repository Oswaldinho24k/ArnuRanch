import {combineReducers} from 'redux';
import {GET_USER_SUCCESS, LOG_OUT_SUCCESS} from "../actions/userActions";



function object(state={}, action){
    switch(action.type){
        case GET_USER_SUCCESS:
            return action.user;
        case LOG_OUT_SUCCESS:
            return state;
        default:
            return state;
    }
}


const userReducer = combineReducers({
    object:object,
});

export default userReducer