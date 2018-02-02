import React from 'react';
import {Link} from "react-router-dom";

export const metadata = {
    columns: [
        {
            title: 'NOMBRE',
            dataIndex: 'name'
        },
        {
            title: 'PRECIO UNITARIO',
            dataIndex: 'unit_price'
        },
        {
            title: 'UNIDAD',
            dataIndex: 'unit'
        },
        {
            title: 'ACTIONS',
            dataIndex: 'id',
            render: text => <Link to={`/admin/planta_alimentos/insumos/${text}`} >Editar</Link>,
        },
    ],
    rowSelection : {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
    }
};