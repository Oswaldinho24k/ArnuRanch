import React from 'react';
import {Link} from "react-router-dom";

export const metadata = {
    columns: [
        {
            title: 'Nombre',
            dataIndex: 'name'
        },
        {
            title: 'Unidades',
            dataIndex: 'total_units',
            render: total => `${total} kgs`,
        },
        {
            title: 'Precio total',
            dataIndex: 'total_price',
            render: total => `$ ${total}`,
        },
        {
            title: 'ACTIONS',
            dataIndex: 'id',
            render: text => <Link to={`/admin/planta_alimentos/formulas/${text}`} >Detalle</Link>,
        },
    ],

    columnsNestedTable: [
        {
            title: 'Insumo',
            dataIndex: 'insumo',
            render: insumo => insumo.name
        },
        {
            title: 'Cantidad',
            dataIndex: 'unit',
            render: unit => unit + 'kgs'
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
            render: subtotal =>  '$' + subtotal
        },
    ],
    rowSelection : {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
    }
};
