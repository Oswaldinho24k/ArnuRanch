import React, {Component} from 'react';
import {Card, Select, Divider} from 'antd';
import * as empresaActions from '../../redux/actions/empresasActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";
import InfoCompany from './InfoCompany';

import moment from 'moment';
import TablePageB from "../clientes/TablePageB";

const Option = Select.Option;

const data = [{
    name :'Item 1',
    precio:334.65,
    id: 1
},
    {
        name:'Item 2',
        precio:4.65,
        id:2
    },
    {
        name:'Item 3',
        precio:465,
        id:3
    },
    {
        name:'Item 4',
        precio:65,
        id:4
    },
    {
        name:'Item5',
        precio:99,
        id:5
    },

];

const columns = [{
    title: 'Item',
    dataIndex: 'name',

}, {
    title: 'Precio',
    dataIndex: 'precio',
},
];


class ListaAlmacenDetail extends Component{
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
        let {empresa, fetched} = this.props;
        let {editMode} = this.state;
        if(!fetched)return(<MainLoader/>);

        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    <Link to={`/admin/empresas/`} style={{color:'black'}} >Empresas</Link>
                    <Divider type="vertical" />
                    Nombre empresa
                    <Divider type="vertical" />
                    Almacenes
                    <Divider type="vertical" />
                    Detalle
                </div>

                <h2>Lista de Items</h2>

                <TablePageB data={data} columns={columns}/>
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
        empresa,
        fetched: empresa!==undefined && state.empresas.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        empresaActions: bindActionCreators(empresaActions, dispatch),
    }
}

ListaAlmacenDetail = connect(mapStateToProps, mapDispatchToProps ) (ListaAlmacenDetail);
export default ListaAlmacenDetail;