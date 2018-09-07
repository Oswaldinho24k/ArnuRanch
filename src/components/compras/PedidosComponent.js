import React, {Component, Fragment} from 'react';
import {Table, Modal, Button} from 'antd'


const dataSource = [{
    key: '1',
    ficha: '292929',
    inventario: 'Granos',
    date: '20/08/18'
}, {
    key: '2',
    ficha: '01010101',
    inventario: 'Vacunas',
    date: '20/08/18'
},{
    key: '3',
    ficha: '727272',
    inventario: 'Otros',
    date: '20/08/18'
}];

const columns = [{
    title: 'Ficha de Pago',
    dataIndex: 'ficha',
    key: 'ficha',
}, {
    title: 'Inventrio',
    dataIndex: 'inventario',
    key: 'inventario',
}, {
    title: 'Fecha de Entrega',
    dataIndex: 'date',
    key: 'date',
}];

class PedidosComponent extends Component{

    state={
        visible:false
    }

    showModal = () => {
        this.setState({visible: !this.state.visible});
    }



    render(){
        let {visible} = this.state
        return(
            <Fragment>
                <Table dataSource={dataSource} columns={columns} />
            </Fragment>
        )
    }
}

export default PedidosComponent
