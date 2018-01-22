import React, {Component, Fragment} from 'react';
import {Table, Divider} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import MainLoader from "../../common/Main Loader";
import InfoBatch from "./InfoBatch";



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
        width: 360,
        render: (text, record) => (
            <span>
  <Link to={`/admin/animals/${record.id}`}>Detalle</Link>
  <Divider type="vertical" />
  <a href="#">Delete</a>
</span>
        ),
    }];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};




class BatchDetailPage extends Component {
    render() {

        let {fetched, lote} = this.props;
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <InfoBatch {...lote}/>
                <Table rowSelection={rowSelection} columns={columns} dataSource={lote.animals} rowKey={record => record.id}/>
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
 function mapDispatchToProps(state, oP){
     return{
     }

}





BatchDetailPage = connect(mapStateToProps, mapDispatchToProps)(BatchDetailPage);
export default BatchDetailPage;