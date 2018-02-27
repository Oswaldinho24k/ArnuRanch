import {combineReducers} from 'redux';
import animalsReducer from "./animalsReducer";
import userReducer from './userReducer';
import lotesReducer from "./lotesReducer";
import corralesReducer from './corralesReducer';
import proveedoresReducer from "./proveedoresReducer";
import clientesReducer from "./clientesReducer";
import pesadasReducer from "./pesadasReducer";
import ingresosReducer from "./ingresosReducer";

import formulasReducer from "./plantaAlimentos/formulasReducer";
import insumosReducer from "./plantaAlimentos/insumosReducer";

import egresosReducer from "./egresosReducer";
import empresasReducer from "./empresasReducer";
import vacunasReducer from "./vacunasReducer";



const rootReducer = combineReducers({
    animals:animalsReducer,
    user:userReducer,
    lotes:lotesReducer,
    corrales:corralesReducer,
    proveedores: proveedoresReducer,
    clientes: clientesReducer,
    pesadas:pesadasReducer,
    ingresos:ingresosReducer,

    formulas:formulasReducer,
    insumos:insumosReducer,

    egresos:egresosReducer,

    empresas:empresasReducer,
    vacunas: vacunasReducer,

});

export default rootReducer