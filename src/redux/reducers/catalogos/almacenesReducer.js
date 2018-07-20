import {combineReducers} from 'redux';
import {GET_CATALMACEN_SUCCESS, SAVE_ALMACENES_SUCCESS, DELETE_ALMACENES_SUCCESS, EDIT_ALMACENES_SUCCESS} from "../../actions/catalogos/almacenesActions";

function list(state=[], action){
    switch(action.type){
        case GET_CATALMACEN_SUCCESS:
            return action.catAlmacenes;
        case SAVE_ALMACENES_SUCCESS:
            return [...state, action.catAlmacen];
        case EDIT_ALMACENES_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.catAlmacen.id
            });
            return [...newL, action.catAlmacen];
        case DELETE_ALMACENES_SUCCESS:
            let acualL = state.filter(a=>{
                return a.id!=action.catAlmacenesId;
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