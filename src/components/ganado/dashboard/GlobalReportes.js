import React, { Component } from 'react'
import api from '../../../Api/Django'
import {Table,Card, Button, Switch, Modal, message, Popconfirm, Select, Divider, Input, DatePicker} from "antd";
import moment from 'moment'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as animalActions from '../../../redux/actions/ganado/animalsActions';
import * as lotesActions from '../../../redux/actions/ganado/lotesActions';
import {host} from '../../../Api/Django'
import MainLoader from '../../common/Main Loader';

const RangePicker = DatePicker.RangePicker
const Option = Select.Option



class GlobalReportes extends Component {

    state={
        aretes:[],
        globals:{},
        loading:false,
        // searchText:'',        
        // text:'',
        date:['',''],
        lote:'',
        status:''
    }


    componentWillMount(){
        this.getReportes()
        //this.getReportes()
    } 

    getReportes=(url=`${host}/api/ganado/reportes/`)=>{
        this.setState({loading:true})   
        console.log(url)
        api.getReportes(url)
        .then(r=>{
            this.setState({
                aretes:r.vacas,
                globals:r.globals
            })
            this.setState({loading:false})   
            console.log(r)
        })
        .catch(e=>{
            console.log(e)
        })
    }
//filtro de reportes por  lotes
    handleChangeLote=(loteFilter)=>{
        this.setState({loteFilter});
    };
    
    filterByLote=(lote)=>{
        const {status, date} = this.state
        this.setState({lote})        
        let basePath = `${host}/api/ganado/reportes/?status=${status}&lote=${lote}&d1=${date[0]}&d2=${date[1]}`;            
        this.getReportes(basePath)
    };
    handleSearchLote=(a)=>{
        let basePath = host + '/api/ganado/lotes/?q=';
        let url = basePath+a;
        this.props.lotesActions.getLotes(url);

    };
// reportes eb base al status de aretes
    handleStatus=(status)=>{
        this.setState({status})        
        const {date, lote} = this.state        
        let basePath = `${host}/api/ganado/reportes/?status=${status}&lote=${lote}&d1=${date[0]}&d2=${date[1]}`;            
        this.getReportes(basePath)
    }
    //reportes based on dates filter
    filterRange=(moment, date)=>{        
        this.setState({date})
        const {status, lote} = this.state        
        let basePath = `${host}/api/ganado/reportes/?status=${status}&lote=${lote}&d1=${date[0]}&d2=${date[1]}`;            
        this.getReportes(basePath)
        
    }
    resetFilters=()=>{        
        this.getReportes()
    }

    


  render() {
    const columns = [
        {
            title: 'Arete',
            dataIndex: 'arete_rancho',
            key:'arete_rancho',
            render: (text, record) => <p><Link to={`/admin/animals/${record.id}`}>{record.arete_rancho}</Link></p>,
            width:80
        },    
        {
            title:'Registro',
            dataIndex:'fecha_entrada',
            key:'fecha_entrada',
            render:(v)=><p>{moment(v).format('L')}</p>,
            width:110
        },{
            title:'Peso Inicial',
            dataIndex:'peso_entrada',
            key:'peso_entrada', 
            render:v=><p>{v?v:0}Kg</p> ,          
            width:150
        },{
            title:'Ultima Pesada',
            dataIndex:'peso_final',
            key:'peso_final',
            render:v=><p>{v?v:0}Kg</p> ,       
            width:150
        },{
            title:'Costo Total',
            dataIndex:'costos_total',
            key:'costos_total',                  
            render:(e, obj)=><p>${e?parseFloat(e)+parseFloat(obj.costo_inicial):0}</p>,
            width:150
        },{
            title:'GDP',
            dataIndex:'ganancia_diaria_promedio',
            key:'ganancia_diaria_promedio',
            render:(e)=><p>{e?e:0}</p>,
            width:100
        }
    ];
    const {aretes, globals, loading} = this.state
    const {lotes, animals, fetched} = this.props    
    if(!fetched) return <MainLoader/>
    console.log(globals)
    return (
      <div>        
        <div style={{width:'100%', height:'auto', marginBottom:20}}>
            {/* <Input.Search                
                enterButton               
                style={{ width: 300 }}
                placeholder={'Busca por arete'}/> */}
            <Divider type={'vertical'}/>
            <RangePicker onChange={this.filterRange}/>
            <Divider type={'vertical'}/>
            <Select style={{ width: 200 }} placeholder={'Estado de los aretes'} onChange={this.handleStatus}>
                <Option value={''}>Todos</Option>
                <Option value={'True'}>Activos</Option>
                <Option value={'False'}>Inactivos</Option>
            </Select>
            <Divider type={'vertical'}/>
            <Select
                
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
            <Button type={'primary'} onClick={this.resetFilters}>Reset</Button>

            </div>        
         <section style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
            <div style={{width:'45%', display:'flex', justifyContent:'space-between', flexWrap:'wrap', marginRight:'10px',height:'70vh'}}>
            
                <Card style={{width:180, height:100}}>
                    <p>conversion__avg:</p>
                    <h2>{globals.conversion__avg?globals.conversion__avg.toFixed(2):0}</h2>
                </Card>
                <Card style={{width:180, height:100}}>
                    <p>costo_alimentos__avg:</p>
                    <h2>{globals.costo_alimentos__avg?globals.costo_alimentos__avg.toFixed(2):0}</h2>
                </Card>
                <Card style={{width:180, height:100}}>
                    <p>costo_alimentos__sum:</p>
                    <h2>{globals.costo_alimentos__sum?globals.costo_alimentos__sum.toFixed(2):0}</h2>
                </Card>
                <Card style={{width:180, height:100}}>
                    <p>costo_por_dia__avg:</p>
                    <h2>{globals.costo_por_dia__avg?globals.costo_por_dia__avg.toFixed(2):0}</h2>
                </Card>
                <Card style={{width:180, height:100}}>
                    <p>costo_vacunas__avg:</p>
                    <h2>{globals.costo_vacunas__avg?globals.costo_vacunas__avg.toFixed(2):0}</h2>
                </Card>
                <Card style={{width:180, height:100}}>
                    <p>costo_vacunas__sum:</p>
                    <h2>{globals.costo_vacunas__sum?globals.costo_vacunas__sum.toFixed(2):0}</h2>
                </Card>
                <Card style={{width:180, height:100}}>
                    <p>costos_total__avg:</p>
                    <h2>{globals.costos_total__avg?globals.costos_total__avg.toFixed(2):0}</h2>
                </Card>
                <Card style={{width:180, height:100}}>
                    <p>costos_total__sum:</p>
                    <h2>{globals.costos_total__sum?globals.costos_total__sum.toFixed(2):0}</h2>
                </Card>
                <Card style={{width:180, height:100}}>
                    <p>GDP:</p>
                    <h2>{globals.ganacia_diaria_promedio__avg?globals.ganacia_diaria_promedio__avg.toFixed(2):0}</h2>
                </Card>
                <Card style={{width:180, height:100}}>
                    <p>kg_alimento__avg:</p>
                    <h2>{globals.kg_alimento__avg?globals.kg_alimento__avg.toFixed(2):0}</h2>
                </Card>
                <Card style={{width:180, height:100}}>
                    <p>kg_alimento__sum:</p>
                    <h2>{globals.kg_alimento__sum?globals.kg_alimento__sum.toFixed(2):0}</h2>
                </Card>
                <Card style={{width:180, height:100}}>
                    <p>kg_hechos__avg:</p>
                    <h2>{globals.kg_hechos__avg?globals.kg_hechos__avg.toFixed(2):0}</h2>
                </Card>
                <Card style={{width:180, height:100}}>
                    <p>kg_hechos__sum:</p>
                    <h2>{globals.kg_hechos__sum?globals.kg_hechos__sum.toFixed(2):0}</h2>
                </Card>
                <Card style={{width:180, height:100}}>
                    <p>peso_entrada__avg:</p>
                    <h2>{globals.peso_entrada__avg?globals.peso_entrada__avg.toFixed(2):0}</h2>
                </Card>
                <Card style={{width:180, height:100}}>
                    <p>peso_entrada__sum:</p>
                    <h2>{globals.peso_entrada__sum?globals.peso_entrada__sum.toFixed(2):0}</h2>
                </Card>
                <Card style={{width:180, height:100}}>
                    <p>peso_final__avg:</p>
                    <h2>{globals.peso_final__avg?globals.peso_final__avg.toFixed(2):0}</h2>
                </Card>
                <Card style={{width:180, height:100}}>
                    <p>peso_final__sum:</p>
                    <h2>{globals.peso_final__sum?globals.peso_final__sum.toFixed(2):0}</h2>
                </Card>
                <Card style={{width:180, height:100}}>
                    <p>rendimiento__avg:</p>
                    <h2>{globals.rendimiento__avg?globals.rendimiento__avg.toFixed(2):0}</h2>
                </Card>
            
                      
            </div>
            <div style={{width:'55%'}}>
                <Table                     
                    columns={columns}
                    loading={loading}
                    dataSource={aretes}
                    rowKey={record => record.id}
                    pagination={false}>
                
                </Table>
            </div>
        </section> 

      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
    return {
       animals:state.animals.list,
       lotes:state.lotes.list,
       fetched:state.animals.list!==undefined && state.lotes.list!==undefined
    }
}

function mapDispatchToProps(dispatch) {
    return {
        animalActions: bindActionCreators(animalActions, dispatch),
        lotesActions:bindActionCreators(lotesActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalReportes)