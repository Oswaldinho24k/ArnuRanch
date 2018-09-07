import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, Modal, message, Select, Divider} from "antd";
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import BasicInfoAndEdit from "./BasicInfo";
import GastosComponent from "./GastosComponent";
import FormGasto from "./FormGasto";
import * as animalGastoActions from '../../../redux/actions/ganado/gastoAnimalActions';
import * as animalActions from '../../../redux/actions/ganado/animalsActions';
import * as pesadasActions from '../../../redux/actions/ganado/pesadasActions';
import * as facturasActions from '../../../redux/actions/facturas/facturasActions';
import MainLoader from "../../common/Main Loader";
import PesadasComponent from "./PesadasComponent";
import FormPesada from "./FormPesada";
import ReportesComponent from "./ReportesComponent";
import {store} from '../../../index';




const Option = Select.Option;



const tabList = [{
    key: 'Detalle',
    tab: 'Detalle',
}, {
    key: 'Gastos',
    tab: 'Gastos',
},{
    key:'Pesadas',
    tab:'Pesadas'
},/*{
    key:'Reportes',
    tab:'Reportes',

}*/];


class DetailAnimalPage extends Component {
    state = {
        editMode:false,
        key: 'Detalle',
        noTitleKey: 'article',
        selectedRowKeys: [], // Check here to configure the default column
        selectedRowKeys2:[],
        visible: false,
        visible2:false,
        wEmpresa:true,
        idFactura:null,
    };

    componentDidMount(){
        if(this.props.animal){
            this.props.animal.empresa?this.setState({wEmpresa:true}):this.props.animal.empresa===null? this.setState({wEmpresa:true}):this.setState({wEmpresa:false})
        }
    }


    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };
    onSelectChange2 = (selectedRowKeys2) => {
        this.setState({ selectedRowKeys2 });
    };
    onTabChange = (key, type) => {

        this.setState({ [type]: key });
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    showModal2 = () => {
        this.setState({
            visible2: true,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            visible2:false
        });
    };

    handleEditMode=()=>{
      this.setState({editMode:!this.state.editMode})
    };

    saveGasto=(gasto)=>{
        gasto['animal']=this.props.match.params.key;
        this.props.animalGastoActions.saveAnimalGasto(gasto)
            .then(r=>{
            this.handleCancel();
            message.success('Gasto agregado con éxito')
        }).catch(e=>{
            for (let i in e.response.data){
                message.error(e.response.data[i])
            }
        })
    };
    savePesada=(pesada)=>{
        pesada['animal']=this.props.match.params.key;
        this.props.pesadasActions.savePesada(pesada)
            .then(r=>{
                this.handleCancel();
                message.success('Pesada agregado con éxito')
            }).catch(e=>{
            for (let i in e.response.data){
                message.error(e.response.data[i])
            }
        })
    };

    handleEmpresa=(e)=>{
        this.setState({wEmpresa:e})
    };

    //Facturas

    searchFactura=(a)=>{
        let basePath = 'http://rancho.davidzavala.me/api/ganado/facturas/?q=';
        let url = basePath+a;
        this.props.facturasActions.getFaSearch(url);
    };

    saveFactura=(id)=>{
        this.setState({idFactura:id})
    };


    render() {
        const {animal, fetched, razas, lotes, empresas, facturas, fierrosO, fierrosN} = this.props;

        const {selectedRowKeys, visible, editMode, visible2, selectedRowKeys2, wEmpresa} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,

            onSelection: this.onSelection,
        };
        const rowSelection2 = {
            selectedRowKeys2,
            onChange: this.onSelectChange2,
            hideDefaultSelections: true,

            onSelection: this.onSelection,
        };
        let options_lote = lotes.map((a,key) => <Option key={key} value={parseInt(a.id)} >{a.name}</Option>);
        let options_raza = razas.map((a,key) => <Option key={key} value={parseInt(a.id)} >{a.name}</Option>);
        let options_empresa = empresas.map((a,key) => <Option key={key} value={parseInt(a.id)} >{a.company}</Option>);


        let contentList = {
            Detalle: <BasicInfoAndEdit
                 {...animal}
                editAnimal={this.props.animalActions.editAnimal}
                handleEditMode={this.handleEditMode}
                editMode={editMode}
                 facturas={facturas}
                 searchFactura={this.searchFactura}
                 saveFactura={this.saveFactura}
                 stateFactura={this.state.idFactura}
                options={options_lote}
                options_raza={options_raza}
                options_empresa={options_empresa}
                handleEmpresa={this.handleEmpresa}
                wEmpresa={wEmpresa}
                fierrosO={fierrosO}
                fierrosN={fierrosN}/>,
            Gastos: <GastosComponent

                animal={animal}
                rowSelection={rowSelection}
                showModal={this.showModal}/>,
            Pesadas: <PesadasComponent

                animal={animal}
                rowSelection={rowSelection2}
                showModal={this.showModal2}/>,
            Reportes:<ReportesComponent
                animal={animal}/>
        };
        return (
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Ganado
                    <Divider type="vertical" />
                    <Link to={`/admin/animals`} style={{color:'black'}} >
                        Aretes
                    </Link>
                    <Divider type="vertical" />

                    {animal.arete_rancho} <span>{animal.status?'':'Inactivo'}</span>
                    <p>{!animal.status?<Link to={`/admin/saleNotes/${animal.sale_note}`}>Nota {animal.sale_note}</Link>:''}</p>

                </div>
                <h2>Arete {animal.arete_rancho}</h2>
                <Card
                    tabList={tabList}
                    onTabChange={(key) => { this.onTabChange(key, 'key'); }}
                >
                    {contentList[this.state.key]}
                </Card>

                <Modal title="Agregar nuevo gasto"
                       visible={visible}
                       onCancel={this.handleCancel}
                       width={'30%'}
                       maskClosable={true}
                       footer={[
                           null,
                           null,
                       ]}
                >
                    <FormGasto saveGasto={this.saveGasto} handleCancel={this.handleCancel}/>
                </Modal>
                <Modal title="Agregar nueva Pesada"
                       visible={visible2}
                       onCancel={this.handleCancel}
                       width={'30%'}
                       maskClosable={true}
                       footer={[
                           null,
                           null,
                       ]}
                >
                    <FormPesada savePesada={this.savePesada} handleCancel={this.handleCancel}/>
                </Modal>
            </div>

        );
        if(!fetched)return(<MainLoader/>);
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.key;


    return {
        fierrosO:state.fierrosO.list,
        fierrosN:state.fierrosN.list,
        animal:state.animals.object,
        lotes:state.lotes.list,
        razas:state.razas.list,
        facturas:state.facturas.facturaSearch,
        empresas:state.empresas.list,
        fetched:state.animals.object!==undefined&&state.lotes.list!==undefined&&state.razas.list!==undefined&&state.empresas.list!==undefined && state.facturas.list !== undefined && state.fierrosO.list!==undefined && state.fierrosN.list!==undefined,
    }
}

function mapDispatchToProps(dispatch, oP) {

    let id = oP.match.params.key;
    dispatch(animalActions.getSingleAnimal(id));
    return {
        animalGastoActions: bindActionCreators(animalGastoActions, dispatch),
        animalActions:bindActionCreators(animalActions, dispatch),
        pesadasActions:bindActionCreators(pesadasActions, dispatch),
        facturasActions: bindActionCreators(facturasActions, dispatch)
    }
}

DetailAnimalPage = connect(mapStateToProps, mapDispatchToProps)(DetailAnimalPage);
export default DetailAnimalPage;
