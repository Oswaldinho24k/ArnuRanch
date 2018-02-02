import {combineReducers} from 'redux';
import {GET_INSUMOS_SUCCESS, SAVE_INSUMO_SUCCESS, EDIT_INSUMO_SUCCESS, DELETE_INSUMO_SUCCESS} from "../../actions/plantaAlimentos/insumosActions";


const list = (state=[], action) => {
    switch(action.type){
        case GET_INSUMOS_SUCCESS:
            return action.insumos;
        case SAVE_INSUMO_SUCCESS:
            return [...state, action.insumo];
        case EDIT_INSUMO_SUCCESS:
            return [ ...state.map ( insumo => {
                if (insumo.id === action.insumo.id) {
                    return action.insumo;
                }
                return insumo;
            })];
        case DELETE_INSUMO_SUCCESS:
            return [ ...state.filter( insumo => insumo.id !== action.insumo.id)];
        default:
            return state;
    }
};

const insumosReducer = combineReducers({
    list:list,
});

export default insumosReducer;