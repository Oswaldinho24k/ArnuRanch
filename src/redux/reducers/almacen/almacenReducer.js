import {combineReducers} from 'redux';
import {
    SAVE_ALMACEN_SUCCESS,
    GET_ALMACENES_SUCCESS
} from "../../actions/almacen/almacenActions";
import {SAVE_ITEMALMACEN_SUCCESS} from "../../actions/items/itemsActions";


function list(state=[], action){
    switch(action.type){
        case SAVE_ALMACEN_SUCCESS:
            return [...state, action.almacen];
        case GET_ALMACENES_SUCCESS:
            return action.almacenes;
        //CASE ITEMSALMACEN

        case SAVE_ITEMALMACEN_SUCCESS:
            let listAlmacen = state.filter(e =>{
                return e.id !== action.item.almacen.id;
            });

            let almacen = state.find(e=> {
                return e.id === action.item.almacen.id;
            });

            almacen.items.push(action.item);

            return [almacen, ...listAlmacen ];

        default:
            return state;
    }
}


const almacenReducer = combineReducers({
    list:list,
});


export default almacenReducer;