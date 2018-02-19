import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Layout, Menu, Icon , message} from 'antd';

import LeftSide from "./LeftSide";
import Sections from "./Sections";
import Navbar from "../navbar/Navbar";
import * as userActions from '../../redux/actions/userActions';
import MainLoader from "../common/Main Loader";

const { Header, Sider, Content } = Layout;



class AdminPage extends Component {

    state = {
        collapsed: false,
        user:{}
    };

    componentWillMount(){
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        if(!userToken){
            this.props.history.push('/login');
            this.setState({user:this.props.user})
        }
    }


    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    logOut = () => {
        this.props.userActions.logOut();
        message.info('Vuelve Pronto ;)');
        this.props.history.push('/login');
    };


    render() {
        let {user, fetched} = this.props;
        console.log(this.props);
        if(!fetched)return(<MainLoader/>);
        return (
            <Layout className={'leftside'}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" >{!this.state.collapsed?'RANCHOADMIN':'RADMIN'}</div>
                    <LeftSide/>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Navbar
                            {...user}
                            logOut={this.logOut}
                            collapsed={this.state.collapsed}
                            toggle={this.toggle}/>
                    </Header>
                    <Content style={{ margin: '1%', padding: '1%', background: '#f0f2f5', minHeight: '90vh' }}>
                        <Sections/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}


function mapStateToProps(state, ownProps) {
    console.log(state)
    return {
        user: state.user.object,
        fetched:state.user.object!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}

AdminPage = connect(mapStateToProps, mapDispatchToProps)(AdminPage);
export default AdminPage;
