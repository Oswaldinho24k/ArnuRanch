import React, {Component, Fragment} from 'react';
import {Table, Button, message, Popconfirm, Divider, BackTop, Input} from 'antd';
import ClienteForm from './ClienteForm';
import * as clientesActions from '../../redux/actions/administracion/clientesActions';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";





class ClientePage extends Component {
    state = {
            visible: false,
            selectedRowKeys:[],
            on:true,
            data:[],

            filterDropdownVisible: false,
            searchText: '',
            canReset:false,
            filtered: false,

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
    saveFormRef = (form) => {
        this.form = form;
    };

    handleCreate = (e) => {
        const form = this.form;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                this.props.clientesActions.saveCliente(values)
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
        let basePath= "http://localhost:8000/api/ingresos/clientes/?q=";
        //let basePath = 'https://rancho.fixter.org/api/ingresos/clientes/?q=';

        let url = basePath+this.state.searchText;
        this.props.clientesActions.getClientes(url);
        this.setState({canReset:true})

    };


    resetFilter = () => {
        let basePath= "http://localhost:8000/api/ingresos/clientes/";
        //let basePath = 'https://rancho.fixter.org/api/ingresos/clientes/';

        this.props.clientesActions.getClientes(basePath);
        this.setState({
            searchText:'',
            canReset:false
        });

    };


    handlePagination=(pagina)=>{
        let nextLength = pagina.toString().length;
        let newUrl = this.props.clientesData.next;
        if(newUrl===null){
            newUrl = this.props.clientesData.previous;
        }

        if( pagina ==1 && this.props.clientesData.count <= 20){
            newUrl='http'+newUrl.slice(4,newUrl.length);
        }else{
            newUrl='http'+newUrl.slice(4,newUrl.length-nextLength)+pagina;
        }
        this.props.clientesActions.getClientes(newUrl);
    };

    handleSearch=(e)=>{
        this.setState({searchText:e.target.value})
    };



    render() {
        const columns = [
            {
                title: 'Cliente',
                dataIndex: 'client',
                render: (client,obj) =><Link to={`/admin/clientes/${obj.id}`}>{ client && client !== null ? client: "No Cliente"}</Link>,
                key:'client',

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
                title: 'Plazo en días',
                dataIndex: 'credit'
            },

        ];

        const { visible, selectedRowKeys, data, filtered, searchText, canReset } = this.state;
        const canDelete = selectedRowKeys.length > 0;
        //const filter = data.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {clientes, fetched, clientesData} = this.props;
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>

                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Clientes
                </div>


                    <h2 style={{margin:0}}>Clientes</h2>
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
                        dataSource={clientes}
                        columns={columns}
                        rowSelection={rowSelection}
                        rowKey={record => record.id}
                        scroll={{x:650}}
                        style={{marginBottom:10}}
                        pagination={{
                            pageSize: 10,
                            total:clientesData.count,
                            onChange:this.handlePagination,
                            showTotal:total => `Total: ${total} Clientes`
                        }}
                    />






                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <ClienteForm
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


                <Divider type={'vertical'} />

                <Popconfirm title="Are you sure delete this cliente?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
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
        clientesData:state.clientes.allData,
        clientes:state.clientes.list,
        fetched:state.clientes.list!==undefined //&& state.clientes.allData !==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clientesActions:bindActionCreators(clientesActions, dispatch)
    }
}

ClientePage = connect(mapStateToProps,mapDispatchToProps)(ClientePage);
export default ClientePage;