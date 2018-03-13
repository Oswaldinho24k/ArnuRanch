import React, {Component, Fragment} from 'react';
import {Button, message, Popconfirm, Divider, BackTop, Input,Icon, Select} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";
import * as empresasActions from '../../redux/actions/empresasActions';

import CompanyForm from './CompanyForm';
import TablePageB from "../clientes/TablePageB";

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

const otrrr = [{
    name :'Cerdos',
    id: 1
},
    {
        name:'Ganado',
        id:2
    },
    {
        name:'Granos',
        id:3
    },
    {
        name:'Planta de alimentos',
        id:4
    },
    {
        name:'Campo',
        id:5
    },

];

class Company extends Component {

    state = {
        visible: false,
        selectedRowKeys:[],
        on:true,
        data:[],

        filterDropdownVisible: false,
        searchText: '',
        filtered: false,

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
            if (!err) {
                console.log(values);

                this.props.empresasActions.saveEmpresa(values)
                    .then(r=>{
                        message.success('Guardado con éxito');

                        form.resetFields();
                        this.setState({ visible: false });
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

    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: this.props.empresas.map((record) => {
                const match = record.company.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    company: (
                        <span>
              {record.company.split(reg).map((company, i) => (
                  i > 0 ? [<span style={{color:'red'}} key={i}>{match[0]}</span>, company] : company
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    };

    componentWillMount(){
        this.setState({
            data:this.props.empresas
        });
    }

    resetFilter = () => {
        this.setState({
            data:this.props.empresas,
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
        });
    };
    handleChange=(value)=> {
        console.log(`selected ${value}`);
    };


    render(){
        const columns = [
            {
                title: 'Empresa',
                dataIndex: 'company',
                render: (company,obj) =><Link to={`/admin/empresas/${obj.id}`}>{ company && company !== null ? company: "No Company"}</Link>,
                key:'company',
                filterDropdown: (
                    <div style={style.customFilterDropdown}>
                        <Input
                            ref={ele => this.searchInput = ele}
                            placeholder="Buscar empresa"
                            value={this.state.searchText}
                            onChange={this.onInputChange}
                            onPressEnter={this.onSearch}
                            style={style.customFilterDropdownInput}
                        />
                        <Button type="primary" onClick={this.onSearch}><Icon type="search" /></Button>
                    </div>
                ),
                filterIcon: (<Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />
                ),
                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => {
                    this.setState({
                        filterDropdownVisible: visible,
                    }, () => this.searchInput && this.searchInput.focus());
                },
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

            {
                title: 'Actions',
                dataIndex: 'id',
                render: id => <Link to={`/admin/empresas/${id}`}>Detalle</Link>,
                fixed:'right',
                width:100
            },

        ];

        const { visible, selectedRowKeys, data, filtered } = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {empresas, fetched, blines} = this.props;
        let options = blines.map((a, key) => <Option key={key} value={a.id}>{a.name}</Option>);
        if(!fetched)return(<MainLoader/>);


        return(
            <Fragment>

                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Empresas
                </div>

                <h2>Empresas Arnulfo</h2>
                <BackTop visibilityHeight={100} />

                {filtered?<TablePageB data={data} columns={columns} rowSelection={rowSelection}/>
                    :<TablePageB data={empresas} columns={columns} rowSelection={rowSelection}/>
                }

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <CompanyForm
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    options={options}

                    phone={this.checkPhone}
                    handleChange={this.handleChange}


                />

                <Divider type={'vertical'} />

                <Popconfirm title="Are you sure delete this company?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button hidden={!canDelete} type="primary" >Borrar</Button>
                </Popconfirm>

                <Divider type={'vertical'} />

                <Button type="primary" hidden={!filtered} onClick={this.resetFilter}>Borrar filtro</Button>




            </Fragment>

        )
    }
}

function mapStateToProps(state, ownProps) {
    return{
        blines:state.blines.list,
        empresas: state.empresas.list,
        fetched: state.empresas.list !== undefined && state.blines.list !== undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return{
       empresasActions: bindActionCreators(empresasActions, dispatch)
    }
}

Company = connect(mapStateToProps, mapDispatchToProps)(Company);
export default Company;