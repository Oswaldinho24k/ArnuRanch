import React, {Component, Fragment} from 'react';
import {Table, Button, Modal} from 'antd';
import ClienteForm from './ClienteForm';
import * as clientesActions from '../../redux/actions/clientesActions';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Link} from 'react-router-dom';

const columns = [
    {
        title: 'CLIENTE',
        dataIndex: 'client',
    },
    {
        title: 'DIRECCIÓN',
        dataIndex: 'address',
    },
    {
        title: 'E-MAIL',
        dataIndex: 'email'
    },
    {
        title: 'ACTIONS',
        key: 'action',
        render: (text, record) => (
            <span>
              <Link to={`/admin/clientes/${record.id}`}>Detalle</Link>
            </span>
        ),
    }
];



const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};

class ClientePage extends Component {

    state = {
        ModalText: <ClienteForm saveCliente={this.props.clientesActions.saveCliente} />,
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
        let {clientes} = this.props;
        return (
            <Fragment>
                <h1>Clientes</h1>

                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={clientes}
                    rowKey={record => record.id}
                />

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <Modal title="Nuevo Cliente"
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
        clientes:state.clientes.list,
        //fetched:state.clientes.list!==undefined &&state.clientes.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clientesActions:bindActionCreators(clientesActions, dispatch)
    }
}

ClientePage = connect(mapStateToProps,mapDispatchToProps)(ClientePage);
export default ClientePage;