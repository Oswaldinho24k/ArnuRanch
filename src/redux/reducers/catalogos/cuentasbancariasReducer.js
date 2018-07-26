import {combineReducers} from 'redux';
import { GET_CUENTASBAN_SUCCESS, SAVE_CUENTASBAN_SUCCESS, DELETE_CUENTASBAN_SUCCESS, EDIT_CUENTASBAN_SUCCESS} from "../../actions/catalogos/cuentasbancariasActions";

function list(state=[], action){
    switch(action.type){
        case GET_CUENTASBAN_SUCCESS:
            return action.cuentasB;
        case SAVE_CUENTASBAN_SUCCESS:
            return [...state, action.cuentasB];
        case EDIT_CUENTASBAN_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.cuentasB.id
            });
            return [...newL, action.cuentasB];
        case DELETE_CUENTASBAN_SUCCESS:
            let acualL = state.filter(a=>{
                return a.id!=action.cuentasBId;
            });
            return acualL;
        default:
            return state;
    }
}


const cuentasbancariasReducer = combineReducers({
    list:list,
});


export default cuentasbancariasReducer;