import React, {Component} from 'react'
import MainCards from "../ingresos/MainCards";
import {Divider} from 'antd';


class Dashboard extends Component{
    render(){
        return(
            <div>
            <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                Administración
                <Divider type="vertical" />
                Estadísiticas
            </div>
            <div>
                <h1>Estadísticas Page</h1>
                <MainCards />
            </div>
            </div>
        )
    }
}

export default Dashboard;