import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Button, message, Popconfirm, Divider, BackTop, Icon, Input, Table} from 'antd';
import ProveedorForm from './ProveedorForm';
import * as proveedoresActions from '../../redux/actions/administracion/proveedoresActions';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import MainLoader from "../common/Main Loader";

import TablePageB from "../clientes/TablePageB";

const style={
    customFilterDropdown: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: 'white',
        boxShadow: '0 1px 6px rgba(0, 0, 0, .2)'
    },

    customFilterDropdownInput: {
        width: 130,
        marginRight: 8,
    }
};


class ProovedorPage extends Component {

    state = {
        visible: false,
        selectedRowKeys:[],
        on:true,

        data:[],
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
        canReset:false
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
        const form = this.form;
        form.resetFields();
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
                this.props.proveedoresActions.saveProveedor(values)
                    .then(r=>{
                        message.success('Guardado con éxito');

                        form.resetFields();
                        this.setState({ visible: false });
                    })
                    .catch(r=>{
                        message.error('El RFC ingresado ya existe!')
                        console.log(values)
                    })

            }else{message.error('Algo fallo, verifica los campos');}

        });
    };

    checkRfc = (rule, value, callback) => {
        if (value === undefined) {
            callback('Verifica el RFC ingresado');
        } else {
            if(value.length < 12 ){
                callback('RFC de 12 a 13 dígitos');
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

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
        console.log(e.target.value)
    };

    onSearch = () => {
        //let basePath = 'http://localhost:8000/api/egresos/proveedores/?q=';
        let basePath = 'https://rancho.davidzavala.me/api/egresos/proveedores/?q=';
        let url = basePath+this.state.searchText;
        this.props.proveedoresActions.getProveedores(url);
        this.setState({canReset:true})

    };


    resetFilter = () => {
        //let basePath = 'http://localhost:8000/api/egresos/proveedores/';
        let basePath = 'https://rancho.davidzavala.me/api/egresos/proveedores/?q=';
        this.props.proveedoresActions.getProveedores(basePath)
        this.setState({
            searchText: '',
            canReset: false,
        });
    };

    /*handlePagination=(pagina)=>{
        console.log(this.props.proveedores);
        let basePath = 'http://localhost:8000/api/egresos/proveedores/?page=';
        let newUrl = basePath +pagina;
        this.props.proveedoresActions.getProveedores(newUrl);

    };*/

    handlePagination=(pagina)=>{
        let nextLength = pagina.toString().length;
        let newUrl = this.props.proveedoresData.next;
        if(newUrl===null){
            newUrl = this.props.proveedoresData.previous;
        }

        if( pagina ==1 && this.props.proveedoresData.count <= 20){
            newUrl='https'+newUrl.slice(4,newUrl.length);
        }else{
            newUrl='https'+newUrl.slice(4,newUrl.length-nextLength)+pagina;
        }
        this.props.proveedoresActions.getProveedores(newUrl);
    };

    handleSearch=(e)=>{
        this.setState({searchText:e.target.value})
    };


    render() {

        const columns = [
            {
                title: 'Proveedor',
                dataIndex: 'provider',
                render: (provider,obj) =><Link to={`/admin/proveedores/${obj.id}`}>{ provider && provider !== null ? provider: "No Proveedor"}</Link>,
                key:'provider',
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

        ];

        const { visible, selectedRowKeys, data, filtered, searchText, canReset } = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {proveedores, fetched, proveedoresData} = this.props;
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Proveedores
                </div>

                <h1>Proveedores</h1>

                <div style={{paddingBottom:'1%'}}>
                    <Input.Search
                        enterButton
                        onSearch={this.onSearch}
                        onChange={this.handleSearch}
                        value={searchText}
                        style={{ width: 400 }}
                        placeholder={'Busca por nombre...'}
                    />
                </div>

                <BackTop visibilityHeight={100} />

                <Table
                    dataSource={proveedores}
                    columns={columns}
                    rowSelection={rowSelection}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    style={{marginBottom:10}}
                    pagination={{
                        pageSize: 10,
                        total:proveedoresData.count,
                        onChange:this.handlePagination,
                        showTotal:total => `Total: ${total} Proveedores`
                    }}
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
                    <Button disabled={!canDelete} type="primary" >Eliminar</Button>
                </Popconfirm>

                <Divider type={'vertical'} />

                <Button type="primary" disabled={!canReset} onClick={this.resetFilter}>Borrar filtro</Button>

               </Fragment>
        );
    }
}




function mapStateToProps(state, ownProps) {
    return {
        proveedoresData:state.proveedores.allData,
        proveedores:state.proveedores.list,
        fetched:state.proveedores.list!==undefined && state.proveedores.allData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        proveedoresActions:bindActionCreators(proveedoresActions, dispatch)
    }
}

ProovedorPage = connect(mapStateToProps,mapDispatchToProps)(ProovedorPage);
export default ProovedorPage;