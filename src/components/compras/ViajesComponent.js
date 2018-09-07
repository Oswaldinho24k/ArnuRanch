import React, {Component, Fragment} from 'react';
import {Table, Modal, Button} from 'antd'
import RequisicionesWForm from "./RequisicionesForm";
import {Link} from 'react-router-dom'


const dataSource = [{
    key: '1',
    camion: 'Camion1',
    pedidos: '5',
    chofer: 'Juan'
}, {
    key: '2',
    camion: 'Camion2',
    pedidos: '2',
    chofer: 'Manuel'
}];

const columns = [{
    title: 'Camión',
    dataIndex: 'camion',
    key: 'camion',
    render:(i, obj)=> <Link to={`/admin/viajes/${obj.key}`}>{i}</Link>
}, {
    title: 'Pedidos en Curso',
    dataIndex: 'pedidos',
    key: 'pedidos',
},{
    title: 'Chofer',
    dataIndex: 'chofer',
    key: 'chofer',
}];

class ViajesComponent extends Component{

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
                <Button onClick={this.showModal}type={"primary"}> Agregar</Button>
                <Modal
                    title="Requisiciones de Compra"
                    visible={visible}
                    onCancel={this.showModal}
                >
                    <RequisicionesWForm/>
                </Modal>
            </Fragment>
        )
    }
}

export default ViajesComponent
