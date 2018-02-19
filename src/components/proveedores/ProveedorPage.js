import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Table, Button, Modal, message, Popconfirm, Divider} from 'antd';
import ProveedorForm from './ProveedorForm';
import * as proveedoresActions from '../../redux/actions/proveedoresActions';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import MainLoader from "../common/Main Loader";

const columns = [
    {
        title: 'Proveedor',
        dataIndex: 'provider',
    },
    {
        title: 'Dirección',
        dataIndex: 'address',
    },
    {
      title: 'E-mail',
        dataIndex: 'email'
    },
    {
        title: 'RFC',
        dataIndex: 'rfc'
    },
    {
        title: 'Actions',
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
        visible: false,
        selectedRowKeys:[],
        on:true,
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

    saveFormRef = (form) => {
        this.form = form;
    };

    handleCreate = (e) => {
        const form = this.form;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                this.props.proveedoresActions.saveProveedor(values);
                message.success('Guardado con éxito');

                form.resetFields();
                this.setState({ visible: false });
            }else{message.error('Algo fallo, verifica los campos');}

        });
    };

    checkRfc = (rule, value, callback) => {
        if (value === undefined) {
            callback('Verifica el RFC ingresado');
        } else {
            if(value.length < 13){
                callback('Recuerda que son trece dígitos');
            }
            callback()
        }
    };

    checkPhone = (rule, value, callback) => {
        if (value === undefined) {
            callback('El número ingresa debe contener 10 dígitos.');
        } else {
            if(value.length < 10){
                callback('Ingresa un número de 10 dígitos');
            }
            callback()
        }
    };

    handleChange = e => {
        this.setState({
            contacto_directo: e.target.checked
        })
    };

    handleChangeOn = ()=>{
        this.setState({
            on: !this.state.on
        })
    };


    render() {
        const { visible, selectedRowKeys } = this.state;
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

                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={proveedores}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    pagination={false}
                    style={{marginBottom:10}}
                />

                <Button type="primary" onClick={this.showModal}>Agregar</Button>

                <ProveedorForm
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    rfc={this.checkRfc}
                    phone={this.checkPhone}
                    handleChange={this.handleChange}
                    on = {this.state.on}
                    handleChangeOn={this.handleChangeOn}

                />

                <Divider
                    type={'vertical'}/>

                <Popconfirm title="Are you sure delete this proveedor?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button disabled={!canDelete} type="primary" >Delete</Button>
                </Popconfirm>

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