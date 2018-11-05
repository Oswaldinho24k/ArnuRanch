import {combineReducers} from 'redux'
import {GET_RECIBOS_SUCCESS} from '../../actions/creditos/recibosActions'

const list = (state=[], action)=>{
    switch(action.type){
        case GET_RECIBOS_SUCCESS:
            return action.recibos
        default:
            return state
    }
}


const recibosReducer = combineReducers({
    list:list
})

export default recibosReducer