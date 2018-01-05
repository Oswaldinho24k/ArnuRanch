import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AdminPage from './components/admin/AdminPage'
import LoginContainer from './components/login/LoginContainer'

export const Routes =()=>(

    <Switch>
        <Route path='/admin' component={AdminPage}/>
        <Route path='/login' component={LoginContainer} />
    </Switch>
);