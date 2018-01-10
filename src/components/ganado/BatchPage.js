import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Table} from 'antd';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        render: text => <Link to={`/admin/batch/${text}`} >{text}</Link>,
    },
    {
        title: 'Nombre',
        dataIndex: 'name',
    },
    {
        title: 'Estado',
        dataIndex: 'status',
    },
    {
        title: 'Corral',
        dataIndex: 'corral',
    }
];

const data = [
    {
        id: '1',
        name: '1T2T3G44TY',
        status: 'activo',
        corral: '1',
    },{
        id: '2',
        name: '1T2T3G44TE',
        status: 'activo',
        corral: '2',
    },{
        id: '3',
        name: '1T2T3G44TE',
        status: 'activo',
        corral: '3',
    }
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};

class BatchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Fragment>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </Fragment>
        );
    }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = () => ({

});

BatchPage = connect(mapStateToProps,mapDispatchToProps)(BatchPage);
export default BatchPage;

