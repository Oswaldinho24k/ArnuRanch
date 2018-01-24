import React, {Component} from 'react';
import {Card} from 'antd';
import ProveedorInfo from "./InfoProveedor";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class DetailProviderPage extends Component{
    render(){
        let {proveedor} = this.props;
        return(
            <Card title={"Detalle"}>
                <ProveedorInfo {...proveedor}/>
            </Card>
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
        proveedor
    }
}

function mapDispatchToProps(dispatch) {
    return{}
}

DetailProviderPage = connect(mapStateToProps, mapDispatchToProps)(DetailProviderPage);
export default DetailProviderPage;