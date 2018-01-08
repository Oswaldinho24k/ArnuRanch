import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Layout, Menu, Icon } from 'antd';

import LeftSide from "./LeftSide";
import Sections from "./Sections";
import Navbar from "../navbar/Navbar";

const { Header, Sider, Content } = Layout;



class AdminPage extends Component {

    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }


    render() {
        return (
            <Layout className={'leftside'}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" >{!this.state.collapsed?'ADMINSITE':'ADMIN'}</div>
                    <LeftSide/>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Navbar
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
    return {
        state: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //actions: bindActionCreators(actions, dispatch)
    }
}

AdminPage = connect(mapStateToProps, mapDispatchToProps)(AdminPage);
export default AdminPage;
