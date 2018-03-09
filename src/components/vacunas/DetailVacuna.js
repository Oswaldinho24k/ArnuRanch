import React, {Component} from 'react';
import {Card, Divider} from 'antd';
import * as vacunaActions from '../../redux/actions/vacunasActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";
import InfoVacuna from './InfoVacuna';

import moment from 'moment';

class DetailVacuna extends Component{
    state={
        editMode:false,

    };

    handleEditMode=()=>{
        this.setState({editMode:!this.state.editMode})
    };

    render(){
        let {vacuna, fetched} = this.props;
        let {editMode} = this.state;
        if(!fetched)return(<MainLoader/>);
        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    <Link to={`/admin/vacunas/`} style={{color:'black'}} >Vacunas</Link>
                    <Divider type="vertical" />
                    Vacuna {vacuna.id}
                </div>

                <div style={{width:'50%', margin: '0 auto'}}>
                    <Card title={"Detalle"}>
                        <span style={{textAlign:'center', display:'inherit', marginBottom:10}}><strong>Fecha de Registro: </strong>{moment(vacuna.created).format('LL')}</span>
                        <InfoVacuna
                            {...vacuna}
                            editVacuna={this.props.vacunaActions.editVacuna}
                            handleEditMode={this.handleEditMode}
                            editMode={editMode}
                        />
                    </Card>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.va;
    let vacuna = state.vacunas.list.filter(a=>{
        return id == a.id;
    });
    vacuna = vacuna[0];
    return {
        vacuna,
        fetched: vacuna!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        vacunaActions: bindActionCreators(vacunaActions, dispatch),
    }
}

DetailVacuna = connect(mapStateToProps, mapDispatchToProps ) (DetailVacuna);
export default DetailVacuna;