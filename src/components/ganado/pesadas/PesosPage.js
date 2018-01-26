import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Table} from 'antd';
import moment from 'moment';



const columns = [{
    title: 'Animal(Arete)',
    dataIndex: 'animal',
    render:val=><p>{val.arete_rancho}</p>
}, {
    title: 'Peso',
    dataIndex: 'peso',

},{
    title: 'Fecha',
    dataIndex:'created',
    render:val=><p>{moment(val).format('LL')}</p>
}];

class PesosPage extends Component {
    state = {
        selectedRowKeys:[]
    };

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        let {pesadas} = this.props;
        let {selectedRowKeys} = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,

            onSelection: this.onSelection,
        };
        return (
            <div>
                <Table
                    pagination={false}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={pesadas}
                    rowKey={record => record.id}

                />
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        pesadas:state.pesadas.list
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //actions: bindActionCreators(actions, dispatch)
    }
}

PesosPage = connect(mapStateToProps, mapDispatchToProps)(PesosPage);
export default PesosPage;
