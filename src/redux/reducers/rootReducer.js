import {combineReducers} from 'redux';
import animalsReducer from "./animalsReducer";
import userReducer from './userReducer';
import lotesReducer from "./lotesReducer";
import corralesReducer from './corralesReducer';


const rootReducer = combineReducers({
    animals:animalsReducer,
    user:userReducer,
    lotes:lotesReducer,
    corrales:corralesReducer
});

export default rootReducer