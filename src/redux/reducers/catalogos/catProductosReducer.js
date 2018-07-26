import {combineReducers} from 'redux';
import { GET_CATPRODUCTOS_SUCCESS, SAVE_CATPRODUCTOS_SUCCESS, DELETE_CATPRODUCTOS_SUCCESS, EDIT_CATPRODUCTOS_SUCCESS} from "../../actions/catalogos/catProductosActions";

function list(state=[], action){
    switch(action.type){
        case GET_CATPRODUCTOS_SUCCESS:
            return action.catalogoPro;
        case SAVE_CATPRODUCTOS_SUCCESS:
            return [...state, action.catalogoPro];
        case EDIT_CATPRODUCTOS_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.catalogoPro.id
            });
            return [...newL, action.catalogoPro];
        case DELETE_CATPRODUCTOS_SUCCESS:
            let acualL = state.filter(a=>{
                return a.id!=action.catalogoProId;
            });
            return acualL;
        default:
            return state;
    }
}


const catProductosReducer = combineReducers({
    list:list,
});


export default catProductosReducer;