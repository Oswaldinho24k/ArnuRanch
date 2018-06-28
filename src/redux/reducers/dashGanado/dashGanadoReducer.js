import {combineReducers} from 'redux';
import {GET_DASHDATA_SUCCESS, } from "../../actions/dashGanado/dashGanadoActions";

function dataDash(state=[], action){
    switch(action.type){
        case GET_DASHDATA_SUCCESS:
            return action.data;
        default:
            return state;

    }
}

const dataDashReducer = combineReducers({
    dataDash:dataDash
});


export default dataDashReducer;