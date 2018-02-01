import React, {Fragment} from "react";
import {Table} from "antd";

export const FormulasDisplay = ({columns = [], rowSelection , dataSource = []}) => (
    <Fragment>
        <h1>Fórmulas</h1>
        <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            rowKey={record => record.id}
        />
    </Fragment>
);