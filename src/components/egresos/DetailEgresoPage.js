import React, {Component} from 'react';
import {Card, Select, Divider} from 'antd';
import InfoEgreso from "./InfoEgreso";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import * as egresoActions from '../../redux/actions/egresosActions';
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

    };

    handleEditMode=()=>{
        this.setState({editMode:!this.state.editMode})
    };



    render(){
        let {egreso, fetched, proveedores} = this.props;
        let {editMode} = this.state;
        if(!fetched)return(<MainLoader/>);
        let options = opciones.map(o => <Option title={o.name} value={o.name} key={o.id}>{o.name}</Option>);
        let tipo = type.map((a)=><Option title={a.name} value={a.name} key={a.id}>{a.name}</Option>);
        let options_providers = proveedores.map((a,key) => <Option key={key} value={parseInt(a.id)} >{a.provider}</Option>);
        return(

            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    <Link to={`/admin/egresos/`} style={{color:'black'}} >Egresos</Link>
                    <Divider type="vertical" />
                    {egreso.provider.provider}
                </div>

            <div style={{width:'30%', margin: '0 auto'}} >

                <Card title={"Detalle"}>
                    <span style={{textAlign:'center', display:'inherit', marginBottom:10}}><strong>Fecha de Registro: </strong>{moment(egreso.created).format('LL')}</span>
                    <InfoEgreso
                        {...egreso}
                        editEgreso={this.props.egresoActions.editEgreso}
                        handleEditMode={this.handleEditMode}
                        editMode={editMode}
                        options={options}
                        proveedores={options_providers}
                        types={tipo}

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
        fetched: egreso!==undefined && state.egresos.list!==undefined,
        proveedores:state.proveedores.list,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        egresoActions: bindActionCreators(egresoActions, dispatch),
    }
}

DetailEgresoPage = connect(mapStateToProps, mapDispatchToProps)(DetailEgresoPage);
export default DetailEgresoPage;