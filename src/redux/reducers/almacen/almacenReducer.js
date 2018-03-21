import {combineReducers} from 'redux';
import {SAVE_ALMACEN_SUCCESS} from "../../actions/almacen/almacenActions";

function list(state=[], action){
    console.log(action)
    switch(action.type){
        case SAVE_ALMACEN_SUCCESS:
            return [...state, action.almacen];
        default:
            return state;
    }
}


const almacenReducer = combineReducers({
    list:list,
});


export default almacenReducer;