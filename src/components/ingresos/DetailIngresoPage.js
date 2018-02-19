import React, {Component} from 'react';
import {Card, Select, Divider} from 'antd';
import {Link} from 'react-router-dom';
import IngresoInfo from "./InfoIngreso";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import * as ingresoActions from '../../redux/actions/ingresosActions';
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
    };

    handleEditMode=()=>{
        this.setState({editMode:!this.state.editMode})
    };

    render(){
        let {ingreso, fetched, clientes} = this.props;
        let {editMode} = this.state;
        if(!fetched)return(<MainLoader/>);
        let options = opciones.map(o => <Option title={o.name} value={o.name} key={o.id}>{o.name}</Option>);
        let options_clients = clientes.map((a,key) => <Option key={key} value={parseInt(a.id)} >{a.client}</Option>);
        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    <Link to={`/admin/ingresos/`} style={{color:'black'}} >Ingresos</Link>
                    <Divider type="vertical" />
                    Ingreso {ingreso.id}
                </div>

            <div style={{width:'30%', margin: '0 auto'}} >
                <Card title={"Detalle"}>
                    <span style={{textAlign:'center', display:'inherit', marginBottom:10}}><strong>Fecha de Registro: </strong>{moment(ingreso.created).startOf(3, 'days').calendar()}</span>
                    <IngresoInfo
                        {...ingreso}
                        editIngreso={this.props.ingresoActions.editIngreso}
                        handleEditMode={this.handleEditMode}
                        editMode={editMode}
                        options={options}
                        clientes={options_clients}
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
        fetched: ingreso!==undefined && state.ingresos.list!==undefined,
        clientes: state.clientes.list,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        ingresoActions: bindActionCreators(ingresoActions, dispatch),
    }
}

DetailIngresoPage = connect(mapStateToProps, mapDispatchToProps)(DetailIngresoPage);
export default DetailIngresoPage;