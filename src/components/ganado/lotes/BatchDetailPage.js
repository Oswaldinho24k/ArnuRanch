import React, {Component, Fragment} from 'react';
import {Table, Divider, Button, Modal} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import MainLoader from "../../common/Main Loader";
import InfoBatch from "./InfoBatch";
import FormGasto from "../animals/FormGasto";
import * as animalGastoActions from "../../../redux/actions/gastoAnimalActions";
import {bindActionCreators} from "redux";



const columns = [
    {
        title: 'Arete Rancho',
        dataIndex: 'arete_rancho',
    },{
        title: 'Arete Siniga',
        dataIndex: 'arete_siniga',
    }, {
        title: 'Owner',
        dataIndex: 'owner',
    },
    {
        title: 'Actions',
        key: 'action',
        width: 100,
        render: (text, record) => (
            <span>
  <Link to={`/admin/animals/${record.id}`}>Detalle</Link>
</span>
        ),
    }];





class BatchDetailPage extends Component {
    state={
        visible:false,
        selectedRowKeys:[]
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
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
    saveGastos=(gasto)=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            console.log(keys[i]);
            let animalId = keys[i];
            gasto['animal']=animalId;
            let toSend = Object.assign({}, gasto);
            console.log(toSend)


            this.props.animalGastoActions.saveAnimalGasto(toSend)
                .then(r=>{
                    console.log(r)
                }).catch(e=>{
                console.log(e)
            })
        }
        console.log('los gastos')
    };
    render() {

        let {fetched, lote} = this.props;
        let {visible, selectedRowKeys} = this.state;
        if(!fetched)return(<MainLoader/>);
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const disablebutton = selectedRowKeys.length > 0;
        return (
            <Fragment>
                <h1>Lote {lote.name}</h1>
                <h3>Corral: {lote.corral.numero_serial}</h3>
                <h5>Status: {lote.status?'Activo':'Inactivo'}</h5>
                <Divider />
                <Button disabled={!disablebutton} onClick={this.showModal}>Agregar Gasto</Button>
                <Modal title="Agregar nuevo animal"
                       visible={visible}
                       onCancel={this.handleCancel}
                       width={'30%'}
                       maskClosable={true}
                       footer={[
                           null,
                           null,
                       ]}
                >
                    <FormGasto saveGasto={this.saveGastos} handleCancel={this.handleCancel}/>
                </Modal>
                <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={lote.animals} rowKey={record => record.id}/>
            </Fragment>

        );
    }
}


function mapStateToProps (state, ownProps) {
    let loteId = ownProps.match.params.id;
    let lote = state.lotes.list.filter(l => {
        return loteId == l.id;
    });

    lote = lote[0];
    return {
        lote,
        fetched: lote !== undefined
    }
}
 function mapDispatchToProps(dispatch){
     return{
         animalGastoActions:bindActionCreators(animalGastoActions, dispatch)
     }

}





BatchDetailPage = connect(mapStateToProps, mapDispatchToProps)(BatchDetailPage);
export default BatchDetailPage;