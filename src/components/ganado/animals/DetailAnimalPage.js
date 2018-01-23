import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, Modal, Form, message, Select} from "antd";
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import BasicInfoAndEdit from "./BasicInfo";
import GastosComponent from "./GastosComponent";
import FormGasto from "./FormGasto";
import * as animalGastoActions from '../../../redux/actions/gastoAnimalActions';
import * as animalActions from '../../../redux/actions/animalsActions';
import MainLoader from "../../common/Main Loader";


const Option = Select.Option;



const tabList = [{
    key: 'Detalle',
    tab: 'Detalle',
}, {
    key: 'Gastos',
    tab: 'Gastos',
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

        visible: false,
    };


    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
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

    handleCancel = () => {
        this.setState({
            visible: false,
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
    }



    render() {
        const {animal, fetched} = this.props;
        const {selectedRowKeys, visible, ModalText, editMode} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,

            onSelection: this.onSelection,
        };
        let options_lote = this.props.lotes.map((a) => <Option value={parseInt(a.id)} >{a.name}</Option>);
        let contentList = {
            Detalle: <BasicInfoAndEdit {...animal} editAnimal={this.props.animalActions.editAnimal} handleEditMode={this.handleEditMode} editMode={editMode} options={options_lote}/>,
            Gastos: <GastosComponent
                animal={animal}
                rowSelection={rowSelection}
                showModal={this.showModal}/>,
            Reportes: <p>Reportes</p>
        };
        if(!fetched)return(<MainLoader/>);
        return (
        <div>
            <Card>
                <Card
                    tabList={tabList}
                    onTabChange={(key) => { this.onTabChange(key, 'key'); }}
                >
                    {contentList[this.state.key]}
                </Card>
            </Card>
            <Modal title="Agregar nuevo animal"
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
    }
}

DetailAnimalPage = connect(mapStateToProps, mapDispatchToProps)(DetailAnimalPage);
export default DetailAnimalPage;
