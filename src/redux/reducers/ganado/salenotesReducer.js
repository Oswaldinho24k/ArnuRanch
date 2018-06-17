import {combineReducers} from 'redux';
import { NEW_SALENOTE_SUCCESS, GET_SALENOTES_SUCCESS, DELETE_SALENOTE_SUCCESS, EDIT_SALENOTE_SUCCESS } from '../../actions/ganado/salenotesActions';


function list(state=[], action){
    switch(action.type){
        case GET_SALENOTES_SUCCESS:
            return action.saleNotes
        case NEW_SALENOTE_SUCCESS:
            return [action.saleNote, ...state]
        case DELETE_SALENOTE_SUCCESS:
            let nList =  state.filter(r=>{
                return r.id!==action.saleNote;
            });
            return nList
        case EDIT_SALENOTE_SUCCESS:
            let newList = state.filter(a=>{
                return a.id!=action.saleNote.id
            });            
            return [action.saleNote, ...newList];
        default:
            return state;
    }
}


const saleNotesReducer = combineReducers({
    list:list,
});


export default saleNotesReducer;