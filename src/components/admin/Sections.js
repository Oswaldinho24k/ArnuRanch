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

import GastosPage from "../ganado/gastos/GastosPage";
import PesosPage from "../ganado/pesadas/PesosPage";
import ReportesPage from "../ganado/reportes/ReportesPage";

import DetailClientPage from "../clientes/DetailClientPage";
import DetailProviderPage from "../proveedores/DetailProviderPage";



const Sections = ({props}) => {
    return (
        <div className={'admin-sections'}>
            <Switch>

                <Route path={'/admin/ingresos'} component={IngresosPage}/>
                <Route path={'/admin/egresos'} component={EgresosPage}/>
                <Route path={'/admin/inventario'} component={IngresosPage}/>

                <Route path={'/admin/clientes/:i'} component={DetailClientPage} />
                <Route path={'/admin/clientes'} component={ClientesPage}/>

                <Route path={'/admin/proveedores/:p'} component={DetailProviderPage}/>
                <Route path={'/admin/proveedores'} component={ProovedorPage}/>
                {/***************************** Animal ROUTES *****************************/}
                <Route path={'/admin/animals/:key'} component={DetailAnimalPage}/>
                <Route path={'/admin/animals'} component={AnimalsPage}/>
                {/***************************** Corral ROUTES *****************************/}
                <Route path={'/admin/corrales'} component={CorralPage}/>
                {/***************************** BATCH ROUTES *****************************/}
                <Route path='/admin/lotes/:id'  component={BatchDetailPage} />
                <Route path='/admin/lotes'      component={BatchPage}       />

                <Route path={'/admin/gastos'} component={GastosPage}/>

                <Route path={'/admin/pesadas'} component={PesosPage}/>

                <Route path={'/admin/reportes'} component={ReportesPage}/>


            </Switch>


        </div>
    )
};

export default Sections;