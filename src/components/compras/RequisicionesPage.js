import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { Tabs } from 'antd';
import PedidosComponent from "./PedidosComponent";
import RequisicionesComponent from "./RequisicionesComponent";
import ViajesComponent from "./ViajesComponent";
import Compras from "./Compras";



const TabPane = Tabs.TabPane;


class RequisicionesPage extends Component{
    render(){
        return(
            <Fragment>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="Requisiciones" key="1">
                        <Compras/>
                    </TabPane>
                    <TabPane tab="Pedidos" key="2">
                        <PedidosComponent/>
                    </TabPane>
                    <TabPane tab="Viajes" key="3">
                        <ViajesComponent/>
                    </TabPane>
                </Tabs>
            </Fragment>
        )
    }
}


function mapStateToProps(state){
    return {}
}

function mapDispatchToProps(){
    return {}
}

RequisicionesPage = connect(mapStateToProps, mapDispatchToProps)(RequisicionesPage)
export default RequisicionesPage




