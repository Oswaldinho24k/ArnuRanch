import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Table, Button, message, Popconfirm, Tag, Divider, Select, BackTop, Input} from "antd";
import MainLoader from "../common/Main Loader";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

import * as egresosActions from '../../redux/actions/administracion/egresosActions';
import FormEgreso from "./EgresoForm";

import * as linesActions from '../../redux/actions/blines/blinesActions';
import * as proveedoresActions from '../../redux/actions/administracion/proveedoresActions';
import * as comprasActions from '../../redux/actions/compras/comprasActions';
import * as empresasActions from '../../redux/actions/empresasActions';


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
        canReset:false,
        filtered: false,
        linea:"",
        compra:true,
        idCompra:null,
        idProvider:null,
        idLineE:null,
        idCompany:null
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    componentWillMount(){
        this.props.egresosActions.getEgresos();
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
        const form = this.form;
        form.resetFields();
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
                values['provider_egreso_id']=this.state.idProvider;
                values['compra_egreso_id']=this.state.idCompra;
                values['business_egreso_id']=this.state.idLineE;
                values['empresa_id']=this.state.idCompany;
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


    onSearch = () => {
        //let basePath= "http://localhost:8000/api/egresos/egresos/?q=";
        let basePath = 'https://rancho.davidzavala.me/api/egresos/egresos/?q=';

        let url = basePath+this.state.searchText;
        this.props.egresosActions.getEgresos(url);
        this.setState({canReset:true})

    };

    resetFilter = () => {
        //let basePath= "http://localhost:8000/api/egresos/egresos/";
        let basePath = 'https://rancho.davidzavala.me/api/egresos/egresos/';

        this.props.egresosActions.getEgresos(basePath);
        this.setState({
            searchText:'',
            canReset:false
        });

    };

    handlePagination=(pagina)=>{
        let nextLength = pagina.toString().length;
        let newUrl = this.props.egresosData.next;
        if(newUrl===null){
            newUrl = this.props.egresosData.previous;
        }

        if( pagina ==1 && this.props.egresosData.count <= 20){
            newUrl='http'+newUrl.slice(4,newUrl.length);
        }else{
            newUrl='http'+newUrl.slice(4,newUrl.length-nextLength)+pagina;
        }
        this.props.egresosActions.getEgresos(newUrl);
    };


    handleSearch=(e)=>{
        this.setState({searchText:e.target.value})
    };

    handleSearchLine=(a)=>{
        let basePath = 'http://rancho.davidzavala.me/api/ingresos/blines/?q=';
        let url = basePath+a;
        this.props.linesActions.getLiSearch(url);
    };

    //providers

    handleSearchProvider=(a)=>{
        let basePath = 'http://rancho.davidzavala.me/api/egresos/proveedores/?q=';
        let url = basePath+a;
        this.props.proveedoresActions.getPrSearch(url);
    };

    //compras
    compraSearch =(a)=>{
        let basePath = 'http://rancho.davidzavala.me/api/egresos/compras/?q=';
        let url = basePath+a;
        this.props.comprasActions.getCoSearch(url);
    }

    compraChange=(e)=>{
        this.setState({
            compra: e.target.checked
        })
    };

    handleEmpresas=(a)=>{
        let basePath = 'http://rancho.davidzavala.me/api/ingresos/empresas/?q=';
        let url = basePath+a;
        //this.props.cuentasActions.getCuSearch(url);
    };

    //saveIDs
    saveCompany=(id)=>{
        this.setState({idCompany:id})
    };


    saveProvider=(id)=>{
        this.setState({idProvider:id})
    };
    saveLine=(id)=>{
        this.setState({idLineE:id})
    };
    saveCompra=(id)=>{
        this.setState({idCompra:id})
    };



    render() {

        const columns = [
            {
                title: 'Razón Social',
                dataIndex: 'empresa',
                render: (empresa,obj) =><Link to={`/admin/egresos/${obj.id}`}>{ empresa && empresa !== null ? empresa.company  || empresa: "None"}</Link>,
                key:'empresa',

            },
            {
                title: 'Linea de negocio',
                dataIndex: 'business_egreso',
                render: (business_line,obj) =><span>{ business_line && business_line !== null ? business_line.name : "No Linea"}</span>,
            },
            {
                title: 'No. Factura',
                dataIndex: 'no_check',
                render:no_check=> <span>{no_check && no_check !==null ?<span>{no_check}</span>:'No hay factura'}</span>
            },
          /*  {
                title: 'Status',
                dataIndex:'sale_date',
                render:(sale_date, obj)=>{

                    return(<span>{

                        obj.client && sale_date && moment.duration(new Date() - new Date(sale_date)).asDays() > parseInt(obj.client.credit) ?<Tag color="#f50">Vencido</Tag>:<Tag color="green">En tiempo</Tag>
                    }</span>)}
            },*/
           /* {
                title: 'Registro',
                dataIndex: 'created',
                render: created => moment(created).startOf(3, 'days').calendar()

            },*/
        ];


        const { visible, selectedRowKeys, data, filtered, searchText, canReset } = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {egresos, fetched, egresosData, blines, proveedores, compras,empresas   } = this.props;
        let options = opciones.map((a) => <Option key={a.name}>{a.name}</Option>);
        let tipo = type.map((a)=><Option key={a.name}>{a.name}</Option>);
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Egresos
                </div>
                <h1>Egresos Page</h1>

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
                    dataSource={egresos}
                    columns={columns}
                    rowSelection={rowSelection}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    style={{marginBottom:10}}
                    pagination={{
                        pageSize: 10,
                        total:egresosData.count,
                        onChange:this.handlePagination,
                        showTotal:total => `Total: ${total} Egresos`
                    }}
                />

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <FormEgreso
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}

                    options_proveedores={proveedores}
                    searchProvider={this.handleSearchProvider}

                    options_empresas={empresas}
                    searchEmpresas={this.handleEmpresas}
                    saveCompany={this.saveCompany}


                    options={blines}
                    type={tipo}
                    handleChange={this.handleChange}
                    handleChangeD={this.handleChangeD}
                    contacto={this.state.contacto_directo}
                    factura = {this.state.factura}

                    searchLine={this.handleSearchLine}

                    compras={compras}
                    compraSearch={this.compraSearch}
                    compraChange={this.compraChange}

                    compra={this.state.compra}

                    saveProvider={this.saveProvider}
                    saveLine={this.saveLine}
                    saveCompra={this.saveCompra}

                />

                <Divider
                    type={'vertical'}/>

                <Popconfirm title="Are you sure delete this egreso?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
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
        egresos: state.egresos.list,
        egresosData:state.egresos.allData,
        blines:state.blines.lineSearch,
        compras:state.compras.compraSearch,
        empresas:state.empresas.list,
        fetched: state.egresos.list !==undefined && state.blines.lineSearch !== undefined && state.proveedores.proveedorSearch !== undefined && state.compras.compraSearch !== undefined && state.empresas.list !== undefined,
        proveedores: state.proveedores.proveedorSearch,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        egresosActions: bindActionCreators(egresosActions, dispatch),
        linesActions: bindActionCreators(linesActions, dispatch),
        proveedoresActions: bindActionCreators(proveedoresActions, dispatch),
        comprasActions:bindActionCreators(comprasActions, dispatch),
        empresasActions:bindActionCreators(empresasActions,dispatch)
    }
}

EgresosPage = connect(mapStateToProps, mapDispatchToProps)(EgresosPage);
export default EgresosPage;
