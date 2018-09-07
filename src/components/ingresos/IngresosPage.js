import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, message, Popconfirm, Table, Tag, Divider, Select, Input, Icon, BackTop, DatePicker} from "antd";
import moment from 'moment';
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";
import * as ingresosActions from '../../redux/actions/administracion/ingresosActions';
import * as linesActions from '../../redux/actions/blines/blinesActions';
import * as cuentasActions from '../../redux/actions/cuentas/cuentasActions';
import * as clientesActions from '../../redux/actions/administracion/clientesActions';
import * as empresasActions from  '../../redux/actions/empresasActions';
import FormIngreso from "./IngresoForm";


const { RangePicker } = DatePicker;



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

class IngresosPage extends Component {
    state = {
        visible: false,
        selectedRowKeys:[],

        data:[],
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
        linea:'',
        cuenta:'',
        cliente:'',
        canReset:false,
        venta:false,

        idClient:null,
        idLine:null,
        idReceivable:null,
        idCompany:null
    };

    componentWillMount(){
        this.props.ingresosActions.getIngresos();
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            venta:false,
        });
        const form = this.form;
        form.resetFields();
    };

    deleteIngreso=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.ingresosActions.deleteIngreso(keys[i])
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
        this.deleteIngreso();
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
                values['client_id']=this.state.idClient;
                values['business_line_id']=this.state.idLine;
                values['receivable_id']=this.state.idReceivable;
                values['empresa_id']=this.state.idCompany;

                this.props.ingresosActions.saveIngreso(values)
                    .then(()=>{
                        message.success('Guardado con éxito');
                        form.resetFields();
                        this.setState({ visible: false });
                    }).catch(e=>{
                        console.log(e.response)
                    })
                

                
            }else{message.error('Algo fallo, verifica los campos');}

        });
    };

    handleChange = e => {
        console.log("name", e.target.id)
        if(e.target.id === "sale_check"){
            this.setState({
                factura: e.target.checked
            })
        }
        if(e.target.id === "is_sale"){
            this.setState({
                venta: e.target.checked
            })
        }


    };
    handleSale = () =>{

    }


    onSearch = () => {
       // let basePath= "http://localhost:8000/api/ingresos/ingresos/?q=";
       let basePath = 'https://rancho.davidzavala.me/api/ingresos/ingresos/?q=';

        let url = basePath+this.state.searchText;
        this.props.ingresosActions.getIngresos(url);
        this.setState({canReset:true})

    };

    resetFilter = () => {
        //let basePath= "http://localhost:8000/api/ingresos/ingresos/";
        let basePath = 'https://rancho.davidzavala.me/api/ingresos/ingresos/';

        this.props.ingresosActions.getIngresos(basePath);
        this.setState({
            searchText:'',
            canReset:false
        });
    };

    handlePagination=(pagina)=>{
        let nextLength = pagina.toString().length;
        let newUrl = this.props.ingresosData.next;
        if(newUrl===null){
            newUrl = this.props.ingresosData.previous;
        }

        if( pagina ==1 && this.props.ingresosData.count <= 20){
            newUrl='http'+newUrl.slice(4,newUrl.length);
        }else{
            newUrl='http'+newUrl.slice(4,newUrl.length-nextLength)+pagina;
        }
        this.props.ingresosActions.getIngresos(newUrl);
    };


    handleSearch=(e)=>{
        this.setState({searchText:e.target.value})
    };

    handleSearchLine=(a)=>{
       // let basePath = 'http://127.0.0.1:8000/api/ingresos/blines/?q=';
        let basePath = 'https://rancho.davidzavala.me/api/ingresos/blines/?q=';
        let url = basePath+a;
        this.props.linesActions.getLiSearch(url);
    };

    //Cuentas

    handleCuenta=(a)=>{
        //let basePath = 'http://127.0.0.1:8000/api/ingresos/cuentas/?q=';
        let basePath = 'https://rancho.davidzavala.me/api/ingresos/cuentas/?q=';
        let url = basePath+a;
        this.props.cuentasActions.getCuSearch(url);
    };

    //Cliente

    handleCliente=(a)=>{
        //let basePath = 'http://127.0.0.1:8000/api/ingresos/clientes/?q=';
        let basePath = 'https://rancho.davidzavala.me/api/ingresos/clientes/?q=';
        let url = basePath+a;
        this.props.clientesActions.getClSearch(url);
    };

    //Cuentas

    handleEmpresas=(a)=>{
        //let basePath = 'http://127.0.0.1:8000/api/ingresos/empresas/?q=';
        let basePath = 'https://rancho.davidzavala.me/api/ingresos/empresas/?q=';
        let url = basePath+a;
        //this.props.cuentasActions.getCuSearch(url);
    };

    handleDates=(a, b)=>{
        let basePath = 'http://localhost:8000/api/ingresos/ingresos/?';
        //let basePath = 'https://rancho.davidzavala.me/api/ingresos/ingresos/?';
        let url = basePath+`date1=${b[0]}&date2=${b[1]}`
        console.log(a, b)
        this.props.ingresosActions.getIngresos(url);
        this.setState({canReset:true})
    }


    //saveIDClient
    saveCompany=(id)=>{
        this.setState({idCompany:id})
    };

    saveClient=(id)=>{
        this.setState({idClient:id})
    };
    saveLine=(id)=>{
        this.setState({idLine:id})
    };
    saveReceivable=(id)=>{
        this.setState({idReceivable:id})
    };





    render() {

        const columns = [
            {
                title: 'Razón Social',
                dataIndex: 'empresa',
                render: (empresa,obj) =><Link to={`/admin/ingresos/${obj.id}`}>{ empresa && empresa !== null ? empresa.company  || empresa: "None"}</Link>,
                key:'empresa',
            },
            {
                title: 'Linea de negocio',
                dataIndex: 'business_line',
                render: (business_line,obj) =><span>{ business_line && business_line !== null ? business_line.name : "No Linea"}</span>,
            },
            {
                title: 'No. Factura',
                dataIndex: 'no_scheck',
                render:no_scheck=> <span>{no_scheck && no_scheck !==null ?<span>{no_scheck}</span>:'No hay factura'}</span>
            },
            {
                title: 'Status',
                dataIndex:'paid',
                render:(paid, obj)=><span>{
                    paid?<Tag color="#87d068" style={{width:70, textAlign:'center'}} >Pagado</Tag>:
                       <Tag color="yellow" style={{width:70, textAlign:'center'}}>Por Pagar</Tag>
                }</span>
            },
            {
                title: 'Status',
                dataIndex:'sale_date',
                render:(sale_date, obj)=>{

                    return(<span>{

                        obj.paid?<Tag color="green">Todo Bien</Tag>:obj.client && sale_date && moment.duration(new Date() - new Date(sale_date)).asDays() > parseInt(obj.client.credit) ?<Tag color="#f50">Vencido</Tag>:<Tag color="green">En tiempo</Tag>
                }</span>)}

            },
            /*{
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
        let {ingresos, fetched, clientes, ingresosData, blines, cuentas,empresas} = this.props;
        let options = opciones.map((a) => <Option key={a.name}>{a.name}</Option>);

        if(!fetched)return(<MainLoader/>);
        console.log("empresas",empresas)
        return (
            <Fragment>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Ingresos
                </div>

                <h1>Ingresos Page</h1>

                <div style={{marginBottom:'1%', display:'flex'}}>
                    <Input.Search
                        enterButton
                        onSearch={this.onSearch}
                        onChange={this.handleSearch}
                        value={searchText}
                        style={{ width: 400 }}
                        placeholder={'Buscar ingreso...'}
                    />
                    <Divider type="vertical" />
                    <RangePicker onChange={this.handleDates} />
                </div>

                <BackTop visibilityHeight={100} />

                <Table
                    dataSource={ingresos}
                    columns={columns}
                    rowSelection={rowSelection}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    style={{marginBottom:10}}
                    pagination={{
                        pageSize: 10,
                        total:ingresosData.count,
                        onChange:this.handlePagination,
                        showTotal:total => `Total: ${total} Ingresos`
                    }}
                />

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <FormIngreso
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    handleChange={this.handleChange}
                    factura = {this.state.factura}
                    venta ={this.state.venta}
                    options={blines}
                    searchLine={this.handleSearchLine}

                    cuentas={cuentas}
                    searchCuenta={this.handleCuenta}

                    options_empresas={empresas}
                    searchEmpresas={this.handleEmpresas}
                    saveCompany={this.saveCompany}

                    options_clientes={clientes}
                    searchCliente={this.handleCliente}

                    saveClient={this.saveClient}
                    saveLine={this.saveLine}
                    saveReceivable={this.saveReceivable}

                />


                <Divider
                    type={'vertical'}/>

                <Popconfirm title="Are you sure delete this ingreso?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
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
        empresas:state.empresas.list,
        ingresos:state.ingresos.list,
        ingresosData:state.ingresos.allData,
        blines:state.blines.lineSearch,
        fetched: state.ingresos.list !== undefined && state.clientes.list !==undefined && state.blines.lineSearch !== undefined && state.cuentas.cuentaSearch !== undefined && state.empresas.list,
        clientes:state.clientes.clienteSearch,
        cuentas:state.cuentas.cuentaSearch
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ingresosActions: bindActionCreators(ingresosActions, dispatch),
        empresasActions:bindActionCreators(empresasActions,dispatch),
        linesActions: bindActionCreators(linesActions, dispatch),
        cuentasActions: bindActionCreators(cuentasActions, dispatch),
        clientesActions: bindActionCreators(clientesActions, dispatch),
    }
}

IngresosPage = connect(mapStateToProps, mapDispatchToProps)(IngresosPage);
export default IngresosPage;
