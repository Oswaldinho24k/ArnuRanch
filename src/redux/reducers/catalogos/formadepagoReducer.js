import {combineReducers} from 'redux';
import { GET_FORMA_PAGO_SUCCESS, SAVE_FORMA_PAGO_SUCCESS, DELETE_FORMA_PAGO_SUCCESS, EDIT_FORMA_PAGO_SUCCESS} from "../actions/catalogos/formadepagoActions";

function list(state=[], action){
    switch(action.type){
        case GET_FORMA_PAGO_SUCCESS:
            return action.formaP;
        case SAVE_FORMA_PAGO_SUCCESS:
            return [...state, action.formaP];
        case EDIT_FORMA_PAGO_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.formaP.id
            });
            return [...newL, action.formaP];
        case DELETE_FORMA_PAGO_SUCCESS:
            let acualL = state.filter(a=>{
                return a.id!=action.formaPId;
            });
            return acualL;
        default:
            return state;
    }
}


const formadepagoReducer = combineReducers({
    list:list,
});


export default formadepagoReducer;