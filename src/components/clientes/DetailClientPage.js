import React, {Component} from 'react';
import {Card} from 'antd';
import ClientInfo from "./InfoClient";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class DetailClientPage extends Component{
    render(){
        let {cliente} = this.props;
        return(
            <Card title={"Detalle"}>
                <ClientInfo {...cliente}/>
            </Card>
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
        cliente
    }
}

function mapDispatchToProps(dispatch) {
    return{}
}

DetailClientPage = connect(mapStateToProps, mapDispatchToProps)(DetailClientPage);
export default DetailClientPage;