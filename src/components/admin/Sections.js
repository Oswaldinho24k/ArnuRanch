import React from 'react';
import {Route, Switch} from 'react-router-dom';
import IngresosPage from "../ingresos/IngresosPage";
import EgresosPage from "../egresos/EgresosPage";
import AnimalsPage from "../ganado/AnimalsPage";
import DetailAnimalPage from "../ganado/DetailAnimalPage";

const Sections = ({props}) => {
    return (
        <div className={'admin-sections'}>
            <Switch>

            <Route path={'/admin/ingresos'} component={IngresosPage}/>
            <Route path={'/admin/egresos'} component={EgresosPage}/>
            <Route path={'/admin/inventario'} component={IngresosPage}/>
            <Route path={'/admin/clientes'} component={IngresosPage}/>
            <Route path={'/admin/proovedores'} component={IngresosPage}/>

            <Route path={'/admin/animals/detail'} component={DetailAnimalPage}/>
            <Route path={'/admin/animals'} component={AnimalsPage}/>
            <Route path={'/admin/granos'} component={IngresosPage}/>
            </Switch>


        </div>
    )
};

export default Sections;