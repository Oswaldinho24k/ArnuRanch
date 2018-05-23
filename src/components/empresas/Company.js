import React, {Component, Fragment} from 'react';
import {Button,Table, message, Popconfirm, Divider, BackTop, Input,Icon, Select} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";
import * as empresasActions from '../../redux/actions/empresasActions';
import * as linesActions from '../../redux/actions/blines/blinesActions';

import CompanyForm from './CompanyForm';


const Option = Select.Option;

const style={
    customFilterDropdown: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: 'white',
        boxShadow: '0 1px 6px rgba(0, 0, 0, .2)'
    },

    customFilterDropdownInput: {
        width: 130,
        marginRight: 8,
    }
};

class Company extends Component {

    state = {
        visible: false,
        selectedRowKeys:[],
        on:true,
        data:[],

        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
        canReset:false,

        linea:[],
        line_comp_id:null,

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

    deleteEmpresa=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.empresasActions.deleteEmpresa(keys[i])
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
        this.deleteEmpresa();
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
            console.log("KssK", values)
            values['line_comp_id']=this.state.linea;
            console.log("KAKAK", values)
            if (!err) {
                console.log(values);

                this.props.empresasActions.saveEmpresa(values)
                    .then(r=>{
                        message.success('Guardado con éxito');

                        form.resetFields();
                        this.setState({ visible: false, });
                    })
                    .catch(e=>{
                        for (let i in e.response.data){
                            message.error(e.response.data[i])
                        }
                        console.log(values)
                    })
            }else{message.error('Algo fallo, verifica los campos');}

        });
    };

   /* checkRfc = (rule, value, callback) => {
        if (value === undefined) {
            callback('Verifica el RFC ingresado');
        } else {
            if(value.length < 13){
                callback('Recuerda que son trece dígitos');
            }
            callback()
        }
    };*/

    checkPhone = (rule, value, callback) => {
        if (value === undefined) {
            callback('El número ingresa debe contener 10 dígitos.');
        } else {
            if(value.length < 10){
                callback('Ingresa un número de 10 dígitos');
            }
            callback()
        }
    };

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
        console.log(e.target.value)
    };


    handleChange=(value, obj)=> {
        this.setState({linea:value});
        let basePath = 'http://127.0.0.1:8000/api/ingresos/blines/';
        this.props.linesActions.getLiSearch(basePath);
    };

    onSearch = () => {
        let basePath= "http://localhost:8000/api/ingresos/empresas/?q=";
        //let basePath = 'https://rancho.fixter.org/api/ingresos/empresas/?q=';

        let url = basePath+this.state.searchText;
        this.props.empresasActions.getEmpresas(url);
        this.setState({canReset:true})

    };

    resetFilter = () => {
        let basePath= "http://localhost:8000/api/ingresos/empresas/";
        //let basePath = 'https://rancho.fixter.org/api/ingresos/empresas/';

        this.props.empresasActions.getEmpresas(basePath);
        this.setState({
            searchText:'',
            canReset:false
        });

    };


    handlePagination=(pagina)=>{
        let nextLength = pagina.toString().length;
        let newUrl = this.props.empresasData.next;
        if(newUrl===null){
            newUrl = this.props.empresasData.previous;
        }

        if( pagina ==1 && this.props.empresasData.count <= 20){
            newUrl='http'+newUrl.slice(4,newUrl.length);
        }else{
            newUrl='http'+newUrl.slice(4,newUrl.length-nextLength)+pagina;
        }
        this.props.empresasActions.getEmpresas(newUrl);
    };


    handleSearch=(e)=>{
        this.setState({searchText:e.target.value})
    };

    handleSearchLine=(a)=>{
        console.log(a)
        let basePath = 'http://127.0.0.1:8000/api/ingresos/blines/?q=';
        let url = basePath+a;
        console.log(url)
        this.props.linesActions.getLiSearch(url);
    };

    onSelect=(value, b)=>{
        console.log(b, value);
        this.setState({linea:value})

    };

    saveId=(id)=>{
        let ids=[]
        ids.push(id)
        this.setState({line_comp_id:ids})
    };

    render(){
        const columns = [
            {
                title: 'Empresa',
                dataIndex: 'company',
                render: (company,obj) =><Link to={`/admin/empresas/${obj.id}`}>{ company && company !== null ? company: "No Company"}</Link>,
                key:'company',
            },
            {
                title: 'E-mail',
                dataIndex: 'email_comp'
            },
            {
                title: 'RFC',
                dataIndex: 'rfc_comp'
            },
            {
                title: 'Inventario',
                render: (text, record) => (
                    <span><Link to={`/admin/empresas/inventario/${record.id}`}>Inventario</Link></span>
                ),
            },

        ];

        const { visible, selectedRowKeys, data, filtered, linea , searchText, canReset } = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {empresas, fetched, blines, empresasData} = this.props;
        if(!fetched)return(<MainLoader/>);
        console.log("BLINESSS",blines)


        return(
            <Fragment>

                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Empresas
                </div>

                <h2>Empresas Arnulfo</h2>
                <div style={{paddingBottom:'1%'}}>
                    <Input.Search
                        enterButton
                        onSearch={this.onSearch}
                        onChange={this.handleSearch}
                        value={searchText}
                        style={{ width: 400 }}
                        placeholder={'Busca por nombre...'}
                    />
                </div>
                <BackTop visibilityHeight={100} />

                <Table
                    dataSource={empresas}
                    columns={columns}
                    rowSelection={rowSelection}
                    rowKey={record => record.id}
                    scroll={{x:650, y:400}}
                    style={{marginBottom:10}}
                    pagination={{
                        pageSize: 10,
                        total:empresasData.count,
                        onChange:this.handlePagination,
                        showTotal:total => `Total: ${total} Empresas`
                    }}
                />

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <CompanyForm
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    options={blines}

                    phone={this.checkPhone}
                    handleChange={this.handleChange}

                    linea={linea}
                    searchLine={this.handleSearchLine}
                    selectLine={this.onSelect}
                    saveId={this.saveId}


                />

                <Divider type={'vertical'} />

                <Popconfirm title="Are you sure delete this company?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button disabled={!canDelete} type="primary" >Eliminar</Button>
                </Popconfirm>

                <Divider type={'vertical'} />

                <Button type="primary" disabled={!canReset} onClick={this.resetFilter}>Borrar filtro</Button>




            </Fragment>

        )
    }
}

function mapStateToProps(state, ownProps) {
    return{
        empresasData:state.empresas.allData,
        blines:state.blines.lineSearch,
        empresas: state.empresas.list,
        fetched: state.empresas.list !== undefined && state.blines.list !== undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return{
       empresasActions: bindActionCreators(empresasActions, dispatch),
        linesActions: bindActionCreators(linesActions, dispatch)
    }
}

Company = connect(mapStateToProps, mapDispatchToProps)(Company);
export default Company;