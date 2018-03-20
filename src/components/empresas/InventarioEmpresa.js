import React, {Component} from 'react';
import {Card, Divider, Tabs, Table} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MainLoader from "../common/Main Loader";

const TabPane = Tabs.TabPane;

class InventarioEmpresa extends Component{
    state={
        key:"0",
    };

    callback=(key)=>{
        this.setState({key:key})
    };



    render(){

        let {empresa, fetched} = this.props;
        if(!fetched)return(<MainLoader/>);
        let datos = [empresa.line_comp[this.state.key]];
        let almacenes = datos.map(a=> a.almacenes);
        let info = almacenes[0];
        let items = info.map(a=> a.items);

        const expandedRowRender = () => {
            const columns = [
                {title: 'Item', dataIndex: 'id', key: 'id'},
                {title: 'Tipo', dataIndex: 'product_type', key: 'product_type'},
                {title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad'},
                {title: 'Costo Unitario', dataIndex: 'costo_u', key: 'costo_u'},
                {title: 'Total', dataIndex: 'total', key: 'total'},
                {
                    title: 'Action',
                    dataIndex: 'operation',
                    key: 'operation',
                    render: () => (
                        <span className="table-operation">
            <a href="#">Pause</a>
            <a href="#">Stop</a>

          </span>
                    ),
                },
            ];

            return (
                <Table
                    columns={columns}
                    dataSource={items[0]}
                    pagination={false}
                    rowKey={record => record.id}
                />
            );
        }



        const columns = [
            {
                title: 'Nombre de almacen',
                dataIndex: 'name',

            },
            {
                title: 'Items',
                dataIndex: 'items',
                render: items => items.length
            },

        ];

        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    <Link to={`/admin/empresas/`} style={{color:'black'}} >Empresas</Link>
                    <Divider type="vertical" />
                    {empresa.company}

                </div>

                <Card>
                    <h3>Lineas de Negocio</h3>
                    <Tabs defaultActiveKey={this.state.key} onChange={this.callback}>
                        {empresa.line_comp.length>0 ?
                            empresa.line_comp.map((p, index) => {
                                return(
                                    <TabPane tab={p.name} key={index} />
                                    )
                            })
                            :
                            "Esta empresa no tiene lineas de negocio..."
                            }
                    </Tabs>



                    <Table
                        columns={columns}
                        expandedRowRender={expandedRowRender}
                        dataSource={info}
                        rowKey={record => record.id}

                    />





                </Card>


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
        fetched: empresa!==undefined && state.empresas.list!==undefined && empresa.line_comp !==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        //empresaActions: bindActionCreators(empresaActions, dispatch),
    }
}

InventarioEmpresa = connect(mapStateToProps, mapDispatchToProps ) (InventarioEmpresa);
export default InventarioEmpresa;

