import React from 'react'
import {Button, Divider, message, Modal, Table} from "antd";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import MainLoader from "../common/Main Loader";

import DisposicionF from './DisposicionForm'
import * as disposicionesActions from '../../redux/actions/creditos/disposicionesActions'



const columns=[
   {
        title:'Monto',
        dataIndex:'monto',
        key:'monto',
        render:(t, obj)=><Link to={`/admin/disposicion/${obj.id}`}>{t}</Link>
    },{
        title:'Tasa de Interés',
        dataIndex:'tasa',
        key:'tasa'
    },{
        title:'Plazo',
        dataIndex:'plazo',
        key:'plazo'
    },{
        title:'Pago de Interés',
        dataIndex:'periodo_intereses',
        key:'periodo_intereses'
    },{
        title:'Pago de Capital',
        dataIndex:'periodo_capital',
        key:'periodo_capital'
    }
]


class AcreedoresDetailPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            open:false
        }
    }

    handleModal=()=>{
        this.setState({open:!this.state.open})
    }

    handleSubmit=(item)=>{
        this.props.disposicionesActions.newDisposicion(item)
            .then(r=>{
                message.success('Agregado con éxito')
                this.handleModal()
            }).catch(e=>{
            console.log(e.response)
        })
    }


    render(){
        let {match, acreedor, fetched, disposiciones} = this.props
        disposiciones = disposiciones.filter((d, key)=>d.acreedor.id===acreedor.id)

        let {open} = this.state

        if(!fetched) return  <MainLoader/>
        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Admin
                    <Divider type="vertical" />
                    <Link to={'/admin/acreedores'}>Acreedores</Link>

                </div>
                <h2>Acreedor {acreedor.banco} con saldo actual de {acreedor.saldo}</h2>
                <p>Disposiciones</p>
                <Table columns={columns} dataSource={disposiciones}/>
                <Button type={"primary"} onClick={this.handleModal}>Agrega</Button>
                <Modal
                    title="Nueva Disposición"
                    visible={open}
                    onCancel={this.handleModal}
                    width={'60%'}
                    maskClosable={true}
                    footer={[
                        null,
                        null,
                    ]}>
                    <DisposicionF handleSubmit={this.handleSubmit} acreedorId={acreedor.id}/>
                </Modal>

            </div>
        )
    }
}


const mapStateToProps=(state, oP)=>{
    let acreedor = state.acreedores.list.find(a=>a.id==oP.match.params.id)
    console.log(state.disposiciones)
    let disposiciones = state.disposiciones.list;

    return{
        acreedor:acreedor,
        disposiciones:disposiciones,
        fetched:acreedor!==undefined && disposiciones!==undefined
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        disposicionesActions:bindActionCreators(disposicionesActions,dispatch)
    }
}



AcreedoresDetailPage = connect(mapStateToProps, mapDispatchToProps)(AcreedoresDetailPage)
export default AcreedoresDetailPage

