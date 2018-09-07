import React, {Component, Fragment} from 'react';
import BLineForm from './BLineForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Table, Button, message, Divider} from 'antd';
import * as blinesActions from '../../redux/actions/blines/blinesActions';
import MainLoader from "../common/Main Loader";
import EditBline from './EditBline'


class Blines extends Component {
    state = {
        visible:false,
        selectedRowKeys:[],
        visibleEdit:false,
        infoEdit:[]
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
        const form = this.form;
        form.resetFields();
    };


    deleteBline=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.blinesActions.deleteLine(keys[i])
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
        this.deleteBline();
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
                this.props.blinesActions.newLine(values)
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

    handlePagination=(pagina)=>{
        let nextLength = pagina.toString().length;
        let newUrl = this.props.blinesData.next;
        if(newUrl===null){
            newUrl = this.props.blinesData.previous;
        }

        if( pagina ==1 && this.props.blinesData.count <= 20){
            newUrl='http'+newUrl.slice(4,newUrl.length);
        }else{
            newUrl='http'+newUrl.slice(4,newUrl.length-nextLength)+pagina;
        }
        this.props.blinesActions.getLines(newUrl);
    };

    visibleEdit=(obj)=>{
        this.setState({visibleEdit:true, infoEdit:obj});

    };

    cancelar = () => {
        this.setState({
            visibleEdit: false,
        });
    };


    render() {
        let {blines, fetched, blinesData} = this.props;
        let {visible, infoEdit, visibleEdit} = this.state;
        //const canDelete = selectedRowKeys.length > 0;
       /* const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };*/

        const columns = [
            {
                title: 'Nombre',
                dataIndex: 'name',

            },

            {
                title: 'Actions',
                dataIndex: 'id',
                render: (id, obj) => <p onClick={()=>this.visibleEdit(obj)}>Editar</p>,
                fixed:'right',
                width:100
            },
        ];

        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Lineas de Negocio
                </div>

                <h2>Lineas de Negocio</h2>
                <Table

                    columns={columns}
                    dataSource={blines}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    pagination={{
                        pageSize: 10,
                        total:blinesData.count,
                        onChange:this.handlePagination,
                        showTotal:total => `Total: ${total} Blines`
                    }}
                    style={{marginBottom:10}}
                />
                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <BLineForm

                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}/>
                <Divider
                    type={'vertical'}/>

                <EditBline
                    onCancel={this.cancelar}
                    visible={visibleEdit}
                    data={this.state.infoEdit}
                    {...infoEdit}
                    edit={this.props.blinesActions.editLinea}
                />
            </Fragment>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        blines: state.blines.list,
        blinesData:state.blines.allData,
        fetched:state.blines.list !== undefined
    }
}

function mapDispatchToProps(dispatch) {
    return {
        blinesActions: bindActionCreators(blinesActions, dispatch)
    }
}

Blines = connect(mapStateToProps, mapDispatchToProps)(Blines);
export default Blines;
