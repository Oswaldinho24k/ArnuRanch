import React from 'react'
import {Divider, Card, Table, Icon, Switch, message, Button, Popconfirm, DatePicker} from "antd";
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import MainLoader from "../common/Main Loader";
import moment from 'moment'
import {bindActionCreators} from 'redux'
import ReciboF from './ReciboForm'
import * as recibosActions from '../../redux/actions/creditos/recibosActions'
import * as disposicionesActions from '../../redux/actions/creditos/disposicionesActions'






class DisposicionDetailPage extends React.Component{

    state={
        edit:'',


    }


    onChange=(e,v)=>{
        this.props.recibosActions.updateRecibo({paid:e,id:v})
            .then(r=>{
                message.success('Recibo editado')
            }).catch(e=>{
                message.error(e)
        })
    }
    onConfirm=()=>{
        const {disposicion} = this.props
        this.props.disposicionesActions.deleteDisposicion(disposicion)
            .then(r=>{
                console.log(r)
                message.success('Borrado con éxito')
                this.props.history.push(`/admin/acreedores/${disposicion.acreedor.id}`)
            }).catch(e=>{
            console.log(e.response)
                message.error('Ocurrió un problema, intenta después')
        })
    }
    onCancel=()=>{
        return
    }
    handleDate=(fecha, f2, obj)=>{
        console.log(fecha, f2, obj)
        this.props.recibosActions.updateRecibo({fecha:f2,id:obj.id})
            .then(r=>{
                message.success('Recibo editado')
            }).catch(e=>{
            console.log(e.response)
            message.success('Ocurrió un problema, intenta después')
        })
    }

    deleteRecibo=(obj)=>{
        this.props.recibosActions.deleteRecibo(obj)
            .then(r=>{
                message.success('Recibo eliminado')

            }).catch(e=>{
            console.log(e.response)
            message.success('Ocurrió un problema, intenta después')
        })
    }
    updateRecibo=(obj)=>{
        this.props.recibosActions.updateRecibo(obj)
            .then(r=>{
                message.success('Recibo editado')
            }).catch(e=>{
            message.success('Ocurrió un problema, intenta después')
            console.log(e.response)

        })
    }
    handleSubmit=(obj)=>{
        obj['disposicion'] = parseInt(this.props.match.params.id)
        this.props.recibosActions.createRecibo(obj)
            .then(r=>{
                message.success('recibo agregado')
                this.setState({newRecibo:r})
            }).catch(e=>{
                console.log(e)
                console.log(e.response)
        })
    }
    render(){
        const columns = [
            {
                title:'Fecha',
                dataIndex:'fecha',
                key:'fecha',
                //render:(f, obj)=><p>{moment(f).format('LL')}</p>
                render:(f, obj)=><DatePicker onChange={(a,b)=>this.handleDate(a,b,obj)} defaultValue={moment(f)}/>
            },{
                title:'Pagado',
                dataIndex:'paid',
                key:'paid',
                render:(p, obj)=><Switch defaultChecked={p} onChange={(e)=>this.onChange(e,obj.id)} />
            },{
                title:'Pago a Capital',
                dataIndex:'capital',
                key:'capital'
            },{
                title:'Saldo',
                dataIndex:'saldo',
                key:'saldo'
            },{
                title:'Intereses',
                dataIndex:'intereses',
                key:'intereses'
            },{
                title:'Actions',
                dataIndex:'id',
                key:'id',
                render:(t, obj)=><div>

                    <Button type="primary" shape="circle" icon="delete" size='small' onClick={()=>this.deleteRecibo(obj)}/>

                </div>
            }
        ]

        let {disposicion, fetched} = this.props

        if(!fetched) return <MainLoader/>


        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Admin
                    <Divider type="vertical" />
                    <Link to={'/admin/acreedores'}>Acreedores</Link>
                    <Divider type="vertical" />
                    <Link to={disposicion.acreedor?`/admin/acreedores/${disposicion.acreedor.id}`:''}>{`${disposicion.acreedor.banco}`}</Link>
                </div>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                    <Card
                        title={`Disposición ${disposicion.numero}`}
                        style={{ width: '30%' ,height:'80vh'}}
                    >
                        <p>Acreedor:</p>
                        <p>Tipo de credito: {disposicion.tipo_credito}</p>
                        <p>Monto: {disposicion.monto}</p>
                        <p>Plazo (meses): {disposicion.plazo}</p>
                        <p>Inicio: {moment(disposicion.fecha_inicio).format('LL')}</p>
                        <p>Vencimiento: {moment(disposicion.fecha_vencimiento).format('LL')}</p>
                        <p>Tasa de interes: {disposicion.tasa}%</p>
                        <p>Perio de gracia: {disposicion.gracia}</p>
                        <p>Pagos de capital: {disposicion.plazo}</p>
                        <p>Periodo de pagos de interes: {disposicion.periodo_intereses}</p>
                        <p>Periodo de pagos de capital: {disposicion.periodo_capital}</p>

                        <Popconfirm title="Seguro?" onConfirm={this.onConfirm} onCancel={this.onCancel} okText="Si" cancelText="No">
                            <Button type={'danger'} style={{width:'100%'}}>Delete</Button>
                        </Popconfirm>
                    </Card>
                    <div style={{ width: '60%' }}>

                        <ReciboF handleSubmit={this.handleSubmit}/>

                        <Table dataSource={disposicion.recibos} columns={columns} rowKey={record => record.id}
                               pagination={{
                                pageSize: 7,
                                defaultCurrent:1,
                                total:disposicion.recibos.length}}/>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state, oP)=>{
    const disposicion = state.disposiciones.list.find(o=>o.id==oP.match.params.id)
    return{
        disposicion:disposicion,
        fetched:disposicion!==undefined
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        recibosActions:bindActionCreators(recibosActions,dispatch),
        disposicionesActions:bindActionCreators(disposicionesActions, dispatch)
    }
}


DisposicionDetailPage=connect(mapStateToProps, mapDispatchToProps)(DisposicionDetailPage)

export default DisposicionDetailPage

