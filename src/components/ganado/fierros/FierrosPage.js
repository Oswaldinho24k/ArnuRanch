import React, {Fragment, Component} from 'react'
import {connect} from 'react-redux'
import {Tabs, message, Modal, Button} from 'antd'
import {FierrosOComponent} from "./FierrosOComponent";
import {FierrosNComponent} from "./FierrosNComponent";
import MainLoader from "../../common/Main Loader";
import {bindActionCreators} from 'redux'
import * as fierroOActions from '../../../redux/actions/ganado/fierroOActions'
import * as fierroNActions from '../../../redux/actions/ganado/fierroNActions'
import FierrosWForm from "./FierrosForm";



const TabPane = Tabs.TabPane


class FierrosPage extends Component{

    state={
        open:false
    }

    handleModal=()=>{
        this.setState({open:!this.state.open})
    }

    saveFierroO=(obj)=>{
        this.props.fierroOActions.newFierroO(obj)
            .then(r=>{
                message.success('Guardado con éxito')
                this.handleModal()
            }).catch(e=>{
                console.log(e.response)
                message.error('Ocurrió un problema, intenta más tarde')
        })
    }

    saveFierroN=(obj)=>{
        this.props.fierroNActions.newFierroN(obj)
            .then(r=>{
                message.success('Guardado con éxito')
                this.handleModal()
            }).catch(e=>{
            console.log(e.response)
            message.error('Ocurrió un problema, intenta más tarde')
        })
    }

    render(){
        let {fetched, fierrosO, fierrosN} = this.props
        if(!fetched) return <MainLoader/>
        return(
            <Fragment>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="Fierros Originales" key="1">
                        <FierrosOComponent fierros={fierrosO}/>
                    </TabPane>
                    <TabPane tab="Fierros Nuevos" key="2">
                        <FierrosNComponent fierros={fierrosN}/>
                    </TabPane>
                </Tabs>
                <Modal
                    title="Basic Modal"
                    visible={this.state.open}
                    footer={[
                        null,
                        null,
                    ]}
                >
                    <FierrosWForm saveFierroO={this.saveFierroO} saveFierroN={this.saveFierroN}/>
                </Modal>
                <Button onClick={this.handleModal} style={{position:'fixed', right:50, bottom:50}} type={'primary'}>Agrega</Button>
            </Fragment>
        )
    }
}

function mapStateToProps(state, oP){
    return {
        fierrosO:state.fierrosO.list,
        fierrosN:state.fierrosN.list,
        fetched:state.fierrosO.list!==undefined && state.fierrosN.list!==undefined
    }
}

function mapDispatchToProps(dispatch){
    return{
        fierroOActions:bindActionCreators(fierroOActions, dispatch),
        fierroNActions:bindActionCreators(fierroNActions, dispatch)
    }
}

FierrosPage = connect(mapStateToProps, mapDispatchToProps)(FierrosPage)

export default FierrosPage