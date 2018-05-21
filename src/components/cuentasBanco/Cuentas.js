import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Table, Button, message, Divider, Popconfirm, Modal} from 'antd';
import {Link} from 'react-router-dom';
import * as cuentasActions from '../../redux/actions/cuentas/cuentasActions';
import MainLoader from "../common/Main Loader";

import CuentaForm from './CuentaForm';
//import EditFactura from './EditFactura';


class CuentasPage extends Component{
    state = {
        visible:false,
        selectedRowKeys:[],
        visibleEdit:false,
        infoEdit:[]
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    deleteCuenta=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.cuentasActions.deleteCuenta(keys[i])
                .then(r=>{
                    console.log(r)
                }).catch(e=>{
                console.log(e)
            })
        }
        this.setState({selectedRowKeys:[]})
    };
    confirm=(e)=> {
        this.deleteCuenta();
        message.success('Deleted successfully');
    };

    cancel=(e) =>{
        console.log(e);
    };

    onSelectChange = (selectedRowKeys) => {
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
                this.props.cuentasActions.newCuenta(values)
                    .then(r=>{
                        message.success('Guardado con éxito');
                        form.resetFields();
                    }).catch(e=>{
                    for (let i in e.response.data){
                        message.error(e.response.data[i])
                    }
                });

                this.setState({ visible: false });
            }else{message.error('Algo fallo, verifica los campos');}

        });
    };

    handlePagination=(pagina)=>{
        let nextLength = pagina.toString().length;
        let newUrl = this.props.cuentasData.next;
        if(newUrl===null){
            newUrl = this.props.cuentasData.previous;
        }

        if( pagina ==1 && this.props.cuentasData.count <= 20){
            newUrl='http'+newUrl.slice(4,newUrl.length);
        }else{
            newUrl='http'+newUrl.slice(4,newUrl.length-nextLength)+pagina;
        }
        this.props.cuentasActions.getCuentas(newUrl);
    };

    visibleEdit=(obj)=>{
        this.setState({visibleEdit:true, infoEdit:obj});

    };

    cancelar = () => {
        this.setState({
            visibleEdit: false,
        });
    };



    render() {
        let {cuentas, fetched, cuentasData} = this.props;
        let {visible, selectedRowKeys, visibleEdit, infoEdit} = this.state;

        const columns = [
            {
                title: 'Cuenta',
                dataIndex: 'cuenta',
                //render: (cuenta,obj) =><Link to={`/admin/cuentas/${obj.id}`}>{ cuenta && cuenta !== null ? cuenta: "No cuenta"}</Link>,

            },

            {
                title: 'Banco',
                dataIndex: 'banco',

            },

            /*{
                title: 'Actions',
                dataIndex: 'id',
                render: (id, obj) => <p onClick={()=>this.visibleEdit(obj)}>Editar</p>,
                fixed:'right',
                width:100
            },*/
        ];

        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        if(!fetched)return(<MainLoader/>);


        return (
            <Fragment>

                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Cuentas
                </div>

                <h2>
                    Cuentas
                </h2>


                <Table

                    columns={columns}
                    dataSource={cuentas}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    pagination={{
                        pageSize: 10,
                        total:cuentasData.count,
                        onChange:this.handlePagination,
                        showTotal:total => `Total: ${total} Cuentas`
                    }}
                    style={{marginBottom:10}}
                    height={'80vh'}
                />


                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <CuentaForm
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}/>
                <Divider
                    type={'vertical'}/>

                {/*<EditCuenta
                    onCancel={this.cancelar}
                    visible={visibleEdit}
                    data={this.state.infoEdit}
                    {...infoEdit}
                    edit={this.props.cuentasActions.editCuenta}


                />*/}


            </Fragment>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        cuentas: state.cuentas.list,
        cuentasData:state.cuentas.allData,
        fetched:state.cuentas.list !== undefined && state.cuentas.allData !==undefined
    }
}

function mapDispatchToProps(dispatch) {
    return {
        cuentasActions: bindActionCreators(cuentasActions, dispatch)
    }
}

CuentasPage = connect(mapStateToProps, mapDispatchToProps)(CuentasPage);
export default CuentasPage;