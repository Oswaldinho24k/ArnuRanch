import React from 'react';
import {Table} from 'antd';


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