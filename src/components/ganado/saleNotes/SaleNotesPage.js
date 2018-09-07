import React, { Component } from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as saleNotesActions from '../../../redux/actions/ganado/salenotesActions'
import {Table, Divider, Modal, Button, message} from 'antd'
import MainLoader from '../../common/Main Loader';
import moment from 'moment'
import {Link} from 'react-router-dom'



const columns = [
    {
        title: 'Total de Venta',
        dataIndex: 'price',
        render:(v, obj)=><Link to={`/admin/saleNotes/${obj.id}`}><p>{`$${v}`}</p></Link>,
        width:200
    },{
        title: 'Fecha de Generación',
        dataIndex: 'fecha_generacion',
        render:val=><p>{moment(val).format('LL')}</p>,
        width:200

    }, {
        title: 'Total de Kgs',
        dataIndex: 'kilograms',
        width:200
},  {
    title: 'Total de Aretes',
    dataIndex: 'animals',
    render:val=> <span>{val?val.length:'No asignado'}</span>,
    width:200
}];

/*const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};*/

class SaleNotesPage extends Component {
    state={
        visible:false,
        canUse:false,
        selectedRowKeys:[],
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    deleteCorrales=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.saleNotesActions.deleteSaleNote(keys[i])
                .then(r=>{
                    console.log(r);
                    message.success('Deleted successfully');
                }).catch(e=>{

                message.error('No puedes eliminar')                

            })
        }
        this.setState({selectedRowKeys:[]})
    };
    confirm=()=>{
        this.deleteCorrales()
    };
    cancel=()=>{
        console.log('ño')
    }

    //
    handlePagination=(pagina)=>{
        let nextLength = pagina.toString().length;
        let newUrl = this.props.allData.next;
        if(newUrl===null){
            newUrl = this.props.allData.previous;
        }

        if( pagina ==1 && this.props.allData.count <= 40){
            newUrl='https'+newUrl.slice(4,newUrl.length);
        }else{
            newUrl='https'+newUrl.slice(4,newUrl.length-nextLength)+pagina;
        }
        this.props.animalActions.getAnimals(newUrl);
    };
    
  render() {
    let {saleNotes, fetched, allData} = this.props;
    let {visible, selectedRowKeys} = this.state;
    const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
    };
    let count = 0
    for(let i in saleNotes){
        for(let j in saleNotes[i].animals){
            count ++
        }
    }
    console.log(count)
    if(!fetched)return<MainLoader/>

    return (
      <div>
        <div>
            <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                Ganado
                <Divider type="vertical" />
                Notas de Venta

            </div>
            <h2>Notas de Venta</h2> 
            <h5>Animales Vendidos: {count}</h5>
            <Table

                rowSelection={rowSelection}
                columns={columns}
                dataSource={saleNotes}
                rowKey={record => record.id}
                pagination={{
                    pageSize: 20,
                    total:allData.count,
                    onChange:this.handlePagination,
                    showTotal:total => `Total: ${total} aretes`}}                
                scroll={{x:650, y:500}}
            />

            <Link to="/admin/eventos">
                <Button type="primary" style={{margin:'1% 0'}}>Agregar</Button>
            </Link>
            <Divider
                type={'vertical'}/>
            {/* <Popconfirm title="Are you sure delete this animals?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                <Button disabled={selectedRowKeys.length===0} type="primary">Delete</Button>
            </Popconfirm> */}
            <Modal title="Agregar nuevo corral"
                    visible={visible}
                    onCancel={this.handleCancel}
                    width={'30%'}
                    maskClosable={true}
                    footer={[
                        null,
                        null,
                    ]}>
                <div>formulaario</div>
            </Modal>
        </div>
      </div>
    )
  }
}


function mapStateToProps (state, ownProps) {    
    return {
        
        allData:state.saleNotes.allData,
        saleNotes:state.saleNotes.list,
        fetched:state.saleNotes.list!==undefined && state.animals.report !== undefined
    }
}
 function mapDispatchToProps(dispatch){
    return{
        saleNotesActions:bindActionCreators(saleNotesActions, dispatch)
    }
}

SaleNotesPage = connect(mapStateToProps, mapDispatchToProps)(SaleNotesPage);
export default SaleNotesPage
