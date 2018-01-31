import {combineReducers} from 'redux';
import animalsReducer from "./animalsReducer";
import userReducer from './userReducer';
import lotesReducer from "./lotesReducer";
import corralesReducer from './corralesReducer';
import proveedoresReducer from "./proveedoresReducer";
import clientesReducer from "./clientesReducer";
import pesadasReducer from "./pesadasReducer";
import ingresosReducer from "./ingresosReducer";
import egresosReducer from "./egresosReducer";


const rootReducer = combineReducers({
    animals:animalsReducer,
    user:userReducer,
    lotes:lotesReducer,
    corrales:corralesReducer,
    proveedores: proveedoresReducer,
    clientes: clientesReducer,
    pesadas:pesadasReducer,
    ingresos:ingresosReducer,
    egresos:egresosReducer,
});

export default rootReducer