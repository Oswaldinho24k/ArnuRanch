import {combineReducers} from 'redux';
import {GET_CORRALES_SUCCESS, SAVE_CORRAL_SUCCESS} from "../../actions/ganado/corralesActions";
import {EDIT_LOTE_SUCCESS, SAVE_LOTE_SUCCESS} from "../../actions/ganado/lotesActions";



function list(state=[], action){
    switch(action.type){
        case GET_CORRALES_SUCCESS:
            return action.corrales;
        case SAVE_CORRAL_SUCCESS:
            return [...state, action.corral];
        case SAVE_LOTE_SUCCESS:

            let corrales = state.filter(c=>{
               return c.id !== action.batch.corral.id;
            });

            let corral = Object.assign({}, action.batch.corral);
            corral['lotes']= action.batch;
            return [...corrales, corral];
        case EDIT_LOTE_SUCCESS:
            let corralesList = state.filter(c=>{
                return c.id !== action.lote.corral.id;
            });
            let corralC = Object.assign({}, action.lote.corral);
            corralC['lotes']= action.lote;
            return [...corralesList, corralC];


        default:
            return state;
    }
}




const corralesReducer = combineReducers({
    list:list,
});


export default corralesReducer;