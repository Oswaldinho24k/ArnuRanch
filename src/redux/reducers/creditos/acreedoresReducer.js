import {combineReducers} from 'redux'
import {GET_ACREEDORES_SUCCESS, NEW_ACREEDOR_SUCCESS, EDIT_ACREEDOR_SUCCESS, DELETE_ACREEDOR_SUCCESS} from "../../actions/creditos/acreedoresActions";


const list=(state=[], action)=>{
    switch(action.type){
        case GET_ACREEDORES_SUCCESS:
            return action.items
        case NEW_ACREEDOR_SUCCESS:
            return [action.item, ...state]
        case EDIT_ACREEDOR_SUCCESS:
            state = state.map(i=>{
                if(i.id==action.item.id) i = Object.assign({}, action.item)
            })
            return [...state]
        case DELETE_ACREEDOR_SUCCESS:
            return [...state.filter(i=>i.id!==action.item.id)]
        default:
            return state
    }
}


const acreedoresReducer = combineReducers({
    list:list
})

export default acreedoresReducer