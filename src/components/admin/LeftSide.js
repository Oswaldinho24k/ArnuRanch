import React from 'react';
import {Icon, Menu} from "antd";
import {Link} from 'react-router-dom';
import {paths} from './Sections';

const SubMenu = Menu.SubMenu;

const LeftSide = ({onOpenChange, user, openKeys}) => {

    return (

        <Menu theme="dark"
              mode="inline"
              openKeys={openKeys}
              defaultSelectedKeys={[]}
              defaultOpenKeys={[]}
              onOpenChange={onOpenChange}
        >


            {user.is_superuser?<SubMenu  key="sub5" title={<span className={'my-icon'}><Icon type="user" /><span>Usuarios</span></span>}>
                <Menu.Item key="10" disabled={false}>
                    <Link to='/admin/usuarios'>  Usuarios </Link>
                </Menu.Item>
            </SubMenu>:''}
            {(user.profile&&user.profile.admin)|| user.is_superuser?
                <SubMenu  key="sub1" title={<span className={'my-icon'}><Icon type="global" /><span>Admin</span></span>}>
                    <Menu.Item key="1" disabled={false}>
                        <Link to={'/admin/estadisticas'} >Estadísticas</Link>
                    </Menu.Item>
                    <Menu.Item key="2" disabled={false}>
                        <Link to={'/admin/ingresos'} >Ingresos</Link>
                    </Menu.Item>
                    <Menu.Item key="3" disabled={false}>
                        <Link to={'/admin/ingresos/cobrar'} >Cuentas por Cobrar</Link>
                    </Menu.Item>
                    <Menu.Item key="4" disabled={false}>
                        <Link to={'/admin/egresos'}>Egresos</Link>
                    </Menu.Item>
                    <Menu.Item key="5" disabled={false}>
                        <Link to={'/admin/egresos/pagar'} >Cuentas por Pagar</Link>
                    </Menu.Item>
                    <Menu.Item key="6" disabled={false}>
                        <Link to={'/admin/clientes'}>Clientes</Link>
                    </Menu.Item>
                    <Menu.Item key="7" disabled={false}>
                        <Link to={'/admin/proveedores'}>Proovedores</Link>
                    </Menu.Item>
                    <Menu.Item key="8" disabled={true}>
                        <Link to={'/admin/cuentas'}>Cuentas Banco</Link>
                    </Menu.Item>
                    {/*<Menu.Item key="9" disabled={true}>
                        <Link to={'/admin/inventario'}>Inventario</Link>
                    </Menu.Item>*/}
                    <Menu.Item key="22">
                        <Link to={'/admin/facturas'}>Facturas</Link>
                    </Menu.Item>
                    <Menu.Item key="9" disabled={false}>
                        <Link to={'/admin/ingresos/blines'} >Bussines Lines</Link>
                    </Menu.Item>
                    <Menu.Item key="11">
                        <Link to='/admin/empresas'> Empresas </Link>
                    </Menu.Item>

                </SubMenu>:''}
            {(user.profile&&user.profile.ganado)|| user.is_superuser?
            <SubMenu key="sub2" title={<span className={'my-icon'}><Icon type="gitlab" /><span>Ganado</span></span>}>
                <Menu.Item key="21" disabled={false}>
                    <Link to='/admin/dash/animals'>  Dashboard </Link>
                </Menu.Item>
                <Menu.Item key="15" disabled={false}>
                    <Link to ={'/admin/corrales'}>Corrales</Link>
                </Menu.Item>
                <Menu.Item key="12" disabled={false}>
                    <Link to={'/admin/animals'}>Animales</Link>
                </Menu.Item>
                <Menu.Item key="13" disabled={false}>
                    <Link to='/admin/lotes'> Lotes </Link>
                </Menu.Item>

                <Menu.Item key="16" >
                    <Link to='/admin/reportes'>  Reportes </Link>
                </Menu.Item>

                <Menu.Item key="14" disabled={false}>
                    <Link to='/admin/razas'>  Razas </Link>
                </Menu.Item>

                <Menu.Item key="20" disabled={false}>
                    <Link to='/admin/eventos'>  Eventos </Link>
                </Menu.Item>


            </SubMenu>:''}
            {(user.profile&&user.profile.ganado)|| user.is_superuser?
            <SubMenu key="sub3" title={<span className={'my-icon'}><Icon type="apple" /><span>Alimentos</span></span>}>

                <Menu.Item key="17">
                    <Link to={paths.insumos}>Insumos</Link>
                </Menu.Item>

                <Menu.Item key="18">
                    <Link to={paths.formulas}>Fórmulas</Link>
                </Menu.Item>


            </SubMenu>:''}

            {(user.profile&&user.profile.ganado)|| user.is_superuser?
            <SubMenu key="sub4" title={<span className={'my-icon'}><Icon type={'pushpin'} /><span>Vacunas</span></span>}>
                <Menu.Item key="19">

                    <Link to={"/admin/vacunas"}>Vacunas</Link>
                </Menu.Item>

            </SubMenu>:''}


        </Menu>
    )
};

export default LeftSide;