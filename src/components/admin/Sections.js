import React from 'react';
import {Route, Switch} from 'react-router-dom';
import IngresosPage from "../ingresos/IngresosPage";
import EgresosPage from "../egresos/EgresosPage";
import AnimalsPage from "../ganado/animals/AnimalsPage";
import DetailAnimalPage from "../ganado/animals/DetailAnimalPage";
import BatchPage from "../ganado/lotes/BatchPage";
import BatchDetailPage from "../ganado/lotes/BatchDetailPage";
import CorralPage from "../ganado/corrales/CorralPage";
import ProovedorPage from "../proveedores/ProveedorPage";
import ClientesPage from "../clientes/ClientePage"

import ReportesPage from "../ganado/reportes/ReportesPage";

import DetailClientPage from "../clientes/DetailClientPage";
import DetailProviderPage from "../proveedores/DetailProviderPage";
import FormulasPage from "../plantaAlimentos/FormulasPage";
import InsumosPage from "../plantaAlimentos/InsumosPage";
import Dashboard from "./Dashboard";
import DetailIngresoPage from "../ingresos/DetailIngresoPage";
import DetailEgresoPage from "../egresos/DetailEgresoPage";
import CobrarIngreso from "../ingresos/CobrarIngreso";
import PagarEgreso from "../egresos/PagarEgreso";
import CuentasBanco from "../cuentasBanco/CuentasGasto";
import Inventario from "../inventario/Inventario";
import Users from "../users/Users";

import RazasPage from "../ganado/razas/RazasPage";

import Company from "../empresas/Company";
import DetailCompany from "../empresas/DetailCompany";
import VacunasPage from "../vacunas/VacunasPage";
import DetailVacuna from "../vacunas/DetailVacuna";
import InventarioEmpresa from "../empresas/InventarioEmpresa";
import ListaAlmacen from "../empresas/ListaItems";
import ListaAlmacenDetail from "../empresas/ListaAlmacenDetail";
import EventosPage from "../ganado/eventos/EventosPage";
import AnimalsDashboard from "../ganado/dashboard/AnimalsDashboard";
import ProductList from '../sell_point/products/ProductsList';
import LeftSide from './LeftSide';
import ProductForm  from '../sell_point/products/ProductForm';
import CheckoutPage  from '../sell_point/products/CheckoutPage';
import EditForm  from '../sell_point/products/EditForm';
import Blines from "../blines/Blines";
import FacturasPage from "../facturas/FacturasPage";
import FacturaDetalle from "../facturas/FacturaDetalle";
import OrdersPage from '../sell_point/orders/OrdersPage';
import CuentasPage from "../cuentasBanco/Cuentas";
import CuentaDetalle from "../cuentasBanco/CuentaDetalle";
import Compras from "../compras/Compras";
import GastosGanado from "../gastosGanado/GastosGanado";


export const paths = {
    formulas: '/admin/planta_alimentos/formulas',
    insumos: '/admin/planta_alimentos/insumos'
};
const Sections = ({props}) => {
    return (
        <div className={'admin-sections'}>
            <Switch>
                {/***************************** Admin ROUTES *****************************/}
                <Route path={'/admin/estadisticas'} component={Dashboard}/>
                <Route path={'/admin/facturas/:fa'} component={FacturaDetalle}/>
                <Route path={'/admin/facturas'} component={FacturasPage}/>
                <Route path={'/admin/ingresos/blines'} component={Blines} />
                <Route path={'/admin/ingresos/cobrar'} component={CobrarIngreso} />
                <Route path={'/admin/ingresos/:in'} component={DetailIngresoPage} />

                {/*<Route path={'/admin/compras/:in'} component={DetailIngresoPage} />*/}
                <Route path={'/admin/compras/'} component={Compras} />

                <Route path={'/admin/gastos/'} component={GastosGanado}/>

                <Route path={'/admin/ingresos'} component={IngresosPage}/>

                <Route path={'/admin/cuentas/:cu'} component={CuentaDetalle}/>
                <Route path={'/admin/cuentas'} component={CuentasPage}/>
                <Route path={'/admin/usuarios'} component={Users}/>

                <Route path={'/admin/empresas/inventario/:em/:bl/detalle/:k'} component={ListaAlmacenDetail}/>
                <Route path={'/admin/empresas/inventario/:em/:li/:n'} component={ListaAlmacen}/>
                <Route path={'/admin/empresas/inventario/:em'} component={InventarioEmpresa}/>
                <Route path={'/admin/empresas/:em'} component={DetailCompany}/>
                <Route path={'/admin/empresas'} component={Company}/>

                <Route path={'/admin/egresos/pagar'} component={PagarEgreso} />
                <Route path={'/admin/egresos/:eg'} component={DetailEgresoPage}/>
                <Route path={'/admin/egresos'} component={EgresosPage}/>

                <Route path={'/admin/inventario'} component={Inventario}/>

                <Route path={'/admin/clientes/:i'} component={DetailClientPage} />
                <Route path={'/admin/clientes'} component={ClientesPage}/>

                <Route path={'/admin/proveedores/:p'} component={DetailProviderPage}/>
                <Route path={'/admin/proveedores'} component={ProovedorPage}/>
                {/***************************** Ganado ROUTES *****************************/}
                <Route path={'/admin/animals/:key'} component={DetailAnimalPage}/>
                <Route path={'/admin/animals'} component={AnimalsPage}/>
                <Route path={'/admin/corrales'} component={CorralPage}/>
                <Route path='/admin/lotes/:id'  component={BatchDetailPage} />
                <Route path='/admin/lotes' component={BatchPage}/>
                <Route path='/admin/razas' component={RazasPage}/>
                <Route path='/admin/eventos' component={EventosPage}/>
                <Route path='/admin/dash/animals' component={AnimalsDashboard}/>


                <Route path={'/admin/reportes'} component={ReportesPage}/>
                {/* Planta alimentos routes begin*/}
                <Route path={paths.formulas} component={FormulasPage}/>
                <Route path={paths.insumos} component={InsumosPage}/>
                {/* Planta alimentos routes end*/}

                <Route path={'/admin/vacunas/:va'} component={DetailVacuna}/>
                <Route path={'/admin/vacunas'} component={VacunasPage}/>
                {/*************************sell point routes************************/}
                <Route exact path={'/admin/sp'} component={ProductList}/>
                <Route exact path={'/admin/sp/add'} component={ProductForm}/>
                <Route exact path={'/admin/sp/manage/:id'} component={EditForm}/>
                <Route exact path={'/admin/sp/checkout'} component={CheckoutPage}/>
                <Route exact path={'/admin/sp/orders'} component={OrdersPage}/>



            </Switch>


        </div>
    )
};

export default Sections;