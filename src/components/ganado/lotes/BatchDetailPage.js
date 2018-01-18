import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, Table} from "antd";
import {Link} from 'react-router-dom';
import InfoBatch from "./InfoBatch";

const columns = [
    {
        title: 'ARETE SINIGA',
        dataIndex: 'arete_siniga',
    },
    {
        title: 'ARETE RANCHO',
        dataIndex: 'arete_rancho',
    },
    {
        title: 'OWNER',
        dataIndex: 'owner',
    },


];



const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};

class BatchDetailPage extends Component {
    render() {
        console.log(this.props.lote.name)
        let {lote} = this.props

        return (
            <div>
                <Card title={lote.name}>
                    <InfoBatch {...lote}/>
                    <h2>Lista de Animales</h2>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={lote.animals} rowKey={record => record.id}/>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.id;
    let lote = state.lotes.list.filter(a=>{
        return id == a.id;
    });
    lote = lote[0];
    return {
        lote,
    }
}



BatchDetailPage = connect(mapStateToProps, )(BatchDetailPage);
export default BatchDetailPage;