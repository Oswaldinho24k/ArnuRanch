import React from 'react'
import {Button, Divider, message, Modal, Table, Input, Popconfirm} from "antd";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import MainLoader from "../common/Main Loader";

import DisposicionF from './DisposicionForm'
import * as disposicionesActions from '../../redux/actions/creditos/disposicionesActions'
import * as acreedoresActions from "../../redux/actions/creditos/acreedoresActions";



const columns=[
    {
        title:'Folio',
        dataIndex:'numero',
        key:'numero',
        render:(t, obj)=><Link to={`/admin/disposicion/${obj.id}`}>{t}</Link>
    },
    {
        title:'Monto',
        dataIndex:'monto',
        key:'monto',

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
            open:false,
            credito:{},
            editable:false,
        }
    }

    handleModal=()=>{
        this.setState({open:!this.state.open})
    }

    handleText=(e)=>{
        const {credito} = this.state
        const field = e.target.name
        credito[field] = e.target.value
        this.setState({credito})

    }
    updateAcreedor=()=>{
        const {credito} = this.state
        credito['id'] = this.props.match.params.id
        this.props.acreedoresActions.editAcreedor(credito)
            .then(r=>{
                message.success('Editado con éxito')
                this.setState({editable:false})

            }).catch(e=>{
                console.log(e)
                console.log(e.response)
                message.error('Ocurrió un error, prueba más tarde!')
        })

    }
    deleteAcredor=()=>{
        this.props.acreedoresActions.deleteAcreedor({id:this.props.match.params.id})
            .then(r=>{
                message.warning('Acreedor eliminado')
                this.props.history.push('/admin/acreedores')
            }).catch(e=>{
                message.error('Ocurrió un error intenta de nuevo')
        })
    }
    handleEdit=()=>{
        this.setState({editable:true})
    }

    handleSubmit=(item)=>{
        item['acreedor_id'] = this.props.match.params.id
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
        if(acreedor)disposiciones = disposiciones.filter((d, key)=>d.acreedor.id===acreedor.id)


        const {open, editable} = this.state
        let deuda = 0
        disposiciones.map(d=>deuda+=d.monto)
        if(!fetched) return  <MainLoader/>
        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Admin
                    <Divider type="vertical" />
                    <Link to={'/admin/acreedores'}>Acreedores</Link>

                </div>
                {!editable?<h2> {acreedor.banco} <Button type="primary" shape="circle" icon="edit" size={'small'} onClick={this.handleEdit}/></h2>
                :<div><Input name={"banco"} defaultValue={acreedor.banco} onChange={this.handleText} style={{width:'400px'}}/>  <Button type="primary" shape="circle" icon="edit" size={'small'} onClick={this.updateAcreedor}/></div>}
                <Popconfirm onConfirm={this.deleteAcredor} title={'Eliminar acreedor eliminará todas las disposiciones'}>
                    <Button type={'danger'}>Delete</Button>
                </Popconfirm>
                <p>Disposiciones</p>

                <Table columns={columns} dataSource={disposiciones} rowKey={r=>r.id}/>
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
                    <DisposicionF handleSubmit={this.handleSubmit} />
                </Modal>

            </div>
        )
    }
}


const mapStateToProps=(state, oP)=>{
    const id = oP.match.params.id

    let acreedor = state.acreedores.list.find(a=>a.id==id)
    let disposiciones = state.disposiciones.list;

    return{
        acreedor:acreedor,
        disposiciones:disposiciones,
        fetched:acreedor!==undefined && disposiciones!==undefined
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        disposicionesActions:bindActionCreators(disposicionesActions,dispatch),
        acreedoresActions:bindActionCreators(acreedoresActions, dispatch)
    }
}



AcreedoresDetailPage = connect(mapStateToProps, mapDispatchToProps)(AcreedoresDetailPage)
export default AcreedoresDetailPage

