import React, {Component} from 'react';
import TablePageB from "../clientes/TablePageB";
import {Divider, Table, message, Button} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import MainLoader from "../common/Main Loader";
import FormItems from "./items/FormItems";
import * as itemsActions from '../../redux/actions/items/itemsActions';
import {bindActionCreators} from 'redux';


class ListaAlmacen extends Component {

    state = {
        visible: false,
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
                this.props.itemsActions.saveItem(values);
                message.success('Guardado con éxito');

                form.resetFields();
                this.setState({ visible: false });
            }else{message.error('Algo fallo, verifica los campos');}

        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };


    render(){
        let {empresa, fetched, idl, ida, id, almacenDetail, listAlmacen}= this.props;
        let {visible} = this.state;
        if(!fetched)return(<MainLoader/>);


        let bline= empresa.line_comp.find(f=>f.id ==idl);
        let almacen = bline.almacenes.find(f=>f.id==ida)

        let items = almacenDetail.items.map(f=>{return f})
        console.log(items)

        const columns = [
            {title: 'Item', dataIndex: 'id', key: 'id'},
            {title: 'Tipo', dataIndex: 'product_type', key: 'product_type'},
            {title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad'},
            {title: 'Costo Unitario', dataIndex: 'costo_u', key: 'costo_u'},
            {title: 'Total', dataIndex: 'total', key: 'total'},

        ];

        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Empresas
                    <Divider type="vertical" />
                    <Link to={`/admin/empresas/inventario/${empresa.id}`}>
                    {empresa.company}
                    </Link>
                    <Divider type="vertical" />
                    Lista de Items
                    <Divider type="vertical" />


                </div>

                <h2>Lista de Items Fake</h2>

                <Table
                    columns={columns}
                    dataSource={items}
                    pagination={false}
                    rowKey={record => record.id}
                />

                <Button type="primary" onClick={this.showModal}>Agregar Item</Button>
                <FormItems
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    empresa={empresa}
                    bline={bline}
                    almacen={almacen}

                />



            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.em;
    let idl = ownProps.match.params.li;
    let ida = ownProps.match.params.n;
    let empresa = state.empresas.list.filter(a=>{
        return id == a.id;
    });
    empresa = empresa[0];

    let almacenDetail = state.almacen.list.filter(almacen=>{
        return ida == almacen.id;
    });
    almacenDetail = almacenDetail[0];
    let listAlmacen=state.almacen.list;


    return {
        id,
        empresa,
        idl,
        ida,
        almacenDetail,
        listAlmacen,
        fetched: empresa!==undefined && state.empresas.list!==undefined && almacenDetail!==undefined && state.almacen.list!==undefined && listAlmacen !== undefined
    }
}

function mapDispatchToProps(dispatch) {
    return{
        itemsActions: bindActionCreators(itemsActions, dispatch),
    }
}

ListaAlmacen = connect(mapStateToProps, mapDispatchToProps ) (ListaAlmacen);


export default ListaAlmacen;