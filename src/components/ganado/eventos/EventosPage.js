import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FormGasto from "../animals/FormGasto";
import {Link} from 'react-router-dom'
import {Select, Form, message, Divider, Card, List} from 'antd';
import MainLoader from "../../common/Main Loader";
import * as animalGastoActions from '../../../redux/actions/ganado/gastoAnimalActions';
import * as animalActions from '../../../redux/actions/ganado/animalsActions';
import * as lotesActions from '../../../redux/actions/ganado/lotesActions';
import * as pesadasActions from '../../../redux/actions/ganado/pesadasActions';
import * as saleNotesActions from '../../../redux/actions/ganado/salenotesActions';
import FormAnimalLote from '../animals/FormLote';
import { AreteCard } from './AreteCard';
import FormPesada from '../animals/FormPesada';
import FormSalidas from '../animals/FormSalida'

const FormItem = Form.Item;
const {Option, OptGroup } = Select;

class EventosPage extends Component {
    state = {
        aretes:[],
        aretesId:[],
        areteRancho:'',
        areteId:'',
        lote:'',
        loteId:{
            animals:[]
        },
        modo:'',
        loading:false,
        multiple:[],
        mIds:[]
    };

    handleSearch=(a)=>{
        //let basePath = 'http://localhost:8000/api/ganado/animals/?q=';
        let basePath = 'https://rancho.davidzavala.me/api/ganado/animals/?q=';
        let url = basePath+a;
        this.props.animalActions.getAnimals(url);
    };
    handleChange=(a)=>{
        //let basePath = 'https://rancho.davidzavala.me/api/ganado/animals/?q=';
        this.setState({areteRancho:a});
    };

    deleteFromMultiple=(a)=>{
        let {mIds} = this.state;
        mIds = mIds.filter(i=>{return i.arete_siniga!== a})
        this.setState({mIds})
        
    }

    onSelectLote=(value, b)=>{
        
        this.setState({lote:value})
    };
    saveId=(id)=>{
        this.setState({areteId:id});
        
    };
    saveIds=(id)=>{
        let {mIds}=this.state;
        mIds.push(id)
        this.setState({mIds});
        
    };
    saveLoteId=(id)=>{        
        this.setState({loteId:id});
        
    };

    handleSearchLote=(a)=>{
        let basePath = 'https://rancho.davidzavala.me/api/ganado/lotes/?q=';
        let url = basePath+a;
        this.props.lotesActions.getLotes(url);

    };
    handleChangeLote=(a)=>{
        //let basePath = 'https://rancho.davidzavala.me/api/ganado/animals/?q=';
        this.setState({lote:a});
    };
    handleMultiple=(a)=>{
        this.setState({multiple:a});
    }
    //sale Notes functions
    saveSalida=(sn)=>{
        let {modo, mIds, loteId, areteId} = this.state
        sn['animals_id'] = [];
        if(modo==='individual'){
            sn.animals_id.push(areteId.id)
            //this.props.animalActions.editAnimal({id:areteId.id,status:false, lote_id:null,lote:null})
        }else if(modo==='multiple'){
            for(let j in mIds){
                sn.animals_id.push(mIds[j].id)
                //this.props.animalActions.editAnimal({id:mIds[j].id,status:false, lote_id:null, lote:null})
            }
        }else if(modo==='lote'){
            for(let i in loteId.animals){
                
                sn.animals_id.push(loteId.animals[i].id)
                //this.props.animalActions.editAnimal({id:loteId.animals[i].id,status:false, lote_id:null, lote:null})
            }
        }
        
        console.log(sn)
        this.props.saleNotesActions.newSaleNote(sn)
            .then(r=>{
                for(let j in sn.animals_id){
                    console.log(sn.animals_id[j])
                    this.props.animalActions.editAnimal({id:sn.animals_id[j],status:false})
                        .then(r=>{console.log(r)})
                        .catch(e=>{console.log(e.response)})
                }
                message.success('Nota creada con éxito');                                
                this.setState({areteRancho:'', areteId:'', modo:''});
                
            }).catch(e=>{
                console.log(e.response)
                for (let i in e.response.data){
                    message.error(e.response.data[i])
                }
            })
    };
   

    saveGasto=(gasto)=>{
        gasto['animal'] = this.state.areteId.id;
        this.props.animalGastoActions.saveAnimalGasto(gasto)
            .then(r=>{
                message.success('Gasto agregado con éxito');
                this.setState({areteRancho:'', areteId:'', modo:''});
                this.handleSearch('')
            }).catch(e=>{
                for (let i in e.response.data){
                    message.error(e.response.data[i])
                }
            })
    };
    saveMultiplesGastos=(gasto)=>{
        this.setState({loading:true});
        let {mIds} = this.state;
        console.log(mIds)
        
        let parcialAmount = gasto.costo/mIds.length;
        parcialAmount = parcialAmount.toFixed(2);
        let parcialQuantity = gasto.cantidad/mIds.length;
        parcialQuantity = parcialQuantity.toFixed(2);
        for(let i in mIds){
           let animalId = mIds[i].id;
            gasto['animal']=animalId;
            gasto['costo']=parcialAmount;
            if(gasto.cantidad)gasto['cantidad']=parcialQuantity;
            let toSend = Object.assign({}, gasto);
            this.props.animalGastoActions.saveAnimalGasto(toSend)
                .then(r=>{

                }).catch(e=>{
                for (let i in e.response.data){
                    message.error(e.response.data[i])
                }
            })
        }

        this.setState({loading:false});
        message.success('Gasto agregado con éxito')
    };
    saveLoteGastos=(gasto)=>{
        this.setState({loading:true});
        let {loteId} = this.state;
        //let keys = this.state.selectedRowKeys;
        let parcialAmount = gasto.costo/loteId.animals.length;
        parcialAmount = parcialAmount.toFixed(2);
        let parcialQuantity = gasto.cantidad/loteId.animals.length;
        parcialQuantity = parcialQuantity.toFixed(2);
        for(let i in loteId.animals){
            let animalId = loteId.animals[i].id;
            gasto['animal']=animalId;
            gasto['costo']=parcialAmount;
            if(gasto.cantidad)gasto['cantidad']=parcialQuantity;
            let toSend = Object.assign({}, gasto);
            this.props.animalGastoActions.saveAnimalGasto(toSend)
                .then(r=>{

                }).catch(e=>{
                for (let i in e.response.data){
                    message.error(e.response.data[i])
                }
            })
        }

        this.setState({loading:false});
        message.success('Gasto agregado con éxito')
    };
    changeSingleLote=(animal)=>{
    
        animal['id']= this.state.areteId.id
        let toSend = Object.assign({}, animal);

        this.props.animalActions.editAnimal(toSend)
            .then(r => {
                message.success('Modificado con éxito');
            }).catch(e => {
            console.log(e)
        })
        
    };
    changeLoteLote=(animal)=>{
        let {loteId} = this.state
        
        for(let j in loteId.animals){
            animal['id']=loteId.animals[j].id;
            let toSend = Object.assign({}, animal);
            console.log(toSend)
           this.props.animalActions.editAnimal(toSend)
                .then(r => {
                    message.success('Modificado con éxito');
                }).catch(e => {
               for (let i in e.response.data){
                   message.error(e.response.data[i])
               }
            })
        
        }
    };
    changeMultiplesLote=(animal)=>{
        let {mIds} = this.state;
        for(let j in mIds){
            animal['id']=mIds[j].id;
            let toSend = Object.assign({}, animal);
            
           this.props.animalActions.editAnimal(toSend)
                .then(r => {
                    message.success('Modificado con éxito');
                }).catch(e => {
                    console.log(e)
                   //message.error(e.response.data[i])
               
            })
            
        }
    };
    /*pesadas*/ 
    changeSinglePesada=(animal)=>{
    
        animal['animal']= this.state.areteId.id
        let toSend = Object.assign({}, animal);

        
        this.props.pesadasActions.savePesada(toSend)
            .then(r => {
                message.success('Modificado con éxito');
            }).catch(e => {
            console.log(e)
        })
        
    };
    changeLotePesada=(animal)=>{
        let {loteId} = this.state
        
        for(let j in loteId.animals){
            animal['animal']=loteId.animals[j].id;
            let toSend = Object.assign({}, animal);
            console.log(toSend)
            this.props.pesadasActions.savePesada(toSend)
                .then(r => {
                    message.success('Modificado con éxito');
                }).catch(e => {
               for (let i in e.response.data){
                   message.error(e.response.data[i])
               }
            })
        
        }
    };
    changeMultiplePesada=(animal)=>{
        let {mIds} = this.state;
        for(let j in mIds){
            animal['animal']=mIds[j].id;
            let toSend = Object.assign({}, animal);

            this.props.pesadasActions.savePesada(toSend)
                .then(r => {
                    message.success('Modificado con éxito');
                }).catch(e => {
               for (let i in e.response.data){
                   message.error(e.response.data[i])
               }
            })
            
        }
    };
    handleChangeMode=(a)=>{
        //let basePath = 'https://rancho.davidzavala.me/api/ganado/animals/?q=';
        
        this.setState({modo:a, mIds:[], areteId:{}, aretes:[], areteRancho:'', areteId:'', lote:'', loteId:{}, multiple:[]});
    };
    handleChangeEvent=(a)=>{
        //let basePath = 'https://rancho.davidzavala.me/api/ganado/animals/?q=';
        this.setState({event:a});
    };


    render() {
        let {fetched, animals, lotes, clients} = this.props;
        animals = animals.filter(a=>{return a.status === true})
        let {modo, loading, event, multiple, areteId, mIds, loteId} = this.state;
        let displayList = [];
        let newList = [];
        modo==='individual'?displayList=[areteId]:
        modo==='multiple'?displayList=mIds:
        modo==='lote'?displayList=loteId.animals:displayList=[]
        console.log(displayList, 'antes del filtro')
        displayList=displayList?displayList.filter(a=>a.status===true):[]
        for(let i in displayList){
            let animal = animals.find(a=>{return a.id==displayList[i].id})
            console.log(animal)
        }
        console.log(newList)
        if(!fetched)return(<MainLoader/>);

        return (
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Ganado
                    <Divider type="vertical" />
                    Eventos

                </div>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                    <div style={{width:'50%'}}>
                    <h2>Registro de Eventos</h2>
                   
                    <FormItem label={'Modo'}>
                        <Select
                           value={modo}
                            onChange={this.handleChangeMode}
                            style={{width:'100%'}}
                        >
                            <Option value={'individual'}>Individual</Option>
                            <Option value={'lote'}>Por Lote</Option>
                            <Option value={'multiple'}>Multiple</Option>
                        </Select>
                    </FormItem>
                    <FormItem label={'Tipo de Evento'}>
                        <Select
                           value={event}
                            onChange={this.handleChangeEvent}
                            style={{width:'100%'}}>
                            
                            <Option value={'gasto'}>Gasto</Option>
                            <Option value={'reubicacion'}>Reubicación</Option>
                            <Option value={'pesada'}>Pesada</Option>
                            <Option value={'salida'}>Salida</Option>
                           
                        </Select>
                    </FormItem>
                    {modo==='lote'?
                        <FormItem label={'Lote'}>
                            <Select
                                value={this.state.lote}
                                mode="combobox"
                                style={{width:'100%'}}
                                onSelect={this.onSelectLote}

                                onChange={this.handleChangeLote}
                                placeholder="ingresa el nombre del lote"
                                filterOption={true}
                            >
                                {lotes.map((a, key)=><Option value={a.name} key={key}>
                                    <div onClick={()=>this.saveLoteId(a)}>
                                        <span style={{color:'gray', fontSize:'.8em'}}>Corral: {a.corral.no_corral}</span><br/>
                                        <span >Lote: {a.name}</span>
                                    </div>
                                </Option>)}
                            </Select>
                        </FormItem>:modo==='individual'?
                        <FormItem label={"Arete"}>
                            <Select
                                value={this.state.areteRancho}
                                mode="combobox"
                                style={{width:'100%'}}
                                onSelect={this.onSelect}
                                onSearch={this.handleSearch}
                                onChange={this.handleChange}
                                placeholder="ingresa el arete de rancho, o siniga para buscarlo"
                                filterOption={false}
                                >
                                {animals.map((a, key)=><Option value={a.arete_siniga} key={key}>
                                    <div onClick={()=>this.saveId(a)}>
                                        <span style={{color:'gray', fontSize:'.8em'}}>R: {a.arete_rancho}</span><br/>
                                        <span >S: {a.arete_siniga}</span>
                                    </div>
                                    </Option>)}
                            </Select>
                        </FormItem>:modo==='multiple'?
                        <FormItem label="Multiples Aretes">
                             <Select
                                mode="tags"
                                value={multiple}
                                placeholder="Please select"
                                defaultValue={[]}
                                onSearch={this.handleSearch}
                                onDeselect={this.deleteFromMultiple}
                                onChange={this.handleMultiple}
                                style={{ width: '100%' }}
                                >
                                {animals.map((a, key)=><Option value={a.arete_siniga} key={key}>
                                    <div onClick={()=>this.saveIds(a)}>
                                       
                                        <span>S: {a.arete_siniga}</span><br/>
                                        <span style={{color:'gray', fontSize:'.8em'}}>R: {a.arete_rancho}</span>
                                    </div>
                                    </Option>)}
                                </Select>
                        </FormItem>:'Elige un Modo* '}
                        
                        
                        {event==='gasto'? <FormGasto saveGasto={modo==='individual'?this.saveGasto:modo==='lote'?this.saveLoteGastos:modo==='multiple'?this.saveMultiplesGastos:''}/>:
                        event==='reubicacion'?<FormAnimalLote lotes={lotes} changeLote={modo==='individual'?this.changeSingleLote:modo==='lote'?this.changeLoteLote:modo==='multiple'?this.changeMultiplesLote:''}/>:
                        event==='salida'?<FormSalidas saveSalida={this.saveSalida} clients={clients}/>:
                        event==="pesada"?<FormPesada savePesada={modo==='individual'?this.changeSinglePesada:modo==='lote'?this.changeLotePesada:modo==='multiple'?this.changeMultiplePesada:''}/>:'Elige un Evento*'}
                     </div>
                    <div style={{width:'30%', }}>
                        
                        <Card style={{width:'100%', height:'80vh', overflowY:'scroll'}} title={'Aretes Seleccionados'}>                       
                        <List
                            itemLayout="horizontal"
                            dataSource={modo==='individual'?[areteId]:
                                modo==='multiple'?mIds:
                                modo==='lote'?loteId.animals?loteId.animals.filter(a=>a.status===true):[]:[]}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta                            
                                title={<Link to={`/admin/animals/${item.id}`}>{item.arete_siniga}</Link>}
                                description={<AreteCard {...item}/>}
                                />
                            </List.Item>
                            )}
                        />
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        animals:state.animals.list,
        lotes: state.lotes.list,
        clients:state.clientes.list,
        fetched:state.animals.list!==undefined && state.lotes.list!==undefined && state.clientes.list!==undefined
    }
}

function mapDispatchToProps(dispatch) {
    return {
        animalGastoActions: bindActionCreators(animalGastoActions, dispatch),
        animalActions:bindActionCreators(animalActions, dispatch),
        lotesAction:bindActionCreators(lotesActions, dispatch),
        pesadasActions:bindActionCreators(pesadasActions, dispatch),
        saleNotesActions:bindActionCreators(saleNotesActions, dispatch),

    }
}

EventosPage = connect(mapStateToProps, mapDispatchToProps)(EventosPage);
export default EventosPage;
