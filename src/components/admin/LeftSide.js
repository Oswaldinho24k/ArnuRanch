import React from 'react';
import {Icon, Menu} from "antd";
import {Link} from 'react-router-dom';
import {paths} from './Sections';

const SubMenu = Menu.SubMenu;

const LeftSide = ({props}) => {
    return (

        <Menu theme="dark"
              mode="inline"
              defaultSelectedKeys={['12']}
              defaultOpenKeys={['sub2']}
        >
            <SubMenu  key="sub1" title={<span className={'my-icon'}>💼<Icon /><span>Administración</span></span>}>
                <Menu.Item key="1">
                    <Link to={'/admin/estadisticas'} >Estadísticas</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={'/admin/ingresos'} >Ingresos</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to={'/admin/ingresos/cobrar'} >Cuentas por Cobrar</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to={'/admin/egresos'}>Egresos</Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to={'/admin/egresos/pagar'} >Cuentas por Pagar</Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <Link to={'/admin/clientes'}>Clientes</Link>
                </Menu.Item>
                <Menu.Item key="7">
                    <Link to={'/admin/proveedores'}>Proovedores</Link>
                </Menu.Item>
                <Menu.Item key="8">
                    <Link to={'/admin/cuentas'}>Cuentas Banco</Link>
                </Menu.Item>
                <Menu.Item key="9">
                    <Link to={'/admin/inventario'}>Inventario</Link>
                </Menu.Item>
                <Menu.Item key="10">
                    <Link to='/admin/usuarios'>  Usuarios </Link>
                </Menu.Item>
                <Menu.Item key="11">
                    <Link to='/admin/empresas'> Empresas </Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span className={'my-icon'}>🐮<Icon /><span>Ganado</span></span>}>
                <Menu.Item key="12">
                    <Link to ={'/admin/corrales'}>Corrales</Link>
                </Menu.Item>
                <Menu.Item key="13">
                    <Link to={'/admin/animals'}>Animales</Link>
                </Menu.Item>
                <Menu.Item key="14">
                    <Link to='/admin/lotes'> Lotes </Link>
                </Menu.Item>

                <Menu.Item key="16" disabled>
                    <Link to='/admin/reportes'>  Reportes </Link>
                </Menu.Item>


            </SubMenu>
            <SubMenu key="sub3" title={<span className={'my-icon'}>🌽<Icon /><span>Alimentos</span></span>}>

                <Menu.Item key="17">
                    <Link to={paths.insumos}>Insumos</Link>
                </Menu.Item>
                <Menu.Item key="18">
                    <Link to={paths.formulas}>Fórmulas</Link>
                </Menu.Item>
            </SubMenu>

            <SubMenu key="sub4" title={<span className={'my-icon'}>🌽<Icon /><span>Vacunas</span></span>}>
                <Menu.Item key="19">
                    <Link to={"/admin/vacunas"}>Vacunas</Link>
                </Menu.Item>
            </SubMenu>
        </Menu>
    )
};

export default LeftSide;