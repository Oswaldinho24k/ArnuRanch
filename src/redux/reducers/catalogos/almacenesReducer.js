import {combineReducers} from 'redux';
import {GET_ALMACENES_SUCCESS, SAVE_ALMACENES_SUCCESS, DELETE_ALMACENES_SUCCESS, EDIT_ALMACENES_SUCCESS} from "../actions/catalogos/almacenesActions";

function list(state=[], action){
    switch(action.type){
        case GET_ALMACENES_SUCCESS:
            return action.almacenes;
        case SAVE_ALMACENES_SUCCESS:
            return [...state, action.almacenes];
        case EDIT_ALMACENES_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.almacenes.id
            });
            return [...newL, action.almacenes];
        case DELETE_ALMACENES_SUCCESS:
            let acualL = state.filter(a=>{
                return a.id!=action.almecenesId;
            });
            return acualL;
        default:
            return state;
    }
}


const almacenesReducer = combineReducers({
    list:list,
});


export default almacenesReducer;