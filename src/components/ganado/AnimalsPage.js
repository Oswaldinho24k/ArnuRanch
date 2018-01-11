import React, {Component} from 'react';
import {Table, Row, Col, Card, Button, Modal} from "antd";
import {Link} from 'react-router-dom';
import FormAnimal from './FormAnimal';
import * as animalActions from '../../redux/actions/animalsActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


const columns = [
    {
        title:'Key',
        dataIndex: 'key',
        render: text => <Link to={`/admin/animals/${text}`} >{text}</Link>,
    },
    {
    title: 'Arete Rancho',
    dataIndex: 'Arete_Rancho',
}, {
    title: 'Fecha Entrada',
    dataIndex: 'Fecha_Entrada',
},{
    title:'Lote',
    dataIndex: 'Lote'
},
];
const data = [{
    key: '1',
    Arete_Siniga: '1T2T3G44TY',
    Arete_Rancho: 'ArnusRanch12',
    Fecha_Entrada: '10/01/2018 ',
    Fecha_Registro: '10/01/2018',
    Peso_Entrada: '500kg',
    Descripcion: 'Probando...',
    Costo_kilo: '$45.00',
    Raza: 'Pura',
    Color: 'Black',
    Comentarios: '#MarchaParaElCalentadorEnFixter2018',
    Owner: 'Joshep',
    Lote: '1234',
    Status: 'Active',
    Costo_Inicial: '$100.00',
    Fierro_Original: 'Foto?',
    Fierro_Nuevo: 'Foto?',
    Factura_Orig: 'mjlkfsd132',
    Numero_Semana: '2',
    Ano: '2018',
    Mes: '01',
    Cuarto: '24'


}, {
    key: '2',
    Arete_Siniga: '1T2T3G44TY',
    Arete_Rancho: 'ArnusRanch13',
    Fecha_Entrada: '10/01/2018 ',
    Fecha_Registro: '10/01/2018',
    Peso_Entrada: '500kg',
    Descripcion: 'Probando...',
    Costo_kilo: '$45.00',
    Raza: 'Pura',
    Color: 'Black',
    Comentarios: '#MarchaParaElCalentadorEnFixter2018',
    Owner: 'Joshep',
    Lote: '1234',
    Status: 'Active',
    Costo_Inicial: '$100.00',
    Fierro_Original: 'Foto?',
    Fierro_Nuevo: 'Foto?',
    Factura_Orig: 'mjlkfsd132',
    Numero_Semana: '2',
    Ano: '2018',
    Mes: '01',
    Cuarto: '24'
}, {
    key: '3',
    Arete_Siniga: '1T2T3G44TY',
    Arete_Rancho: 'ArnusRanch14',
    Fecha_Entrada: '10/01/2018 ',
    Fecha_Registro: '10/01/2018',
    Peso_Entrada: '500kg',
    Descripcion: 'Probando...',
    Costo_kilo: '$45.00',
    Raza: 'Pura',
    Color: 'Black',
    Comentarios: '#MarchaParaElCalentadorEnFixter2018',
    Owner: 'Joshep',
    Lote: '1234',
    Status: 'Active',
    Costo_Inicial: '$100.00',
    Fierro_Original: 'Foto?',
    Fierro_Nuevo: 'Foto?',
    Factura_Orig: 'mjlkfsd132',
    Numero_Semana: '2',
    Ano: '2018',
    Mes: '01',
    Cuarto: '24'
}, {
    key: '4',
    Arete_Siniga: '1T2T3G44TY',
    Arete_Rancho: 'ArnusRanch15',
    Fecha_Entrada: '10/01/2018 ',
    Fecha_Registro: '10/01/2018',
    Peso_Entrada: '500kg',
    Descripcion: 'Probando...',
    Costo_kilo: '$45.00',
    Raza: 'Pura',
    Color: 'Black',
    Comentarios: '#MarchaParaElCalentadorEnFixter2018',
    Owner: 'Joshep',
    Lote: '1234',
    Status: 'Active',
    Costo_Inicial: '$100.00',
    Fierro_Original: 'Foto?',
    Fierro_Nuevo: 'Foto?',
    Factura_Orig: 'mjlkfsd132',
    Numero_Semana: '2',
    Ano: '2018',
    Mes: '01',
    Cuarto: '24'
}];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    /*getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
    }),*/
};


class AnimalsPage extends Component {
    state = {
        ModalText: <FormAnimal saveAnimal={this.props.animalActions.saveAnimal} />,
        visible: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        console.log(this.props.animalActions)
        return (
            <div>
                <h1>Animals</h1>
                <Table bordered rowSelection={rowSelection} columns={columns} dataSource={data} />

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <Modal title="Agregar nuevo animal"
                       visible={visible}
                       onCancel={this.handleCancel}
                       width={'60%'}
                       maskClosable={true}
                       footer={[
                           null,
                           null,
                       ]}
                >
                    {ModalText}
                </Modal>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        animals: state.animals.list
    }
}

function mapDispatchToProps(dispatch) {
    return {
        animalActions: bindActionCreators(animalActions, dispatch)
    }
}

AnimalsPage = connect(mapStateToProps, mapDispatchToProps)(AnimalsPage);
export default AnimalsPage;
