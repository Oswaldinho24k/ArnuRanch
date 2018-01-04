import React from 'react';
import {Route, Switch} from 'react-router-dom';
import IngresosPage from "../ingresos/IngresosPage";
import EgresosPage from "../egresos/EgresosPage";

const Sections = ({props}) => {
    return (
        <div>
            <Route path={'/admin/ingresos'} component={IngresosPage}/>
            <Route path={'/admin/egresos'} component={EgresosPage}/>
            <Route path={'/admin/inventario'} component={IngresosPage}/>


        </div>
    )
};

export default Sections;