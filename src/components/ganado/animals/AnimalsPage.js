import React, {Component} from 'react';
import {Table, Row, Col, Card, Button, Modal, Divider, Icon} from "antd";
import {Link} from 'react-router-dom';
import FormAnimal from './FormAnimal';


import * as animalActions from '../../../redux/actions/animalsActions';
import * as lotesActions from '../../../redux/actions/lotesActions';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


const columns = [
{
    title: 'Arete Rancho',
    dataIndex: 'arete_rancho',
},{
    title: 'Arete Siniga',
    dataIndex: 'arete_siniga',
}, {
    title: 'Owner',
    dataIndex: 'owner',
},
{
    title: 'Actions',
    key: 'action',
    width: 360,
    render: (text, record) => (
        <span>
  <Link to={`/admin/animals/${record.id}`}>Detalle</Link>
  <Divider type="vertical" />
  <a href="#">Delete</a>
</span>
    ),
}];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};


class AnimalsPage extends Component {
    state = {
        ModalText: <FormAnimal saveAnimal={this.props.animalActions.saveAnimal} lotes={this.props.lotes} handleCancel={this.handleCancel}/>,
        visible: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible, ModalText } = this.state;
        let {animals} = this.props;
        return (
            <div>
                <h1>Animals</h1>
                <Table bordered rowSelection={rowSelection} columns={columns} dataSource={animals} rowKey={record => record.id}/>

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
        animals: state.animals.list,
        lotes:state.lotes.list,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        animalActions: bindActionCreators(animalActions, dispatch),
        lotesActions:bindActionCreators(lotesActions, dispatch)
    }
}

AnimalsPage = connect(mapStateToProps, mapDispatchToProps)(AnimalsPage);
export default AnimalsPage;
