import {combineReducers} from 'redux';
import {GET_ANIMALS_SUCCESS, SAVE_ANIMAL_SUCCESS} from "../actions/animalsActions";
import {SAVE_ANIMAL_GASTO_SUCCESS} from '../actions/gastoAnimalActions';


function list(state=[], action){
    switch(action.type){
        case GET_ANIMALS_SUCCESS:
            return action.animals;
        case SAVE_ANIMAL_SUCCESS:
            return [...state, action.animal];
        case SAVE_ANIMAL_GASTO_SUCCESS:
            let animalId = action.gasto.animal;
            let animal = state.filter(a=>{return a.id==animalId});
            console.log(animal[0]);
            animal = animal[0];
            animal['aliments'] = [...animal.aliments, action.gasto];
            console.log(animal);

            return [...state];
        default:
            return state;
    }
}


const animalsReducer = combineReducers({
    list:list,
});

export default animalsReducer