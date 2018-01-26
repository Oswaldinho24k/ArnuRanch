import React from 'react';
import {Icon, Menu} from "antd";
import {Link} from 'react-router-dom';

const SubMenu = Menu.SubMenu;

const LeftSide = ({props}) => {
    return (

        <Menu theme="dark"
              mode="inline"
              //defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1', 'sub2', 'sub3']}>
            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Administración</span></span>}>
                <Menu.Item key="1">
                    <Link to={'/admin/ingresos'} >Ingresos</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={'/admin/egresos'}>Egresos</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to={'/admin/inventario'}>Inventario</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to={'/admin/clientes'}>Clientes</Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to={'/admin/proveedores'}>Proovedores</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Ganado</span></span>}>
                <Menu.Item key="6">
                    <Link to ={'/admin/corrales'}>Corrales</Link>
                </Menu.Item>
                <Menu.Item key="7">
                    <Link to={'/admin/animals'}>Animales</Link>
                </Menu.Item>
                <Menu.Item key="8">
                    <Link to='/admin/lotes'> Lotes </Link>
                </Menu.Item>
                <Menu.Item key="9">
                    <Link to='/admin/gastos'> Gastos Animales </Link>
                </Menu.Item>
                <Menu.Item key="10">
                    <Link to='/admin/pesadas'>  Pesadas </Link>
                </Menu.Item>
                <Menu.Item key="11">
                    <Link to='/admin/reportes'>  Reportes </Link>
                </Menu.Item>


            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>Granos</span></span>}>

            </SubMenu>
        </Menu>
    )
};

export default LeftSide;