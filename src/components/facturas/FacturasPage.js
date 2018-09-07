import React, {Component, Fragment} from 'react';
import FacturaForm from './FacturaForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Table, Button, message, Divider} from 'antd';
import {Link} from 'react-router-dom';
import * as facturasActions from '../../redux/actions/facturas/facturasActions';
import MainLoader from "../common/Main Loader";
import EditFactura from './EditFactura';


class FacturasPage extends Component{
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
        this.deleteFactura();
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
                this.props.facturasActions.newFactura(values)
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

    visibleEdit=(obj)=>{
        this.setState({visibleEdit:true, infoEdit:obj});

    };

    cancelar = () => {
        this.setState({
            visibleEdit: false,
        });
    };



    render() {
        let {facturas, fetched, facturasData} = this.props;
        let {visible, visibleEdit, infoEdit} = this.state;

        const columns = [
            {
                title: 'Folio',
                dataIndex: 'factura',
                render: (factura,obj) =><Link to={`/admin/facturas/${obj.id}`}>{ factura && factura !== null ? factura: "No Factura"}</Link>,

            },

            {
                title: 'Actions',
                dataIndex: 'id',
                render: (id, obj) => <p onClick={()=>this.visibleEdit(obj)}>Editar</p>,
                fixed:'right',
                width:100
            },
        ];

        /*const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };*/
        if(!fetched)return(<MainLoader/>);


        return (
            <Fragment>

                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Facturas
                </div>

                <h2>
                    Facturas
                </h2>


                <Table

                    columns={columns}
                    dataSource={facturas}
                    rowKey={record => record.id}
                    scroll={{x:650, y:400}}
                    pagination={{
                        pageSize: 10,
                        total:facturasData.count,
                        onChange:this.handlePagination,
                        showTotal:total => `Total: ${total} Facturas`
                    }}
                    style={{marginBottom:10}}
                    height={'80vh'}
                />


                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <FacturaForm
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}/>
                <Divider
                    type={'vertical'}/>

                <EditFactura
                    onCancel={this.cancelar}
                    visible={visibleEdit}
                    data={this.state.infoEdit}
                    {...infoEdit}
                    edit={this.props.facturasActions.editFactura}


                />


                {/*<Modal
                    title="Editar factura"
                    visible={this.state.visibleEdit}
                    //onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>{this.state.infoEdit.id}</p>
                    <p>{this.state.infoEdit.factura}</p>
                    <p>Some contents...</p>
                </Modal>*/}

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