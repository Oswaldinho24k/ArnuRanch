import React, {Component} from 'react';
import TablePageB from "../clientes/TablePageB";
import {Divider} from 'antd';
import {Link} from 'react-router-dom';


const dataSource = [{
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street'
}, {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
}];

const columns = [{
    title: 'Almacen',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Items',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}];

class ListaAlmacen extends Component {
    render(){
        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    <Link to={`/admin/empresas/`} style={{color:'black'}} >Empresas</Link>
                    <Divider type="vertical" />
                    Empresa id
                    <Divider type="vertical" />
                    almacen id
                </div>

                <h2>Lista de Almacenes</h2>

                <TablePageB data={dataSource} columns={columns}/>
            </div>
        )
    }
}

export default ListaAlmacen;