import React, {Component} from 'react';
import {Card, Divider} from 'antd';
import {Link} from 'react-router-dom';
import ClientInfo from "./InfoClient";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MainLoader from "../common/Main Loader";
import * as clienteActions from '../../redux/actions/administracion/clientesActions';

class DetailClientPage extends Component{
    state={
        editMode:false,
    };

    handleEditMode=()=>{
        this.setState({editMode:!this.state.editMode})
    };

    checkRfc = (rule, value, callback) => {
        if (value === undefined) {
            callback('Verifica el RFC ingresado');
        } else {

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

    render(){
        let {cliente, fetched} = this.props;
        let {editMode} = this.state;
        if(!fetched)return(<MainLoader/>);
        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    <Link to={`/admin/clientes/`} style={{color:'black'}} >Clientes</Link>
                    <Divider type="vertical" />
                    {cliente.client}
                </div>
            <div style={{width:'50%', margin: '0 auto'}} >
                <Card title={"Detalle"}>
                    <ClientInfo
                        {...cliente}
                        editCliente={this.props.clienteActions.editCliente}
                        handleEditMode={this.handleEditMode}
                        editMode={editMode}
                        rfcR={this.checkRfc}
                        phone={this.checkPhone}
                    />
                </Card>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.i;
    let cliente = state.clientes.list.filter(a=>{
        return id == a.id;
    });
    cliente = cliente[0];
    return {
        cliente,
        fetched: cliente!==undefined && state.clientes.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        clienteActions: bindActionCreators(clienteActions, dispatch)
    }
}

DetailClientPage = connect(mapStateToProps, mapDispatchToProps)(DetailClientPage);
export default DetailClientPage;