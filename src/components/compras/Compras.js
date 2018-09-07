import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Table, Button, message, Divider, Input} from 'antd';
//import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";
import * as comprasActions from '../../redux/actions/compras/comprasActions';
import * as linesActions from '../../redux/actions/blines/blinesActions';
import * as proveedoresActions from '../../redux/actions/administracion/proveedoresActions';
//import moment from 'moment';

import CompraForm from './CompraForm';

class Compras extends Component {

    state = {
        visible:false,
        selectedRowKeys:[],
        visibleEdit:false,
        infoEdit:[],
        searchText: '',
        canReset:false,
        idProv:null,
        idLn:null,
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
        const form = this.form;
        form.resetFields();
    };

    deleteCompra=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.comprasActions.deleteCompra(keys[i])
                .then(r=>{
                    console.log(r)
                }).catch(e=>{
                console.log(e)
            })
        }
        this.setState({selectedRowKeys:[]})
    };
    confirm=(e)=> {
        this.deleteCompra();
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
                values['proveedor_id']=this.state.idProv;
                values['linea_compras_id']=this.state.idLn;
                this.props.comprasActions.newCompra(values)
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
        let newUrl = this.props.comprasData.next;
        if(newUrl===null){
            newUrl = this.props.comprasData.previous;
        }

        if( pagina ==1 && this.props.comprasData.count <= 20){
            newUrl='http'+newUrl.slice(4,newUrl.length);
        }else{
            newUrl='http'+newUrl.slice(4,newUrl.length-nextLength)+pagina;
        }
        this.props.comprasActions.getCompras(newUrl);
    };

    visibleEdit=(obj)=>{
        this.setState({visibleEdit:true, infoEdit:obj});

    };

    cancelar = () => {
        this.setState({
            visibleEdit: false,
        });
    };

    //lineas

    searchLine=(a)=>{
        let basePath = 'http://127.0.0.1:8000/api/ingresos/blines/?q=';
        let url = basePath+a;
        this.props.linesActions.getLiSearch(url);
    };
    //providers

    searchProveedor=(a)=>{
        let basePath = 'http://127.0.0.1:8000/api/egresos/proveedores/?q=';
        let url = basePath+a;
        this.props.proveedoresActions.getPrSearch(url);
    };
    //search

    onSearch = () => {
        let basePath= "http://localhost:8000/api/egresos/compras/?q=";
        //let basePath = 'https://rancho.fixter.org/api/egresos/compras/?q=';

        let url = basePath+this.state.searchText;
        this.props.comprasActions.getCompras(url);
        this.setState({canReset:true})

    };
    handleSearch=(e)=>{
        this.setState({searchText:e.target.value})
    };
    //resetFilter
    resetFilter = () => {
        let basePath= "http://localhost:8000/api/egresos/compras/";
        //let basePath = 'https://rancho.fixter.org/api/egresos/compras/';
        this.props.comprasActions.getCompras(basePath);
        this.setState({
            searchText:'',
            canReset:false
        });

    };

    //saveIDClient

    saveProvider=(id)=>{
        this.setState({idProv:id})
    };
    saveLine=(id)=>{
        this.setState({idLn:id})
    };



    render(){
        let {compras, fetched, comprasData, blines, proveedores} = this.props;
        let {visible, selectedRowKeys, searchText, canReset} = this.state;

        const columns = [
            {
                title:'Proveedor',
                dataIndex:'proveedor',
                render: (proveedor,obj) =><span>{proveedor && proveedor !== null ? proveedor.provider: "No proveedor"}</span>,
            },
            {
                title: 'No. Factura',
                dataIndex: 'no_factura',
            },
            {
                title:'Monto',
                dataIndex:'costo_final',
                render:(costo_final) => <span>{costo_final && costo_final !==null ? "$ "+costo_final:'$ 0'}</span>
            },
            {
                title:'Descripcion',
                dataIndex:'descripcion',
            },
            {
                title:'Registro',
                dataIndex:'fecha_creacion'
            }



        ];

        /*const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };*/
        if(!fetched)return(<MainLoader/>);

        return(
          <Fragment>
              <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                  Administración
                  <Divider type="vertical" />
                  Compras
              </div>

              <h2>
                  Compras
              </h2>




              <Table

                  columns={columns}
                  dataSource={compras}
                  rowKey={record => record.id}
                  scroll={{x:650}}
                  pagination={{
                      pageSize: 10,
                      total:comprasData.count,
                      onChange:this.handlePagination,
                      showTotal:total => `Total: ${total} Compras`
                  }}
                  style={{marginBottom:10}}
                  height={'80vh'}
              />


              <Button type="primary" onClick={this.showModal}>Agregar</Button>
              <CompraForm
                  ref={this.saveFormRef}
                  visible={visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}

                  blines={blines}
                  searchLine={this.searchLine}

                  proveedores={proveedores}
                  searchProveedor={this.searchProveedor}

                  saveProvider={this.saveProvider}
                  saveLine={this.saveLine}



              />
              <Divider type={'vertical'} />

              <Button type="primary" disabled={!canReset} onClick={this.resetFilter}>Borrar filtro</Button>




          </Fragment>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        compras: state.compras.list,
        comprasData:state.compras.allData,
        blines:state.blines.lineSearch,
        proveedores:state.proveedores.proveedorSearch,
        fetched:state.compras.list !== undefined && state.compras.allData !==undefined && state.blines.lineSearch !== undefined && state.proveedores.proveedorSearch !== undefined
    }
}

function mapDispatchToProps(dispatch) {
    return {
        comprasActions: bindActionCreators(comprasActions, dispatch),
        linesActions: bindActionCreators(linesActions, dispatch),
        proveedoresActions: bindActionCreators(proveedoresActions, dispatch)
    }
}

Compras = connect(mapStateToProps, mapDispatchToProps)(Compras);
export default Compras;