import React, {Component} from 'react';
import TablePageB from "../clientes/TablePageB";
import {Divider} from 'antd';
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
    render: value =>(value[0].name)

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
        let {empresa, fetched, pathname}= this.props;

        let filtrados = empresa.line_comp.filter(f=>{return f.id==pathname});

        if(!fetched)return(<MainLoader/>);
        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Empresas
                    <Divider type="vertical" />
                    <Link to={`/admin/empresas/inventario/${empresa.id}`} style={{color:'black'}} >{empresa.company}</Link>
                    <Divider type="vertical" />

                </div>

                <h2>Lista de Almacenes</h2>

                <TablePageB data={filtrados} columns={columns}/>

            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let path = ownProps.location.pathname;
    let pathname = path.slice(-1);

    let id = ownProps.match.params.em;
    let empresa = state.empresas.list.filter(a=>{
        return id == a.id;
    });
    empresa = empresa[0];

    return {
        pathname,
        empresa,
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