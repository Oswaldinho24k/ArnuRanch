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


const Sections = ({props}) => {
    return (
        <div className={'admin-sections'}>
            <Switch>

                <Route path={'/admin/ingresos'} component={IngresosPage}/>
                <Route path={'/admin/egresos'} component={EgresosPage}/>
                <Route path={'/admin/inventario'} component={IngresosPage}/>
                <Route path={'/admin/clientes'} component={IngresosPage}/>

                <Route path={'/admin/proveedores'} component={ProovedorPage}/>

                <Route path={'/admin/animals/:key'} component={DetailAnimalPage}/>
                <Route path={'/admin/animals'} component={AnimalsPage}/>

                <Route path={'/admin/corrales'} component={CorralPage}/>

                {/***************************** BATCH ROUTES *****************************/}
                <Route path='/admin/lotes/:id'  component={BatchDetailPage} />
                <Route path='/admin/lotes'      component={BatchPage}       />

            </Switch>


        </div>
    )
};

export default Sections;