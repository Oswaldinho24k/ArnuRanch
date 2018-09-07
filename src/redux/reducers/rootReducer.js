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

import facturasReducer from "./facturas/facturasReducer";
import cuentasReducer from "./cuentas/cuentasReducer";
import comprasReducer from "./compras/comprasReducer";
import gastosGanadoReducer from "./gastoGanado/gastoGanadoReducer";

import saleNotesReducer from './ganado/salenotesReducer';

import dataDashReducer from "./dashGanado/dashGanadoReducer";

import fierrosOReducer from './ganado/fierroOReducer'
import fierrosNReducer from './ganado/fierroNReducer'

/*--------Catalogos-------*/
import catProductosReducer from "././catalogos/catProductosReducer"
import unidadmedidaReducer from "./catalogos/unidadmedidaReducer";
import usoscfdiReducer from "./catalogos/usoscfdiReducer";
import formadepagoReducer from "./catalogos/formadepagoReducer";
import cuentasbancariasReducer from './catalogos/cuentasbancariasReducer'
import almacenesReducer from "./catalogos/almacenesReducer";
import presupuestosReducer from "./catalogos/presupuestosReducer";
import acreedoresReducer from "./creditos/acreedoresReducer";
import disposicionessReducer from "./creditos/disposicionesReducer";




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
    
    facturas:facturasReducer,
    
    cuentas:cuentasReducer,
    compras:comprasReducer,
    gastosGanado:gastosGanadoReducer,

    saleNotes:saleNotesReducer,

    dataDash:dataDashReducer,
    //Catalogos,
    catProducts:catProductosReducer,
    catUnidad:unidadmedidaReducer,
    catCfdis:usoscfdiReducer,
    catPago:formadepagoReducer,
    catBank:cuentasbancariasReducer,
    catAlmacenes:almacenesReducer,
    catPresupuesto:presupuestosReducer,

    fierrosO:fierrosOReducer,
    fierrosN:fierrosNReducer,

    acreedores:acreedoresReducer,
    disposiciones:disposicionessReducer,


});

export default rootReducer