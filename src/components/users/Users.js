import React, {Component, Fragment} from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import {Table, Button, Modal, message, Popconfirm, Divider, Select} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import MainLoader from "../common/Main Loader";
import UsuarioForm from "./UsuarioForm";
import * as usuariosActions from '../../redux/actions/administracion/usersActions';


const Option = Select.Option;



const options_sections = [
    {
        name:"Ganado",
        value:'ganado'
    },
    {
        name:"Punto de Venta",
        value:'vendedor'
    },
    {
        name:"Administración",
        value:'admin'
    },
    {
        name:"Planta de Alimentos",
        value:'alimentos'
    },
    {
        name:"Vacunación",
        value:'vacunas'
    }
];
const options_permissions = [
    {
        name:"Super User",
        value:'is_superuser'
    },
    {
        name:"Admin",
        value:'is_staff'
    },
    {
        name:"Just User",
        value:'is_active'
    },

];


class Users extends Component {

    state = {
        visible: false,
        selectedRowKeys:[],
        user:{},
        canEdit:false,
    };

    showModal = () => {
        this.setState({
            visible: true,user:{}, canEdit:false
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };


    deleteUsuario=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.usuariosActions.deleteUser(keys[i])
                .then(r=>{
                    console.log(r)
                }).catch(e=>{
                console.log(e)
            })
        }
        this.setState({selectedRowKeys:[]})
    };
    confirm=(e)=> {
        console.log(e);
        this.deleteUsuario();
        console.log("Eliminado")
        message.success('Deleted successfully');
    };

    cancel=(e) =>{
        console.log(e);
    };

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    saveFormRef = (form) => {
        this.form = form;
    };

    handleCreate = (e) => {
        const form = this.form;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                values['username'] = values.email
                values['profile']={}
                for(let i in values.permiso){
                    values[values.permiso[i]]=true;
                }
            
            
                for(let i in values.section){
                    values['profile'][values.section[i]]=true;
                }
            
                console.log(values);

                this.props.usuariosActions.newUser(values)
                    .then(r=>{
                        console.log(r);
                        message.success('Guardado con éxito');
                        form.resetFields();
                    }).catch(e=>{
                    for (let i in e.response.data){
                        message.error(e.response.data[i])
                    }
                });

                this.setState({ visible: false });
            }else{message.error('Algo fallo, verifica los campos');}

        });
    };

    editar=(user)=>{
        this.showModal();
        this.setState({user, canEdit:true});

    };

    render() {
        const { visible, selectedRowKeys , user, canEdit} = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const columns = [
            {
                title: 'Usuario',
                dataIndex: 'username',
                render: (v,o)=> <Link to={`/admin/usuarios/${o.id}`} >{v}</Link>,
            },
            {
                title: 'Permiso',
                dataIndex: 'is_superuser',
                render:(v,o)=><p>{o.is_superuser?'SuperUsuario':o.profile?o.profile.admin?'Administración':'Ganado':'No asignado'}</p>
            },
            {
                title: 'Actions',
                dataIndex: 'id',
                render: (id, obj) => <p onClick={()=>this.editar(obj)}>Detalle</p>,
                fixed:'right',
                width:100
            },

        ];
        let sections = options_sections.map((a)=><Option key={a.value}>{a.name}</Option>);
        let permissions = options_permissions.map((a)=><Option key={a.value}>{a.name}</Option>);
        let {users, fetched} = this.props;
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <h2>Lista de Usuarios</h2>

                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={users}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    pagination={false}
                    style={{marginBottom:10}}
                />

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <UsuarioForm
                    user={user}
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    options_sections={sections}
                    options_permissions={permissions}
                    canEdit={canEdit}

                />



                <Divider
                    type={'vertical'}/>

                <Popconfirm title="Are you sure delete this user?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button disabled={!canDelete} type="primary" >Delete</Button>
                </Popconfirm>



            </Fragment>
        );
    }
}




function mapStateToProps(state, ownProps) {
    return {
        users:state.users.list,
        fetched:state.users.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        usuariosActions:bindActionCreators(usuariosActions, dispatch)
    }
}

Users = connect(mapStateToProps,mapDispatchToProps)(Users);
export default Users;