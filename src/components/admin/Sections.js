import React from 'react';
import {Route, Switch} from 'react-router-dom';
import IngresosPage from "../ingresos/IngresosPage";
import EgresosPage from "../egresos/EgresosPage";
import AnimalsPage from "../ganado/animals/AnimalsPage";
import DetailAnimalPage from "../ganado/animals/DetailAnimalPage";
import BatchPage from "../ganado/lotes/BatchPage";
import BatchDetailPage from "../ganado/lotes/BatchDetailPage";
import Form from "../ganado/lotes/BatchForm";

const Sections = ({props}) => {
    return (
        <div className={'admin-sections'}>
            <Switch>

                <Route path={'/admin/ingresos'} component={IngresosPage}/>
                <Route path={'/admin/egresos'} component={EgresosPage}/>
                <Route path={'/admin/inventario'} component={IngresosPage}/>
                <Route path={'/admin/clientes'} component={IngresosPage}/>
                <Route path={'/admin/proovedores'} component={IngresosPage}/>

                <Route path={'/admin/animals/:key'} component={DetailAnimalPage}/>
                <Route path={'/admin/animals'} component={AnimalsPage}/>
                <Route path={'/admin/granos'} component={Form}/>

                {/***************************** BATCH ROUTES *****************************/}
                <Route path='/admin/batch/:id'  component={BatchDetailPage} />
                <Route path='/admin/batch'      component={BatchPage}       />

            </Switch>


        </div>
    )
};

export default Sections;