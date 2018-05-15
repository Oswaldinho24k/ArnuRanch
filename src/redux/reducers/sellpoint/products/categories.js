import {combineReducers} from 'redux';
import { GET_CATEGORIES_SUCCESS } from '../../../actions/sellpoint/products/categoriesActions';

function list(state=[], action){
    switch(action.type){
        case GET_CATEGORIES_SUCCESS:
            return action.categories;
        default:
            return state;
    }
}


const categoriesReducer = combineReducers({
    list:list
});

export default categoriesReducer


