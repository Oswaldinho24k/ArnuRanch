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

import egresosReducer from "./administracion/egresosReducer";
import usersReducer from "./administracion/usersReducer";
import razasReducer from "./ganado/razasReducer";

import empresasReducer from "./administracion/empresasReducer";
import vacunasReducer from "./vacunasReducer";
import itemsReducer from "./plantaAlimentos/itemsReducer";
import blinesReducer from "./administracion/blinesReducer";
import almacenReducer from "./almacen/almacenReducer";
import productsReducer from './sellpoint/products/productsReducer'
import ordersReducer from './sellpoint/orders/ordersReducer'
import categoriesReducer from './sellpoint/products/categories'
import facturasReducer from "./facturas/facturasReducer";
import cuentasReducer from "./cuentas/cuentasReducer";
import comprasReducer from "./compras/comprasReducer";
import gastosGanadoReducer from "./gastoGanado/gastoGanadoReducer";
import dataDashReducer from "./dashGanado/dashGanadoReducer";




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
    razas:razasReducer,
    items: itemsReducer,
    egresos:egresosReducer,
    empresas:empresasReducer,
    vacunas: vacunasReducer,
    blines:blinesReducer,
    almacen:almacenReducer,
    //sellpoint
    products:productsReducer,
    categories:categoriesReducer,
    facturas:facturasReducer,
    orders:ordersReducer,
    cuentas:cuentasReducer,
    compras:comprasReducer,
    gastosGanado:gastosGanadoReducer,
    dataDash:dataDashReducer,


});

export default rootReducer