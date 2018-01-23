import React, {Component} from 'react';
import {Table, Row, Col, Card, Button, Modal, Divider, Icon, Popconfirm, message} from "antd";
import {Link} from 'react-router-dom';
import FormAnimal from './FormAnimal';


import * as animalActions from '../../../redux/actions/animalsActions';
import * as lotesActions from '../../../redux/actions/lotesActions';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MainLoader from "../../common/Main Loader";


const columns = [
{
    title: 'Arete Rancho',
    dataIndex: 'arete_rancho',
},{
    title: 'Arete Siniga',
    dataIndex: 'arete_siniga',
}, {
    title: 'Owner',
    dataIndex: 'owner',
},
{
    title: 'Actions',
    key: 'action',
    width: 100,
    render: (text, record) => (
        <span>
  <Link to={`/admin/animals/${record.id}`}>Detalle</Link>

</span>
    ),
}];



class AnimalsPage extends Component {
    state = {

        visible: false,
        canDelete:false,
        selectedRowKeys:[]
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

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    saveAnimal=(animal)=>{
        this.props.animalActions.saveAnimal(animal)
            .then(r=>{
                this.handleCancel()
            }).catch(e=>{

        })
    }
    deleteAnimals=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
          this.props.animalActions.deleteAnimal(keys[i])
              .then(r=>{
                  console.log(r)
              }).catch(e=>{
                  console.log(e)
          })
        }
    };
    confirm=(e)=> {
        console.log(e);
        this.deleteAnimals();
        message.success('Deleted successfully');
    };

    cancel=(e) =>{
        console.log(e);
    };


    render() {

        const { visible, ModalText , selectedRowKeys} = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {animals, fetched, lotes} = this.props;
        if(!fetched)return(<MainLoader/>);
        return (
            <div>
                <h1>Animals</h1>

                {/*<Popconfirm title="Are you sure delete this animals?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button disabled={!canDelete} type="primary" >Delete</Button>
                </Popconfirm>*/}
                <Table bordered rowSelection={rowSelection} columns={columns} dataSource={animals} rowKey={record => record.id}/>

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <Modal title="Agregar nuevo animal"
                       visible={visible}
                       onCancel={this.handleCancel}
                       width={'60%'}
                       maskClosable={true}
                       footer={[
                           null,
                           null,
                       ]}
                >
                    <FormAnimal saveAnimal={this.saveAnimal} lotes={lotes} handleCancel={this.handleCancel}/>
                </Modal>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        animals: state.animals.list,
        lotes:state.lotes.list,
        fetched:state.lotes.list!==undefined&&state.animals.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        animalActions: bindActionCreators(animalActions, dispatch),
        lotesActions:bindActionCreators(lotesActions, dispatch)

    }
}

AnimalsPage = connect(mapStateToProps, mapDispatchToProps)(AnimalsPage);
export default AnimalsPage;
