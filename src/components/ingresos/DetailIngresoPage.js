import React, {Component} from 'react';
import {Card, Select, Divider} from 'antd';
import {Link} from 'react-router-dom';
import IngresoInfo from "./InfoIngreso";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import * as ingresoActions from '../../redux/actions/administracion/ingresosActions';
import * as linesActions from '../../redux/actions/blines/blinesActions';
import * as cuentasActions from '../../redux/actions/cuentas/cuentasActions';
import * as clientesActions from '../../redux/actions/administracion/clientesActions';
import MainLoader from "../common/Main Loader";
const Option = Select.Option;

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

class DetailIngresoPage extends Component{
    state={
        editMode:false,
        linea:'',
        cuenta:'',
        cliente:'',
        clientChange:false,

        idCuent:null,
        idBl:null,
        idClient:null,
    };

    handleEditMode=()=>{
        this.setState({editMode:!this.state.editMode})
    };
    handleSearchLine=(a)=>{
        console.log(a)
        let basePath = 'https://rancho.davidzavala.me/api/ingresos/blines/?q=';
        //let basePath = 'http://127.0.0.1:8000/api/ingresos/blines/?q=';
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

    //Cuentas

    handleCuenta=(a)=>{
        console.log(a)
        let basePath = 'https://rancho.davidzavala.me/api/ingresos/cuentas/?q=';
        //let basePath = 'http://127.0.0.1:8000/api/ingresos/cuentas/?q=';
        let url = basePath+a;
        console.log(url)
        this.props.cuentasActions.getCuSearch(url);
    };

    changeCuentaS=(value, obj)=> {
        console.log(`selected ${value}`);
        this.setState({cuenta:value});

    };

    //Clientes

    handleClient=(a)=>{
        console.log(a)
        //let basePath = 'http://127.0.0.1:8000/api/ingresos/clientes/?q=';
        let basePath = 'https://rancho.davidzavala.me/api/ingresos/clientes/?q=';
        let url = basePath+a;
        console.log(url)
        this.props.clientesActions.getClSearch(url);
    };

    changeClientS=(value, obj)=> {
        console.log(`selected ${value}`);
        this.setState({cliente:value, handleClient:true});

    };

    //saveIDs

    saveClient=(id)=>{
        console.log("DD", id)
        this.setState({idClient:id})
    };

    saveBl=(id)=>{
        this.setState({idBl:id})
    };

    saveCuent=(id)=>{
        this.setState({idCuent:id})
    };
    saveCompany=(id)=>{
        this.setState({idCompany:id})
    };


    render(){
        let {ingreso, fetched, clientes, blines, cuentas,companies} = this.props;
        let {editMode, linea} = this.state;
        if(!fetched)return(<MainLoader/>);
        let options = opciones.map(o => <Option title={o.name} value={o.name} key={o.id}>{o.name}</Option>);

        return(

            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    <Link to={`/admin/ingresos/`} style={{color:'black'}} >Ingresos</Link>
                    <Divider type="vertical" />
                    {ingreso.id}
                </div>

            <div style={{width:'50%', margin: '0 auto'}} >

                <Card title={"Detalle"}>
                    <span style={{textAlign:'center', display:'inherit', marginBottom:10}}><strong>Fecha de Registro: </strong>{moment(ingreso.created).format('LL')}</span>
                    <IngresoInfo
                        {...ingreso}
                        editIngreso={this.props.ingresoActions.editIngreso}
                        handleEditMode={this.handleEditMode}
                        editMode={editMode}
                        options={blines}

                        clientes={clientes}
                        searchClient={this.handleClient}
                        clientHandle={this.changeClientS}
                        handleClient={this.state.handleClient}
                        companies={companies}
                        searchLine={this.handleSearchLine}
                        lineHandle={this.handleChangeS}
                        linea={linea}

                        cuentaHandle={this.changeCuentaS}
                        searchCuenta={this.handleCuenta}
                        cuentas={cuentas}
                        receivableEdit={this.state.cuenta}


                        saveClient={this.saveClient}
                        stateClient={this.state.idClient}

                        saveBline={this.saveBl}
                        stateBline={this.state.idBl}

                        saveCuentas={this.saveCuent}
                        stateCuentas={this.state.idCuent}
                        saveCompany={this.saveCompany}
                        stateCompany={this.state.idCompany}




                    />
                </Card>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.in;
    let ingreso = state.ingresos.list.filter(a=>{
        return id == a.id;
    });
    ingreso = ingreso[0];
    return {
        ingreso,
        companies:state.empresas.list,
        blines:state.blines.lineSearch,
        fetched: ingreso!==undefined && state.ingresos.list!==undefined && state.blines.lineSearch !== undefined && state.clientes.clienteSearch !== undefined && state.empresas.list!==undefined,
        clientes: state.clientes.clienteSearch,
        cuentas:state.cuentas.cuentaSearch
    }
}

function mapDispatchToProps(dispatch) {
    return{
        ingresoActions: bindActionCreators(ingresoActions, dispatch),
        linesActions: bindActionCreators(linesActions, dispatch),
        cuentasActions: bindActionCreators(cuentasActions, dispatch),
        clientesActions: bindActionCreators(clientesActions, dispatch),
    }
}

DetailIngresoPage = connect(mapStateToProps, mapDispatchToProps)(DetailIngresoPage);
export default DetailIngresoPage;