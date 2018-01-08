import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Table, Row, Col, Card} from "antd";
import {Link} from 'react-router-dom';
import MainCards from "./MainCards";




const columns = [{
    title: 'Compra',
    dataIndex: 'compra',
    render: text => <Link to="#">{text}</Link>,
}, {
    title: 'Monto',
    dataIndex: 'monto',
}, {
    title: 'Cliente',
    dataIndex: 'cliente',
}];
const data = [{
    key: '1',
    compra: '1T2T3G44TY',
    monto: '$27385930',
    cliente: 'New York ',
}, {
    key: '2',
    compra: 'J5HEHH4H4',
    monto: '$27385930',
    cliente: 'London ',
}, {
    key: '3',
    compra: 'JHH4H4H4',
    monto: '$27385930',
    cliente: 'Sidney ',
}, {
    key: '4',
    compra: 'D7D7GJ58',
    monto: '$27385930',
    cliente: 'Sidney ',
}];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    /*getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
    }),*/
};

class IngresosPage extends Component {
    state = {};



    render() {
        return (
            <div>
                <MainCards/>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
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

IngresosPage = connect(mapStateToProps, mapDispatchToProps)(IngresosPage);
export default IngresosPage;
