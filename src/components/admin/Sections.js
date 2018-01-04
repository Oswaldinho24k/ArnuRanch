import React from 'react';
import {Route, Switch} from 'react-router-dom';
import IngresosPage from "../ingresos/IngresosPage";

const Sections = ({props}) => {
    return (
        <Switch>
            <Route path={"/ingresos"} component={IngresosPage}/>
        </Switch>
    )
};

export default Sections;