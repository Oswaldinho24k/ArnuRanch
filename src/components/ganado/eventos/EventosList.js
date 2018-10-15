import React, {Component, Fragment} from 'react';
import {Button, Input, Divider, Pagination, DatePicker, Select, message, Row} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'
import MainLoader from "../../common/Main Loader";
import {host} from '../../../Api/Django'
import * as gastoAnimalActions from '../../../redux/actions/ganado/gastoAnimalActions'
import {EventCard} from "./EventCard";

const RangePicker = DatePicker.RangePicker
const Option = Select.Option

class EventosList extends Component {

    state={
        searchText:'',
        loading:false
    }

    reset=()=>{
        let basePath = host+'/api/ganado/alimentos/';

        this.props.gastoAnimalActions.getAnimalGastos(basePath)
            .then(r=>{
                this.setState({canReset:true, loading:false})
            }).catch(e=>{
                console.log(e)
        })
    }

    filter=(lote)=>{
        this.setState({loading:true})
        let basePath = host+'/api/ganado/alimentos/?q=';
        let url = basePath+lote;
        this.props.gastoAnimalActions.getAnimalGastos(url)
            .then(r=>{
                this.setState({canReset:true, loading:false})
            }).catch(e=>{
                message.error('Ocurrió un Problema!')
        })
    };

    filterRange=(moment, date)=>{
        console.log(date)
        this.setState({loading:true})
        let basePath = host+'/api/ganado/alimentos/';
        let url = `${basePath}?d1=${date[0]}&d2=${date[1]}`
        this.props.gastoAnimalActions.getAnimalGastos(url)
            .then(r=>{
                this.setState({canReset:true, loading:false})
            }).catch(e=>{
            message.error('Ocurrió un Problema!')
        })
    }

    handlePagination=(pagina)=>{
        this.setState({loading:true})
        let nextLength = pagina.toString().length;
        let newUrl = this.props.data.next;

        if(newUrl===null){
            newUrl = this.props.data.previous;
            if (newUrl == null) return
        }

        //if( pagina ==1 && this.props.data.count <= 40){
            newUrl='http'+newUrl.slice(4,newUrl.length);
        /*}else{
            newUrl='http'+newUrl.slice(4,newUrl.length-nextLength)+pagina;
        }*/
        this.props.gastoAnimalActions.getAnimalGastos(newUrl)
            .then(r=>{
                this.setState({loading:false})
            }).catch(e=>{
                console.log(e)
        })
    };
    onSearch=()=>{
        
    }
    render() {
        const {searchText} = this.state
        const {fetched, eventos, data} = this.props


        if(!fetched) return <MainLoader/>
        return (
            <>
                <h2>Lista de eventos Registrados</h2>
                <div>
                    <Input.Search
                        enterButton
                        onSearch={this.onSearch}
                        onChange={this.handleSearch}
                        value={searchText}
                        style={{ width: 300 }}
                        placeholder={'Busca por arete'}/>
                    <Divider type={'vertical'}/>
                    <RangePicker onChange={this.filterRange}/>
                    <Divider type={'vertical'}/>
                    <Select style={{ width: 200 }} placeholder={'Filtros'} onChange={this.filter}>
                        <Option value={'Alimento'}>Alimentación</Option>
                        <Option value={'Vacuna'}>Vacunación</Option>
                    </Select>
                    <Divider type={'vertical'}/>
                    <Button type={'primary'} onClick={this.reset}>Reset</Button>

                </div>
                <div>
                    <Row gutter={18}>
                    {eventos.map((e,key)=>(
                            <EventCard {...e} key={key}/>
                    ))}
                    </Row>
                </div>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Link to={"/admin/eventos"}>
                        <Button type={'primary'}>Agregar</Button>
                    </Link>

                    <Pagination
                    pageSize={24}
                    total={data.count}
                    onChange={this.handlePagination}
                    showTotal={total => `Total: ${total} aretes`}
                    defaultCurrent={1}
                    style={{padding:'1% 0'}}/>
                </div>
            </>
        );
    }
}

const mapStateToProps=(state, oP)=>{
    return{
        data:state.eventos.object,
        eventos:state.eventos.list,
        fetched:state.eventos.list!==undefined && state.eventos.object,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        gastoAnimalActions:bindActionCreators(gastoAnimalActions, dispatch)
    }
}


EventosList = connect(mapStateToProps,mapDispatchToProps)(EventosList)
export default EventosList;