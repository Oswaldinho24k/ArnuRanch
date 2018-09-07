import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, message, Popconfirm, Tabs, Divider, Input, BackTop,Table} from "antd";
//import moment from 'moment';
//import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";
import * as linesActions from '../../redux/actions/blines/blinesActions';
import * as catProductsActions from '../../redux/actions/catalogos/catProductosActions'
import * as unidadmedidaActions from '../../redux/actions/catalogos/unidadmedidaActions'
import * as usoscfdiActions from '../../redux/actions/catalogos/usoscfdiActions'
import * as formadepagoActions from '../../redux/actions/catalogos/formadepagoActions'
import * as cuentasbancariasActions from '../../redux/actions/catalogos/cuentasbancariasActions'
import * as almacenesActions from '../../redux/actions/catalogos/almacenesActions'
import * as presupuestosActions from '../../redux/actions/catalogos/presupuestosActions'
import FormCatalogo from "./CatalogoForm";
import EditCatalogos from './EditCatalogos'
import './catalogos.css'


//const Option = Select.Option;



/*const opciones = [
    {
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

];*/

class CatalogoPage extends Component {
    state = {
        visible: false,
        selectedRowKeys:[],

        data:[],
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
        linea:'',
        cuenta:'',
        cliente:'',
        canReset:false,
        venta:false,

        idClient:null,
        idLine:null,
        idReceivable:null,


        activeTab:"products",
        visibleEdit:false,
        infoEdit:{},


    };

    componentWillMount(){
        //this.props.ingresosActions.getIngresos();
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            venta:false,
        });
        const form = this.form;
        form.resetFields();
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
        let {activeTab} = this.state;

        e.preventDefault();
        form.validateFields((err, values) => {
            //var ob={name:values.name,code:values.code,bl:values.bl}
            values.bl_id = this.state.idLine
            values.bl = this.state.idLine

           if (!err) {
               if(activeTab==="products"){
                   console.log("mira",values)
                   this.props.catProductsActions.newCatProduct(values)
                   this.setState({visible:false})

               }
               if(activeTab==="unitMeasure"){
                   console.log("mira unidad:",values)
                   this.props.unidadmedidaActions.newCatUnidad(values)
                   this.setState({visible:false})

               }
               if(activeTab==="useCFDI"){
                   this.props.usoscfdiActions.newCatCfdis(values)
                   this.setState({visible:false})
               }
               if(activeTab==="pay"){
                   this.props.formadepagoActions.newCatPago(values)
                   this.setState({visible:false})
               }
              /* if(activeTab==="account"){
                   this.props.cuentasbancariasActions.newCatBank(values)
                   this.setState({visible:false})
               }*/
               if(activeTab==="warehouse"){
                   this.props.almacenesActions.newCatAlmacen(values)
                   this.setState({visible:false})
               }
               if(activeTab==="budget"){
                   console.log("Presupuesto", values)
                  this.props.presupuestosActions.newCatPresupuesto(values)
                   this.setState({visible:false})
               }
                message.success('Guardado con éxito');
                form.resetFields();
            } else{message.error('Algo fallo, verifica los campos');}

        });
    };

    handleEdit = (values) => {

        let {activeTab} = this.state;
            values.bl_id = this.state.idLine
            values.bl = this.state.idLine

                if(activeTab==="products"){
                    console.log("mira Productos",values)
                    this.props.catProductsActions.editCatProduct(values)
                        console.log("Editado con éxito");
                        message.success('Guardado con éxito');

                    this.setState({visible:false})

                }
                if(activeTab==="unitMeasure"){
                    console.log("mira unidad:",values)
                    this.props.unidadmedidaActions.editCatUnidad(values)
                    console.log("Editado con éxito");
                    message.success('Guardado con éxito');
                    this.setState({visible:false})

                }
                if(activeTab==="useCFDI"){
                    this.props.usoscfdiActions.editCatCfdis(values)
                    console.log("Editado con éxito");
                    message.success('Guardado con éxito');
                    this.setState({visible:false})
                }
                if(activeTab==="pay"){
                    this.props.formadepagoActions.editCatPago(values)
                    console.log("Editado con éxito");
                    message.success('Guardado con éxito');
                    this.setState({visible:false})
                }
               /* if(activeTab==="account"){
                    this.props.cuentasbancariasActions.editCatBank(values)
                    console.log("Editado con éxito");
                    message.success('Guardado con éxito');
                    this.setState({visible:false})
                }*/
                if(activeTab==="warehouse"){
                    this.props.almacenesActions.editCatAlmacen(values)
                    console.log("Editado con éxito");
                    message.success('Guardado con éxito');
                    this.setState({visible:false})
                }
                if(activeTab==="budget"){
                    console.log("Presupuesto", values)
                    this.props.presupuestosActions.editCatPresupuesto(values)
                    console.log("Editado con éxito");
                    message.success('Guardado con éxito');
                    this.setState({visible:false})
                }

    };


    onSearch = () => {
        let basePath= "http://localhost:8000/api/ingresos/ingresos/?q=";
        //let basePath = 'https://rancho.fixter.org/api/ingresos/ingresos/?q=';

        let url = basePath+this.state.searchText;
        //this.props.ingresosActions.getIngresos(url);
        this.setState({canReset:true})

    };

    resetFilter = () => {
        let basePath= "http://localhost:8000/api/ingresos/ingresos/";
        //let basePath = 'https://rancho.fixter.org/api/ingresos/ingresos/';

        //this.props.ingresosActions.getIngresos(basePath);
        this.setState({
            searchText:'',
            canReset:false
        });
    };

    handleSearch=(e)=>{
        this.setState({searchText:e.target.value})
    };


    //Test

    actives=(e)=>{
        this.setState({activeTab:e})
    }

    saveLine=(id)=>{
        this.setState({idLine:id})
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

        let {visible,canReset,activeTab,infoEdit,visibleEdit}=this.state;
        const TabPane = Tabs.TabPane;
        const columns = [
            {
                title: 'Nombre',
                dataIndex: 'name',
                key:'name',
            },
            {
                title: 'Código',
                dataIndex: 'code',
                key:'code'
            },
            {
                title:'Linea de Negocio',
                dataIndex:'bl',
                render:bl=><p>{bl?bl.name:''}</p>,
                key:'bl'
            },
            {
                title: 'Actions',
                dataIndex: 'id',
                render: (id, obj) => <p onClick={()=>this.visibleEdit(obj)}>Editar</p>,
                fixed:'right',
                width:100
            },

        ];
        const columnsP =[
            {title:'Código', dataIndex:'code',key:'code'},
            {title:'Nombre', dataIndex:'name',key:'name'},
            {title:'Fecha de pago', dataIndex:'pay_date',key:'pay_date'},
            {title:'Concepto', dataIndex:'concepto',key:'concepto'},
            {title:'Monto', dataIndex:'monto',key:'monto'},
            {title:'Liena de Negocio', dataIndex:'business_line_id',key:'business_line_id'},
            {
                title: 'Actions',
                dataIndex: 'id',
                render: (id, obj) => <p onClick={()=>this.visibleEdit(obj)}>Editar</p>,
                fixed:'right',
                width:100
            },
        ];

        let { fetched, blines,catProducts,catUnidad,catCfdis,catPago,catBank,catAlmacenes,catPresupuesto} = this.props;

        if(!fetched)return(<MainLoader/>);
        console.log(catPresupuesto)
        return (
            <Fragment>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Catálogos
                </div>

                <h1>Pagina de Catálogo </h1>

                {/*} <div style={{paddingBottom:'1%'}}>
                    <Input.Search
                        enterButton
                        onSearch={this.onSearch}
                        onChange={this.handleSearch}
                        style={{ width: 400 }}
                        placeholder={'Buscar ingreso...'}
                    />
                </div>*/}

                <BackTop visibilityHeight={100} />
                <div className="card-container">
                    <Tabs onTabClick={this.actives} type="card">
                        <TabPane  tab="Productos" key="products">
                            <Table
                                columns={columns}
                                dataSource={catProducts}
                            />
                        </TabPane>
                        <TabPane  tab="Unidad de medida" key="unitMeasure">
                            <Table
                                dataSource={catUnidad}
                                columns={columns}
                                   />
                        </TabPane>

                        <TabPane tab="Usos CFDI" key="useCFDI">
                            <Table
                                columns={columns}
                                dataSource={catCfdis}
                            />
                        </TabPane>
                        <TabPane tab="Forma de pago" key="pay">
                            <Table
                                columns={columns}
                                dataSource={catPago}
                            />
                        </TabPane>
                        {/*<TabPane tab="Cuentas bancarias" key="account">
                            <Table
                                columns={columns}
                                dataSource={catBank}
                            />
                        </TabPane>*/}
                        <TabPane tab="Almacenes" key="warehouse">
                            <Table
                                columns={columns}
                                dataSource={catAlmacenes}
                            />
                        </TabPane>
                        <TabPane tab="Presupuestos" key="budget">
                            <Table
                                columns={columnsP}
                                dataSource={catPresupuesto}
                            />
                        </TabPane>

                    </Tabs>
                </div>
                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <FormCatalogo
                    activeTab={activeTab}
                    ref={this.saveFormRef}
                    visible={visible}
                    options={blines}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    saveLine={this.saveLine}

                />
                <EditCatalogos
                    onEdit={this.handleEdit}
                    activeTab={activeTab}
                    onCancel={this.cancelar}
                    visible={visibleEdit}
                    data={this.state.infoEdit}
                    saveLine={this.saveLine}
                    options={blines}
                    {...infoEdit}

                />


                <Divider
                    type={'vertical'}/>

                <Popconfirm title="Are you sure delete this ingreso?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button  type="primary" >Eliminar</Button>
                </Popconfirm>

                <Divider type={'vertical'} />

                <Button type="primary" disabled={!canReset} onClick={this.resetFilter}>Borrar filtro</Button>
            </Fragment>
        );
    }
}


function mapStateToProps(state, ownProps) {

    return {
        catProducts:state.catProducts.list,
        catUnidad:state.catUnidad.list,
        catCfdis:state.catCfdis.list,
        catPago:state.catPago.list,
        catBank:state.catBank.list,
        catAlmacenes:state.catAlmacenes.list,
        catPresupuesto:state.catPresupuesto.list,
        blines:state.blines.lineSearch,
        fetched: state.blines.lineSearch !== undefined && state.catProducts.list !== undefined &&
        state.catUnidad.list !== undefined && state.catCfdis.list !== undefined && state.catPago.list !== undefined
        && state.catBank.list !== undefined && state.catAlmacenes.list !== undefined && state.catPresupuesto.list !== undefined,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        linesActions: bindActionCreators(linesActions, dispatch),
        catProductsActions: bindActionCreators(catProductsActions, dispatch),
        unidadmedidaActions:bindActionCreators(unidadmedidaActions,dispatch),
        usoscfdiActions:bindActionCreators(usoscfdiActions,dispatch),
        formadepagoActions:bindActionCreators(formadepagoActions,dispatch),
        cuentasbancariasActions:bindActionCreators(cuentasbancariasActions,dispatch),
        almacenesActions:bindActionCreators(almacenesActions,dispatch),
        presupuestosActions:bindActionCreators(presupuestosActions,dispatch),

    }
}

CatalogoPage = connect(mapStateToProps, mapDispatchToProps)(CatalogoPage);
export default CatalogoPage;
