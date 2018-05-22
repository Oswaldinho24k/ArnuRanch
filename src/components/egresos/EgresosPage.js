import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Table, Button, message, Popconfirm, Tag, Divider, Select, BackTop} from "antd";
import MainLoader from "../common/Main Loader";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

import * as egresosActions from '../../redux/actions/administracion/egresosActions';
import FormEgreso from "./EgresoForm";

import * as linesActions from '../../redux/actions/blines/blinesActions';


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
            values['business_line']=this.state.linea;
            console.log(values)
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
        let basePath= "http://localhost:8000/api/egresos/egresos/?q=";
        //let basePath = 'https://rancho.fixter.org/api/egresos/egresos/?q=';

        let url = basePath+this.state.searchText;
        this.props.egresosActions.getEgresos(url);
        this.setState({canReset:true})

    };

    resetFilter = () => {
        let basePath= "http://localhost:8000/api/egresos/egresos/";
        //let basePath = 'https://rancho.fixter.org/api/egresos/egresos/';

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
        console.log(a)
        let basePath = 'http://127.0.0.1:8000/api/ingresos/blines/?q=';
        let url = basePath+a;
        console.log(url)
        this.props.linesActions.getLiSearch(url);
    };

    handleChangeS=(value, obj)=> {
        console.log(`selected ${value}`);
        this.setState({linea:value});
        //let basePath = 'http://127.0.0.1:8000/api/ingresos/blines/';
        //this.props.linesActions.getLiSearch(basePath);
    };



    render() {

        const columns = [
            {
                title: 'Razón Social',
                dataIndex: 'provider',
                render: (provider,obj) =><Link to={`/admin/egresos/${obj.id}`}>{ provider && provider !== null ? provider.provider  || provider: "No Proveedor"}</Link>,
                key:'provider',

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
        ];


        const { visible, selectedRowKeys, data, filtered, searchText, canReset } = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {egresos, fetched, egresosData, blines} = this.props;
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

                {/*<div style={{paddingBottom:'1%'}}>
                    <Input.Search
                        enterButton
                        onSearch={this.onSearch}
                        onChange={this.handleSearch}
                        value={searchText}
                        style={{ width: 400 }}
                        placeholder={'Busca por nombre...'}
                    />
                </div>*/}

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
                    options_proveedores={options_proveedores}
                    options={blines}
                    type={tipo}
                    handleChange={this.handleChange}
                    handleChangeD={this.handleChangeD}
                    contacto={this.state.contacto_directo}
                    factura = {this.state.factura}

                    searchLine={this.handleSearchLine}
                    lineHandle={this.handleChangeS}

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
        fetched: state.egresos.list !==undefined && state.blines.lineSearch !== undefined,
        proveedores: state.proveedores.list,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        egresosActions: bindActionCreators(egresosActions, dispatch),
        linesActions: bindActionCreators(linesActions, dispatch)
    }
}

EgresosPage = connect(mapStateToProps, mapDispatchToProps)(EgresosPage);
export default EgresosPage;
