import React, {Component, Fragment} from 'react';
import {Button, Input, Divider, Pagination, DatePicker, Select, message, Row} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'
import MainLoader from "../../common/Main Loader";
import {host} from '../../../Api/Django'
import * as gastoAnimalActions from '../../../redux/actions/ganado/gastoAnimalActions'
import * as lotesActions from '../../../redux/actions/ganado/lotesActions'
import {EventCard} from "./EventCard";

const RangePicker = DatePicker.RangePicker
const Option = Select.Option

class EventosList extends Component {

    state={
        searchText:'',
        loading:false,
        text:'',
        date:['',''],
        lote:'',
        category:''
    }
    reset=()=>{
        let basePath = host+'/api/ganado/alimentos/';
        this.setState({text:'', date:['',''], lote:'', category:''})

        this.props.gastoAnimalActions.getAnimalGastos(basePath)
            .then(r=>{
                this.setState({canReset:true, loading:false})
            }).catch(e=>{
                console.log(e)
            })
    }


//filter by event type
    filter=(category)=>{
        const {lote, date, text} = this.state
        this.setState({loading:true, category})
        let basePath = `${host}/api/ganado/alimentos/?q=${category}&lote=${lote}&d1=${date[0]}&d2=${date[1]}&text=${text}`;
        this.props.gastoAnimalActions.getAnimalGastos(basePath)
            .then(r=>{
                this.setState({canReset:true, loading:false})
            }).catch(e=>{
                message.error('Ocurrió un Problema!')
            })
    };

    //lotes filter
    filterByLote=(lote)=>{
        console.log(lote)
        this.setState({loading:true})
        const {category, date, text} = this.state
        this.setState({loading:true, lote})
        let basePath = `${host}/api/ganado/alimentos/?q=${category}&lote=${lote}&d1=${date[0]}&d2=${date[1]}&text=${text}`;
        console.log(basePath)
        this.props.gastoAnimalActions.getAnimalGastos(basePath)
            .then(r=>{
                this.setState({canReset:true, loading:false})
            }).catch(e=>console.log(e))
    };

    //Dates filter
    filterRange=(moment, date)=>{
        const {lote, text, category} = this.state
        this.setState({loading:true, date})
        let basePath = `${host}/api/ganado/alimentos/?q=${category}&lote=${lote}&d1=${date[0]}&d2=${date[1]}&text=${text}`;

        this.props.gastoAnimalActions.getAnimalGastos(basePath)
            .then(r=>{
                this.setState({canReset:true, loading:false})
            }).catch(e=>{
                    message.error('Ocurrió un Problema!')
            })
    }

    onSearch=(text)=>{
        const {lote, date, category} = this.state
        this.setState({loading:true, text})
        let basePath = `${host}/api/ganado/alimentos/?q=${category}&lote=${lote}&d1=${date[0]}&d2=${date[1]}&text=${text}`;
        this.props.gastoAnimalActions.getAnimalGastos(basePath)
            .then(r=>{
                this.setState({loading:false})
            }).catch(e=>{
                console.log(e)
            })
    }
    handleSearch=(e)=>{
        
        this.setState({text:e.target.value})
    }

//pagination
    handlePagination=(pagina)=>{
        this.setState({loading:true})
        let nextLength = pagina.toString().length;
        let newUrl = this.props.data.next;

        if(newUrl===null){
            newUrl = this.props.data.previous;
            if (newUrl == null) return
        }

        //if( pagina ==1 && this.props.data.count <= 40){
        newUrl='https'+newUrl.slice(4,newUrl.length);
        /*}else{
            newUrl='https'+newUrl.slice(4,newUrl.length-nextLength)+pagina;
        }*/
        this.props.gastoAnimalActions.getAnimalGastos(newUrl)
            .then(r=>{
            this.setState({loading:false})
        }).catch(e=>{

        })
    };
//text search


    saveGasto=(gasto)=>{
        console.log(gasto)
        this.props.gastoAnimalActions.updateAnimalGasto(gasto)
            .then(r=>{
                message.success('Editado con éxito')
            }).catch(e=>{
                message.error('Ocurrió un problema, intenta más tarde')
            })
    }

handleSearchLote=(a)=>{
    let basePath = host + '/api/ganado/lotes/?q=';
    let url = basePath+a;
    this.props.lotesActions.getLotes(url);
};
    handleChangeLote=(a)=>{
        this.setState({lote:a})
    }

render() {
    const {searchText, lote, text, date, category} = this.state
    const {fetched, eventos, data, lotes} = this.props
    console.log(fetched)


    if(!fetched && eventos.length<=0) return <MainLoader/>
    return (
        <>
            <h2>Lista de eventos Registrados</h2>
            <div>
            <Input.Search
                value={text}
                enterButton
                onSearch={this.onSearch}
                onChange={this.handleSearch}
                style={{ width: 300 }}
                placeholder={'Busca por arete'}/>
            <Divider type={'vertical'}/>
            <RangePicker onChange={this.filterRange}/>
            <Divider type={'vertical'}/>
            <Select style={{ width: 200 }} placeholder={'Tipo de Evento'} onChange={this.filter} value={category}>
                <Option value={'Alimento'}>Alimentación</Option>
                <Option value={'Vacuna'}>Vacunación</Option>
            </Select>
            <Divider type={'vertical'}/>
            <Select
                value={lote}
                mode="combobox"
                style={{ width: 200 }}
                onChange={this.handleChangeLote}
                onSearch={this.handleSearchLote}
                onSelect={this.filterByLote}
                placeholder="Filtra por nombre de lote"
                filterOption={false}
                    >
                    {lotes.map(d => <Option value={d.name} key={d.id}>{d.name}</Option>)}
            </Select>
            <Divider type={'vertical'}/>
            <Button type={'primary'} onClick={this.reset}>Reset</Button>

            </div>
            <div>
            <Row gutter={18}>
                {eventos.map((e,key)=>(
                <EventCard {...e} key={key} evento={e} saveGasto={this.saveGasto}/>
        ))}
        </Row>
            </div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
        <Link to={"/admin/eventos"}>
                <Button type={'primary'}>Agregar</Button>
                </Link>

        <Pagination
            pageSize={24}
            defaultCurrent={1}
            total={data.count}
            onChange={this.handlePagination}
            showTotal={total => `Total: ${total} eventos`}
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
        lotes:state.lotes.list,
        fetched:state.eventos.list!==undefined && state.eventos.object!==undefined && state.lotes.list!==undefined,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        gastoAnimalActions:bindActionCreators(gastoAnimalActions, dispatch),
        lotesActions:bindActionCreators(lotesActions, dispatch),
    }
}


EventosList = connect(mapStateToProps,mapDispatchToProps)(EventosList)
export default EventosList;