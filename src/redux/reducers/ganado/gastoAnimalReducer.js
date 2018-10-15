import {SAVE_ANIMAL_GASTO_SUCCESS, GET_ANIMAL_GASTOS_DATA, GET_ANIMAL_GASTOS_SUCCESS} from '../../actions/ganado/gastoAnimalActions';
import {combineReducers} from 'redux'


function object(state={}, action){
    switch(action.type){
        case GET_ANIMAL_GASTOS_DATA:
            return action.data
        default:
            return state
    }

}

function list(state=[], action){
    switch(action.type){
        case GET_ANIMAL_GASTOS_SUCCESS:
            return action.gastos

        case SAVE_ANIMAL_GASTO_SUCCESS:
            return [action.gasto, ...state]
        default:
            return state
    }
}

const gastoAnimalReducer = combineReducers({
    list:list,
    object:object
})

export default gastoAnimalReducer

