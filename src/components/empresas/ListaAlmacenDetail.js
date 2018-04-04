import React, {Component} from 'react';
import {Card, Select, Divider, Button, Icon} from 'antd';
import * as almacenActions from '../../redux/actions/almacen/almacenActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";
import EditAlmacen from "./nuevoAlmacen/EditAlmacen";


const Option = Select.Option;


class ListaAlmacenDetail extends Component{
    state={
        editMode:false,

    };

    handleEditMode=()=>{
        this.setState({editMode:!this.state.editMode})
    };

    goBack=()=>{
        this.props.history.goBack()
    };



    render(){
       let {empresa, fetched, bline, idAlmacen} = this.props;
        let {editMode} = this.state;
        if(!fetched)return(<MainLoader/>);
        let almacen = empresa.line_comp.filter(f=>{return f.id ==bline});
        let displayInfo = almacen[0].almacenes.find(fi => {return fi.id == idAlmacen});

        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Empresas
                    <Divider type="vertical" />
                    <Link to={`/admin/empresas/inventario/${empresa.id}/`} style={{color:'black'}} >
                    {empresa.company}
                    </Link>

                    <Divider type="vertical" />
                    Almacen {displayInfo.name}

                </div>

                <div style={{width:'50%', margin: '0 auto'}}>
                    <Card title={`Detalle almacén ${displayInfo.name}`}>
                        <div style={{display:'flex', justifyContent:'flex-end'}}>
                            <Button size="small"
                                    onClick={this.goBack}
                            >
                                <Icon type="left" />
                                Regresar
                            </Button>
                        </div>
                        <EditAlmacen
                            {...displayInfo}
                            bline={almacen[0]}
                            empresa={empresa}
                            editAlmacen={this.props.almacenActions.editAlmacen}
                           handleEditMode={this.handleEditMode}
                           editMode={editMode}
                            regresar={this.goBack}

                        />
                    </Card>
                </div>




            </div>

        )
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.em;
    let bline = ownProps.match.params.bl;
    let idAlmacen = ownProps.match.params.k;
    let empresa = state.empresas.list.filter(a=>{
        return id == a.id;
    });
    empresa = empresa[0];
    return {
        empresa,
        bline,
        idAlmacen,
        fetched: empresa!==undefined && state.empresas.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        almacenActions: bindActionCreators(almacenActions, dispatch),
    }
}

ListaAlmacenDetail = connect(mapStateToProps, mapDispatchToProps ) (ListaAlmacenDetail);
export default ListaAlmacenDetail;