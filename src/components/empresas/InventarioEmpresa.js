import React, {Component} from 'react';
import {Card, Select, Divider, Row, Tabs, Table, Badge, Dropdown} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MainLoader from "../common/Main Loader";
import TablePageB from "../clientes/TablePageB";

const TabPane = Tabs.TabPane;



const gridStyle = {
    width: '50%',
    height: '150px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
};


class InventarioEmpresa extends Component{
    state={
        dataIn:[],
        key:"0",
        datos:[]
    };

    componentWillMount(){
        this.setState({
            dataIn:this.props.empresa
        })
    }

    callback=(key)=>{
        console.log(key)
        this.setState({key:key})
    }



    render(){

        let {pathname, empresa, fetched, bline} = this.props;
        if(!fetched)return(<MainLoader/>);
        let datos = [empresa.line_comp[this.state.key]];
        let almacenes = datos.map(a=> a.almacenes);
        let info = almacenes[0]
        let items = info.map(a=> a.items);
        console.log(items[0])
        console.log(info)
        console.log(empresa.line_comp !==undefined)

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

            console.log(info.items)
            return (
                <Table
                    columns={columns}
                    dataSource={items[0]}
                    pagination={false}
                />
            );
        }



        const columns = [
            {
                title: 'Nombre de almacen',
                dataIndex: 'name',
                //render: (value) => console.log(value.name)

            },
            {
                title: 'Items',
                dataIndex: 'items',
                render: items => items.length
            },

        ];




        console.log(datos)
        //console.log(empresa)
        console.log(this.state.key)
        //console.log(empresa.line_comp[this.state.key].almacenes)

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
                    />





                </Card>


            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    console.log(ownProps)
    let pathname = ownProps.location.pathname;
    //let id = ownProps.match.params.em;
    let empresa = state.empresas.list.filter(a=>{
        return pathname.slice(-1) == a.id;
    });
    empresa = empresa[0];
    console.log(empresa)
    //let bline = empresa.line_comp.map(b=>b)
    //console.log(bline)



    return {
        pathname,
        empresa,
//        bline,
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

