import React, {Component} from 'react';
import {Card, Divider, Tabs, Table, Button, message, Icon, Avatar, Popconfirm} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MainLoader from "../common/Main Loader";

import AlmacenForm from "./nuevoAlmacen/AlmacenForm"

import * as almacenActions from '../../redux/actions/almacen/almacenActions';


const TabPane = Tabs.TabPane;
const { Meta } = Card;


class InventarioEmpresa extends Component{
    state={
        key:"0",
        visible:false,
        visibleEdit:false,
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

                    })
            }else{message.error('Algo fallo, verifica los campos');}

        });
    };

    eliminarAlmacen =(almacen)=>{
            this.props.almacenActions.deleteAlmacen(almacen)
                .then(r=>{

                }).catch(e=>{

            })
        };

    confirm=(p)=> {

        this.eliminarAlmacen(p)
        message.success('Deleted successfully');
    };

    cancel=(e) =>{

    };



    render(){

        let {empresa, fetched, empresas} = this.props;

        let {visible, key, visibleEdit} = this.state;
        if(!fetched)return(<MainLoader/>);
        let datos = [empresa.line_comp[this.state.key]];
        let almacenes = datos.map(a=> a.almacenes);
        let infor = almacenes[0];

        let info = infor.filter(f=> { return f.company === empresa.id})

        let items = info.map(a=> a.items);



        let bline= empresa.line_comp[key];



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

                        {info && info.length>0?
                            info.map((p,index) =>(
                                <div key={index}>

                                        <Card
                                            style={{ width: 300, margin:10 }}
                                            actions={[
                                                <Link to={`/admin/empresas/inventario/${empresa.id}/${bline.id}/detalle/${p.id}/`} >
                                                    <Icon type="edit" />
                                                </Link>,
                                                <Popconfirm title="Are you sure delete this almacen?" onConfirm={()=>this.confirm(p)} onCancel={this.cancel} okText="Yes" cancelText="No">
                                                <Icon type="delete" />
                                                </Popconfirm>]}
                                        >
                                            <Link to={`/admin/empresas/inventario/${empresa.id}/${bline.id}/${p.id}`} style={{color:'black', margin:'10px'}} key={p.id} >
                                            <Meta
                                                title={p.name}
                                            />
                                            </Link>
                                        </Card>

                                </div>
                            )):"No tiene almacén"
                        }


                    </div>

                    <div style={{display:'flex', marginTop:10}}>

                    <Button type="primary" onClick={this.showModal}>Agregar Almacen</Button>
                    <AlmacenForm
                        ref={this.saveFormRef}
                        visible={visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        bline={bline}
                        empresa={empresa}



                    />
                    </div>
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

