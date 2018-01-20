import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Table, Button, Modal} from 'antd';
import * as lotesActions from '../../../redux/actions/lotesActions';
import {bindActionCreators} from "redux";
import BatchForm from './BatchForm';
import MainLoader from "../../common/Main Loader";

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        render: text => <Link to={`/admin/lotes/${text}`} >{text}</Link>,
    },
    {
        title: 'Nombre',
        dataIndex: 'name',
    },
    {
        title: 'Estado',
        dataIndex: 'status',
        render: val => <p>{val?'Activo':'Inactivo'}</p>
    },
    {
        title: 'Corral',
        dataIndex: 'corral',
        render:val => <p>{val.no_corral}</p>
    }
];



const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};

class BatchPage extends Component {
    state = {
        ModalText: <BatchForm/>,
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
        let {lotes, fetched} = this.props;
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <h1>Lotes</h1>
                <Table rowSelection={rowSelection} columns={columns} dataSource={lotes} rowKey={record => record.id}/>

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <Modal title="Nuevo Lote"
                       visible={visible}
                       onCancel={this.handleCancel}
                       width={'30%'}
                       maskClosable={true}
                       footer={[
                           null,
                           null,
                       ]}
                >
                    {ModalText}
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, oP) => ({
    lotes:state.lotes.list,
    fetched:state.lotes.list!==undefined
});

const mapDispatchToProps = (dispatch) => ({
    lotesActions:bindActionCreators(lotesActions, dispatch)
});

BatchPage = connect(mapStateToProps,mapDispatchToProps)(BatchPage);
export default BatchPage;

