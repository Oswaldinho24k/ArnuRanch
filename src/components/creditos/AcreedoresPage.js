import React from 'react'
import {Table, Modal, Button, message, Card} from 'antd'
import * as acreedoresActions from '../../redux/actions/creditos/acreedoresActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import MainLoader from "../common/Main Loader";
import AcreedoresForm from "./AcreedorForm";
import {Link} from 'react-router-dom'
import moment from 'moment'


const columns=[
    {
        title:'Acredor',
        dataIndex:'banco',
        key:'banco',
        render:(t, obj)=><Link to={`/admin/acreedores/${obj.id}`}>{t}</Link>
    },{
        title:'Saldo Inicial',
        dataIndex:'saldo',
        key:'saldo',
        render:(t)=><p>${t}</p>
    },{
        title:'Disposiciones $',
        dataIndex:'disposiciones',
        key:'disposiciones',
        render:(d, obj)=>{
            let total = 0
            obj.disposiciones.map(i=>{
                if(!i.paid)total+=parseFloat(i.monto)
            })
            return(
                <p>${total}</p>
            )
        }
    }
]

const columnsRecibos=[
    {
        title:'Fecha',
        dataIndex:'fecha',
        key:'fecha',
        render:(t, obj)=><Link to={`/admin/disposicion/${obj.disposicion.id}`}>{moment(t).format('LL')}</Link>
    },{
        title:'Disposicion',
        dataIndex:'disposicion',
        key:'disposicion',
        render:(f, obj)=><p>{obj.disposicion.numero}</p>
    }
]



class AcreedoresPage extends React.Component{

    state={
        open:false
    }

    handleModal=()=>{
        this.setState({open:!this.state.open})
    }

    handleSubmit=(item)=>{
        this.props.acreedoresActions.newAcreedor(item)
            .then(r=>{
                message.success('Agregado con éxito')
                this.handleModal()
            }).catch(e=>{

        })
    }

    render(){
        let {acreedores, fetched, recibos} = this.props
        let {open} = this.state
        if(!fetched)return <MainLoader/>
        return(
            <div >
                <div style={{width:'100%',display:'flex', justifyContent:'space-around'}}>
                    <div style={{width:'30%'}}>
                        <h4>Vencimientos</h4>
                        <Table columns={columnsRecibos} dataSource={recibos} rowKey={r=>r.id} pagination={{pageSize:10}}/>
                    </div>
                    <div style={{width:'60%'}}>
                        <Table columns={columns} dataSource={acreedores} rowKey={r=>r.id}/>
                        <Button type={"primary"} onClick={this.handleModal}>Agrega</Button>
                    </div>
                </div>
                <Modal
                    title="Agrega un nuevo acreedor"
                    visible={open}
                    onCancel={this.handleModal}
                    width={'60%'}
                    maskClosable={true}
                    footer={[
                        null,
                        null,
                    ]}>
                    <AcreedoresForm handleSubmit={this.handleSubmit}/>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps=(state, oP)=>{
    return {
        acreedores:state.acreedores.list,
        recibos:state.recibos.list,
        fetched: state.acreedores.list !==undefined & state.recibos.list !== undefined
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        acreedoresActions:bindActionCreators(acreedoresActions, dispatch)
    }
}

AcreedoresPage = connect(mapStateToProps, mapDispatchToProps)(AcreedoresPage)

export default AcreedoresPage

