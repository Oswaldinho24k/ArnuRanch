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
    },{
        name:"Aves",
        value:'aves'
    },{
        name:"Cerdos",
        value:'cerdos'
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


class UserDetail extends Component {

    state = {
        visible: false,
        selectedRowKeys:[],
        user:{},
        canEdit:true,
    };

    showModal = () => {
        this.setState({
            visible: true,user:{}
        });
    };

    handleCancel = () => {        
        this.props.history.push('/admin/usuarios')
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

    editUser = (e) => {
        const form = this.form;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                values['username'] = values.email
                values['id'] = this.props.match.params.id
                values['profile']={}
                for(let i in values.permiso){
                    values[values.permiso[i]]=true;
                }
            
            
                for(let i in values.section){
                    values['profile'][values.section[i]]=true;
                }
                
            
                console.log(values);
                this.props.usuariosActions.editUser(values)
                    .then(r=>{
                        console.log(r);
                        message.success('Guardado con éxito');
                        
                    }).catch(e=>{
                    console.log(e)
                });

                //this.setState({ visible: false });
            }else{message.error('Algo fallo, verifica los campos');}

        });
    };

    

    // editar=(user)=>{
    //     this.showModal();
    //     this.setState({user, canEdit:true});

    // };

    render() {
        const { visible, selectedRowKeys , canEdit} = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        let sections = options_sections.map((a)=><Option key={a.value}>{a.name}</Option>);
        let permissions = options_permissions.map((a)=><Option key={a.value}>{a.name}</Option>);
        let {user, fetched} = this.props;
        if(!fetched)return(<MainLoader/>);

        return (
            <Fragment>
                <h2>Lista de Usuarios</h2>               

                
                <UsuarioForm
                    user={user}
                    ref={this.saveFormRef}
                    visible={true}
                    onCancel={this.handleCancel}
                    onCreate={this.editUser}
                    options_sections={sections}
                    options_permissions={permissions}
                    canEdit={canEdit}
                />


            </Fragment>
        );
    }
}




function mapStateToProps(state, ownProps) {
    let user = state.users.list.find(u=>{return u.id==ownProps.match.params.id})
    return {
        user:user,
        fetched:user!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        usuariosActions:bindActionCreators(usuariosActions, dispatch)
    }
}

UserDetail = connect(mapStateToProps,mapDispatchToProps)(UserDetail);
export default UserDetail;