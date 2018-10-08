import {combineReducers} from 'redux';
import {
    GET_LOTES_DATA_SUCCESS, GET_LOTES_SUCCESS, SAVE_LOTE_SUCCESS, EDIT_LOTE_SUCCESS,
    DELETE_LOTE_SUCCESS, GET_LOSEARCH_SUCCESS, GET_SINGLE_LOTE_SUCCESS
} from "../../actions/ganado/lotesActions";
import {
    DELETE_ANIMAL_SUCCESS,
    EDIT_ANIMAL_SUCCESS,
    GET_SINGLE_ANIMAL_SUCCESS
} from "../../actions/ganado/animalsActions";


function object(state={}, action){
    switch(action.type){
        case GET_SINGLE_LOTE_SUCCESS:
            return action.lote;
        case EDIT_LOTE_SUCCESS:
            return action.lote;
        default:
            return state;
    }
}



function list(state=[], action){
    switch(action.type){
        case EDIT_ANIMAL_SUCCESS:

            let lotesFiltrados = state.filter(lote=>lote.id != action.animal.lote.id)            
            lotesFiltrados = lotesFiltrados.map(lote=>{
                let lanimals = lote.animals.filter(a=>{return a.id!=action.animal.id})
                lote.animals = lanimals
                return lote
            })

            let loteToUpdate = state.find(lote=>lote.id == action.animal.lote.id)
            
            let animals = [...loteToUpdate.animals, action.animal]
            loteToUpdate.animals = animals


            return [...lotesFiltrados, loteToUpdate]
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

function allData(state={}, action){
    switch(action.type){
        case GET_LOTES_DATA_SUCCESS:
            return action.data;
        default:
            return state;
    }
}

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
    allData:allData,
    object:object
    //loteSearch:loteSearch
});


export default lotesReducer;