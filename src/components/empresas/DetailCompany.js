import React, {Component} from 'react';
import {Card, Select, Divider, Icon} from 'antd';
import * as empresaActions from '../../redux/actions/empresasActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";
import InfoCompany from './InfoCompany';
import * as linesActions from '../../redux/actions/blines/blinesActions';
import moment from 'moment';
import {host} from '../../Api/Django'

const Option = Select.Option;


class DetailCompany extends Component{
    state={
        editMode:false,
        linea:[],

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

    handleSearchLine=(a)=>{
        console.log(a)
        let basePath = host+'/api/ingresos/blines/?q=';
        let url = basePath+a;
        console.log(url)
        this.props.linesActions.getLiSearch(url);
    };

    handleChangeS=(value, obj)=> {
        console.log(`selected ${value}`);
        this.setState({linea:value});
        //let basePath = 'http://127.0.0.1:8000/api/ingresos/blines/';
        //this.props.linesActions.getLiSearch(basePath);
    };


    render(){

        let {empresa, fetched, blines, id} = this.props;
        //let options = blines.map((a, key) => <Option key={key} value={a.id}>{a.name}</Option>);
        let {editMode, linea} = this.state;
        console.log(linea)
        if(!fetched)return(<MainLoader/>);
        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    <Link to={`/admin/empresas/`} style={{color:'black'}} >Empresas</Link>
                    <Divider type="vertical" />
                    {empresa.company}
                </div>

                <div style={{width:'50%', margin: '0 auto'}}>
                    <Card title={"Detalle"}>
                        <span style={{textAlign:'center', display:'inherit', marginBottom:10}}><strong>Fecha de Registro: </strong>{moment(empresa.created).format('LL')}</span>
                        <span style={{display:'flex', justifyContent:'flex-end'}} >
                            <Link to={`/admin/empresas/inventario/${id}`} style={{color:'black'}} >
                                <strong>
                                    Inventario
                                </strong>
                                <Icon type="file-text" />
                            </Link>
                        </span>
                        <InfoCompany
                            {...empresa}
                            editEmpresa={this.props.empresaActions.editEmpresa}
                            handleEditMode={this.handleEditMode}
                            editMode={editMode}
                            options={blines}
                            rfcR={this.checkRfc}
                            phone={this.checkPhone}

                            searchLine={this.handleSearchLine}
                            lineHandle={this.handleChangeS}
                            linea={linea}

                        />
                    </Card>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.em;
    let empresa = state.empresas.list.filter(a=>{
        return id == a.id;
    });
    empresa = empresa[0];
    return {
        id,
        empresa,
        blines:state.blines.lineSearch,
        fetched: empresa!==undefined && state.empresas.list!==undefined && state.blines.list !== undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        empresaActions: bindActionCreators(empresaActions, dispatch),
        linesActions: bindActionCreators(linesActions, dispatch)
    }
}

DetailCompany = connect(mapStateToProps, mapDispatchToProps ) (DetailCompany);
export default DetailCompany;