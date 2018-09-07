import {combineReducers} from 'redux'
import {GET_FIERROSN_SUCCESS, NEW_FIERRON_SUCCESS, EDIT_FIERRON_SUCCESS} from '../../actions/ganado/fierroNActions'


function list(state=[], action){
    switch(action.type){
        case GET_FIERROSN_SUCCESS:
            return [...action.fierros]
        case NEW_FIERRON_SUCCESS:
            return [action.fierro, ...state]
        case EDIT_FIERRON_SUCCESS:
            let filtered = state.filter(i=>i.id==action.fierro.id)
            return [action.fierro, ...filtered]
        default:
            return state
    }
}

const fierrosNReducer = combineReducers({
    list:list
})

export default  fierrosNReducer;