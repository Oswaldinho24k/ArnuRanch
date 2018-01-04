import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Col, Row} from "antd";
import LeftSide from "./LeftSide";
import Sections from "./Sections";

class AdminPage extends Component {
    state = {};

    render() {
        return (
            <div>
                <Row>
                    <Col span={4}><LeftSide/></Col>
                    <Col span={20}><Sections/></Col>
                </Row>
            </div>
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
