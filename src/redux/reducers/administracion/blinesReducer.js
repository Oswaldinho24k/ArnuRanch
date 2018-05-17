import {combineReducers} from 'redux';
import {GET_LINES_SUCCESS, NEW_LINE_SUCCESS, DELETE_LINE_SUCCESS, GET_LINES_DATA_SUCCESS, GET_LISEARCH_SUCCESS, EDIT_LINEA_SUCCESS} from "../../actions/blines/blinesActions";

function list(state=[], action){
    switch(action.type){
        case GET_LINES_SUCCESS:
            return action.lines;
        case NEW_LINE_SUCCESS:
            return [action.line, ...state];
        case DELETE_LINE_SUCCESS:
            return  state.filter(r=>{
                return r.id!==action.line;
            });
        case EDIT_LINEA_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!==action.line.id
            });
            return [...newL, action.line];

        default:
            return state;

    }
}

function allData(state={}, action) {
    switch (action.type){
        case GET_LINES_DATA_SUCCESS:
            return action.dataLine;
        default:
            return state;
    }
}

function lineSearch(state={}, action) {
    switch (action.type){
        case GET_LISEARCH_SUCCESS:
            return action.linesS;
        default:
            return state;
    }
}


const blinesReducer = combineReducers({
    list:list,
    allData:allData,
    lineSearch:lineSearch
});


export default blinesReducer;