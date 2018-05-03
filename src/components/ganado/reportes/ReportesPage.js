import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Select, Form, message, Divider} from 'antd';
import MainLoader from "../../common/Main Loader";


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
    };


    componentWillMount(){
        /*const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        let url = 'http://localhost:8000/api/ganado/animals/';
        var request = new Request(url, {
            method: 'GET',
            //body: data,
            headers: new Headers({
                'Authorization':'Token '+userToken,
                'Content-Type': 'application/json'
            })
        });
        fetch(request)
            .then(r=>r.json())
            .then(data=>{
                console.log(data)
            })
            .catch(e=>{
                console.log(e)
        })*/
    }
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
                <h2>Reportes</h2>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Ganado
                    <Divider type="vertical" />
                    Reportes

                </div>
                <div style={{width:'50%', margin: '0 auto'}}>


                    <h2>Resúmen de Aretes</h2>
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

                        <div>
                            <div>Datos Básicos</div>
                            <div>
                                <h4>Peso Estimado actual</h4>
                                <h4>Inversión Registrada al momento</h4>
                                <h4>Peso de Salida</h4>
                                <h4>Rendimiento</h4>
                                <h4>Conversión</h4>
                                <h4>Ganancia Diaria Promedio</h4>

                            </div>
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
        //actions: bindActionCreators(actions, dispatch)
    }
}

ReportesPage = connect(mapStateToProps, mapDispatchToProps)(ReportesPage);
export default ReportesPage;
