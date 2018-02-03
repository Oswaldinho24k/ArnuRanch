import React, {Component} from 'react';
import {Card, Select} from 'antd';
import IngresoInfo from "./InfoIngreso";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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
        let {ingreso, fetched} = this.props;
        let {editMode} = this.state;
        if(!fetched)return(<MainLoader/>);
        let options = opciones.map(o => <Option title={o.name} value={o.name} key={o.id}>{o.name}</Option>);
        return(
            <div style={{width:'40%', margin: '0 auto'}} >
                <Card title={"Detalle"}>
                    <IngresoInfo
                        {...ingreso}
                        editIngreso={this.props.ingresoActions.editIngreso}
                        handleEditMode={this.handleEditMode}
                        editMode={editMode}
                        options={options}
                    />
                </Card>
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
    }
}

function mapDispatchToProps(dispatch) {
    return{
        ingresoActions: bindActionCreators(ingresoActions, dispatch),
    }
}

DetailIngresoPage = connect(mapStateToProps, mapDispatchToProps)(DetailIngresoPage);
export default DetailIngresoPage;