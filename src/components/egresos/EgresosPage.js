import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Table, Button, Switch, message, Popconfirm, Tag, Divider, Select, Modal} from "antd";
import MainLoader from "../common/Main Loader";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

import * as egresosActions from '../../redux/actions/egresosActions';
import FormEgreso from "./EgresoForm";

//fecha ingresos cuentas por cobrar ............... DONE!!
// razon social............... DONE!!
// .............nombre cambiar por razon social.....=> DONE!!

// check si es contacto directo o no con check e input => DONE!
// datos de facturación

// ...........en egreso si es costo o si es gasto.....
// si es costo a que almacen se va
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
        render:no_check=> <span>{no_check && no_check !==null ?<span>{no_check}</span>:'No hay factura'}</span>
    },
    {
        title: 'Status',
        dataIndex:'paid',
        render:paid=><span>{paid?<Tag color="#87d068" style={{width:70, textAlign:'center'}} >Pagado</Tag>:<Tag color="#f50" style={{width:70, textAlign:'center'}}>Por Pagar</Tag>}</span>
    },
    {
        title: 'Registro',
        dataIndex: 'created',
        render: created => moment(created).startOf(3, 'days').calendar()

    },
    {
        title: 'Actions',
        dataIndex: 'id',
        render: id => <Link to={`/admin/egresos/${id}`} >Detalle</Link>,
        fixed:'right',
        width:100
    },
];

class EgresosPage extends Component {
    state = {
        visible: false,
        selectedRowKeys:[],
        factura:false,
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

    saveFormRef = (form) => {
        this.form = form;
    };

    handleCreate = (e) => {
        const form = this.form;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                this.props.egresosActions.saveEgreso(values);
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

    handleChangeD = e => {
        this.setState({
            contacto_directo:e.target.checked
        })
    };


    render() {
        const { visible, selectedRowKeys } = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {egresos, fetched} = this.props;
        let options = opciones.map((a) => <Option key={a.name}>{a.name}</Option>);
        let options_proveedores = this.props.proveedores.map((a) => <Option value={parseInt(a.id)} key={a.id}>{a.provider}</Option>);
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <h1>Egresos Page</h1>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={egresos}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    pagination={false}
                    style={{marginBottom:10}}
                />

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <FormEgreso
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    options_proveedores={options_proveedores}
                    options={options}
                    handleChange={this.handleChange}
                    handleChangeD={this.handleChangeD}
                    contacto={this.state.contacto_directo}
                    factura = {this.state.factura}


                />

                <Divider
                    type={'vertical'}/>

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
        proveedores: state.proveedores.list,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        egresosActions: bindActionCreators(egresosActions, dispatch)
    }
}

EgresosPage = connect(mapStateToProps, mapDispatchToProps)(EgresosPage);
export default EgresosPage;
