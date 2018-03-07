import React, {Component} from 'react';
import {Card, Select, Divider, Row} from 'antd';
import {Link} from 'react-router-dom';

const gridStyle = {
    width: '50%',
    height: '150px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
};

class InventarioEmpresa extends Component{
    render(){
        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    <Link to={`/admin/empresas/`} style={{color:'black'}} >Empresas</Link>
                    <Divider type="vertical" />
                    Empresa id

                </div>

                <Card title="Lineas de Negocio">

                        <Link to={`/admin/empresas/inventario/almacen`} style={{color:'black'}} >
                            <Card.Grid style={gridStyle}>Cerdos</Card.Grid>
                        </Link>
                        <Link to={`/admin/empresas/inventario/almacen`} style={{color:'black'}} >
                            <Card.Grid style={gridStyle}>Ganado</Card.Grid>
                        </Link>
                        <Link to={`/admin/empresas/inventario/almacen`} style={{color:'black'}} >
                            <Card.Grid style={gridStyle}>Granos</Card.Grid>
                        </Link>
                        <Link to={`/admin/empresas/inventario/almacen`} style={{color:'black'}} >
                            <Card.Grid style={gridStyle}>Planta de Alimentos</Card.Grid>
                        </Link>


                </Card>


            </div>
        )
    }
}
export default InventarioEmpresa;