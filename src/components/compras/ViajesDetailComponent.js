import React, {Component, Fragment} from 'react';
import {Divider, Timeline} from "antd";
import {Link} from "react-router-dom";




class ViajesDetailComponent extends Component{



    render(){
        return(
            <Fragment >
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Requisiciones
                    <Divider type="vertical" />
                    <Link to={`/admin/requisiciones`} style={{color:'black'}} >
                        Viajes
                    </Link>
                    <Divider type="vertical" />



                </div>
                <div>
                    <h2>Lista de Pedidos Actuales de Camión {this.props.match.params.id}</h2>

                    <Timeline>
                        <Timeline.Item color="green">Pedido 1</Timeline.Item>
                        <Timeline.Item color="green">Pedido 2</Timeline.Item>
                        <Timeline.Item color="red">
                            <p>Pedido 3</p>
                            <p>Nadie para recibir</p>
                            <p>S2015-09-01</p>
                        </Timeline.Item>
                        <Timeline.Item>
                            <p>Technical testing 1</p>
                            <p>Technical testing 2</p>
                            <p>Technical testing 3 2015-09-01</p>
                        </Timeline.Item>
                    </Timeline>
                </div>
                <section style={{display:'flex'}}>
                    <div></div>
                </section>
            </Fragment>
        )
    }
}
export default ViajesDetailComponent