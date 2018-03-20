import React, {Component} from 'react';
import {Table, Button, Modal, message, Popconfirm, Divider} from "antd";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as corralesActions from '../../../redux/actions/ganado/corralesActions';
import moment from 'moment';
import FormCorral from "./CorralForm";


const columns = [
    {
        title: 'Numero de Corral',
        dataIndex: 'no_corral',
        width:200
    },
    /*{
        title: 'Numero de Serial',
        dataIndex: 'numero_serial',
        width:200
    },*/ {
        title: 'Fecha de Generación',
        dataIndex: 'fecha_generacion',
        render:val=><p>{moment(val).format('LL')}</p>,
        width:200

    }, {
        title: 'Lote Actual',
        dataIndex: 'lotes',
        render:val=> <span>{val?<Link to={`/admin/lotes/${val.id}`}>{val.name}</Link>:'No asignado'}</span>,
        width:200
}];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};


class CorralPage extends Component {
    state = {
        visible: false,
        selectedRowKeys:[],
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
    saveCorral=(v)=>{
        this.props.corralesActions.saveCorral(v)
            .then(r=>{
                message.success('agregado con éxito');
                this.handleCancel()
            }).catch(e=>{
                for (let i in e.response.data){
                    console.log(e.response.data[i])
                    message.error(e.response.data[i])
                }
        })
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    deleteCorrales=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.corralesActions.deleteCorral(keys[i])
                .then(r=>{
                    console.log(r);
                    message.success('Deleted successfully');
                }).catch(e=>{

                message.error('No puedes eliminar este Lote')
                /*for (let i in this.props.errors){
                    console.log(this.props.errors[i])
                    message.error(this.props.errors[i])
                }*/

            })
        }
        this.setState({selectedRowKeys:[]})
    };
    confirm=()=>{
        this.deleteCorrales()
    };
    cancel=()=>{
        console.log('ño')
    }

    render() {
        const { visible, selectedRowKeys } = this.state;
        let {corrales} = this.props;
        const canUse = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <h2>Listado de Corrales</h2>
                <Table
                    pagination={false}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={corrales}
                    rowKey={record => record.id}
                    scroll={{x:650, y:500}}
                />

                <Button type="primary" onClick={this.showModal} style={{margin:'1% 0'}}>Agregar</Button>
                <Divider
                    type={'vertical'}/>
                <Popconfirm title="Are you sure delete this animals?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button disabled={!canUse} type="primary">Delete</Button>
                </Popconfirm>
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
                    <FormCorral saveCorral={this.saveCorral}/>
                </Modal>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        corrales: state.corrales.list,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        corralesActions: bindActionCreators(corralesActions, dispatch)
    }
}

CorralPage = connect(mapStateToProps, mapDispatchToProps)(CorralPage);
export default CorralPage;