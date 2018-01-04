import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AdminPage from './components/admin/AdminPage'

export const Routes =()=>(

    <Switch>
        <Route path='/admin' component={AdminPage}/>
    </Switch>
);