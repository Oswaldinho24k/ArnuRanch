import React, {Component} from 'react';
import {Card, Select, Divider, Row} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MainLoader from "../common/Main Loader";


const gridStyle = {
    width: '50%',
    height: '150px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
};


const dataI =
    {
        lines:[
            {
                id:2,
                name:"ganado",
                almacen:[{
                    id:1,
                    nombre:"Almacen 1"
                }]
            },
            {
                id:3,
                name:"granos",
                almacen:[{
                    id:1,
                    nombre:"Almacen 2"
                }]
            },
            {
                id:4,
                name:"planta de alimentos",
                almacen:[{
                    id:1,
                    nombre:"Almacen 3"
                }]
            }]

    };

class InventarioEmpresa extends Component{
    state={
        dataIn:[],
    };

    componentWillMount(){
        this.setState({
            dataIn:this.props.empresa
        })
    }
    render(){
        let {pathname, empresa, fetched} = this.props;
        console.log(empresa)
        console.log(dataI.lines);
        //let lineas = this.props.empresa.map((p)=>{p.linea_comp});
        //console.log(lineas)
        if(!fetched)return(<MainLoader/>);
        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    <Link to={`/admin/empresas/`} style={{color:'black'}} >Empresas</Link>
                    <Divider type="vertical" />
                    {empresa.company}

                </div>

                <Card title="Lineas de Negocio">

                    {dataI.lines.map(p =>(
                        <Link to={`${pathname}/${p.id}`} style={{color:'black'}} key={p.id} >
                            <Card.Grid style={gridStyle}>{p.name}</Card.Grid>
                        </Link>
                    ))}

                        {/*<Link to={`/admin/empresas/inventario/almacen`} style={{color:'black'}} >
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
*/}

                </Card>


            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let pathname = ownProps.location.pathname;
    let id = ownProps.match.params.em;
    let empresa = state.empresas.list.filter(a=>{
        return id == a.id;
    });
    empresa = empresa[0];

    return {
        pathname,
        empresa,
        fetched: empresa!==undefined && state.empresas.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        //empresaActions: bindActionCreators(empresaActions, dispatch),
    }
}

InventarioEmpresa = connect(mapStateToProps, mapDispatchToProps ) (InventarioEmpresa);
export default InventarioEmpresa;