import {combineReducers} from 'redux';
import { GET_ORDERS_SUCCESS, SAVE_ORDER_SUCCESS} from '../../../actions/sellpoint/orders/orderActions'

function list(state=[], action){
    switch(action.type){
        case GET_ORDERS_SUCCESS:
            return action.orders;
        case SAVE_ORDER_SUCCESS:
            return [action.order, ...state]
        default:
            return state;
    }
}


const ordersReducer = combineReducers({
    list:list
});

export default ordersReducer


