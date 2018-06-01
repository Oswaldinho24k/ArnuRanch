import React, {Component} from 'react';
import {Card, Divider, Tabs, Table, } from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MainLoader from "../common/Main Loader";
import moment from 'moment';


class CuentaDetalle extends Component{

    render(){
        let {cuenta, fetched} = this.props;
        if(!fetched)return(<MainLoader/>);

        const columns = [
            {
                title: 'Concepto',
                dataIndex: 'concepto',

            },

            {
                title: 'Total',
                dataIndex: 'total',
            },
            {
                title:'Razon Social',
                dataIndex:'client',
                render:(client)=><span>{client && client !== undefined ?client.client:"No registradp"}</span>
            },
            {
                title:'Registro',
                dataIndex:'created',
                render: created => moment(created).startOf(3, 'days').calendar()
            }

        ];


        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    <Link to={`/admin/cuentas/`} style={{color:'black'}} >Cuentas</Link>
                    <Divider type="vertical" />
                    Detalle
                </div>

                <Card style={{textAlign:'center'}}>
                    <h2>Detalle</h2>
                    <h3 style={{display:'flex', justifyContent:'flex-end'}}>Total de ingresos: {cuenta.sales.length}</h3>

                    <Table
                        columns={columns}
                        dataSource={cuenta.sales}
                        rowKey={record => record.id}
                        scroll={{x:650}}
                        style={{marginBottom:10}}
                        height={'80vh'}
                        pagination={{
                            style: { marginBottom: 0 },
                            pageSize: 10,
                        }}
                    />

                </Card>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.cu;
    let cuentas = state.cuentas.list;
    let cuenta = state.cuentas.list.filter(a=>{
        return id == a.id;
    });
    cuenta = cuenta[0];

    return {
        cuenta,
        cuentas,
        fetched: cuenta!==undefined && state.cuentas.list!==undefined,

    }
}

function mapDispatchToProps(dispatch) {
    return{

    }
}

CuentaDetalle = connect(mapStateToProps, mapDispatchToProps ) (CuentaDetalle);
export default CuentaDetalle;
