import {combineReducers} from 'redux';
import { GET_USOS_SUCCESS, SAVE_USO_SUCCESS, DELETE_USO_SUCCESS, EDIT_USO_SUCCESS} from "../actions/catalogos/usoscfdiActions";

function list(state=[], action){
    switch(action.type){
        case GET_USO_SUCCESS:
            return action.usos;
        case SAVE_USO_SUCCESS:
            return [...state, action.usos];
        case EDIT_USO_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.usos.id
            });
            return [...newL, action.usos];
        case DELETE_USO_SUCCESS:
            let acualL = state.filter(a=>{
                return a.id!=action.usosId;
            });
            return acualL;
        default:
            return state;
    }
}


const usoscfdiReducer = combineReducers({
    list:list,
});


export default usoscfdiReducer;