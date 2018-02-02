import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Table, Button, Modal, message, Popconfirm} from 'antd';
import ProveedorForm from './ProveedorForm';
import * as proveedoresActions from '../../redux/actions/proveedoresActions';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import MainLoader from "../common/Main Loader";

const columns = [
    {
        title: 'PROVEEDOR',
        dataIndex: 'provider',
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
        fixed:'right',
        width:100,
        render: (text, record) => (
            <span>
              <Link to={`/admin/proveedores/${record.id}`}>Detalle</Link>
            </span>
        ),
    }
];



class ProovedorPage extends Component {

    state = {
        ModalText: <ProveedorForm saveProveedor={this.props.proveedoresActions.saveProveedor}/>,
        visible: false,
        selectedRowKeys:[]
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


    deleteProveedor=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.proveedoresActions.deleteProveedor(keys[i])
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
        this.deleteProveedor();
        message.success('Deleted successfully');
    };

    cancel=(e) =>{
        console.log(e);
    };

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };


    render() {
        const { visible, ModalText, selectedRowKeys } = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {proveedores, fetched} = this.props;
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <h1>Proveedores</h1>

                <Popconfirm title="Are you sure delete this proveedor?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button disabled={!canDelete} type="primary" >Delete</Button>
                </Popconfirm>

                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={proveedores}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                />

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <Modal title="Nuevo Proveedor"
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
        proveedores:state.proveedores.list,
        fetched:state.proveedores.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        proveedoresActions:bindActionCreators(proveedoresActions, dispatch)
    }
}

ProovedorPage = connect(mapStateToProps,mapDispatchToProps)(ProovedorPage);
export default ProovedorPage;