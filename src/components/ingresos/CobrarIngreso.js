import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Table, Button, Modal, message, Popconfirm, Tag, Divider} from "antd";
import * as ingresosActions from '../../redux/actions/ingresosActions';
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";




const columns = [
    {
        title: 'Cliente',
        dataIndex: 'client',
        render: client=>client && client !== null ?client.client:'No Cliente'
    },
    {
        title: 'Linea de negocio',
        dataIndex: 'business_line',
    },
    {
        title: 'No. Factura',
        dataIndex: 'no_scheck',
        render:no_scheck=> <span>{no_scheck?<span>{no_scheck}</span>:'No hay factura'}</span>
    },
    {
        title: 'Status',
        dataIndex:'paid',
        render:paid=><span>{paid?<Tag color="#87d068" style={{width:70, textAlign:'center'}}>Cobrar</Tag>:<Tag color="#f50" style={{width:70, textAlign:'center'}}>Por Cobrar</Tag>}</span>
    },
    {
        title: 'Actions',
        dataIndex: 'id',
        render: id => <Link to={`/admin/ingresos/${id}`} >Detalle</Link>,
        fixed:'right',
        width:100
    },
];

class CobrarIngreso extends Component {
    state = {
        selectedRowKeys:[]
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    deleteIngreso=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.ingresosActions.deleteIngreso(keys[i])
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
        this.deleteIngreso();
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
        let {ingresos, fetched} = this.props;
        let filtrados = ingresos.filter(f=>{return f.paid===false });
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <h1>Ingresos por Cobrar</h1>

                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filtrados}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    pagination={false}
                    style={{marginBottom:10}}
                />

                <Popconfirm title="Are you sure delete this ingreso?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button disabled={!canDelete} type="primary" >Delete</Button>
                </Popconfirm>


            </Fragment>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        ingresos:state.ingresos.list,
        fetched: state.ingresos.list !== undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ingresosActions: bindActionCreators(ingresosActions, dispatch)
    }
}

CobrarIngreso = connect(mapStateToProps, mapDispatchToProps)(CobrarIngreso);
export default CobrarIngreso;