import React, {Component, Fragment} from 'react';
import FacturaForm from './FacturaForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Table, Button, message, Divider, Popconfirm} from 'antd';
import * as facturasActions from '../../redux/actions/facturas/facturasActions';
import MainLoader from "../common/Main Loader";

const columns = [
    {
        title: 'Folio',
        dataIndex: 'factura',

    },
];


class FacturasPage extends Component{
    state = {
        visible:false,
        selectedRowKeys:[],
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

    deleteFactura=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.facturasActions.deleteFactura(keys[i])
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
        this.deleteFactura();
        console.log("Eliminado")
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
                this.props.facturasActions.newFactura(values)
                    .then(r=>{
                        console.log(r);
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
        let newUrl = this.props.facturasData.next;
        if(newUrl===null){
            newUrl = this.props.facturasData.previous;
        }

        if( pagina ==1 && this.props.facturasData.count <= 20){
            newUrl='http'+newUrl.slice(4,newUrl.length);
        }else{
            newUrl='http'+newUrl.slice(4,newUrl.length-nextLength)+pagina;
        }
        this.props.facturasActions.getFacturas(newUrl);
    };



    render() {
        let {facturas, fetched, facturasData} = this.props;
        let {visible, selectedRowKeys} = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        if(!fetched)return(<MainLoader/>);


        return (
            <Fragment>
                <h2>
                    Facturas
                </h2>

                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={facturas}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    pagination={{
                        pageSize: 1,
                        total:facturasData.count,
                        onChange:this.handlePagination,
                        showTotal:total => `Total: ${total} Facturas`
                    }}
                    style={{marginBottom:10}}
                />

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <FacturaForm
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}/>
                <Divider
                    type={'vertical'}/>

            </Fragment>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        facturas: state.facturas.list,
        facturasData:state.facturas.allData,
        fetched:state.facturas.list !== undefined && state.facturas.allData !==undefined
    }
}

function mapDispatchToProps(dispatch) {
    return {
        facturasActions: bindActionCreators(facturasActions, dispatch)
    }
}

FacturasPage = connect(mapStateToProps, mapDispatchToProps)(FacturasPage);
export default FacturasPage;