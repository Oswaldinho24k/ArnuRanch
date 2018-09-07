import React, {Component} from 'react';
import {Card, Divider, Table, } from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import MainLoader from "../common/Main Loader";

class FacturaDetalle extends Component{

    render(){
        let {factura, fetched} = this.props;
        if(!fetched)return(<MainLoader/>);

        const columns = [
            {
                title: 'Arete Rancho',
                dataIndex: 'arete_rancho',

            },

            {
                title: 'Arete Siniga',
                dataIndex: 'arete_siniga',
            },
            {
                title:'Status',
                dataIndex:'id'
            }
        ];

        console.log("FACTURA", factura)


        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    <Link to={`/admin/facturas/`} style={{color:'black'}} >Facturas</Link>
                    <Divider type="vertical" />
                    Detalle
                </div>

                <Card style={{textAlign:'center'}}>
                    <h2>{factura.factura}</h2>
                    <h3 style={{display:'flex', justifyContent:'flex-end'}}>Total de animales: {factura.animals.length}</h3>

                    <Table
                        columns={columns}
                        dataSource={factura.animals}
                        rowKey={record => record.id}
                        scroll={{x:650}}
                        pagination={{
                            pageSize: 5,
                        }}
                        style={{marginBottom:10}}
                        height={'80vh'}
                    />

                </Card>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.fa;
    let facturas = state.facturas.list;
    let factura = state.facturas.list.filter(a=>{
        return id == a.id;
    });
    factura = factura[0];

    return {
        factura,
        facturas,
        fetched: factura!==undefined && state.facturas.list!==undefined,

    }
}

function mapDispatchToProps(dispatch) {
    return{

    }
}

FacturaDetalle = connect(mapStateToProps, mapDispatchToProps ) (FacturaDetalle);
export default FacturaDetalle;
