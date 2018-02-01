import {combineReducers} from 'redux';
import {GET_FORMULAS_SUCCESS, SAVE_FORMULA_SUCCESS, EDIT_FORMULA_SUCCESS, DELETE_FORMULA_SUCCESS} from "../../actions/plantaAlimentos/formulasActions";


const list = (state=[], action) => {
    switch(action.type){
        case GET_FORMULAS_SUCCESS:
            return action.formulas;
        case SAVE_FORMULA_SUCCESS:
            return [...state, action.formula];
        case EDIT_FORMULA_SUCCESS:
            return [ ...state.map ( formula => {
                if (formula.id === action.formula.id) {
                    return action.formula;
                }
                return formula;
            })];
        case DELETE_FORMULA_SUCCESS:
            return [ ...state.filter( formula => formula.id !== action.formula.id)];
        default:
            return state;
    }
};

const formulasReducer = combineReducers({
    list:list,
});

export default formulasReducer;