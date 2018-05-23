import React, {Component} from 'react';
import {Card, Select, Divider} from 'antd';
import InfoEgreso from "./InfoEgreso";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import * as egresoActions from '../../redux/actions/administracion/egresosActions';
import * as linesActions from '../../redux/actions/blines/blinesActions';
import * as proveedoresActions from '../../redux/actions/administracion/proveedoresActions';
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

const type = [{
    name :'Gasto',
    id: 1
},
    {
        name:'Costo',
        id:2
    },

];

class DetailEgresoPage extends Component{
    state={
        editMode:false,
        linea:'',

    };


    handleEditMode=()=>{
        this.setState({editMode:!this.state.editMode})
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

    //PRovider

    searchProvider=(a)=>{
        console.log(a)
        let basePath = 'http://127.0.0.1:8000/api/egresos/proveedores/?q=';
        let url = basePath+a;
        console.log(url)
        this.props.proveedoresActions.getPrSearch(url);
    };




    render(){
        let {egreso, fetched, proveedores, blines} = this.props;
        let {editMode, linea} = this.state;
        if(!fetched)return(<MainLoader/>);
        let options = opciones.map(o => <Option title={o.name} value={o.name} key={o.id}>{o.name}</Option>);
        let tipo = type.map((a)=><Option title={a.name} value={a.name} key={a.id}>{a.name}</Option>);


        return(

            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    <Link to={`/admin/egresos/`} style={{color:'black'}} >Egresos</Link>
                    <Divider type="vertical" />
                    {egreso.provider_egreso.provider}
                </div>

            <div style={{width:'50%', margin: '0 auto'}} >

                <Card title={"Detalle"}>
                    <span style={{textAlign:'center', display:'inherit', marginBottom:10}}><strong>Fecha de Registro: </strong>{moment(egreso.created).format('LL')}</span>
                    <InfoEgreso
                        {...egreso}
                        editEgreso={this.props.egresoActions.editEgreso}
                        handleEditMode={this.handleEditMode}
                        editMode={editMode}
                        options={blines}
                        proveedores={proveedores}
                        types={tipo}

                        searchLine={this.handleSearchLine}
                        lineHandle={this.handleChangeS}
                        linea={linea}

                        searchProvider={this.searchProvider}


                    />
                </Card>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.eg;
    let egreso = state.egresos.list.filter(a=>{
        return id == a.id;
    });
    egreso = egreso[0];
    return {
        egreso,
        blines:state.blines.lineSearch,
        fetched: egreso!==undefined && state.egresos.list!==undefined && state.blines.lineSearch !== undefined,
        proveedores:state.proveedores.proveedorSearch,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        egresoActions: bindActionCreators(egresoActions, dispatch),
        linesActions: bindActionCreators(linesActions, dispatch),
        proveedoresActions: bindActionCreators(proveedoresActions, dispatch)
    }
}

DetailEgresoPage = connect(mapStateToProps, mapDispatchToProps)(DetailEgresoPage);
export default DetailEgresoPage;