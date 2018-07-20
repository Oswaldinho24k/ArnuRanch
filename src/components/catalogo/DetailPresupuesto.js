import React, {Component} from 'react';
import {Card, Divider} from 'antd';
import {Link} from 'react-router-dom';
import * as presupuestosActions from '../../redux/actions/catalogos/presupuestosActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MainLoader from "../common/Main Loader";
import InfoPresupuesto from "./InfoPresupuesto";

class DetailPresupuesto extends Component{
    state={
        editMode:false,
        options:{},
    };

    handleEditMode=()=>{
        this.setState({editMode:!this.state.editMode})
    };



    render(){
        let {catPresupuesto, fetched} = this.props;
        let {editMode} = this.state;
        if(!fetched)return(<MainLoader/>);
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
                            options={this.state.options}
                            {...catPresupuesto}

                        />
                    </Card>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.pre;
    let catPresupuesto = state.catPresupuesto.list.filter(a=>{
        return id == a.id;
    });
    catPresupuesto = catPresupuesto[0];
    return {
        catPresupuesto,
        fetched: catPresupuesto!==undefined && state.catPresupuesto.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        presupuestosActions: bindActionCreators(presupuestosActions, dispatch)
    }
}

DetailPresupuesto = connect(mapStateToProps, mapDispatchToProps)(DetailPresupuesto);
export default DetailPresupuesto