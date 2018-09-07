import React from 'react'
import {Table, Modal, Button, message} from 'antd'
import * as acreedoresActions from '../../redux/actions/creditos/acreedoresActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import MainLoader from "../common/Main Loader";
import AcreedoresForm from "./AcreedorForm";
import {Link} from 'react-router-dom'


const columns=[
    {
        title:'Acredor',
        dataIndex:'banco',
        key:'banco',
        render:(t, obj)=><Link to={`/admin/acreedores/${obj.id}`}>{t}</Link>
    },{
        title:'Saldo',
        dataIndex:'saldo',
        key:'saldo'
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
                console.log(e.response)
        })
    }

    render(){
        let {acreedores, fetched} = this.props
        let {open} = this.state
        if(!fetched)return <MainLoader/>
        return(
            <div>
                <Table columns={columns} dataSource={acreedores} rowKey={r=>r.id}/>
                <Button type={"primary"} onClick={this.handleModal}>Agrega</Button>
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
        fetched: state.acreedores.list !==undefined
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        acreedoresActions:bindActionCreators(acreedoresActions, dispatch)
    }
}

AcreedoresPage = connect(mapStateToProps, mapDispatchToProps)(AcreedoresPage)

export default AcreedoresPage

