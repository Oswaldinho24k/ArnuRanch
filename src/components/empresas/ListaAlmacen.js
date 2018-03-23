import React, {Component} from 'react';
import TablePageB from "../clientes/TablePageB";
import {Divider, Table} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import MainLoader from "../common/Main Loader";

const items =[
    {
        id:1,
        product_type: "tipo 1",
        cantidad:2,
        costo_u:8,
        total:16,
    },
    {
        id:2,
        product_type: "tipo 2",
        cantidad:4,
        costo_u:1,
        total:4,
    },
    {
        id:3,
        product_type: "tipo 3",
        cantidad:1,
        costo_u:100,
        total:100,
    }
];

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
        console.log(this.props)

        if(!fetched)return(<MainLoader/>);
        /*
                let bline= empresa.line_comp[idl];
                let almac = bline.almacenes.filter(f=>{
                    return ida == f.id;
                });
                console.log(almac[0])
                let items = almac.map(a=> a.items);*/




        const columns = [
            {title: 'Item', dataIndex: 'id', key: 'id'},
            {title: 'Tipo', dataIndex: 'product_type', key: 'product_type'},
            {title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad'},
            {title: 'Costo Unitario', dataIndex: 'costo_u', key: 'costo_u'},
            {title: 'Total', dataIndex: 'total', key: 'total'},

        ];

        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Empresas
                    <Divider type="vertical" />
                    <Link to={`/admin/empresas/inventario/${empresa.id}`}>
                    {empresa.company}
                    </Link>
                    <Divider type="vertical" />
                    Lista de Items
                    <Divider type="vertical" />


                </div>

                <h2>Lista de Items Fake</h2>

                {/*<Table
                    columns={columns}
                    dataSource={items[0]}
                    pagination={false}
                    rowKey={record => record.id}
                />*/}
                <Table
                    columns={columns}
                    dataSource={items}
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