import React, {Component} from 'react';
import {Icon, Menu} from 'antd';

const SubMenu = Menu.SubMenu



class Navbar extends Component {
    render() {
        return (
            <div className={'osw-navbar'}>
                <span>
                    <Icon
                        className="trigger"
                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.props.toggle}
                    />
                </span>
                <span>
                    <Menu
                        mode="horizontal">
                        <Menu.Item>lol</Menu.Item>
                        <SubMenu key={'sub1'} title={<span><Icon type="person" /><span>User</span></span>}>
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
                                <Icon type="logout" />
                                <span>Cerrar Sesión</span>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </span>
            </div>
        )
    }
}

export default Navbar;