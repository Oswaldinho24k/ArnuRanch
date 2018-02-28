import React, {Component, Fragment} from 'react';
import {Table, Button, message, Popconfirm, Divider, BackTop, Input,Icon} from 'antd';
import ClienteForm from './ClienteForm';
import * as clientesActions from '../../redux/actions/administracion/clientesActions';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";


const TablePageB = ({data, columns, rowSelection})=>{

    return(
        <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            rowKey={record => record.id}
            scroll={{x:650}}
            pagination={false}
            style={{marginBottom:10}}
        />
    );
};

export default TablePageB;