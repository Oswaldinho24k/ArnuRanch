import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, Modal, Form, message, Select} from "antd";
import {bindActionCreators} from 'redux';
import BasicInfoAndEdit from "./BasicInfo";
import GastosComponent from "./GastosComponent";
import FormGasto from "./FormGasto";
import * as animalGastoActions from '../../../redux/actions/gastoAnimalActions';
import * as animalActions from '../../../redux/actions/animalsActions';
import * as pesadasActions from '../../../redux/actions/pesadasActions';
import MainLoader from "../../common/Main Loader";
import PesadasComponent from "./PesadasComponent";
import FormPesada from "./FormPesada";
import ReportesComponent from "./ReportesComponent";


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
},{
    key:'Reportes',
    tab:'Reportes'
}];


class DetailAnimalPage extends Component {
    state = {
        editMode:false,
        key: 'Detalle',
        noTitleKey: 'article',
        selectedRowKeys: [], // Check here to configure the default column
        selectedRowKeys2:[],
        visible: false,
        visible2:false
    };


    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    onSelectChange2 = (selectedRowKeys2) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys2);
        this.setState({ selectedRowKeys2 });
    };
    onTabChange = (key, type) => {
        //console.log(key, type);
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
            console.log(e)
        })
    };
    savePesada=(pesada)=>{
        pesada['animal']=this.props.match.params.key;
        this.props.pesadasActions.savePesada(pesada)
            .then(r=>{
                this.handleCancel();
                message.success('Pesada agregado con éxito')
            }).catch(e=>{
            console.log(e)
        })
    };



    render() {
        const {animal, fetched} = this.props;
        const {selectedRowKeys, visible, ModalText, editMode, visible2, selectedRowKeys2} = this.state;
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
        let options_lote = this.props.lotes.map((a,key) => <Option key={key} value={parseInt(a.id)} >{a.name}</Option>);
        let contentList = {
            Detalle: <BasicInfoAndEdit
                 {...animal}
                editAnimal={this.props.animalActions.editAnimal}
                handleEditMode={this.handleEditMode}
                editMode={editMode}
                options={options_lote}/>,
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
        if(!fetched)return(<MainLoader/>);
        return (
        <div>
            <h1>Arete {animal.arete_rancho}</h1>
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
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.key;
    let animal = state.animals.list.filter(a=>{
        return id == a.id;
    });
    animal = animal[0];

    return {
        animal,
        lotes:state.lotes.list,
        fetched:animal!==undefined&&state.lotes.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        animalGastoActions: bindActionCreators(animalGastoActions, dispatch),
        animalActions:bindActionCreators(animalActions, dispatch),
        pesadasActions:bindActionCreators(pesadasActions, dispatch)
    }
}

DetailAnimalPage = connect(mapStateToProps, mapDispatchToProps)(DetailAnimalPage);
export default DetailAnimalPage;
