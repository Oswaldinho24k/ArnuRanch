import {combineReducers} from 'redux';
import { GET_USOS_SUCCESS, SAVE_USOS_SUCCESS, DELETE_USOS_SUCCESS, EDIT_USOS_SUCCESS} from "../../actions/catalogos/usoscfdiActions";

function list(state=[], action){
    switch(action.type){
        case GET_USOS_SUCCESS:
            return action.catCfdis;
        case SAVE_USOS_SUCCESS:
            return [...state, action.catCfdis];
        case EDIT_USOS_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.catCfdis.id
            });
            return [...newL, action.catCfdis];
        case DELETE_USOS_SUCCESS:
            let acualL = state.filter(a=>{
                return a.id!=action.catCfdisId;
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