import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Table, Button, Modal, Switch, message, Popconfirm, Tag} from "antd";
import MainLoader from "../common/Main Loader";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const columns = [
    {
        title: 'Proveedor',
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
        render:no_check=> <span>{no_check?<span>{no_check}</span>:'No hay factura'}</span>
    },
    {
        title: 'Status',
        dataIndex:'paid',
        render:paid=><span>{paid?<Tag color="#87d068" style={{width:70, textAlign:'center'}}>Pagado</Tag>:<Tag color="#f50" style={{width:70, textAlign:'center'}}>Por Pagar</Tag>}</span>
    },
    {
        title: 'Actions',
        dataIndex: 'id',
        render: id => <Link to={`/admin/egresos/${id}`} >Detalle</Link>,
        fixed:'right',
        width:100
    },
];

class PagarEgreso extends Component {
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
        let filtrados = egresos.filter(f=>{return f.paid===false });
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <h1>Egresos * Pagar</h1>
                <Popconfirm title="Are you sure delete this egreso?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button disabled={!canDelete} type="primary" >Delete</Button>
                </Popconfirm>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filtrados}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                />
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
        //actions: bindActionCreators(actions, dispatch)
    }
}

PagarEgreso = connect(mapStateToProps, mapDispatchToProps)(PagarEgreso);
export default PagarEgreso;
