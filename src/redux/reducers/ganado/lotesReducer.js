import {combineReducers} from 'redux';
import {
    GET_LOTES_DATA_SUCCESS, GET_LOTES_SUCCESS, SAVE_LOTE_SUCCESS, EDIT_LOTE_SUCCESS,
    DELETE_LOTE_SUCCESS, GET_LOSEARCH_SUCCESS
} from "../../actions/ganado/lotesActions";
import {DELETE_ANIMAL_SUCCESS} from "../../actions/ganado/animalsActions";



function list(state=[], action){
    switch(action.type){
        case GET_LOTES_SUCCESS:
            return action.lotes;
        case SAVE_LOTE_SUCCESS:
            return [...state, action.batch];
        case EDIT_LOTE_SUCCESS:
            let filtered = state.filter(l=>{
                return l.id !== action.lote.id;
            });
            return [action.lote, ...filtered];
        case DELETE_LOTE_SUCCESS:
            let acualList = state.filter(a=>{
                return a.id!=action.loteId;
            });
            return acualList;
        default:
            return state;
    }
}

/*function allData(state={}, action){
    switch(action.type){
        case GET_LOTES_DATA_SUCCESS:
            return action.data;
        default:
            return state;
    }
}*/

/*
function loteSearch(state={}, action) {
    switch (action.type){
        case GET_LOSEARCH_SUCCESS:
            return action.loteS;
        default:
            return state;
    }
}
*/


const lotesReducer = combineReducers({
    list:list,
    //allData:allData,
    //loteSearch:loteSearch
});


export default lotesReducer;