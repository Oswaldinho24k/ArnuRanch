import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Modal, message, Popconfirm, Tag, Divider, Input, Icon, BackTop, Table, DatePicker} from "antd";
import moment from 'moment';
import * as ingresosActions from '../../redux/actions/administracion/ingresosActions';
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";
import {host} from '../../Api/Django'
import TablePageB from "../clientes/TablePageB";


const {RangePicker} = DatePicker

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

class CobrarIngreso extends Component {
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

    deleteIngreso=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.ingresosActions.deleteIngreso(keys[i])
                .then(r=>{

                }).catch(e=>{

            })
        }
        this.setState({selectedRowKeys:[]})
    };
    confirm=(e)=> {

        this.deleteIngreso();
        message.success('Deleted successfully');
    };

    cancel=(e) =>{

    };

    onSelectChange = (selectedRowKeys) => {

        this.setState({ selectedRowKeys });
    };

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });

    };

    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        let dataFilter = this.props.ingresos.filter(f=>{return f.paid===false });

        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: dataFilter.map((record) => {
                const match = record.client.client.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    client: (
                        <span >
              {record.client.client.split(reg).map((client, i) => (
                  i > 0 ? [<span style={{color:'red'}} key={i}>{match[0]}</span>, client] : client

              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    };

    componentWillMount(){
        let basePath= host+"/api/ingresos/ingresos/?cobrado=";

        let url = basePath+`${"False"}`;
        this.props.ingresosActions.getIngresos(url);
    }

    resetFilter = () => {
        this.setState({
            data:this.props.ingresos.filter(f=>{return f.paid===false }),
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
        });
    };

    handleDates=(a, b)=>{
        let basePath = host+'/api/ingresos/ingresos/?';

        let url = basePath+`date1=${new Date(b[0])}&date2=${new Date(b[1])}`

        this.props.ingresosActions.getIngresos(url);
        this.setState({canReset:true})
    }

    render() {

        const columns = [
            {
                title: 'Razón Social',
                dataIndex: 'client',
                render: (client,obj) =><Link to={`/admin/ingresos/${obj.id}`}>{ client && client !== null ? client.client  || client: "No Cliente"}</Link>,


                key:'client',
            },
            {
                title: 'Linea de negocio',
                dataIndex: 'business_line',
                render: (business_line,obj) =><span>{ business_line && business_line !== null ? business_line.name : "No Linea"}</span>,
            },
            {
                title: 'No. Factura',
                dataIndex: 'no_scheck',
                render:no_scheck=> <span>{no_scheck && no_scheck !==null ?<span>{no_scheck}</span>:'No hay factura'}</span>
            },
            {
                title: 'Status',
                dataIndex:'paid',
                render:paid=><span>{paid?<Tag color="#87d068" style={{width:70, textAlign:'center'}}>Cobrado</Tag>:<Tag color="#f50" style={{width:70, textAlign:'center'}}>Por Cobrar</Tag>}</span>
            },
            {
                title: 'Status',
                dataIndex:'sale_date',
                render:(sale_date, obj)=>{

                    return(<span>{

                        obj.paid?<Tag color="green">Todo Bien</Tag>:obj.client && sale_date && moment.duration(new Date() - new Date(sale_date)).asDays() > parseInt(obj.client.credit) ?<Tag color="#f50">Vencido</Tag>:<Tag color="green">En tiempo</Tag>
                    }</span>)}

            },
        ];


        const { selectedRowKeys, data, filtered , searchText } = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {ingresos, fetched, ingresosData} = this.props;

        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    Cuentas por cobrar
                </div>

                <h1>Cuentas por Cobrar</h1>

                <div style={{marginBottom:'1%', display:'flex'}}>
                    <Input.Search
                        enterButton
                        onSearch={this.onSearch}
                        onChange={this.handleSearch}
                        value={searchText}
                        style={{ width: 400 }}
                        placeholder={'Buscar ingreso...'}
                    />
                    <Divider type="vertical" />
                    <RangePicker onChange={this.handleDates} />
                </div>

                <BackTop visibilityHeight={100} />

                <Table
                    dataSource={ingresos}
                    columns={columns}
                    rowSelection={rowSelection}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    style={{marginBottom:10}}
                    pagination={{
                        pageSize: 10,
                        total:ingresosData.count,
                        onChange:this.handlePagination,
                        showTotal:total => `Total: ${total} Ingresos por cobrar`
                    }}
                />


                <Popconfirm title="Are you sure delete this ingreso?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button disabled={!canDelete} type="primary" >Eliminar</Button>
                </Popconfirm>

                <Divider type={'vertical'} />

                <Button type="primary" hidden={!filtered} onClick={this.resetFilter}>Borrar filtro</Button>


            </Fragment>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        ingresos:state.ingresos.list,
        ingresosData:state.ingresos.allData,
        fetched: state.ingresos.list !== undefined && state.ingresos.allData !== undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ingresosActions: bindActionCreators(ingresosActions, dispatch)
    }
}

CobrarIngreso = connect(mapStateToProps, mapDispatchToProps)(CobrarIngreso);
export default CobrarIngreso;