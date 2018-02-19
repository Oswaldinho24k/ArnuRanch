import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Table, Button, Modal, message, Popconfirm, Divider, Select} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import MainLoader from "../common/Main Loader";
import UsuarioForm from "./UsuarioForm";

const Option = Select.Option;

const columns = [
    {
        title: 'Usuario',
        dataIndex: 'name',
    },
    {
        title: 'Permiso',
        dataIndex: 'permiso',
    },
    {
        title: 'Actions',
        dataIndex: 'id',
        render: id => <Link to={`/admin/usuarios/${id}`} >Detalle</Link>,
        fixed:'right',
        width:100
    },

];

const options_permisos = [
    {
        name:"Ganadero",
        id:1
    },
    {
        name:"Super Usuario",
        id:2
    },
    {
        name:"Administración",
        id:3
    },
];


class Users extends Component {

    state = {
        visible: false,
        selectedRowKeys:[],
    };

    showModal = () => {
        this.setState({
            visible: true,
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
            this.props.usuariosActions.deleteUsuario(keys[i])
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
        //this.deleteUsuario();
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
                //this.props.usuariosActions.saveUsuario(values);
                message.success('Guardado con éxito');

                form.resetFields();
                this.setState({ visible: false });
            }else{message.error('Algo fallo, verifica los campos');}

        });
    };



    render() {
        const data = [{
            name :'Cerdos',
            permiso: 'administración',
            id:1,
        },
            {
                name:'Ganado',
                permiso:'staff',
                id:2,
            },
            {
                name:'Granos',
                permiso:'ganadero',
                id:3,
            },
            {
                name:'Planta de alimentos',
                permiso:'super usuario',
                id:4,
            },
            {
                name:'Campo',
                permiso:'staff',
                id:5,
            },

        ];
        const { visible, selectedRowKeys } = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        //let options_permisos = options_permisos.map((a) => <Option key={a.name}>{a.name}</Option>);
        let options = options_permisos.map((a)=><Option key={a.name}>{a.name}</Option>)
        //let {clientes, fetched} = this.props;
        //if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <h1>Clientes List</h1>

                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    pagination={false}
                    style={{marginBottom:10}}
                />

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <UsuarioForm
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    options_permisos={options}

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
        /*usuarios:state.usuarios.list,
        fetched:state.usuarios.list!==undefined,*/
    }
}

function mapDispatchToProps(dispatch) {
    return {
        /*usuariosActions:bindActionCreators(usuariosActions, dispatch)*/
    }
}

Users = connect(mapStateToProps,mapDispatchToProps)(Users);
export default Users;