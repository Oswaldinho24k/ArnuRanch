import React, {Component, Fragment} from 'react';
import {Table, Button, Modal, message, Popconfirm, Input,Icon} from 'antd';
import ClienteForm from './ClienteForm';
import * as clientesActions from '../../redux/actions/clientesActions';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";

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

class ClientePage extends Component {

    state = {
            ModalText: <ClienteForm saveCliente={this.props.clientesActions.saveCliente} />,
            visible: false,
            selectedRowKeys:[],
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

    deleteCliente=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.clientesActions.deleteCliente(keys[i])
                .then(r=>{
                    console.log(r)
                }).catch(e=>{
                console.log(e)
            })
        }
        this.setState({selectedRowKeys:[]})
    };
    confirm=(e)=> {
        console.log(e);
        this.deleteCliente();
        message.success('Deleted successfully');
    };

    cancel=(e) =>{
        console.log(e);
    };

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    //window.location.reload();

    render() {
        const { visible, ModalText, selectedRowKeys } = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {clientes, fetched} = this.props;
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <h1>Clientes</h1>

                <Popconfirm title="Are you sure delete this cliente?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button disabled={!canDelete} type="primary" >Delete</Button>
                </Popconfirm>

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
        fetched:state.clientes.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clientesActions:bindActionCreators(clientesActions, dispatch)
    }
}

ClientePage = connect(mapStateToProps,mapDispatchToProps)(ClientePage);
export default ClientePage;