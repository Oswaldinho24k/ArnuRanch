import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FormGasto from "../animals/FormGasto";
import {Link} from 'react-router-dom'
import {Select, Form, message, Divider, Card, List, DatePicker, Button} from 'antd';
import MainLoader from "../../common/Main Loader";
import * as animalGastoActions from '../../../redux/actions/ganado/gastoAnimalActions';
import * as animalActions from '../../../redux/actions/ganado/animalsActions';
import * as lotesActions from '../../../redux/actions/ganado/lotesActions';
import FormAnimalLote from '../animals/FormLote';
import {AreteCard} from '../eventos/AreteCard'
import { ReporteCard } from './ReporteCard';
import {ResumenCard} from './ResumenCard';
import './reportes.css'
import {host} from '../../../Api/Django'

const FormItem = Form.Item;
const {Option, OptGroup } = Select;
const {  RangePicker } = DatePicker;

class ReporteFechaPage extends Component {
    state = {
        aretes:[],
        aretesId:[],
        areteRancho:'',
        areteId:{},
        lote:'',
        loteId:'',
        modo:'',
        loading:false,
        multiple:[],
        mIds:[],
        rango:'',
    };

    handleSearch=(a)=>{

        let basePath = host+'/api/ganado/animals/?q=';
        let url = basePath+a;
        this.props.animalActions.getAnimals(url);
    };
    handleChange=(a)=>{
        let basePath = host+'/api/ganado/animals/?q=';
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
        let basePath = host+'/api/ganado/lotes/?q=';
        let url = basePath+a;
        this.props.lotesActions.getLotes(url);

    };
    handleChangeLote=(a)=>{

        let basePath = host+'/api/ganado/animals/?q=';
        this.setState({lote:a});
    };
    handleMultiple=(a)=>{
        this.setState({multiple:a});
    }

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

        this.setState({lote:'', loteId:'', modo:'', loading:false, mIds:[]});
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

        this.setState({lote:'', loteId:'', modo:'', loading:false});
        message.success('Gasto agregado con éxito')
    };
    changeSingleLote=(animal)=>{
    
        animal['id']= this.state.areteId.id
        let toSend = Object.assign({}, animal);

        this.props.animalActions.editAnimal(toSend)
            .then(r => {
                message.success('Modificado con éxito');
            }).catch(e => {

        })
        
    };
    changeLoteLote=(animal)=>{
        let {loteId} = this.state
        
        for(let j in loteId.animals){
            animal['id']=loteId.animals[j].id;
            let toSend = Object.assign({}, animal);

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
    onChangeDate=(a, b, c)=>{

        this.setState({rango:b})
    }
    changeMultiplesLote=(animal)=>{

        let {mIds} = this.state;
        for(let j in mIds){
            animal['id']=mIds[j].id;
            let toSend = Object.assign({}, animal);

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
    handleChangeMode=(a)=>{
        //let basePath = 'https://rancho.fixter.org/api/ganado/animals/?q=';
        this.setState({modo:a, mIds:[], areteId:{}, aretes:[], areteRancho:'', areteId:'', lote:'', loteId:{}, multiple:[]});
    };
    handleChangeEvent=(a)=>{
        //let basePath = 'https://rancho.fixter.org/api/ganado/animals/?q=';
        this.setState({event:a});
    };
    print=()=>{
        window.print()
    }


    render() {
        let {fetched, animals, lotes} = this.props;
        let {modo, loading, event, multiple, areteId, mIds, loteId, rango} = this.state;
        
        if(!fetched)return(<MainLoader/>);
        if(animals[0]){



        }
        
        return (
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Ganado
                    <Divider type="vertical" />
                    Eventos

                </div>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                    <div style={{width:'40%'}}>
                    <h2>Histórico de Indicadores</h2>

                    <FormItem label="Rango de Tiempo">
                        <RangePicker onChange={this.onChangeDate} style={{width:'100%'}}/>
                    </FormItem>
                   
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
                                {animals.filter(a=>a.fecha_entrada>rango[0]&&a.fecha_entrada<rango[1]).map((a, key)=><Option value={a.arete_siniga} key={key}>
                                    <div onClick={()=>this.saveId(a)}>
                                        <span style={{color:'gray', fontSize:'.8em'}}>Rancho: {a.arete_rancho}</span><br/>
                                        <span >Siniga: {a.arete_siniga}</span>
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
                                {animals.filter(a=>a.fecha_entrada>rango[0]&&a.fecha_entrada<rango[1]).map((a, key)=><Option value={a.arete_siniga} key={key}>
                                    <div onClick={()=>this.saveIds(a)}>
                                       
                                        <span>S: {a.arete_siniga}</span><br/>
                                        <span style={{color:'gray', fontSize:'.8em'}}>R: {a.arete_rancho}</span>
                                    </div>
                                    </Option>)}
                                </Select>
                        </FormItem>:'Elige un Modo* '}

                        
                        
                        
                        {/*Forms de los reportes*/}
                       <div id="print" className="toprint">
                       <ResumenCard 
                                date={rango}
                                aretes={modo==='individual'?[areteId]:
                                modo==='multiple'?mIds:
                                modo==='lote'?loteId.animals?loteId.animals.filter(a=>a.fecha_entrada>rango[0]&&a.fecha_entrada<rango[1]).filter(a=>a.status==true):[]:[]}/>
                       </div>
                        <Button type="primary" onClick={this.print}>Print</Button>
                     </div>
                    <div style={{width:'50%', }}>
                        
                        <Card style={{width:'100%', height:'80vh', overflowY:'scroll' ,padding:'0%'}} 
                            title={'Aretes Seleccionados'}>
                        <List
                            style={{width:'100%', padding:0}}                        
                            itemLayout="horizontal"
                            dataSource={modo==='individual'?[areteId]:
                                modo==='multiple'?mIds:
                                modo==='lote'?loteId.animals?loteId.animals.filter(a=>a.fecha_entrada>rango[0]&&a.fecha_entrada<rango[1]).filter(a=>a.status==true):'':''}
                            renderItem={item => (
                            <List.Item>
                                <ReporteCard {...item}/>                                
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
        fetched:state.animals.list!==undefined && state.lotes.list!==undefined
    }
}

function mapDispatchToProps(dispatch) {
    return {
        animalGastoActions: bindActionCreators(animalGastoActions, dispatch),
        animalActions:bindActionCreators(animalActions, dispatch),
        lotesAction:bindActionCreators(lotesActions, dispatch),

    }
}

ReporteFechaPage = connect(mapStateToProps, mapDispatchToProps)(ReporteFechaPage);
export default ReporteFechaPage;


