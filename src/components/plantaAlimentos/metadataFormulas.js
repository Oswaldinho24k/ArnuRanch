import React from 'react';
import {Link} from "react-router-dom";

export const metadata = {
    columns: [
        {
            title: 'NOMBRE',
            dataIndex: 'name'
        },
        {
            title: 'INSUMOS',
            dataIndex: 'items',
            render: array => <p>{array.length}</p>,
        },
        {
            title: 'ACTIONS',
            dataIndex: 'id',
            render: text => <Link to={`/admin/planta_alimentos/formulas/${text}`} >Detalle</Link>,
        },
    ],
    rowSelection : {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
    }
};