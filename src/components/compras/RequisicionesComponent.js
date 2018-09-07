import React, {Component, Fragment} from 'react';
import {Table, Modal, Button} from 'antd'
import RequisicionesWForm from "./RequisicionesForm";


const dataSource = [{
    key: '1',
    producto: 'Vacas',
    bl: 'Granos',
    date: '20/08/18'
}, {
    key: '2',
    producto: 'Pasto',
    bl: 'Ganado',
    date: '20/08/18'
},{
    key: '3',
    producto: 'Vacunas',
    bl: 'Cerdos',
    date: '20/08/18'
}];

const columns = [{
    title: 'Producto',
    dataIndex: 'producto',
    key: 'producto',
}, {
    title: 'Linea de Negocio',
    dataIndex: 'bl',
    key: 'bl',
}, {
    title: 'Fecha de Solicitud',
    dataIndex: 'date',
    key: 'date',
}];

class RequisicionesComponent extends Component{

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

export default RequisicionesComponent
