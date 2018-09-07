import React, {Component} from 'react';
import Login from './Login';
import './LogStyles.css';
import * as userActions from '../../redux/actions/userActions';
import {message} from 'antd';
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

    };

    logIn=(data)=>{
        this.props.userActions.logIn(data)
            .then(r=>{
                console.log('eluser', r)
                this.props.history.push('/');
                message.success('Welcome')
            }).catch(e=>{
            for (let i in e.response.data){
                message.error(e.response.data[i])
            }
        })
    };

    render() {
        let {data} = this.state;
        return (
            <div className="login">
                <div className="header">
                    <img alt="logo" className="logoP" src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" />
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

