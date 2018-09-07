import {combineReducers} from 'redux'
import {GET_FIERROSO_SUCCESS, NEW_FIERROO_SUCCESS, EDIT_FIERROO_SUCCESS} from '../../actions/ganado/fierroOActions'


function list(state=[], action){
    switch(action.type){
        case GET_FIERROSO_SUCCESS:
            return [...action.fierros]
        case NEW_FIERROO_SUCCESS:
            return [action.fierro, ...state]
        case EDIT_FIERROO_SUCCESS:
            let filtered = state.filter(i=>i.id==action.fierro.id)
            return [action.fierro, ...filtered]
        default:
            return state
    }
}

const fierrosOReducer = combineReducers({
    list:list
})

export default  fierrosOReducer;