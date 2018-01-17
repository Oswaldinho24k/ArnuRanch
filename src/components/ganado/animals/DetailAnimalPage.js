import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, Modal, Form, message} from "antd";
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import BasicInfo from "./BasicInfo";
import GastosComponent from "./GastosComponent";
import FormGasto from "./FormGasto";
import * as animalGastoActions from '../../../redux/actions/gastoAnimalActions';




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
        key: 'Detalle',
        noTitleKey: 'article',
        selectedRowKeys: [], // Check here to configure the default column
        ModalText:  <FormGasto saveGasto={this.props.animalGastoActions.saveAnimalGasto} animal={this.props.match.params.key}/>,
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



    render() {
        console.log(this.props)
        const {animal} = this.props;
        const {selectedRowKeys, visible, ModalText} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [{
                key: 'all-data',
                text: 'Select All Data',
                onSelect: () => {
                    this.setState({
                        selectedRowKeys: [...Array(46).keys()], // 0...45
                    });
                },
            }],
            onSelection: this.onSelection,
        };

        let contentList = {
            Detalle: <BasicInfo {...animal}/>,
            Gastos: <GastosComponent
                animal={animal}
                rowSelection={rowSelection}
                showModal={this.showModal}/>,
            Reportes: <p>Reportes</p>
        };
        if(!this.props.fetched)return(<p>loading</p>)
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
                {ModalText}
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
        fetched:animal!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        animalGastoActions: bindActionCreators(animalGastoActions, dispatch)
    }
}

DetailAnimalPage = connect(mapStateToProps, mapDispatchToProps)(DetailAnimalPage);
export default DetailAnimalPage;
