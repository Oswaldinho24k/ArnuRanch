import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Select, Form, message, Divider, Card, Avatar} from 'antd';
import MainLoader from "../../common/Main Loader";
import * as animalActions from '../../../redux/actions/ganado/animalsActions';
import * as lotesActions from '../../../redux/actions/ganado/lotesActions';


const FormItem = Form.Item;
const Option = Select.Option;

class ReportesPage extends Component {
    state = {
        areteRancho:'',
        areteId:'',
        lote:'',
        loteId:'',
        modo:'',
        loading:false,
        info:null,
        infoLote:null,
    };


    onSelect=(value, b)=>{
        console.log(b, value);
        this.setState({areteRancho:value})
    };
    saveId=(info)=>{
        this.setState({info:info})
        //this.setState({areteId:id})
        console.log(info)
    };

    handleSearch=(a)=>{
        console.log("ONSEARCH", a)
        //let basePath = 'https://rancho.fixter.org/api/ganado/animals/?q=';
        let basePath = 'http://localhost:8000/api/ganado/animals/?q=';

        let url = basePath+a;
        this.props.animalActions.getAnSearch(url);
    };
    handleChange=(a)=>{
        console.log("CHANGE", a)
        //let basePath = 'https://rancho.fixter.org/api/ganado/animals/?q=';
        this.setState({areteRancho:a});
    };

    onSelectLote=(value, b)=>{
        console.log(b, value);
        this.setState({lote:value})
    };
    saveLoteId=(lote)=>{
        this.setState({infoLote:lote});
        console.log(lote)
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
        handleChangeMode=(a)=>{
        //let basePath = 'https://rancho.fixter.org/api/ganado/animals/?q=';
        this.setState({modo:a});
    };

    render() {
        let {fetched, animals, lotes, animalSearch} = this.props;
        let {modo, loading} = this.state;
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Ganado
                    <Divider type="vertical" />
                    Reportes
                </div>

                <h2>Reportes</h2>


                <div style={{display:'flex', flexWrap:'wrap', justifyContent: 'space-around'}}>

                    <div style={{width:'45%'}}>

                    <Card title={"Búsqueda de reporte"} type="inner">
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
                                    onSearch={this.handleSearchLote}

                                    onChange={this.handleChangeLote}
                                    placeholder="ingresa el nombre del lote"
                                    filterOption={false}
                                >
                                    {lotes.length>0?
                                        lotes.map((a, key)=>
                                            <Option value={a.name} key={key}>
                                                <div onClick={()=>this.saveLoteId(a)}>
                                                    <span style={{color:'gray', fontSize:'.8em'}}>Corral: {a.name}</span><br/>
                                                    <span >Lote: {a.name}</span>
                                                </div>
                                            </Option>):
                                        <Option key={999999} disabled >No encontrado</Option>
                                    }
                                </Select>
                            </FormItem>

                            :modo==='individual'?

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
                                        {animalSearch.length >0 ?
                                            animalSearch.map((a, key)=>
                                                <Option value={a.arete_siniga} key={key}>
                                                    <div onClick={()=>this.saveId(a)}>
                                                        <span style={{color:'gray', fontSize:'.8em'}}>Rancho: {a.arete_rancho}</span><br/>
                                                        <span >Siniga: {a.arete_siniga}</span>
                                                    </div>
                                                </Option>
                                            ):<Option key={999999} disabled >No encontrado</Option>
                                        }
                                    </Select>
                                </FormItem>
                                :''}

                    </Card>
                    </div>

                    <div style={{width:'45%', marginLeft:20}}>
                        <Card title={"Resultado: "} type={"inner"} >
                        {modo === 'lote' ?
                            <CardLote {...this.state.infoLote}/>
                            :modo === 'individual'?
                                <CardInfo {...this.state.info} />
                                :''
                        }
                        </Card>

                    </div>
                </div>

            </Fragment>

        );
    }
}


const CardInfo = ({arete_rancho, costo_inicial, fierro_nuevo }) => {

    return(
        <div >
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginBottom:20}}>
                <Avatar style={{height:150, width:150, backgroundColor:'white'}} src={fierro_nuevo && fierro_nuevo!==null?fierro_nuevo:"http://tutaki.org.nz/wp-content/uploads/2016/04/no-image-available.png"} />
            </div>
            <p>Arete rancho: {arete_rancho}</p>
            <p>Peso Estimado actual {costo_inicial}</p>
            <p>Inversión Registrada al momento $ 75, 000</p>
            <p>Peso de Salida $500.00 kg</p>
            <p>Rendimiento $90, 000</p>
            <p>Conversión $190, 000</p>
            <p>Ganancia Diaria Promedio $99, 000</p>
        </div>

    )
};

const CardLote = ({name, animals }) => {

    return(
        <div >
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginBottom:20}}>
                <Avatar style={{height:150, width:150, backgroundColor:'white'}} src={"http://conceptodefinicion.de/wp-content/uploads/2014/09/ganado.jpg"} />
            </div>
            <p>Lote: {name}</p>
            <p>Inversión Registrada al momento $ 75, 000</p>
            <p>Cantidad de Animales {animals !==undefined ? animals.length:"No contiene animales"}</p>
            <p>Rendimiento $90, 000</p>
            <p>Conversión $190, 000</p>
            <p>Ganancia Diaria Promedio $99, 000</p>
        </div>

    )
};



function mapStateToProps(state, ownProps) {
    return {
        animals:state.animals.list,
        lotes: state.lotes.list,
        animalSearch:state.animals.animalSearch,
        fetched:state.animals.list!==undefined && state.lotes.list!==undefined
    }
}

function mapDispatchToProps(dispatch) {
    return {
        animalActions: bindActionCreators(animalActions, dispatch),
        lotesActions: bindActionCreators(lotesActions, dispatch)
    }
}

ReportesPage = connect(mapStateToProps, mapDispatchToProps)(ReportesPage);
export default ReportesPage;
