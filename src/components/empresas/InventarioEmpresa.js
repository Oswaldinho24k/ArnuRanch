import React, {Component} from 'react';
import {Card, Divider, Tabs, Table, Button, message} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MainLoader from "../common/Main Loader";

import AlmacenForm from "./nuevoAlmacen/AlmacenForm"

import * as almacenActions from '../../redux/actions/almacen/almacenActions';
import AlmacenCard from "./nuevoAlmacen/AlmacenCard";

const TabPane = Tabs.TabPane;

const gridStyle = {
    width: '100%',
    height: '150px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding:'80px'
};



class InventarioEmpresa extends Component{
    state={
        key:"0",
        visible:false,
    };

    callback=(key)=>{
        this.setState({key:key})
    };

    saveFormRef = (form) => {
        this.form = form;
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

    handleCreate = (e) => {
        const form = this.form;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);

                this.props.almacenActions.saveAlmacen(values)
                    .then(r=>{
                        message.success('Guardado con éxito');

                        form.resetFields();
                        this.setState({ visible: false });
                    })
                    .catch(e=>{
                        for (let i in e.response.data){
                            message.error(e.response.data[i])
                        }
                        console.log(values)
                    })
            }else{message.error('Algo fallo, verifica los campos');}

        });
    };



    render(){
//Cambiar info here
        let {empresa, fetched, empresas} = this.props;
        console.log(empresas)
        let {visible, key} = this.state;
        if(!fetched)return(<MainLoader/>);
        let datos = [empresa.line_comp[this.state.key]];
        let almacenes = datos.map(a=> a.almacenes);
        let infor = almacenes[0];
        console.log(infor)
        let info = infor.filter(f=> { return f.company === empresa.id})
        console.log(info);
        let items = info.map(a=> a.items);
        console.log(empresa)


        let bline= empresa.line_comp[key];
        console.log(bline);

        const expandedRowRender = () => {
            const columns = [
                {title: 'Item', dataIndex: 'id', key: 'id'},
                {title: 'Tipo', dataIndex: 'product_type', key: 'product_type'},
                {title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad'},
                {title: 'Costo Unitario', dataIndex: 'costo_u', key: 'costo_u'},
                {title: 'Total', dataIndex: 'total', key: 'total'},
                {
                    title: 'Action',
                    dataIndex: 'operation',
                    key: 'operation',
                    render: () => (
                        <span className="table-operation">
            <a href="#">Pause</a>
            <a href="#">Stop</a>

          </span>
                    ),
                },
            ];

            return (
                <Table
                    columns={columns}
                    dataSource={items[0]}
                    pagination={false}
                    rowKey={record => record.id}
                />
            );
        }



        const columns = [
            {
                title: 'Nombre de almacen',
                dataIndex: 'name',

            },
            {
                title: 'Items',
                dataIndex: 'items',
                render: items => items.length
            },

        ];

        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    <Link to={`/admin/empresas/`} style={{color:'black'}} >Empresas</Link>
                    <Divider type="vertical" />
                    {empresa.company}

                </div>

                <Card style={{textAlign:'center'}}>
                    <h3><strong>Lineas de Negocio</strong></h3>
                    <Tabs defaultActiveKey={this.state.key} onChange={this.callback}>
                        {empresa.line_comp.length>0 ?
                            empresa.line_comp.map((p, index) => {
                                return(
                                    <TabPane tab={p.name} key={index} />
                                    )
                            })
                            :
                            "Esta empresa no tiene lineas de negocio..."
                            }
                    </Tabs>

                    <div style={{flexWrap: 'wrap', display:'flex', justifyContent:'center', alignItems:'center'}}>


                        <AlmacenCard info={info}/>

                    </div>

                    <Button type="primary" onClick={this.showModal}>Agregar Almacen</Button>
                    <AlmacenForm
                        ref={this.saveFormRef}
                        visible={visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        bline={bline}
                        empresa={empresa}



                    />
                </Card>



            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.em;
    let empresas = state.empresas.list;
    let empresa = state.empresas.list.filter(a=>{
        return id == a.id;
    });
    empresa = empresa[0];

    return {
        empresa,
        empresas,
        fetched: empresa!==undefined && state.empresas.list!==undefined && empresa.line_comp !==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        almacenActions: bindActionCreators(almacenActions, dispatch),
    }
}

InventarioEmpresa = connect(mapStateToProps, mapDispatchToProps ) (InventarioEmpresa);
export default InventarioEmpresa;

