import React from 'react';
import {Icon, Menu} from "antd";

const SubMenu = Menu.SubMenu;

const LeftSide = ({props}) => {
    return (
        <Menu
            onClick={this.handleClick}
            style={{ height: '100vh' }}
            mode="inline"
            defaultOpenKeys={['sub1', 'sub2', 'sub4']}
        >
            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Administración</span></span>}>
                <Menu.Item key="1">Ingresos</Menu.Item>
                <Menu.Item key="2">Egresos</Menu.Item>
                <Menu.Item key="3">Inventario</Menu.Item>
                <Menu.Item key="4">Clientes</Menu.Item>
                <Menu.Item key="5">Proovedores</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Ganado</span></span>}>
                <Menu.Item key="6">Compras</Menu.Item>
                <Menu.Item key="7">Ventas</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Granos</span></span>}>
                <Menu.Item key="8">Compras</Menu.Item>
                <Menu.Item key="9">Ventas</Menu.Item>
            </SubMenu>
        </Menu>
    )
};

export default LeftSide;