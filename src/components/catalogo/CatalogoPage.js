import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, message, Popconfirm, Tabs, Divider, Select, Input, BackTop,Table,Tag} from "antd";
import moment from 'moment';
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";
import * as ingresosActions from '../../redux/actions/administracion/ingresosActions';
import * as linesActions from '../../redux/actions/blines/blinesActions';
import * as cuentasActions from '../../redux/actions/cuentas/cuentasActions';
import * as clientesActions from '../../redux/actions/administracion/clientesActions';
import FormCatalogo from "./CatalogoForm";
import './catalogos.css'


const Option = Select.Option;

const style={
    customFilterDropdown: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: 'white',
        boxShadow: '0 1px 6px rgba(0, 0, 0, .2)'
    },

    customFilterDropdownInput: {
        width: 130,
        marginRight: 8,
    }
};

const opciones = [
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

];

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
        datos:[
            {id:1, name:"Perros", code:"4DHS2"},
            {id:2, name:"Gatos", code:"5VX32"},
            {id:3, name:"Patos", code:"5VX32"},
        ],
        datos2:[
            {id:1, name:"Perros", code:"4DHS2"},
            {id:2, name:"Gatos", code:"5VX32"},
            {id:3, name:"Patos", code:"5VX32"},
        ],
        datos3:[],
        datos4:[],
        datos5:[],
        datos6:[],
        datos7:[],


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
        let {activeTab,datos,datos2,datos3,datos4,datos5,datos6,datos7} = this.state;

        e.preventDefault();
        form.validateFields((err, values) => {
            var ob={name:values.name,code:values.code}


           if (!err) {
               if(activeTab==="products"){
                   console.log("mira",values)
                   datos.push(ob)
                   this.setState({datos:datos, visible:false},console.log("mira",this.state.datos))

               }
               if(activeTab==="unitMeasure"){console.log("mira",values)
                   datos2.push(ob)
                   this.setState({visible:false})

               }
               if(activeTab==="useCFDI"){
                   datos3.push(ob)
                   this.setState({visible:false})
               }
               if(activeTab==="pay"){
                   datos4.push(ob)
                   this.setState({visible:false})
               }
               if(activeTab==="account"){
                   datos5.push(ob)
                   this.setState({visible:false})
               }
               if(activeTab==="warehouse"){
                   datos6.push(ob)
                   this.setState({visible:false})
               }
               if(activeTab==="budget"){
                   console.log("Presupuesto", values)
                   var ob={name:values.name,code:values.code,date:values.date,concept:values.concept,monto:values.monto}
                   datos7.push(ob)
                   this.setState({visible:false})
               }
                message.success('Guardado con éxito');
                form.resetFields();
            } else{message.error('Algo fallo, verifica los campos');}

        });
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






    render() {

        let {visible,canReset,datos,datos2,datos3,datos4,datos5,datos6,datos7,activeTab}=this.state;
        const TabPane = Tabs.TabPane;
        const columns = [
            {
                title: 'Nombre',
                dataIndex: 'name',
                render: (name,obj)=> <Link to={'/admin/catalogo/catalogito'}>{name && name !== null ? name: "No Cliente"}</Link>,
                key:'name',
            },
            {
                title: 'Código',
                dataIndex: 'code',
                key:'code'
            }

        ];
        const columnsP =[
            {title:'Código', dataIndex:'code',key:'code',render: (code,obj)=> <Link to={'/admin/catalogo/presupuestito'}>{code && code !== null ? code: "Ningun código"}</Link>,},
            {title:'Nombre', dataIndex:'name',key:'name'},
            {title:'Fecha de pago', dataIndex:'date',key:'date'},
            {title:'Concepto', dataIndex:'concept',key:'concept'},
            {title:'Monto', dataIndex:'monto',key:'monto'}
        ];

        return (
            <Fragment>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Catálogos
                </div>

                <h1>Pagina de Catálogo </h1>

                <div style={{paddingBottom:'1%'}}>
                    <Input.Search
                        enterButton
                        onSearch={this.onSearch}
                        onChange={this.handleSearch}
                        style={{ width: 400 }}
                        placeholder={'Buscar ingreso...'}
                    />
                </div>

                <BackTop visibilityHeight={100} />
                <div className="card-container">
                    <Tabs onTabClick={this.actives} type="card">
                        <TabPane  tab="Productos" key="products">
                            <Table
                                columns={columns}
                                dataSource={datos}
                            />
                        </TabPane>
                        <TabPane tab="Unidad de medida" key="unitMeasure">
                            <Table
                                columns={columns}
                                dataSource={datos2}
                            />
                        </TabPane>
                        <TabPane tab="Usos CFDI" key="useCFDI">
                            <Table
                                columns={columns}
                                dataSource={datos3}
                            />
                        </TabPane>
                        <TabPane tab="Forma de pago" key="pay">
                            <Table
                                columns={columns}
                                dataSource={datos4}
                            />
                        </TabPane>
                        <TabPane tab="Cuentas bancarias" key="account">
                            <Table
                                columns={columns}
                                dataSource={datos5}
                            />
                        </TabPane>
                        <TabPane tab="Almacenes" key="warehouse">
                            <Table
                                columns={columns}
                                dataSource={datos6}
                            />
                        </TabPane>
                        <TabPane tab="Presupuestos" key="budget">
                            <Table
                                columns={columnsP}
                                dataSource={datos7}
                            />
                        </TabPane>

                    </Tabs>
                </div>
                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <FormCatalogo
                    activeTab={activeTab}
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
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

/*
function mapStateToProps(state, ownProps) {
    return {
        ingresos:state.ingresos.list,
        ingresosData:state.ingresos.allData,
        blines:state.blines.lineSearch,
        fetched: state.ingresos.list !== undefined && state.clientes.list !==undefined && state.blines.lineSearch !== undefined && state.cuentas.cuentaSearch !== undefined,
        clientes:state.clientes.clienteSearch,
        cuentas:state.cuentas.cuentaSearch
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ingresosActions: bindActionCreators(ingresosActions, dispatch),
        linesActions: bindActionCreators(linesActions, dispatch),
        cuentasActions: bindActionCreators(cuentasActions, dispatch),
        clientesActions: bindActionCreators(clientesActions, dispatch),
    }
}

CatalogoPage = connect(mapStateToProps, mapDispatchToProps)(CatalogoPage);*/
export default CatalogoPage;
