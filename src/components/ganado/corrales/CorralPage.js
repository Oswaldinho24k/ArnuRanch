import React, {Component} from 'react';
import {Table, Button, Modal} from "antd";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as corralesActions from '../../../redux/actions/corralesActions';
import moment from 'moment';
import FormCorral from "./CorralForm";


const columns = [
    {
        title: 'NUMERO SERIAL',
        dataIndex: 'numero_serial',
    }, {
        title: 'FECHA GENERACIÓN',
        dataIndex: 'fecha_generacion',
        render:val=><p>{moment(val).format('LL')}</p>

    }, {
        title: 'LOTE',
        dataIndex: 'lotes',
        render:val=><Link to={`/admin/lotes/${val.id}`}>{val.name}</Link>

    }

];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};


class CorralPage extends Component {
    state = {
        ModalText: <FormCorral saveCorral={this.props.corralesActions.saveCorral}/>,
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
        let {corrales} = this.props;
        return (
            <div>
                <h1>Corrales</h1>
                <Table
                    pagination={false}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={corrales}
                    rowKey={record => record.id}

                />

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <Modal title="Agregar nuevo corral"
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
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        corrales: state.corrales.list
    }
}

function mapDispatchToProps(dispatch) {
    return {
        corralesActions: bindActionCreators(corralesActions, dispatch)
    }
}

CorralPage = connect(mapStateToProps, mapDispatchToProps)(CorralPage);
export default CorralPage;