import {combineReducers} from 'redux'
import {GET_DISPOSICIONES_SUCCESS, NEW_DISPOSICION_SUCCESS, EDIT_DISPOSICION_SUCCESS, DELETE_DISPOSICION_SUCCESS} from "../../actions/creditos/disposicionesActions";
import {DELETE_RECIBO_SUCCESS, UPDATE_RECIBO_SUCCESS, CREATE_RECIBO_SUCCESS} from "../../actions/creditos/recibosActions";


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
        //recibos cases
        case CREATE_RECIBO_SUCCESS:

            const disposicionNew = Object.assign({},state.find(d=>d.id==action.recibo.disposicion))
            disposicionNew['recibos'] = [...disposicionNew.recibos, action.recibo]

            return [...state.filter(d=>d.id!=action.recibo.disposicion), disposicionNew]


        case DELETE_RECIBO_SUCCESS:
            const disposicion = Object.assign({},state.find(d=>d.id==action.recibo.disposicion))
            disposicion['recibos'] = [...disposicion.recibos.filter(r=>r.id!=action.recibo.id)]

            return [...state.filter(d=>d.id!=action.recibo.disposicion), disposicion]
        default:
            return state
    }
}


const disposicionessReducer = combineReducers({
    list:list
})

export default disposicionessReducer