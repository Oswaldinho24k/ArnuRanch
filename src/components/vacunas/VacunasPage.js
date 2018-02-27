import React, {Component, Fragment} from 'react';
import {Button, message, Popconfirm, Divider, BackTop, Input,Icon} from 'antd';
import * as vacunasActions from '../../redux/actions/vacunasActions';
import VacunaForm from './VacunaForm';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";
import TablePageB from "../clientes/TablePageB";


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



class VacunasPage extends Component {
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

    deleteVacuna=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.vacunasActions.deleteVacuna(keys[i])
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
        this.deleteVacuna();
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
                this.props.vacunasActions.saveVacuna(values)
                    .then(r=>{
                        message.success('Guardado con éxito');

                        form.resetFields();
                        this.setState({ visible: false });
                    })
                    .catch(r=>{
                        message.error('El RFC ingresado ya existe!')
                        console.log(values)
                    })
            }else{message.error('Algo fallo, verifica los campos');}

        });
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
            data: this.props.vacunas.map((record) => {
                const match = record.vaccine.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    vaccine: (
                        <span>
              {record.vaccine.split(reg).map((vaccine, i) => (
                  i > 0 ? [<span style={{color:'red'}} key={i}>{match[0]}</span>, vaccine] : vaccine
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    };

    componentWillMount(){
        this.setState({
            data:this.props.vacunas
        });
    }

    resetFilter = () => {
        this.setState({
            data:this.props.vacunas,
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
        });
    };




    render() {
        const columns = [
            {
                title: 'Nombre de Vacuna',
                dataIndex: 'vaccine',
                key:'vaccine',
                filterDropdown: (
                    <div style={style.customFilterDropdown}>
                        <Input
                            ref={ele => this.searchInput = ele}
                            placeholder="Buscar vacuna"
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
                title: 'Tipo de Vacuna',
                dataIndex: 'type',
            },
            {
                title: 'Dosis por animal',
                dataIndex: 'dose',
                render: dose => `${dose} ml`,
            },
            {
                title: 'Actions',
                fixed:'right',
                width:100,
                key: 'action',
                render: (text, record) => (
                    <span>
              <Link to={`/admin/vacunas/${record.id}`}>Detalle</Link>
            </span>
                ),
            }
        ];

        const { visible, selectedRowKeys, data, filtered } = this.state;
        console.log(filtered)
        const canDelete = selectedRowKeys.length > 0;
        //const filter = data.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {vacunas, fetched} = this.props;
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Vacunas
                </div>

                <h2>Vacunas</h2>
                <BackTop visibilityHeight={100} />

                {filtered?<TablePageB data={data} columns={columns} rowSelection={rowSelection}/>
                    :<TablePageB data={vacunas} columns={columns} rowSelection={rowSelection}/>
                }





                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <VacunaForm
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    handleChange={this.handleChange}


                />


                <Divider type={'vertical'} />

                <Popconfirm title="Are you sure delete this cliente?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button hidden={!canDelete} type="primary" >Borrar</Button>
                </Popconfirm>

                <Divider type={'vertical'} />

                <Button type="primary" hidden={!filtered} onClick={this.resetFilter}>Borrar filtro</Button>

            </Fragment>
        );
    }
}




function mapStateToProps(state, ownProps) {
    return {
        vacunas:state.vacunas.list,
        fetched:state.vacunas.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        vacunasActions:bindActionCreators(vacunasActions, dispatch)
    }
}

VacunasPage = connect(mapStateToProps,mapDispatchToProps)(VacunasPage);
export default VacunasPage;