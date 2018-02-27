import React, {Component, Fragment} from 'react';
import RazasForm from './RazasForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Table, Button, message, Divider, Popconfirm} from 'antd';
import * as razasActions from '../../../redux/actions/ganado/razasActions';

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'name',

    },



];

class RazasPage extends Component {
    state = {
        visible:false,
        selectedRowKeys:[],
    };


    showModal = () => {
        this.setState({
            visible: true,user:{}
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
            this.props.razasActions.deleteRaza(keys[i])
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
                this.props.razasActions.newRaza(values)
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


    render() {
        let {razas} = this.props;
        let {visible, selectedRowKeys} = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <Fragment>
                <h2>Razas</h2>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={razas}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    pagination={false}
                    style={{marginBottom:10}}
                />
                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <RazasForm

                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}/>
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
        razas: state.razas.list,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        razasActions: bindActionCreators(razasActions, dispatch)
    }
}

RazasPage = connect(mapStateToProps, mapDispatchToProps)(RazasPage);
export default RazasPage;
