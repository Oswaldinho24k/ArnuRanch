import {combineReducers} from 'redux';
import {GET_PESADAS_SUCCESS} from "../actions/pesadasActions";


function list(state=[], action){
    switch(action.type){
        case GET_PESADAS_SUCCESS:
            return action.pesadas;
        default:
            return state;
    }
}


const pesadasReducer = combineReducers({
    list:list,
});


export default pesadasReducer;