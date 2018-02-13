import React, {Component} from 'react';
import {Card} from 'antd';
import ClientInfo from "./InfoClient";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MainLoader from "../common/Main Loader";
import * as clienteActions from '../../redux/actions/clientesActions';

class DetailClientPage extends Component{
    state={
        editMode:false,
    };

    handleEditMode=()=>{
        this.setState({editMode:!this.state.editMode})
    };

    render(){
        let {cliente, fetched} = this.props;
        let {editMode} = this.state;
        if(!fetched)return(<MainLoader/>);
        return(
            <div style={{width:'30%', margin: '0 auto'}} >
                <Card title={"Detalle"}>
                    <ClientInfo {...cliente} editCliente={this.props.clienteActions.editCliente} handleEditMode={this.handleEditMode} editMode={editMode}/>
                </Card>
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