import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Button, message, Popconfirm, Tag, Divider, Input, Icon, BackTop} from "antd";
import MainLoader from "../common/Main Loader";
import moment from 'moment';
import * as egresosActions from '../../redux/actions/administracion/egresosActions';
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

class PagarEgreso extends Component {
    state = {
        selectedRowKeys:[],

        data:[],
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
        searchPaid:false,
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
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        let dataFilter = this.props.egresos.filter(f=>{return f.paid===false });
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: dataFilter.map((record) => {
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
        let filtrados = this.props.egresos.filter(f=>{return f.paid===false });
        this.setState({
            data:filtrados
        });

        //let basePath= "http://localhost:8000/api/egresos/egresos/?paid=";
        let basePath = 'https://rancho.davidzavala.me/api/ingresos/ingresos/?cobrado=';

        let url = basePath+`${"False"}`;
        console.log("URL", url)
        this.props.egresosActions.getEgresos(url);
        this.setState({canReset:true})
    }

    resetFilter = () => {
        let filtrados = this.props.egresos.filter(f=>{return f.paid===false });
        this.setState({
            data:filtrados,
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
        });
    };


    render() {

        const columns = [
            {
                title: 'Razón Social',
                dataIndex: 'provider_egreso',
                render: (provider,obj) =><Link to={`/admin/egresos/${obj.id}`}>{ provider && provider !== null ? provider.provider  || provider: "No Proveedor"}</Link>,


                key:'provider',

            },
            {
                title: 'Linea de negocio',
                dataIndex: 'business_egreso',
                render: (business_line,obj) =><span>{ business_line && business_line !== null ? business_line.name : "No Linea"}</span>,
            },
            {
                title: 'No. Factura',
                dataIndex: 'no_check',
                render:no_check=> <span>{no_check && no_check !==null ?<span>{no_check}</span>:'No hay factura'}</span>
            },
            {
                title: 'Status',
                dataIndex:'paid',
                render:paid=><span>{paid?<Tag color="#87d068" style={{width:70, textAlign:'center'}} >Pagado</Tag>:<Tag color="#f50" style={{width:70, textAlign:'center'}}>Por Pagar</Tag>}</span>
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
        let filtrados = egresos.filter(f=>{return f.paid===false });
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Egresos por pagar
                </div>

                <h1>Egresos por Pagar</h1>

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
                    <Button disabled={!canDelete} type="primary" >Eliminar</Button>
                </Popconfirm>

                <Divider type="vertical"/>

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

PagarEgreso = connect(mapStateToProps, mapDispatchToProps)(PagarEgreso);
export default PagarEgreso;