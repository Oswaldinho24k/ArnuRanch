import React, {Component} from 'react';
import {Table, Button, Switch, Modal, message, Popconfirm, Select, Divider, Input} from "antd";
import {Link} from 'react-router-dom';
import FormAnimal from './FormAnimal';
import FormAnimalLote from './FormLote';
import moment from 'moment';

import * as animalActions from '../../../redux/actions/ganado/animalsActions';
import * as lotesActions from '../../../redux/actions/ganado/lotesActions';

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
        canReset:false,

    };

    componentWillUnmount() {
        this.resetFilters()
    }



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
        
        this.setState({ selectedRowKeys });
    };
    saveAnimal=(animal)=>{
        this.props.animalActions.saveAnimal(animal)
            .then(r=>{
                this.handleCancel();
                message.success('Arete añadido con éxito!')
            }).catch(e=>{
            for (let i in e.response.data){
                message.error(e.response.data[i])
            }
        })
    };
    deleteAnimals=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
          this.props.animalActions.deleteAnimal(keys[i])
              .then(r=>{
                  
                  message.success('Deleted successfully');

              }).catch(e=>{

                message.error('No puedes eliminar aretes con gastos o pesadas registradas')
              /*for (let i in this.props.errors){
                  
                  message.error(this.props.errors[i])
              }*/

          })
        }
        this.setState({selectedRowKeys:[]})
    };
    changeLote=(animal)=>{

        let keys = this.state.selectedRowKeys;
        for(let j in keys){
            animal['id']=keys[j];
            let toSend = Object.assign({}, animal);

           this.props.animalActions.editAnimal(toSend)
                .then(r => {
                    message.success('Modificado con éxito');
                    this.handleCancel()

                }).catch(e => {
               for (let i in e.response.data){
                   message.error(e.response.data[i])
               }
            })
        }
    };
    confirm=(e)=> {
        this.deleteAnimals();
    };

    cancel=(e) =>{
        
    };

    handleChange=(loteFilter)=>{
        this.setState({loteFilter});

    };

    filterByLote=(lote)=>{
        //let basePath = 'http://localhost:8000/api/ganado/animals/?lote=';
        let basePath = 'https://rancho.davidzavala.me/api/ganado/animals/?lote=';
        let url = basePath+lote;
        this.props.animalActions.getAnimals(url);
        this.setState({canReset:true})
        //this.setState({loteFilter:b.props.children})
    };
    handleSearch=(e)=>{
        this.setState({searchText:e.target.value})
    };
    onSearch=()=>{
        //let basePath = 'http://localhost:8000/api/ganado/animals/?q=';
        let basePath = 'https://rancho.davidzavala.me/api/ganado/animals/?q=';
        let url = basePath+this.state.searchText;
        this.props.animalActions.getAnimals(url);
        
        this.setState({canReset:true})
    };

    handleStatus=(v)=>{
        //let basePath = 'http://localhost:8000/api/ganado/animals/?s=';
        
        let basePath = 'https://rancho.davidzavala.me/api/ganado/animals/?s=';
        let url = basePath + v
        
        this.props.animalActions.getAnimals(url);
    }
    resetFilters=()=>{
        //let basePath = 'http://localhost:8000/api/ganado/animals/';
        let basePath = 'https://rancho.davidzavala.me/api/ganado/animals/';
        this.props.animalActions.getAnimals(basePath);
        this.setState({searchText:'', loteFilter:'', status:true});
    };
    handlePagination=(pagina)=>{
        let nextLength = pagina.toString().length;
        let newUrl = this.props.animalsData.next;
        if(newUrl===null){
            newUrl = this.props.animalsData.previous;
        }

        if( pagina ==1 && this.props.animalsData.count <= 40){
            newUrl='https'+newUrl.slice(4,newUrl.length);
        }else{
            newUrl='https'+newUrl.slice(4,newUrl.length-nextLength)+pagina;
        }
        this.props.animalActions.getAnimals(newUrl);
    };


    render() {


        let { visible, selectedRowKeys,visible2 , loteFilter, searchText, canReset} = this.state;
        

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
                width:200


            },{
                title: 'Arete Siniga',
                dataIndex: 'arete_siniga',
                key:'arete_siniga',
                width:150

            }, {
                title: 'Propietario',
                dataIndex: 'owner',
                key:'owner',
                render:(v,o)=><p>{o.empresa?o.empresa.company:v}</p>,
                width:150

            },
            {
                title:'Lote',
                dataIndex:'lote',
                key:'lote',
                render:(v)=><Link to={v?`/admin/lotes/${v.id}`:''}>{v?v.name:''}</Link>,
                width:100

            },/*{
                title:'Última Pesada',
                dataIndex:'pesadas',
                key:'pesadas',
                render:val=><p>{val.length===0?0:val[val.length-1].peso}Kg</p>,
                width:150
            }*/
            {
                title:'Registro',
                dataIndex:'fecha_entrada',
                key:'fecha_entrada',
                render:(v)=><p>{moment(v).format('LL')}</p>,
                width:100
            }
            ];



        const canUse = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {animals, fetched, lotes, animalsData, razas, empresas, fierrosO, fierrosN} = this.props;

        let optionsLote=lotes.filter(l=>l.name.toLowerCase().indexOf(
            this.state.loteFilter.toLowerCase())!== -1);
        
            //animals = animals.filter(a=>a.status===true)

        if(!fetched)return(<MainLoader/>);
        return (
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Ganado
                    <Divider type="vertical" />
                    Aretes
                    <Divider type="vertical" />
                </div>
                <h2>Listado de Aretes</h2>
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
                        {optionsLote.map(d => <Option value={d.name} key={d.id}>{d.name}</Option>)}
                    </Select>
                    <Divider
                        type={'vertical'}/>
                     <Switch 
                        onChange={this.handleStatus}
                        checkedChildren="Activos" 
                        unCheckedChildren="Inactivos" 
                        defaultChecked />
                    <Divider
                        type={'vertical'}/>
                    <Button
                        type="primary"
                        disabled={!canReset}
                        onClick={this.resetFilters}>Restablecer</Button>
                </div>

                {/*table of animals*/}
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={animals}
                    rowKey={record => record.id}
                    pagination={{
                        pageSize: 20,
                        total:animalsData.count,
                        onChange:this.handlePagination,
                        showTotal:total => `Total: ${total} aretes`}}
                    scroll={{x:650, y:400}}/>
                {/*<Pagination
                    pageSize={20}
                    total={animalsData.count}
                    onChange={this.handlePagination}
                    style={{padding:'1% 0'}}/>

                actions for animals*/}
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
                    <FormAnimal saveAnimal={this.saveAnimal} lotes={lotes} handleCancel={this.handleCancel} razas={razas} empresas={empresas} fierrosO={fierrosO} fierrosN={fierrosN}/>
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
        fierrosO:state.fierrosO.list,
        fierrosN:state.fierrosN.list,
        empresas:state.empresas.list,
        animalsData:state.animals.allData,
        animals: state.animals.list,
        lotes:state.lotes.list,
        razas:state.razas.list,
        fetched:state.lotes.list!==undefined && state.animals.list!==undefined && state.animals.allData!==undefined && state.razas.list!==undefined&& state.empresas.list!==undefined && state.fierrosO.list!==undefined && state.fierrosN.list!==undefined
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
