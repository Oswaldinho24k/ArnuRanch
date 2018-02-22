import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Table, Button, Switch, message, Popconfirm, Tag, Divider, Select, Input, Icon, BackTop} from "antd";
import MainLoader from "../common/Main Loader";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

import * as egresosActions from '../../redux/actions/egresosActions';
import FormEgreso from "./EgresoForm";

import TablePageB from "../clientes/TablePageB";


const Option = Select.Option;

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

const opciones = [{
    name :'Cerdos',
    id: 1
},
    {
        name:'Ganado',
        id:2
    },
    {
        name:'Granos',
        id:3
    },
    {
        name:'Planta de alimentos',
        id:4
    },
    {
        name:'Campo',
        id:5
    },

];

const type = [{
    name :'Gasto',
    id: 1
},
    {
        name:'Costo',
        id:2
    },

];

class EgresosPage extends Component {
    state = {
        visible: false,
        selectedRowKeys:[],
        factura:false,
        contacto_directo:true,

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

    deleteEgreso=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.egresosActions.deleteEgreso(keys[i])
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
        this.deleteEgreso();
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
                this.props.egresosActions.saveEgreso(values);
                message.success('Guardado con éxito');

                form.resetFields();
                this.setState({ visible: false });
            }else{message.error('Algo fallo, verifica los campos');}

        });
    };

    handleChange = e => {
        this.setState({
            factura: e.target.checked
        })
    };

    handleChangeD = e => {
        this.setState({
            contacto_directo:e.target.checked
        })
    };

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });

    };

    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: this.props.egresos.map((record) => {
                const match = record.provider.provider.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    provider: (
                        <span >
              {record.provider.provider.split(reg).map((provider, i) => (
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
            data:this.props.egresos
        });
    }

    resetFilter = () => {
        this.setState({
            data:this.props.egresos,
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
        });
    };



    render() {

        const columns = [
            {
                title: 'Razón Social',
                dataIndex: 'provider',
                render: provider => provider && provider !== null ? provider.provider || provider: "No Proveedor",


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
                title: 'Linea de negocio',
                dataIndex: 'business_line',
            },
            {
                title: 'No. Factura',
                dataIndex: 'no_check',
                render:no_check=> <span>{no_check && no_check !==null ?<span>{no_check}</span>:'No hay factura'}</span>
            },
            {
                title: 'Status',
                dataIndex:'paid',
                render:paid=><span>{paid?<Tag color="#87d068" style={{width:70, textAlign:'center'}} >Pagado</Tag>:<Tag color="#f50" style={{width:70, textAlign:'center'}}>Por Pagar</Tag>}</span>
            },
            {
                title: 'Registro',
                dataIndex: 'created',
                render: created => moment(created).startOf(3, 'days').calendar()

            },
            {
                title: 'Actions',
                dataIndex: 'id',
                render: id => <Link to={`/admin/egresos/${id}`} >Detalle</Link>,
                fixed:'right',
                width:100
            },
        ];


        const { visible, selectedRowKeys, data, filtered } = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {egresos, fetched} = this.props;
        let options = opciones.map((a) => <Option key={a.name}>{a.name}</Option>);
        //let type = type.map((a) => <Option key={a.name}>{a.name}</Option>);
        let tipo = type.map((a)=><Option key={a.name}>{a.name}</Option>);
        let options_proveedores = this.props.proveedores.map((a) => <Option value={parseInt(a.id)} key={a.id}>{a.provider}</Option>);
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Egresos
                </div>
                <h1>Egresos Page</h1>

                <BackTop visibilityHeight={100} />

                {/*<Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={egresos}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    pagination={false}
                    style={{marginBottom:10}}
                />*/}

                {filtered?<TablePageB data={data} columns={columns} rowSelection={rowSelection}/>
                    :<TablePageB data={egresos} columns={columns} rowSelection={rowSelection}/>
                }

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <FormEgreso
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    options_proveedores={options_proveedores}
                    options={options}
                    type={tipo}
                    handleChange={this.handleChange}
                    handleChangeD={this.handleChangeD}
                    contacto={this.state.contacto_directo}
                    factura = {this.state.factura}


                />

                <Divider
                    type={'vertical'}/>

                <Popconfirm title="Are you sure delete this egreso?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
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
