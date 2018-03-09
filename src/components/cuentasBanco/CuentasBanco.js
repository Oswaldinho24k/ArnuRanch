import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Button, message, Popconfirm, Tag, Input, Icon, BackTop} from "antd";
import MainLoader from "../common/Main Loader";
import moment from 'moment';
import * as egresosActions from '../../redux/actions/egresosActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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


class CuentasBanco extends Component {
    state = {
        selectedRowKeys:[],

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
    deleteEgreso=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.egresosActions.deleteEgreso(keys[i])
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
        this.deleteEgreso();
        message.success('Deleted successfully');
    };

    cancel=(e) =>{
        console.log(e);
    };

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });

    };

    onSearch = () => {
        let filtrados = this.props.egresos.filter(f=>{return f.type==="Gasto" });
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: filtrados.map((record) => {
                const match = record.provider.provider.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    provider: (
                        <span >
              {record.provider.provider.split(reg).map((provider, i) => (
                  i > 0 ? [<span style={{color:'red'}} key={i}>{match[0]}</span>, provider] : provider

              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    };

    componentWillMount(){
        this.setState({
            data:this.props.egresos.filter(f=>{return f.type==="Gasto" })
        });
    }

    resetFilter = () => {
        this.setState({
            data:this.props.egresos.filter(f=>{return f.type==="Gasto" }),
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
        });
    };


    render() {

        const columns = [
            {
                title: 'Razón Social',
                dataIndex: 'provider',
                render: (provider,obj) =><Link to={`/admin/egresos/${obj.id}`}>{ provider && provider !== null ? provider.provider || provider: "No Proveedor"}</Link>,


                key:'provider',
                filterDropdown: (
                    <div style={style.customFilterDropdown}>
                        <Input
                            ref={ele => this.searchInput = ele}
                            placeholder="Buscar proveedor"
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
                title: 'Linea de negocio',
                dataIndex: 'business_line',
            },
            {
                title: 'No. Factura',
                dataIndex: 'no_check',
                render:no_check=> <span>{no_check && no_check !==null ?<span>{no_check}</span>:'No hay factura'}</span>
            },
            {
                title: 'Tipo',
                dataIndex:'type',
                render:type=><span>{type && type !==null ?<Tag color="#2db7f5" style={{width:70, textAlign:'center'}}>Gasto</Tag>:<Tag color="#f50" style={{width:70, textAlign:'center'}}>GastoFail</Tag>}</span>
            },
            {
                title: 'Registro',
                dataIndex: 'created',
                render: created => moment(created).startOf(3, 'days').calendar()

            },
        ];


        const { selectedRowKeys, data, filtered } = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {egresos, fetched} = this.props;
        let filtrados = egresos.filter(f=>{return f.type==="Gasto" });
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <h1>Cuentas Banco tipo gasto</h1>

                <BackTop visibilityHeight={100} />

                {/*<Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filtrados}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    pagination={false}
                    style={{marginBottom:10}}
                />*/}

                {filtered?<TablePageB data={data} columns={columns} rowSelection={rowSelection}/>
                    :<TablePageB data={filtrados} columns={columns} rowSelection={rowSelection}/>
                }

                <Popconfirm title="Are you sure delete this egreso?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button hidden={!canDelete} type="primary" >Delete</Button>
                </Popconfirm>

                <Button type="primary" hidden={!filtered} onClick={this.resetFilter}>Borrar filtro</Button>

            </Fragment>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        egresos: state.egresos.list,
        fetched: state.egresos.list !==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        egresosActions: bindActionCreators(egresosActions, dispatch)
    }
}

CuentasBanco = connect(mapStateToProps, mapDispatchToProps)(CuentasBanco);
export default CuentasBanco;
