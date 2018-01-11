import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Table} from 'antd';
import * as lotesActions from '../../../redux/actions/lotesActions';
import {bindActionCreators} from "redux";

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
        render: val => <p>{val?'Activo':'Inactivo'}</p>
    },
    {
        title: 'Corral',
        dataIndex: 'corral',
        render:val => <p>{val.no_corral}</p>
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
        let {lotes} = this.props;
        return (
            <Fragment>
                <Table rowSelection={rowSelection} columns={columns} dataSource={lotes} />
            </Fragment>
        );
    }
}

const mapStateToProps = (state, oP) => ({
    lotes:state.lotes.list,
});

const mapDispatchToProps = (dispatch) => ({
    lotesActions:bindActionCreators(lotesActions, dispatch)
});

BatchPage = connect(mapStateToProps,mapDispatchToProps)(BatchPage);
export default BatchPage;

