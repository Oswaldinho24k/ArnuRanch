import React, {Component, Fragment} from 'react'
import MainCards from "../ingresos/MainCards";


class Dashboard extends Component{
    render(){
        return(
            <div>
                <h1>Estadísticas Page</h1>
                <MainCards />
            </div>
        )
    }
}

export default Dashboard;