import {SAVE_ANIMAL_GASTO_SUCCESS, GET_ANIMAL_GASTOS_DATA, GET_ANIMAL_GASTOS_SUCCESS, UPDATE_ANIMAL_GASTO_SUCCESS, DELETE_ANIMAL_GASTO_SUCCESS} from '../../actions/ganado/gastoAnimalActions';
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

        case UPDATE_ANIMAL_GASTO_SUCCESS:
            return [...state.map(g=>{
                if(g.id == action.gasto.id) g = Object.assign({}, action.gasto)
            return g
    })]
case DELETE_ANIMAL_GASTO_SUCCESS:
        return [...state.filter(g=>g.id==action.gasto.id)]
default:
    return state
}
}

const gastoAnimalReducer = combineReducers({
    list:list,
    object:object
})

export default gastoAnimalReducer

