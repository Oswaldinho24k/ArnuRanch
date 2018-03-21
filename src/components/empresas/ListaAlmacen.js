import React, {Component} from 'react';
import TablePageB from "../clientes/TablePageB";
import {Divider, Table} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import MainLoader from "../common/Main Loader";

const dataI =
    {
        lines:[
            {
                id:2,
                name:"ganado",
                almacen:[
                    {
                    id: 1,
                    nombre: "Almacen 1",
                        items:32
                }, {
                    id: 2,
                    nombre: "Almacen 2",
                        items:12
                }]
            },
            {
                id:3,
                name:"granos",
                almacen:[{
                    id:1,
                    nombre:"Almacen 2",
                    items:24
                }],

            },
            {
                id:4,
                name:"planta de alimentos",
                almacen:[{
                    id:1,
                    nombre:"Almacen 3",
                    items:2
                }]
            }]

    };


const dataSource = [{
    key: '1',
    name: 'Almacen 1',
    age: 32,
    address: '10 Downing Street'
}, {
    key: '2',
    name: 'Almacen 2',
    age: 42,
    address: '10 Downing Street'
}];

const columns = [{
    title: 'Almacen',
    dataIndex: 'almacenes',
    //render: value =>(value[0].name)

}, {
    title: 'Items',
    dataIndex: 'items',
    key: 'items',
},
    {
        title: 'Actions',
        fixed:'right',
        width:100,
        key: 'action',
        render: (text, record) => (
            <span>
              <Link to={`/admin/empresas/inventario/1/2/${record.id}`}>Detalle</Link>
            </span>
        ),
    }
];

class ListaAlmacen extends Component {
    render(){
        let {empresa, fetched, idl, ida, id}= this.props;

        if(!fetched)return(<MainLoader/>);

        let bline= empresa.line_comp[idl];
        let almac = bline.almacenes.filter(f=>{
            return ida == f.id;
        });
        console.log(almac[0].name)
        let items = almac.map(a=> a.items);


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

        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Empresas
                    <Divider type="vertical" />
                    {empresa.company}
                    <Divider type="vertical" />
                    <Link to={`/admin/empresas/inventario/${id}`}>Lineas de Negocio</Link>
                    <Divider type="vertical" />
                    {almac[0].name}

                </div>

                <h2>Lista de Items</h2>

                <Table
                    columns={columns}
                    dataSource={items[0]}
                    pagination={false}
                    rowKey={record => record.id}
                />



            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.em;
    let idl = ownProps.match.params.li;
    let ida = ownProps.match.params.n;
    let empresa = state.empresas.list.filter(a=>{
        return id == a.id;
    });
    empresa = empresa[0];


    return {
        id,
        empresa,
        idl,
        ida,
        fetched: empresa!==undefined && state.empresas.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        //empresaActions: bindActionCreators(empresaActions, dispatch),
    }
}

ListaAlmacen = connect(mapStateToProps, mapDispatchToProps ) (ListaAlmacen);


export default ListaAlmacen;