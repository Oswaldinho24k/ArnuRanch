import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Table, Button, Modal} from "antd";
import {Link} from 'react-router-dom';
import MainCards from "./MainCards";
import MainLoader from "../common/Main Loader";
import * as ingresosActions from '../../redux/actions/ingresosActions';
import FormIngreso from "./IngresoForm";


const columns = [
    {
        title: 'Cliente',
        dataIndex: 'client',
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
        render: id => <Link to={`/admin/ingresos/${id}`} >Detalle</Link>,
        fixed:'right',
        width:100
    },
];


const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};


class IngresosPage extends Component {
    state = {
        ModalText: <FormIngreso clientes={this.props.clientes} saveIngreso={this.props.ingresosActions.saveIngreso} />,
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
        let {ingresos, fetched} = this.props;
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <h1>Ingresos Page</h1>
                <MainCards/>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={ingresos}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                />

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <Modal title="Nuevo Ingreso"
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
        ingresos:state.ingresos.list,
        fetched: state.ingresos.list !== undefined,
        clientes:state.clientes.list,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ingresosActions: bindActionCreators(ingresosActions, dispatch)
    }
}

IngresosPage = connect(mapStateToProps, mapDispatchToProps)(IngresosPage);
export default IngresosPage;
