import React, {Component} from 'react';
import {Icon, Menu, Avatar} from 'antd';
import {connect} from "react-redux";

const SubMenu = Menu.SubMenu




const Navbar=({logOut, user, collapsed, toggle})=> (
            <div className={'osw-navbar'}>
                <span>
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={toggle}
                    />
                </span>
                <span>
                    <Menu
                        mode="horizontal">
                        <Menu.Item>lol</Menu.Item>
                        <SubMenu key={'sub1'} title={<span>Hello, {user.username}</span>}>
                            <Menu.Item>
                                <Icon type="pie-chart" />
                                <span>Option 1</span>
                            </Menu.Item>
                            <Menu.Item>
                                <Icon type="pie-chart" />
                                <span>Option 2</span>
                            </Menu.Item>
                            <Menu.Divider></Menu.Divider>
                            <Menu.Item>
                               <span onClick={logOut}>
                                    <Icon type="logout" />
                                <span>Cerrar Sesión</span>
                               </span>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </span>
            </div>
        );


export default Navbar;
