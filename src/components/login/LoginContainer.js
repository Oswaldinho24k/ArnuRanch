import React, {Component} from 'react';
import Login from './Login';
import './LogStyles.css';
import * as userActions from '../../redux/actions/userActions';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class LoginContainer extends Component {

    state={
      data:{}
    };

    handleText=(e)=>{
         let data = this.state.data;
         let field = e.target.name;
         data[field] = e.target.value;
         this.setState({data});
         console.log(data)
    };

    logIn=(data)=>{
        this.props.userActions.logIn(data)
            .then(r=>{
                console.log(r)
            }).catch(e=>{
                console.log(e)
        })
    };
    render() {
        let {data} = this.state;
        return (
            <div className="login">
                <div className="header">
                    <img alt="logo" className="logoP" src="https://cdn.worldvectorlogo.com/logos/slack-1.svg" />
                    <span className="title">Administrador</span>
                </div>
                <div>
                    <Login
                    data={data}
                    logIn={this.logIn}
                    handleText={this.handleText}/>
                </div>
                <span className="fixter">Fixter 2018</span>
            </div>
        )
    }
}
function mapStateToProps(state, ownProps) {
    return {
        state: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //
        userActions: bindActionCreators(userActions, dispatch)
    }
}

LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
export default LoginContainer;

