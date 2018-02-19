import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, message, Modal, Popconfirm, Table, Tag, Divider, Select} from "antd";
import moment from 'moment';
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";
import * as ingresosActions from '../../redux/actions/ingresosActions';
import FormIngreso from "./IngresoForm";

const Option = Select.Option;

const opciones = [{
    name :'Cerdos',
    id: 1
},
    {
        name:'Ganado',
        id:2
    },
    {
        name:'Granos',
        id:3
    },
    {
        name:'Planta de alimentos',
        id:4
    },
    {
        name:'Campo',
        id:5
    },

];


const columns = [
    {
        title: 'Razón Social',
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
        render:no_scheck=> <span>{no_scheck && no_scheck !==null ?<span>{no_scheck}</span>:'No hay factura'}</span>
    },
    {
        title: 'Status',
        dataIndex:'paid',
        render:paid=><span>{paid?<Tag color="#87d068" style={{width:70, textAlign:'center'}}>Cobrado</Tag>:<Tag color="#f50" style={{width:70, textAlign:'center'}}>Por Cobrar</Tag>}</span>
    },
    {
      title: 'Registro',
      dataIndex: 'created',
      render: created => moment(created).format('LL')

    },
    {
        title: 'Actions',
        dataIndex: 'id',
        render: id => <Link to={`/admin/ingresos/${id}`} >Detalle</Link>,
        fixed:'right',
        width:100
    },
];

class IngresosPage extends Component {
    state = {
        visible: false,
        selectedRowKeys:[],
        contacto_directo:true,
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

    saveFormRef = (form) => {
        this.form = form;
    };

    handleCreate = (e) => {
        const form = this.form;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                this.props.ingresosActions.saveIngreso(values);
                message.success('Guardado con éxito');

                form.resetFields();
                this.setState({ visible: false });
            }else{message.error('Algo fallo, verifica los campos');}

        });
    };

    handleChange = e => {
        this.setState({
            factura: e.target.checked
        })
    };



    render() {
        const { visible, selectedRowKeys } = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {ingresos, fetched, clientes} = this.props;
        console.log(clientes)
        let options = opciones.map((a) => <Option key={a.name}>{a.name}</Option>);
        let options_clientes = clientes.map((a) => <Option value={parseInt(a.id)} key={a.id}>{a.client}</Option>);
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <h1>Ingresos Page</h1>

                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={ingresos}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    pagination={false}
                    style={{marginBottom:10}}
                />

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <FormIngreso
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    options_clientes={options_clientes}
                    options={options}
                    handleChange={this.handleChange}
                    factura = {this.state.factura}

                />


                <Divider
                    type={'vertical'}/>

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
        fetched: state.ingresos.list !== undefined && state.clientes.list !==undefined,
        clientes:state.clientes.list,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ingresosActions: bindActionCreators(ingresosActions, dispatch)
    }
}

IngresosPage = connect(mapStateToProps, mapDispatchToProps)(IngresosPage);
export default IngresosPage;
