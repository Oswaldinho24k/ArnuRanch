import {combineReducers} from 'redux';
import {GET_CORRALES_SUCCESS, SAVE_CORRAL_SUCCESS} from "../actions/corralesActions";
import {SAVE_LOTE_SUCCESS} from "../actions/lotesActions";



function list(state=[], action){
    switch(action.type){
        case GET_CORRALES_SUCCESS:
            return action.corrales;
        case SAVE_CORRAL_SUCCESS:
            return [...state, action.corral];
        case SAVE_LOTE_SUCCESS:
            console.log(action.batch);
            let corrales = state.filter(c=>{
               return c.id !== action.batch.corral.id;
            });

            let corral = Object.assign({}, action.batch.corral);
            corral['lotes']= action.batch;
            return [...corrales, corral];

        default:
            return state;
    }
}




const corralesReducer = combineReducers({
    list:list,
});


export default corralesReducer;