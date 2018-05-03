import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FormGasto from "../animals/FormGasto";

import {Select, Form, message, Divider} from 'antd';
import MainLoader from "../../common/Main Loader";
import * as animalGastoActions from '../../../redux/actions/ganado/gastoAnimalActions';
import * as animalActions from '../../../redux/actions/ganado/animalsActions';
import * as lotesActions from '../../../redux/actions/ganado/lotesActions';

const FormItem = Form.Item;
const Option = Select.Option;

class EventosPage extends Component {
    state = {
        areteRancho:'',
        areteId:'',
        lote:'',
        loteId:'',
        modo:'',
        loading:false,
    };

    onSelect=(value, b)=>{
        console.log(b, value);
        this.setState({areteRancho:value})
    };
    saveId=(id)=>{
        this.setState({areteId:id})
        console.log(id)
    };

    handleSearch=(a)=>{
        let basePath = 'https://rancho.fixter.org/api/ganado/animals/?q=';
        let url = basePath+a;
        this.props.animalActions.getAnimals(url);
    };
    handleChange=(a)=>{
        //let basePath = 'https://rancho.fixter.org/api/ganado/animals/?q=';
        this.setState({areteRancho:a});
    };

    onSelectLote=(value, b)=>{
        console.log(b, value);
        this.setState({lote:value})
    };
    saveLoteId=(id)=>{
        this.setState({loteId:id});
        console.log(id)
    };

    handleSearchLote=(a)=>{
        let basePath = 'http://localhost:8000/api/ganado/lotes/?q=';
        let url = basePath+a;
        this.props.lotesActions.getLotes(url);

    };
    handleChangeLote=(a)=>{
        //let basePath = 'https://rancho.fixter.org/api/ganado/animals/?q=';
        this.setState({lote:a});
    };

    saveGasto=(gasto)=>{
        gasto['animal'] = this.state.areteId;
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
    handleChangeMode=(a)=>{
        //let basePath = 'https://rancho.fixter.org/api/ganado/animals/?q=';
        this.setState({modo:a});
    };


    render() {
        let {fetched, animals, lotes} = this.props;
        let {modo, loading} = this.state;
        if(!fetched)return(<MainLoader/>);

        return (
            <div>
                {loading?<MainLoader/>:''}
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Ganado
                    <Divider type="vertical" />
                    Eventos

                </div>
                <div style={{width:'50%', margin: '0 auto'}}>


                    <h2>Registro de Eventos</h2>
                    <FormItem label={'Modo'}>
                        <Select
                            onChange={this.handleChangeMode}
                            style={{width:'100%'}}
                        >
                            <Option value={'individual'}>Individual</Option>
                            <Option value={'lote'}>Por Lote</Option>
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
                        <div onClick={()=>this.saveId(a.id)}>
                        <span style={{color:'gray', fontSize:'.8em'}}>Rancho: {a.arete_rancho}</span><br/>
                        <span >Siniga: {a.arete_siniga}</span>
                        </div>
                        </Option>)}
                        </Select>
                        </FormItem>:''}
                    <FormGasto saveGasto={modo==='individual'?this.saveGasto:this.saveLoteGastos}/>
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

EventosPage = connect(mapStateToProps, mapDispatchToProps)(EventosPage);
export default EventosPage;
