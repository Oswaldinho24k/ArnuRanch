import {combineReducers} from 'redux';
import {GET_ANIMALS_SUCCESS, SAVE_ANIMAL_SUCCESS} from "../actions/animalsActions";


function list(state=[], action){
    console.log(action)
    switch(action.type){
        case GET_ANIMALS_SUCCESS:
            return action.animals;
        case SAVE_ANIMAL_SUCCESS:
            return [...state, action.animal];
        default:
            return state;
    }
}


const animalsReducer = combineReducers({
    list:list,
});

export default animalsReducer