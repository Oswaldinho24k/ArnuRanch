import {combineReducers} from 'redux';
import {GET_ITEMS_SUCCESS, SAVE_ITEM_SUCCESS, EDIT_ITEM_SUCCESS, DELETE_ITEM_SUCCESS} from "../../actions/plantaAlimentos/itemsActions";


const list = (state=[], action) => {
    switch(action.type){
        case GET_ITEMS_SUCCESS:
            return action.items;
        case SAVE_ITEM_SUCCESS:
            return [...state, action.item];
        case EDIT_ITEM_SUCCESS:
            return [ ...state.map ( item => {
                if (item.id === action.item.id) {
                    return action.item;
                }
                return item;
            })];
        case DELETE_ITEM_SUCCESS:
            return [ ...state.filter( item => item.id !== action.itemId)];
        default:
            return state;
    }
};

const itemsReducer = combineReducers({
    list:list,
});

export default itemsReducer;