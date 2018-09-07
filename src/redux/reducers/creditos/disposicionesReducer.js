import {combineReducers} from 'redux'
import {GET_DISPOSICIONES_SUCCESS, NEW_DISPOSICION_SUCCESS, EDIT_DISPOSICION_SUCCESS, DELETE_DISPOSICION_SUCCESS} from "../../actions/creditos/disposicionesActions";


const list=(state=[], action)=>{
    switch(action.type){
        case GET_DISPOSICIONES_SUCCESS:
            return action.items
        case NEW_DISPOSICION_SUCCESS:
            return [action.item, ...state]
        case EDIT_DISPOSICION_SUCCESS:
            state = state.map(i=>{
                if(i.id==action.item.id) i = Object.assign({}, action.item)
            })
            return [...state]
        case DELETE_DISPOSICION_SUCCESS:
            return [...state.filter(i=>i.id!==action.item.id)]
        default:
            return state
    }
}


const disposicionessReducer = combineReducers({
    list:list
})

export default disposicionessReducer