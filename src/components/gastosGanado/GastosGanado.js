import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Table, Button, message, Divider, Input} from 'antd';
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";
import * as gastosGanadoActions from '../../redux/actions/gastoGanado/gastoGanadoActions';

import moment from 'moment';

import GastoForm from './GastoForm';

class GastosGanado extends Component {

    state = {
        visible:false,
        selectedRowKeys:[],
        visibleEdit:false,
        infoEdit:[],
        searchText: '',
        canReset:false,
        idProv:null,
        idLn:null,
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
        const form = this.form;
        form.resetFields();
    };

    deleteGastoGanado=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.gastosGanadoActions.deleteGastoGanado(keys[i])
                .then(r=>{
                    console.log(r)
                }).catch(e=>{
                console.log(e)
            })
        }
        this.setState({selectedRowKeys:[]})
    };
    confirm=(e)=> {
        this.deleteGastoGanado();
        message.success('Deleted successfully');
    };

    cancel=(e) =>{
        console.log(e);
    };

    onSelectChange = (selectedRowKeys) => {
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
                this.props.gastosGanadoActions.newGasto(values)
                    .then(r=>{
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
        let newUrl = this.props.gastosGanadoData.next;
        if(newUrl===null){
            newUrl = this.props.gastosGanadoData.previous;
        }

        if( pagina ==1 && this.props.gastosGanadoData.count <= 20){
            newUrl='http'+newUrl.slice(4,newUrl.length);
        }else{
            newUrl='http'+newUrl.slice(4,newUrl.length-nextLength)+pagina;
        }
        this.props.gastosGanadoActions.getGastos(newUrl);
    };

    visibleEdit=(obj)=>{
        this.setState({visibleEdit:true, infoEdit:obj});

    };

    cancelar = () => {
        this.setState({
            visibleEdit: false,
        });
    };

    //search

    onSearch = () => {
        //let basePath= "http://localhost:8000/api/egresos/gastos/?q=";
        let basePath = 'https://rancho.davidzavala.me/api/egresos/gastos/?q=';

        let url = basePath+this.state.searchText;
        this.props.gastosGanadoActions.getGastos(url);
        this.setState({canReset:true})

    };
    handleSearch=(e)=>{
        this.setState({searchText:e.target.value})
    };
    //resetFilter
    resetFilter = () => {
        //let basePath= "http://localhost:8000/api/egresos/gastos/";
        let basePath = 'https://rancho.davidzavala.me/api/egresos/gastos/?q=';
        this.props.gastosGanadoActions.getGastos(basePath);
        this.setState({
            searchText:'',
            canReset:false
        });

    };


    render(){
        let {gastos, fetched, gastosGanadoData, } = this.props;
        let {visible, selectedRowKeys, searchText, canReset} = this.state;

        const columns = [
            {
                title:'Concepto',
                dataIndex:'concepto',

            },
            {
                title: 'Monto',
                dataIndex: 'monto',

            },
            {
                title: 'Registro',
                dataIndex: 'fecha',
                render: fecha => moment(fecha).format('L')

            },

        ];

        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        if(!fetched)return(<MainLoader/>);

        return(
            <Fragment>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Gastos
                </div>

                <h2>
                    Gastos Ganado
                </h2>

                <div style={{paddingBottom:'1%'}}>
                    <Input.Search
                        enterButton
                        onSearch={this.onSearch}
                        onChange={this.handleSearch}
                        value={searchText}
                        style={{ width: 400 }}
                        placeholder={'Buscar gasto...'}
                    />
                </div>


                <Table

                    columns={columns}
                    dataSource={gastos}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    pagination={{
                        pageSize: 10,
                        total:gastosGanadoData.count,
                        onChange:this.handlePagination,
                        showTotal:total => `Total: ${total} Gastos`
                    }}
                    style={{marginBottom:10}}
                    height={'80vh'}
                />


                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <GastoForm
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}



                />
                <Divider type={'vertical'} />

                <Button type="primary" disabled={!canReset} onClick={this.resetFilter}>Borrar filtro</Button>




            </Fragment>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        gastos: state.gastosGanado.list,
        gastosGanadoData:state.gastosGanado.allData,
        fetched:state.gastosGanado.list !== undefined && state.gastosGanado.allData !==undefined
    }
}

function mapDispatchToProps(dispatch) {
    return {
        gastosGanadoActions: bindActionCreators(gastosGanadoActions, dispatch),
    }
}

GastosGanado = connect(mapStateToProps, mapDispatchToProps)(GastosGanado);
export default GastosGanado;