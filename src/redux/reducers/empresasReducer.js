import {combineReducers} from 'redux';
import {GET_EMPRESAS_SUCCESS, SAVE_EMPRESA_SUCCESS, DELETE_EMPRESA_SUCCESS, EDIT_EMPRESA_SUCCESS} from "../actions/empresasActions";

function list(state=[], action){
    switch(action.type){
        case GET_EMPRESAS_SUCCESS:
            return action.empresas;
        case SAVE_EMPRESA_SUCCESS:
            return [...state, action.empresa];
        case EDIT_EMPRESA_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.empresa.id
            });
            return [...newL, action.empresa];
        case DELETE_EMPRESA_SUCCESS:
            let acualL = state.filter(a=>{
                return a.id!=action.empresaId;
            });
            return acualL;
        default:
            return state;
    }
}


const empresasReducer = combineReducers({
    list:list,
});


export default empresasReducer;