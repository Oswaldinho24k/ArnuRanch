import React, {Component} from 'react';
import Login from './Login';
import './LogStyles.css';

class LoginContainer extends Component {
    render() {
        return (
            <div className="login">
                <div className="header">
                    <img alt="logo" className="logoP" src="https://cdn.worldvectorlogo.com/logos/slack-1.svg" />
                    <span className="title">Administrador</span>
                </div>
                <div>
                    <Login />
                </div>
                <span className="fixter">Fixter 2018</span>
            </div>
        )
    }
}

export default LoginContainer;