import React from 'react'
import {Divider, Card, Table, Icon, Switch, message} from "antd";
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import MainLoader from "../common/Main Loader";
import moment from 'moment'
import {bindActionCreators} from 'redux'
import * as recibosActions from '../../redux/actions/creditos/recibosActions'






class DisposicionDetailPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    onChange=(e,v)=>{
        this.props.recibosActions.updateRecibo({paid:e,id:v})
            .then(r=>{
                message.success('Recibo editado')
            }).catch(e=>{
                message.error(e.data)
        })
    }
    render(){
        const columns = [
            {
                title:'Fecha',
                dataIndex:'fecha',
                key:'fecha',
                render:(f, obj)=><p>{moment(f).format('LL')}</p>
                /*render:(t, obj)=>{

                    var check = moment(t)
                    var today = moment(new Date)
                    var month = check.format('M');
                    var day   = check.format('D');
                    var year  = check.format('YYYY');
                    if(check.format('M')===today.format('M') && check.format('YYYY')===today.format('YYYY'))return <p><Icon type="exclamation-circle"  /> {moment(t).format('LL')}</p>
                    if(check.format('M')===today.format('M') && check.format('YYYY')===today.format('YYYY')&&check.format('D')===today.format('D'))return <p><Icon type="warning"  /> {moment(t).format('LL')}</p>
                    else return <p><Icon type="heart" /> {moment(t).format('LL')}</p>

                }*/
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
                title:'Pago de Intereses',
                dataIndex:'intereses',
                key:'intereses'
            }
        ]

        let {disposicion, fetched} = this.props
        if(!fetched) return <MainLoader/>



        /*let dCards = []
        let obj={}

        for(let i = 0;i<=disposicion.plazo;i++){
            let fecha;
            let disp=0;
            let pago=0;
            let saldo=0;
            let intereses=0;
            fecha = moment(disposicion.fecha_inicio).add(i, 'M')
            if(i===0) disp = disposicion.monto
            else disp = 0
            //pago de capital

            if(disposicion.periodo_capital==='mensual'){
                if(i>0)pago=disposicion.monto/disposicion.plazo
            }else if(disposicion.periodo_capital==='trimestral'){
                if(i%3===0)pago=disposicion.monto/disposicion.plazo*3
            }else if(disposicion.periodo_capital==='semestral'){
                if(i%6===0)pago=disposicion.monto/disposicion.plazo*6
            }else if(disposicion.periodo_capital==='anual'){
                if(i%12===0)pago=disposicion.monto/disposicion.plazo*12
            }else if(disposicion.periodo_capital==='vencimiento'){
                if(i===disposicion.plazo)pago=disposicion.monto
            }
            if(i===0)pago = 0
            console.log(pago)
            if(pago%1!==0)pago = pago.toFixed((2))
            //saldo
            if(i===0)saldo = disposicion.monto
            else saldo = dCards[i-1].saldo-pago

            if(saldo%1!==0)saldo = saldo.toFixed(2)
            //let saldo;
            //pago de intereses

            if(disposicion.periodo_intereses==='mensual'){
                if(i>0){
                    //intereses = disposicion.monto*(disposicion.tasa/100)/12
                    intereses = dCards[i-1].saldo*(disposicion.tasa/100)/12
                    intereses = intereses.toFixed(2)
                }
            }else if(disposicion.periodo_intereses==='vencimiento'){
                if(i === disposicion.plazo)intereses = disposicion.monto*(disposicion.tasa/100)
            }

            obj = {
                fecha,
                disp,
                pago,
                saldo,
                intereses
            }
            dCards.push(obj)
        }*/
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
                        title={`Disposición ${disposicion.id}`}
                        style={{ width: '30%' }}
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
                    </Card>
                    <div style={{ width: '60%' }}>
                        <Table dataSource={disposicion.recibos} columns={columns} rowKey={record => record.id} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state, oP)=>{
    return{
        disposicion:state.disposiciones.list.find(o=>o.id==oP.match.params.id),
        fetched:state.disposiciones.list.find(o=>o.id==oP.match.params.id)!==undefined
    }
}

const mapDispatchToProps=(disptch)=>{
    return{
        recibosActions:bindActionCreators(recibosActions,disptch)
    }
}


DisposicionDetailPage=connect(mapStateToProps, mapDispatchToProps)(DisposicionDetailPage)

export default DisposicionDetailPage

