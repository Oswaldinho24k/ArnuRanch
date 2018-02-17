import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Table, Button, Modal, Switch, message, Popconfirm, Tag} from "antd";
import MainLoader from "../common/Main Loader";
import moment from 'moment';
import * as egresosActions from '../../redux/actions/egresosActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const columns = [
    {
        title: 'Razón Social',
        dataIndex: 'provider',
        render: provider=>provider && provider !== null ?provider.provider:'No Provider'
    },
    {
        title: 'Linea de negocio',
        dataIndex: 'business_line',
    },
    {
        title: 'No. Factura',
        dataIndex: 'no_check',
        render:no_check=> <span>{no_check && no_check !==null ?<span>{no_check}</span>:'No hay factura'}</span>
    },
    {
        title: 'Tipo',
        dataIndex:'type',
        render:type=><span>{type?<Tag color="#2db7f5" style={{width:70, textAlign:'center'}}>Gasto</Tag>:<Tag color="#f50" style={{width:70, textAlign:'center'}}>GastoFail</Tag>}</span>
    },
    {
        title: 'Registro',
        dataIndex: 'created',
        render: created => moment(created).startOf('day').fromNow()

    },
    {
        title: 'Actions',
        dataIndex: 'id',
        render: id => <Link to={`/admin/egresos/${id}`} >Detalle</Link>,
        fixed:'right',
        width:100
    },
];

class CuentasBanco extends Component {
    state = {
        selectedRowKeys:[]
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    deleteEgreso=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.egresosActions.deleteEgreso(keys[i])
                .then(r=>{
                    console.log(r)
                }).catch(e=>{
                console.log(e)
            })
        }
        this.setState({selectedRowKeys:[]})
    };
    confirm=(e)=> {
        console.log(e);
        this.deleteEgreso();
        message.success('Deleted successfully');
    };

    cancel=(e) =>{
        console.log(e);
    };

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };


    render() {
        const { selectedRowKeys } = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {egresos, fetched} = this.props;
        let filtrados = egresos.filter(f=>{return f.type==="Gasto" });
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <h1>Cuentas Banco tipo gasto</h1>

                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filtrados}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    pagination={false}
                    style={{marginBottom:10}}
                />

                <Popconfirm title="Are you sure delete this egreso?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button disabled={!canDelete} type="primary" >Delete</Button>
                </Popconfirm>

            </Fragment>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        egresos: state.egresos.list,
        fetched: state.egresos.list !==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        egresosActions: bindActionCreators(egresosActions, dispatch)
    }
}

CuentasBanco = connect(mapStateToProps, mapDispatchToProps)(CuentasBanco);
export default CuentasBanco;
