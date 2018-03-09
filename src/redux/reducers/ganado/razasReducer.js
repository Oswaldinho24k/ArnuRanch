import {combineReducers} from 'redux';
import {GET_RAZAS_SUCCESS,NEW_RAZA_SUCCESS, DELETE_RAZA_SUCCESS } from "../../actions/ganado/razasActions";


function list(state=[], action){
    switch(action.type){
        case GET_RAZAS_SUCCESS:
            return action.razas;
        case NEW_RAZA_SUCCESS:
            return [action.raza, ...state];
        case DELETE_RAZA_SUCCESS:
            return  state.filter(r=>{
                return r.id!==action.raza;
            });

        default:
            return state;
    }
}


const razasReducer = combineReducers({
    list:list,
});


export default razasReducer;