import {combineReducers} from 'redux';
import {GET_USERS_SUCCESS, NEW_USER_SUCCESS, SAVE_USER_PROFILE, DELETE_USER_SUCCESS} from "../../actions/administracion/usersActions";



function list(state=[], action){
    switch(action.type){
        case GET_USERS_SUCCESS:
            return action.users;
        case NEW_USER_SUCCESS:
            return [action.user, ...state];
        case SAVE_USER_PROFILE:
            let user = state.find(u=>{
                return u.id===action.profile.user
            });
            let uList = state.filter(u=>{
                return u.id!==action.profile.user;
            });
            user['profile'] = action.profile;
            return [user, ...uList];
        case DELETE_USER_SUCCESS:
            let list = state.filter(u=>{
                return u.id!==action.user;
            });
            return list;
        default:
            return state;
    }
}


const usersReducer = combineReducers({
    list:list,
});

export default usersReducer