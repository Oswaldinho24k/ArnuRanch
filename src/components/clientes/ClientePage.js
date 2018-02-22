import React, {Component, Fragment} from 'react';
import {Table, Button, message, Popconfirm, Divider, BackTop, Input,Icon} from 'antd';
import ClienteForm from './ClienteForm';
import * as clientesActions from '../../redux/actions/clientesActions';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";

import TablePageB from "./TablePageB";


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



class ClientePage extends Component {
    state = {
            visible: false,
            selectedRowKeys:[],
            on:true,
            data:[],

            filterDropdownVisible: false,
            searchText: '',
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
                this.props.clientesActions.saveCliente(values);
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


    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
        console.log(e.target.value)
    };

    onSearch = () => {
        const { searchText } = this.state;
        console.log(searchText);
        const reg = new RegExp(searchText, 'gi');
        console.log(reg)
        console.log(this.props.clientes)
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: this.props.clientes.map((record) => {
                const match = record.client.match(reg);
                console.log(record)
                if (!match) {
                    return null;
                    console.log(match)
                }
                console.log(record)
                console.log(match)
                return {
                    ...record,
                    client: (
                        <span>
              {record.client.split(reg).map((client, i) => (
                  i > 0 ? [<span style={{color:'red'}} key={i}>{match[0]}</span>, client] : client
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    };

    componentWillMount(){
        this.setState({
            data:this.props.clientes
        });
    }

    resetFilter = () => {
        this.setState({
            data:this.props.clientes,
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
        });
    };




    render() {
        const columns = [
            {
                title: 'Cliente',
                dataIndex: 'client',
                key:'client',
                filterDropdown: (
                    <div style={style.customFilterDropdown}>
                        <Input
                            ref={ele => this.searchInput = ele}
                            placeholder="Buscar cliente"
                            value={this.state.searchText}
                            onChange={this.onInputChange}
                            onPressEnter={this.onSearch}
                            style={style.customFilterDropdownInput}
                        />
                        <Button type="primary" onClick={this.onSearch}><Icon type="search" /></Button>
                    </div>
                ),
                filterIcon: (<Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />
                ),
                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => {
                    this.setState({
                        filterDropdownVisible: visible,
                    }, () => this.searchInput && this.searchInput.focus());
                },
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
                fixed:'right',
                width:100,
                key: 'action',
                render: (text, record) => (
                    <span>
              <Link to={`/admin/clientes/${record.id}`}>Detalle</Link>
            </span>
                ),
            }
        ];

        const { visible, selectedRowKeys, data, filtered } = this.state;
        console.log(filtered)
        const canDelete = selectedRowKeys.length > 0;
        //const filter = data.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {clientes, fetched} = this.props;
        if(!fetched)return(<MainLoader/>);
        console.log(clientes);
        console.log(data);
        return (
            <Fragment>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Clientes
                </div>

                <h1>Clientes</h1>
                <BackTop visibilityHeight={100} />

                {/*<Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={clientes}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    pagination={false}
                    style={{marginBottom:10}}
                    onChange={this.handleChang}
                />*/}

                {filtered?<TablePageB data={data} columns={columns} rowSelection={rowSelection}/>
                :<TablePageB data={clientes} columns={columns} rowSelection={rowSelection}/>
                }





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
                    <Button hidden={!canDelete} type="primary" >Borrar</Button>
                </Popconfirm>

                <Divider type={'vertical'} />

                <Button type="primary" hidden={!filtered} onClick={this.resetFilter}>Borrar filtro</Button>

            </Fragment>
        );
    }
}




function mapStateToProps(state, ownProps) {
    return {
        clientes:state.clientes.list,
        fetched:state.clientes.list!==undefined && state.clientes.list.length>0,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clientesActions:bindActionCreators(clientesActions, dispatch)
    }
}

ClientePage = connect(mapStateToProps,mapDispatchToProps)(ClientePage);
export default ClientePage;