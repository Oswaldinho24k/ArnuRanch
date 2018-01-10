import {combineReducers} from 'redux';
import animalsReducer from "./animalsReducer";
import userReducer from './userReducer';


const rootReducer = combineReducers({
    animals:animalsReducer,
    user:userReducer
});

export default rootReducer