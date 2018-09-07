import {combineReducers} from 'redux';
import {
    EDIT_ANIMAL_SUCCESS, GET_ANIMALS_SUCCESS, SAVE_ANIMAL_SUCCESS, DELETE_ANIMAL_SUCCESS, GET_ANIMALS_DATA_SUCCESS,
    GET_SINGLE_ANIMAL_SUCCESS, GET_ANSEARCH_SUCCESS, GET_REPORTE_SUCCESS
} from "../../actions/ganado/animalsActions";
import {SAVE_ANIMAL_GASTO_SUCCESS} from '../../actions/ganado/gastoAnimalActions';
import {SAVE_PESADA_SUCCESS} from "../../actions/ganado/pesadasActions";

function object(state={}, action){
    switch(action.type){
        case GET_SINGLE_ANIMAL_SUCCESS:
            return action.animal;
        case EDIT_ANIMAL_SUCCESS:
            return action.animal;
        default:
            return state;
    }
}


function list(state=[], action){
    switch(action.type){
        case GET_ANIMALS_SUCCESS:
            return action.animals;
        case SAVE_ANIMAL_SUCCESS:
            return [action.animal, ...state];
        case EDIT_ANIMAL_SUCCESS:
            console.log(action.animal)
            let newList = state.filter(a=>{
                return a.id!=action.animal.id
            });
            
            return [action.animal, ...newList];
        case SAVE_ANIMAL_GASTO_SUCCESS:
            let animalId = action.gasto.animal;
            let animal = state.find(a=>{return a.id==animalId});        
            animal['aliments'] = [...animal.aliments, action.gasto];
            

            return [...state];
        case SAVE_PESADA_SUCCESS:
            animalId = action.pesada.animal;
            animal = state.filter(a=>{return a.id==animalId});            
            animal = animal[0];
            animal['pesadas'] = [...animal.pesadas, action.pesada];
            return [...state];
        case DELETE_ANIMAL_SUCCESS:
            let acualList = state.filter(a=>{
                return a.id!=action.animalId;
            });
            return acualList;
        default:
            return state;
    }
}


function allData(state={}, action){
    switch(action.type){
        case GET_ANIMALS_DATA_SUCCESS:
            return action.data;
        default:
            return state;
    }
}

function report(state={}, action){
    switch(action.type){
        case GET_REPORTE_SUCCESS:
            return action.report
        default:
            return state
    }
}

function animalSearch(state={}, action) {
    switch (action.type){
        case GET_ANSEARCH_SUCCESS:
            return action.animalS;
        default:
            return state;
    }
}


const animalsReducer = combineReducers({
    list:list,
    allData:allData,
    object:object,
    animalSearch:animalSearch,
    report:report,

});

export default animalsReducer