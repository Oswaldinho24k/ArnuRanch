import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FormGasto from "../animals/FormGasto";
import {Select, Form, message, Divider} from 'antd';
import MainLoader from "../../common/Main Loader";
import * as animalGastoActions from '../../../redux/actions/ganado/gastoAnimalActions';
import * as animalActions from '../../../redux/actions/ganado/animalsActions';

const FormItem = Form.Item;
const Option = Select.Option;

class EventosPage extends Component {
    state = {
        areteRancho:'',
        areteId:''
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
        let basePath = 'http://localhost:8000/api/ganado/animals/?q=';
        let url = basePath+a;
        this.props.animalActions.getAnimals(url);
    };
    handleChange=(a)=>{
        //let basePath = 'https://rancho.fixter.org/api/ganado/animals/?q=';
        this.setState({areteRancho:a});


    }

    saveGasto=(gasto)=>{
        gasto['animal'] = this.state.areteId;
        this.props.animalGastoActions.saveAnimalGasto(gasto)
            .then(r=>{
                message.success('Gasto agregado con éxito');
                this.setState({areteRancho:'', areteId:''});
                this.handleSearch('')
            }).catch(e=>{
                for (let i in e.response.data){
                    message.error(e.response.data[i])
                }
            })
    };

    render() {
        let {fetched, animals} = this.props;
        if(!fetched)return(<MainLoader/>);

        return (
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Ganado
                    <Divider type="vertical" />
                    Eventos

                </div>
                <div style={{width:'50%', margin: '0 auto'}}>


                    <h2>Registro individual de Eventos</h2>
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
                    </FormItem>
                    <FormGasto saveGasto={this.saveGasto}/>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        animals:state.animals.list,
        fetched:state.animals.list!==undefined
    }
}

function mapDispatchToProps(dispatch) {
    return {
        animalGastoActions: bindActionCreators(animalGastoActions, dispatch),
        animalActions:bindActionCreators(animalActions, dispatch)
    }
}

EventosPage = connect(mapStateToProps, mapDispatchToProps)(EventosPage);
export default EventosPage;
