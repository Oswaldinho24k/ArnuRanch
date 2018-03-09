import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Button, message, Popconfirm, Divider, BackTop, Icon, Input} from 'antd';
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
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: this.props.proveedores.map((record) => {
                const match = record.provider.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    provider: (
                        <span>
              {record.provider.split(reg).map((provider, i) => (
                  i > 0 ? [<span style={{color:'red'}} key={i}>{match[0]}</span>, provider] : provider
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    };

    componentWillMount(){
        this.setState({
            data:this.props.proveedores
        });
    }

    resetFilter = () => {
        this.setState({
            data:this.props.proveedores,
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
        });
    };


    render() {

        const columns = [
            {
                title: 'Proveedor',
                dataIndex: 'provider',
                key:'provider',
                filterDropdown: (
                    <div style={style.customFilterDropdown}>
                        <Input
                            ref={ele => this.searchInput = ele}
                            placeholder="Buscar proveedor"
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

        const { visible, selectedRowKeys, data, filtered } = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {proveedores, fetched} = this.props;
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Proveedores
                </div>

                <h1>Proveedores</h1>
                <BackTop visibilityHeight={100} />

                {filtered?<TablePageB data={data} columns={columns} rowSelection={rowSelection}/>
                    :<TablePageB data={proveedores} columns={columns} rowSelection={rowSelection}/>
                }

               {/* <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={proveedores}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    pagination={false}
                    style={{marginBottom:10}}
                />*/}

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
                    <Button hidden={!canDelete} type="primary" >Delete</Button>
                </Popconfirm>

                <Divider type={'vertical'} />

                <Button type="primary" hidden={!filtered} onClick={this.resetFilter}>Borrar filtro</Button>

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