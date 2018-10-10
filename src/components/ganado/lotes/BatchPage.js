import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Table, Button, Modal, Input, Divider, message} from 'antd';
import * as lotesActions from '../../../redux/actions/ganado/lotesActions';
import {bindActionCreators} from "redux";
import BatchForm from './BatchForm';
import MainLoader from "../../common/Main Loader";
import {host} from '../../../Api/Django'

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key:'name',
        render:(text, record)=>  <Link to={`/admin/lotes/${record.id}`} >{text}</Link>,

        width:150

    },
    {
        title: 'Status',
        dataIndex: 'status',
        key:'status',
        render: val => <p>{val?'Activo':'Inactivo'}</p>,
        width:100
    },
    {
        title: 'Corral ',
        dataIndex: 'corral',
        key:'corral',
        render:val => <p>{val?val.no_corral:'No asignado'}</p>,
        width:150
    },
    {
        title: 'No. de Aretes',
        dataIndex:'animals',
        key:'animals',
        render:val=><p>{val?val.filter(a=>a.status===true).length:0}</p>,
        width:100
    },
    /*{
        title: 'Ac',
        dataIndex: 'id',
        render: text => <Link to={`/admin/lotes/${text}`} >Detalle</Link>,
    },*/
];



/*const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {

    }
};*/

class BatchPage extends Component {
    state = {
        visible: false,
        searchText:'',
        selectedRowKeys:[],
        loading:false
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

    saveLote=(lote)=>{
        this.props.loteActions.saveLote(lote)
            .then(r=>{
                message.success('lote creado con éxito');
                this.handleCancel()
            }).catch(e=>{
            for (let i in e.response.data){
                message.error(e.response.data[i])
            }
        })
    };

    handleSearch=(e)=>{
        this.setState({searchText:e.target.value})
    };
    onSearch=()=>{
        this.setState({loading:true})
        let basePath = host+'/api/ganado/lotes/?q=';
        let url = basePath+this.state.searchText;
        this.props.loteActions.getLotes(url)
            .then(r=>{
                this.setState({loading:false})
            })
    };
    resetFilters=()=>{
        this.setState({loading:true})
        let basePath = host+'/api/ganado/lotes/';
        this.props.loteActions.getLotes(basePath)
            .then(r=>{
                this.setState({loading:false, searchText:''})
            })
    };


    handlePagination=(pagina)=>{
        this.setState({loading:true})
        let nextLength = pagina.toString().length;
        let newUrl = this.props.paginationData.next;
        if(newUrl===null){
            newUrl = this.props.paginationData.previous;
        }

        if( pagina ==1 && this.props.paginationData.count <= 40){
            newUrl='https'+newUrl.slice(4,newUrl.length);
        }else{
            newUrl='https'+newUrl.slice(4,newUrl.length-nextLength)+pagina;
        }
        this.props.loteActions.getLotes(newUrl)
            .then(r=>{
                this.setState({loading:false})
            })
    };

    onSelectChange = (selectedRowKeys) => {

        this.setState({ selectedRowKeys });
    };
    deleteLotes=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.loteActions.deleteLote(keys[i])
                .then(r=>{

                    message.success('Deleted successfully');
                }).catch(e=>{

                message.error('No puedes eliminar este Lote')
                /*for (let i in this.props.errors){

                    message.error(this.props.errors[i])
                }*/

            })
        }
        this.setState({selectedRowKeys:[]})
    };
    confirm=()=>{
        this.deleteLotes()
    };
    cancel=()=>{

    }

    render() {
        const { visible , searchText, selectedRowKeys, loading} = this.state;
        let {lotes, fetched, corrales, paginationData} = this.props;
        const canUse = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Ganado
                    <Divider type="vertical" />
                        Lotes
                </div>
                <h2>Listado de Lotes</h2>
                {/*Search and filters*/}
                <div style={{padding:'1% 0'}}>
                    <Input.Search
                        enterButton
                        onSearch={this.onSearch}
                        onChange={this.handleSearch}
                        value={searchText}
                        style={{ width: 400 }}
                        placeholder={'Busca por nombre'}/>
                    <Divider
                        type={'vertical'}/>
                    {/*<Select
                        value={loteFilter}
                        mode="combobox"
                        style={{ width: 200 }}
                        onChange={this.handleChange}
                        onSelect={this.filterByLote}
                        placeholder="Filtra por nombre de lote"
                        filterOption={false}
                    >
                        {options}
                    </Select>
                    <Divider
                        type={'vertical'}/>*/}
                    <Button type="primary" onClick={this.resetFilters}>Restablecer</Button>
                </div>
                <Table

                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={lotes}
                    laoding={loading}
                    rowKey={record => record.id}
                    pagination={{
                        pageSize:10,
                        total:paginationData.count,
                        onChange:this.handlePagination,
                        showTotal:total => `Total: ${total} Lotes`
                        }}
                    scroll={{x:650, y:500}}
                />


                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <Divider
                    type={'vertical'}/>
                {/* <Popconfirm title="Are you sure delete this animals?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button disabled={!canUse} type="primary">Delete</Button>
                </Popconfirm> */}

                <Modal title="Nuevo Lote"
                       visible={visible}
                       onCancel={this.handleCancel}
                       width={'30%'}
                       maskClosable={true}
                       footer={[
                           null,
                           null,
                       ]}
                >
                    <BatchForm corrales={corrales} saveLote={this.saveLote}/>
                </Modal>
            </Fragment>
        );
    }
}




function mapStateToProps(state, ownProps) {
    return {
        lotes:state.lotes.list,
        corrales:state.corrales.list,
        paginationData:state.lotes.allData,
        fetched:state.lotes.list!==undefined && state.corrales.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loteActions:bindActionCreators(lotesActions, dispatch)
    }
}

BatchPage = connect(mapStateToProps,mapDispatchToProps)(BatchPage);
export default BatchPage;

