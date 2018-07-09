import React, {Component} from 'react';
import {Card, Divider} from 'antd';
import {Link} from 'react-router-dom';
/*import * as clienteActions from '../../redux/actions/administracion/clientesActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';*/
import MainLoader from "../common/Main Loader";
import InfoPresupuesto from "./InfoPresupuesto";

class DetailPresupuesto extends Component{
    state={
        editMode:false,
    };

    handleEditMode=()=>{
        this.setState({editMode:!this.state.editMode})
    };



    render(){
        // let {cliente, fetched} = this.props;
        let {editMode} = this.state;
        //if(!fetched)return(<MainLoader/>);
        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    <Link to={`/admin/catalogo/`} style={{color:'black'}} >Catálogo</Link>
                    <Divider type="vertical" />
                    {"13"/*cliente.client*/}
                </div>
                <div style={{width:'50%', margin: '0 auto'}} >
                    <Card title={"Detalle"}>
                        <InfoPresupuesto
                            handleEditMode={this.handleEditMode}
                            editMode={editMode}

                        />
                    </Card>
                </div>
            </div>
        )
    }
}

/*function mapStateToProps(state, ownProps) {
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

DetailClientPage = connect(mapStateToProps, mapDispatchToProps)(DetailClientPage);*/
export default DetailPresupuesto