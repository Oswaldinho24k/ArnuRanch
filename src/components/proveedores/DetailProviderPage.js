import React, {Component} from 'react';
import {Card} from 'antd';
import ProveedorInfo from "./InfoProveedor";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as proveedorActions from '../../redux/actions/proveedoresActions';
import MainLoader from "../common/Main Loader";

class DetailProviderPage extends Component{
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
            if(value.length < 13){
                callback('Recuerda que son trece dígitos');
            }
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
        let {proveedor, fetched} = this.props;
        let {editMode} = this.state;
        if(!fetched)return(<MainLoader/>);
        return(
            <div style={{width:'30%', margin: '0 auto'}} >
                <Card title={"Detalle"}>
                    <ProveedorInfo
                        {...proveedor}
                        editProveedor={this.props.proveedorActions.editProveedor}
                        handleEditMode={this.handleEditMode}
                        editMode={editMode}
                        rfcR={this.checkRfc}
                        phone={this.checkPhone}
                    />
                </Card>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.p;
    let proveedor = state.proveedores.list.filter(a=>{
        return id == a.id;
    });
    proveedor = proveedor[0];
    return {
        proveedor,
        fetched: proveedor!==undefined && state.proveedores.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        proveedorActions: bindActionCreators(proveedorActions, dispatch),
    }
}

DetailProviderPage = connect(mapStateToProps, mapDispatchToProps)(DetailProviderPage);
export default DetailProviderPage;