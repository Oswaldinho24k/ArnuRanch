import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Table, Button, Modal, Switch} from "antd";
import MainLoader from "../common/Main Loader";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as egresosActions from '../../redux/actions/egresosActions';
import FormEgreso from "./EgresoForm";


const columns = [
    {
        title: 'Proveedor',
        dataIndex: 'provider',
    },
    {
        title: 'Linea de negocio',
        dataIndex: 'business_line',
    },
    {
        title: 'No. Factura',
        dataIndex: 'no_check',
        render:no_check=> <span>{no_check?<span>{no_check}</span>:'No hay factura'}</span>
    },
    {
        title: 'ACTIONS',
        dataIndex: 'id',
        render: id => <Link to={`/admin/egresos/${id}`} >Detalle</Link>,
        fixed:'right',
        width:100
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};



class EgresosPage extends Component {
    state = {
       ModalText: <FormEgreso proveedores={this.props.proveedores} saveEgreso={this.props.egresosActions.saveEgreso} />,
        visible: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };


    render() {
        const { visible, ModalText } = this.state;
        let {egresos, fetched} = this.props;
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <h1>Egresos DEMO-Page</h1>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={egresos}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                />

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <Modal title="Nuevo Egreso"
                       visible={visible}
                       onCancel={this.handleCancel}
                       width={'30%'}
                       maskClosable={true}
                       footer={[
                           null,
                           null,
                       ]}
                >
                    {ModalText}
                </Modal>
            </Fragment>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        egresos: state.egresos.list,
        fetched: state.egresos.list !==undefined,
        proveedores: state.proveedores.list,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        egresosActions: bindActionCreators(egresosActions, dispatch)
    }
}

EgresosPage = connect(mapStateToProps, mapDispatchToProps)(EgresosPage);
export default EgresosPage;
