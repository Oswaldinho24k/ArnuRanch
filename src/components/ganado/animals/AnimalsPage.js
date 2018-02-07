import React, {Component} from 'react';
import {Table, Button, Modal, message, Popconfirm, Select, Divider, Input, Pagination} from "antd";
import {Link} from 'react-router-dom';
import FormAnimal from './FormAnimal';
import FormAnimalLote from './FormLote';

import * as animalActions from '../../../redux/actions/animalsActions';
import * as lotesActions from '../../../redux/actions/lotesActions';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MainLoader from "../../common/Main Loader";

const Option = Select.Option;






class AnimalsPage extends Component {
    state = {

        visible: false,
        visible2:false,
        canDelete:false,
        selectedRowKeys:[],
        options:'',
        loteFilter:'',
        searchText:'',


    };



    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    showModal2 = () => {this.setState({visible2: true,});};

    handleCancel = () => {
        this.setState({
            visible: false,
            visible2:false
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
                  message.success('Deleted successfully');
              }).catch(e=>{
                console.log(e)
                message.error(e);

          })
        }
        this.setState({selectedRowKeys:[]})
    };
    changeLote=(animal)=>{
        let keys = this.state.selectedRowKeys;
        for(let j in keys){
            animal['id']=keys[j];
            let toSend = Object.assign({}, animal);
            console.log(toSend)
           this.props.animalActions.editAnimal(toSend)
                .then(r => {
                    console.log(r);
                    message.success('Modificado con éxito')
                }).catch(e => {
                    console.log(e)
            })
        }
    };
    confirm=(e)=> {
        this.deleteAnimals();
    };

    cancel=(e) =>{
        console.log(e);
    };

    handleChange=(loteFilter)=>{
        this.setState({loteFilter});
        console.log(this.state.loteFilter)
    };

    filterByLote=(lote, b)=>{

        let basePath = 'http://localhost:8000/api/ganado/animals/?lote=';
        let url = basePath+lote;
        this.props.animalActions.getAnimals(url)
        //this.setState({loteFilter:b.props.children})
    };
    handleSearch=(e)=>{
        this.setState({searchText:e.target.value})
    };
    onSearch=()=>{
        let basePath = 'http://localhost:8000/api/ganado/animals/?q=';
        let url = basePath+this.state.searchText;
        this.props.animalActions.getAnimals(url)
    };

    resetFilters=()=>{
        let basePath = 'http://localhost:8000/api/ganado/animals/';
        this.props.animalActions.getAnimals(basePath);
        this.setState({searchText:'', loteFilter:''});
    };
    handlePagination=(pagina)=>{
        console.log(this.props.animalsData);
        let newUrl = this.props.animalsData.next;
        let nextLength = pagina.toString().length;
        if(newUrl!==null){
            newUrl=newUrl.slice(0,newUrl.length-nextLength);
            newUrl=newUrl+pagina;
            this.props.animalActions.getAnimals(newUrl);
            console.log(newUrl)
        }else{
            newUrl = this.props.animalsData.previous;
            this.props.animalActions.getAnimals(newUrl);
            console.log(newUrl)
        }

    };


    render() {


        let { visible, selectedRowKeys,visible2 , loteFilter, searchText, } = this.state;

        const columns = [
            {
                title: 'Arete Rancho',
                dataIndex: 'arete_rancho',
                key:'arete_rancho',
                render: (text, record) => (
                    <span>
                      <Link to={`/admin/animals/${record.id}`}>{record.arete_rancho}</Link>
                    </span>
                ),


            },{
                title: 'Arete Siniga',
                dataIndex: 'arete_siniga',
                key:'arete_siniga',
            }, {
                title: 'Owner',
                dataIndex: 'owner',
                key:'owner',
            },
            {
                title:'Lote',
                dataIndex:'lote',
                key:'lote',
                render:v=><p>{v?v.name:''}</p>
            }

            /*{
                title: 'Actions',
                fixed:"right",
                width:100,
                key: 'action',
                width: 100,
                render: (text, record) => (
                    <span>
                      <Link to={`/admin/animals/${record.id}`}>Detalle</Link>
                    </span>
                ),}*/
            ];



        const canUse = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {animals, fetched, lotes, animalsData} = this.props;
        let optionsLote=lotes.filter(l=>l.name.toLowerCase().indexOf(
            this.state.loteFilter.toLowerCase())!== -1);
        let options = optionsLote.map(d => <Option title={d.name} key={d.id}>{d.name}</Option>);


        if(!fetched)return(<MainLoader/>);
        return (
            <div>
                <h1>Aretes</h1>
                {/*Search and filters*/}
                <div style={{padding:'1% 0'}}>
                    <Input.Search
                        enterButton
                        onSearch={this.onSearch}
                        onChange={this.handleSearch}
                        value={searchText}
                        style={{ width: 400 }}
                        placeholder={'Busca por propietario, arete rancho o arete siniga'}/>
                    <Divider
                        type={'vertical'}/>
                    <Select
                        value={loteFilter}
                        mode="combobox"
                        style={{ width: 200 }}
                        onChange={this.handleChange}
                        onSelect={this.filterByLote}
                        placeholder="Filtra por nombre de lote"
                        filterOption={false}
                    >
                        {options}
                    </Select>
                    <Divider
                        type={'vertical'}/>
                    <Button type="primary" onClick={this.resetFilters}>Restablecer</Button>
                </div>

                {/*table of animals*/}
                <Table

                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={animals}
                    rowKey={record => record.id}

                    pagination={false}
                    scroll={{x:650, y:500}}/>
                <Pagination
                    pageSize={20}
                    total={animalsData.count}
                    onChange={this.handlePagination}
                    style={{padding:'1% 0'}}/>

                {/*actions for animals*/}
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
                <Divider
                    type={'vertical'}/>

                <Popconfirm title="Are you sure delete this animals?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button disabled={!canUse} type="primary">Delete</Button>
                </Popconfirm>
                <Divider
                    type={'vertical'}/>
                <Button disabled={!canUse} onClick={this.showModal2} type="primary">Reacomodar</Button>
                <Modal title="Reasignar Lote"
                       visible={visible2}
                       onCancel={this.handleCancel}
                       width={'30%'}
                       maskClosable={true}
                       footer={[
                           null,
                           null,
                       ]}
                >
                    <FormAnimalLote lotes={lotes} handleCancel={this.handleCancel} changeLote={this.changeLote}/>
                </Modal>

            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        animalsData:state.animals.allData,
        animals: state.animals.list,
        lotes:state.lotes.list,
        fetched:state.lotes.list!==undefined && state.animals.list!==undefined && state.animals.allData!==undefined,
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
