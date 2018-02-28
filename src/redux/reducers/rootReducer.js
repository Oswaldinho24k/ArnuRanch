import {combineReducers} from 'redux';
import animalsReducer from "./ganado/animalsReducer";
import userReducer from './userReducer';
import lotesReducer from "./ganado/lotesReducer";
import corralesReducer from './ganado/corralesReducer';
import proveedoresReducer from "./administracion/proveedoresReducer";
import clientesReducer from "./administracion/clientesReducer";
import pesadasReducer from "./ganado/pesadasReducer";
import ingresosReducer from "./administracion/ingresosReducer";
import formulasReducer from "./plantaAlimentos/formulasReducer";
import insumosReducer from "./plantaAlimentos/insumosReducer";
<<<<<<< HEAD
import egresosReducer from "./administracion/egresosReducer";
import usersReducer from "./usersReducer";
import razasReducer from "./ganado/razasReducer";
=======

import egresosReducer from "./egresosReducer";
import empresasReducer from "./empresasReducer";
import vacunasReducer from "./vacunasReducer";
import itemsReducer from "./plantaAlimentos/itemsReducer";
>>>>>>> fee88d5bf44b82701bf4347f032a16ee34152e78



const rootReducer = combineReducers({
    animals:animalsReducer,
    user:userReducer,
    lotes:lotesReducer,
    corrales:corralesReducer,
    proveedores: proveedoresReducer,
    clientes: clientesReducer,
    pesadas:pesadasReducer,
    ingresos:ingresosReducer,
    users:usersReducer,
    formulas:formulasReducer,
    insumos:insumosReducer,
<<<<<<< HEAD
    razas:razasReducer,
=======
    items: itemsReducer,

>>>>>>> fee88d5bf44b82701bf4347f032a16ee34152e78
    egresos:egresosReducer,
    empresas:empresasReducer,
    vacunas: vacunasReducer,

});

export default rootReducer